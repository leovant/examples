<?php

namespace Metric;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Helper\Table;

class MetricsCommand extends Command {
    protected function configure() {
        $this->setName("Metrics")
            ->setDescription("Inches to centimeters table.");
    }

    public function execute(InputInterface $input, OutputInterface $output) {
        $table = new Table($output);
        $table
            ->setHeaders(["Inches", "Centimeters"])
            ->setRows([
                ["1", "2.54"],
                ["5", "12.7"],
                ["10", "25.4"],
                ["50", "127"]
            ]);
        $table->render();
    }
}