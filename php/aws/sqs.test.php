<?php
//*********************************************************************************************************************
// Copyright 2008 Amazon Technologies, Inc.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in
// compliance with the License.
//
// You may obtain a copy of the License at:http://aws.amazon.com/apache2.0  This file is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and limitations under the License.
//*********************************************************************************************************************

require_once 'Crypt/HMAC.php';    // grab this with "pear install Crypt_HMAC"
require_once 'HTTP/Request.php';  // grab this with "pear install --onlyreqdeps HTTP_Request"
require_once('sqs.client.php');

define('AWS_ACCESS_KEY_ID',		'<access key>');
define('AWS_SECRET_ACCESS_KEY',	'<secret key>');
define('SQS_ENDPOINT',			'http://queue.amazonaws.com');
define('SQS_TEST_QUEUE',		'SQS-Test-Queue-PHP5');
define('SQS_TEST_MESSAGE',		'This is a test message.');

?>
<html>
	<head>
		<title>SQS PHP Example</title>
		<style>
			body{font-size: 10pt; font-family: verdana;}
		</style>
	</head>
<body>
<?php

try
{
	$q = new SQSClient(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SQS_ENDPOINT);

	//*********************************************************************************************************
	// Create our Queue...
	//   Note: If the queue has recently been deleted, the application needs to wait for 60 seconds before
	//         a queue with the same name can be created again.
	//*********************************************************************************************************
	do
	{
		$retry = false;

		try
		{
			$result = $q->CreateQueue(SQS_TEST_QUEUE);
			echo 'Queue Created: ', $result, "\n<br />\n";
		}
		catch(Exception $e)
		{
			//*************************************************************************************************
			// Was the queue recently deleted?
			//*************************************************************************************************
			if($e->getMessage() == 'AWS.SimpleQueueService.QueueDeletedRecently')
			{
				//*********************************************************************************************
				// Yes - wait 60 seconds and retry (propogation delay)
				//*********************************************************************************************
				echo 'AWS.SimpleQueueService.QueueDeletedRecently -- waiting 60 seconds...', "\n<br />\n";
				sleep(60);
				$retry = true;
			}
			else throw($e);
		}
	}
	while($retry == true);


	//*********************************************************************************************************
	// Retrieve our queues - verify our queue exists...
	//*********************************************************************************************************
	$retryCount = 0;
	do
	{
		$retry = true;
		$result = $q->ListQueues();

		//*****************************************************************************************************
		// Does our queue exist yet?
		//*****************************************************************************************************

		foreach($result as $queue)
		{
			if(strcmp($q->activeQueueURL, $queue) == 0)
			{
				$retry = false;
				echo 'Queue found', "\n<br />\n";
			}
		}
		if($retry)
		{
			$retryCount++;
			echo 'Queue not available yet - keep polling (', $retryCount, ')', "\n<br />\n";
			sleep(1);
		}

	}
	while($retry == true);


	//*********************************************************************************************************
	// Send a message...
	//*********************************************************************************************************

	$messageId = $q->SendMessage(urlencode(SQS_TEST_MESSAGE));
	echo 'Message sent, message id: ', $messageId, "\n<br />\n";


	//*********************************************************************************************************
	// Get Approximate Queue Count...
	//   Since distributed system, the count may not be accurate.
	//*********************************************************************************************************

	$queueCount = $q->GetQueueAttributes('ApproximateNumberOfMessages');

	echo 'Approximate Number of Messages: ', $queueCount, "\n<br />\n";


	//*********************************************************************************************************
	// Receive the message...
	//   If SQS returns empty, the message is not available yet.  We keep retrying until message is
	//   delivered.
	//*********************************************************************************************************
	$message = NULL;
	do
	{
		try
		{
			$messages = $q->ReceiveMessage();

			//*********************************************************************************************************
			// Message received...
			//*********************************************************************************************************
			foreach($messages as $message)
			{
				echo 'Message received', "\n<br />\n";
				echo 'message id: ', $message->MessageId, "\n<br />\n";
				echo 'receipt handle: ', $message->ReceiptHandle, "\n<br />\n";
				echo 'message: ', urldecode($message->Body), "\n<br />\n";
			}
		}
		catch(Exception $e)
		{
			echo 'Test message not available - keep polling...', "\n<br />\n";
			sleep(1);
		}
	}
	while($message == NULL);


	//*********************************************************************************************************
	// Delete message...
	//*********************************************************************************************************
	if($q->DeleteMessage($message->ReceiptHandle))
	{
		echo 'Message deleted', "\n<br />\n";
	}

}
//*********************************************************************************************************
// General exception - exit and report error...
//*********************************************************************************************************
catch(Exception $e)
{
	echo 'Exception occurred: ', $e->getMessage(), "\n<br />\n";
}


?>

</body>
</html>