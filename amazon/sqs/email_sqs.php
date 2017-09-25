<?php

require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Aws\Sqs\SqsClient;
use Aws\Exception\AwsException;

class Queue
{
    private $client;
    private $queueUrl;
    
    public function __construct()
    {
        $this->client = new SqsClient([
            'region' => 'sa-east-1',
            'version' => 'latest'
        ]);
        $queueName = 'EXAMPLE_EMAIL_QUEUE';
        $result = $this->client->createQueue([
            'QueueName' => $queueName,
            'Attributes' => [
                'DelaySeconds' => 5,
                'MaximumMessageSize' => 4096
            ]
        ]);
        $this->queueUrl = $result->get('QueueUrl');
    }

    public function createEmail($email, $title, $message)
    {
        $params = [
            'QueueUrl' => $this->queueUrl,
            'DelaySeconds' => 0,
            'MessageAttributes' => [
                'To' => [
                    'DataType' => 'String',
                    'StringValue' => $email
                ],
                'Title' => [
                    'DataType' => 'String',
                    'StringValue' => $title
                ]
            ],
            'MessageBody' => $message
        ];
        try {
            $result = $this->client->sendMessage($params);
        } catch (AwsException $e) {
            trigger_error($e->getMessage());
        }
    }

    public function process($number)
    {
        try {
            $result = $this->client->receiveMessage([
                'QueueUrl' => $this->queueUrl,
                'AttributeNames' => ['SentTimestamp'],
                'MaxNumberOfMessages' => $number,
                'MessageAttributeNames' => ['All'],
                'VisibilityTimeout' => 60,
                'WaitTimeSeconds' => 20
            ]);
            $messages = $result->get('Messages');
            $processed = 0;
            foreach ($messages as $message) {
                $to = $message['MessageAttributes']['To']['StringValue'];
                $title = $message['MessageAttributes']['Title']['StringValue'];
                $body = $message['Body'];
                // Send the e-mail
                $transport = (new Swift_SmtpTransport(getenv('SMTP_SERVER'), 465, 'ssl'))
                    ->setUsername(getenv('SMTP_USERNAME'))
                    ->setPassword(getenv('SMTP_PASSWORD'));
                $mail = (new Swift_Message($title))
                    ->setFrom(getenv('SMTP_USERNAME'))
                    ->setTo($to)
                    ->setBody($body);
                $mailer = new Swift_Mailer($transport);
                
                if ($mailer->send($mail, $error)) {
                    sleep(30);
                    $processed++;
                    $result = $this->client->deleteMessage([
                        'QueueUrl' => $this->queueUrl,
                        'ReceiptHandle' => $message['ReceiptHandle']
                    ]);
                } else {
                    trigger_error($error);
                }
            }
            return $processed;
        } catch (AwsException $e) {
            trigger_error($e->getMessage());
        }
    }
}

class CreateEmailCommand extends Command
{
    protected function configure()
    {
        $this->setName('email:create')
            ->setDescription('Creates a new e-mail.')
            ->addArgument('To', InputArgument::REQUIRED, 'Destination e-mail address.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $email = $input->getArgument('To');
        $queue = new Queue();
        $queue->createEmail($email, 'Testing Amazon SQS - ' . uniqid(), "Hi, I'm testing Amazon SQS to send e-mails.");
        $output->writeln("E-mail created.");
    }
}

class SendEmailCommand extends Command
{
    protected function configure()
    {
        $this->setName('email:send')
            ->setDescription('Send e-mails in queue.')
            ->addArgument('Quantity', InputArgument::REQUIRED, 'How many e-mails to send/process.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $number = $input->getArgument('Quantity');
        $queue = new Queue();
        $sent = $queue->process($number);
        $output->writeln("$sent e-mails sent.");
    }
}

$app = new Application();
$app->add(new CreateEmailCommand());
$app->add(new SendEmailCommand());
$app->run();
