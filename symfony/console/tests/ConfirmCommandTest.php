<?php

use Hash\ConfirmCommand;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;

require_once  './vendor/autoload.php';

class HashCommandTest extends \PHPUnit\Framework\TestCase {
    public function testConfirmHash() {
        $app = new Application();
        $app->add(new ConfirmCommand());

        $command = $app->find("Hash:Confirm");
        $tester = new CommandTester($command);
        $tester->execute([
            "command" => $command->getName(),
            "Password" => 'TestPassword',
            "Hash" => '$2y$10$t60RP4T5hieGHw2vQkOhGOOdrliz6IkxwOiBG.HfyMsO5QK5QBEja'
        ]);

        $this->assertRegExp('/The hash belongs to the password/', $tester->getDisplay());
    }
}