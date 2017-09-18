<?php

namespace Progress;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Helper\ProgressBar;

class ProgressCommand extends Command {
    protected function configure() {
        $this->setName("Progress")
            ->setDescription("Check Console component progress bar.");
    }

    public function execute(InputInterface $input, OutputInterface $output) {
        $progress = new ProgressBar($output);
        $progress->setFormat("very_verbose");
        $progress->start();

        $i = 0;
        while ($i++ < 50) {
            usleep(300000);
            $progress->advance();
        }
        $progress->finish();
    }
}