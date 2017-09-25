<?php

require 'vendor/autoload.php';

use Aws\Sqs\SqsClient;
use Aws\Exception\AwsException;

$client = new SqsClient([
    'region' => 'sa-east-1',
    'version' => 'latest'
]);

try {
    echo "Available Queues:\n";
    $result = $client->listQueues();
    foreach ($result->get('QueueUrls') as $queueUrl) {
        echo "$queueUrl\n";
    }
    echo "Creating example queue...";
    $queueName = 'EXAMPLE_QUEUE';
    $result = $client->createQueue([
        'QueueName' => $queueName,
        'Attributes' => [
            'DelaySeconds' => 5,
            'MaximumMessageSize' => 4096
        ]
    ]);
    $queueUrl = $result->get('QueueUrl');
    echo "Created queue $queueUrl\n";
    
    echo "Sending messages...\n";

    for ($i = 0; $i < 5; $i++) {
        $id = uniqid();
        $params = [
            'QueueUrl' => $queueUrl,
            'DelaySeconds' => 0,
            'MessageAttributes' => [
                'Title' => [
                    'DataType' => 'String',
                    'StringValue' => "Testing Amazon SQS [$id]"
                ],
                'Author' => [
                    'DataType' => 'String',
                    'StringValue' => 'Example script'
                ]
            ],
            'MessageBody' => "Hi. I'm testing Amazon SQS."
        ];
        $result = $client->sendMessage($params);
        echo "Message $id sent to queue.\n";
    }

    echo "Messages queued:\n";
    $result = $client->receiveMessage([
        'QueueUrl' => $queueUrl,
        'AttributeNames' => ['SentTimestamp'],
        'MaxNumberOfMessages' => 1,
        'MessageAttributeNames' => ['All'],
        'WaitTimeSeconds' => 0
    ]);
    $messages = $result->get('Messages');

    while (count($messages) > 0) {
        $message = $messages[0];
        $title = $message['MessageAttributes']['Title']['StringValue'];
        $author = $message['MessageAttributes']['Author']['StringValue'];
        $body = $message['Body'];
        
        echo "[$author][$title][$body]\n";
        echo "Deleting message...";
        $result = $client->deleteMessage([
            'QueueUrl' => $queueUrl,
            'ReceiptHandle' => $message['ReceiptHandle']
        ]);
        echo "Ok.\n";

        $result = $client->receiveMessage([
            'QueueUrl' => $queueUrl,
            'AttributeNames' => ['SentTimestamp'],
            'MaxNumberOfMessages' => 1,
            'MessageAttributeNames' => ['All'],
            'WaitTimeSeconds' => 0
        ]);
        $messages = $result->get('Messages');
    }

    echo "No more messages in queue.\n";

    echo "Deleting the example queue...";
    $result = $client->deleteQueue([
        'QueueUrl' => $queueUrl
    ]);
    echo "OK\n";
} catch (AwsException $e) {
    error_log($e->getMessage());
}
