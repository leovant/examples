<?php

namespace FizzBuzz;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Question\Question;

use FizzBuzz\FizzBuzz;

class FizzBuzzCommand extends Command {
    protected function configure() {
        $this->setName("FizzBuzz:FizzBuzz")
            ->setDescription("Runs FizzBuzz");
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $fizzy = new FizzBuzz();
        $helper = $this->getHelper("question");

        $question = new Question("Please select a limit for this execution:", 25);
        $question->setValidator(function($answer) {
            if (!is_numeric($answer)) {
                throw new \RuntimeException("The limit should be an integer.");
            }
            return $answer;
        });
        $question->setNormalizer(function($value) {
            return $value ? trim($value) : '';
        });
        $question->setMaxAttempts(2);
        $limit = $helper->ask($input, $output, $question);
        $result = $fizzy->firstNFizzBuzz($limit);
    }
}