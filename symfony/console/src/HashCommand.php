<?php

namespace Hash;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;

use Hash\Hash;

class HashCommand extends Command {
    protected function configure() {
        $this->setName("Hash:Hash")
            ->setDescription("Hashes a given string using Bcrypt.")
            ->addArgument("Password", InputArgument::REQUIRED, "What do you wish to hash");
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $input = $input->getArgument("Password");
        $result = Hash::hash($input);
        $output->writeln("Your password hashed: " . $result);
    }
}