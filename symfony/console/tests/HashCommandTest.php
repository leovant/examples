<?php

use Hash\HashCommand;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;

require_once  './vendor/autoload.php';

class HashCommandTest extends \PHPUnit\Framework\TestCase {
    public function testHash() {
        $app = new Application();
        $app->add(new HashCommand);

        $command = $app->find("Hash:Hash");
        $tester = new CommandTester($command);
        $tester->execute([
            "command" => $command->getName(),
            "Password" => 'TestPassword'
        ]);

        $this->assertRegExp('/Your password hashed:/', $tester->getDisplay());
    }
}