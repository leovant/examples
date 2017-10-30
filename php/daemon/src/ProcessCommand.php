<?php

namespace Leo;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class ProcessCommand extends Command
{
    protected function configure()
    {
        $this->setName("Tasks:Process")
            ->setDescription("Process some task.");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln("Writing results");
        
        while (true) {
            $output->writeln("Working on a task...");
        }
    }
}
