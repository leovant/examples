<?php

declare(strict_types=1);

namespace FizzBuzz;

class FizzBuzz {
    public function isFizz(int $value): bool {
        if ($value % 3 === 0) {
            return true;
        }
        return false;
    }

    public function isBuzz(int $value): bool {
        if ($value % 5 === 0) {
            return true;
        }
        return false;
    }

    public function calculateFizzBuzz(int $number): bool {
        if ($this->isFizz($number) && $this->isBuzz($number)) {
            echo "FizzBuzz \n";
            return true;
        }
        if ($this->isFizz($number)) {
            echo "Fizz \n";
            return true;
        }
        if ($this->isBuzz($number)) {
            echo "Buzz \n";
            return true;
        }
        echo $number . "\n";
        return true;
    }

    public function firstNFizzBuzz(int $maxValue) {
        $startValue = 1;

        while ($startValue <= $maxValue) {
            $this->calculateFizzBuzz($startValue);
            $startValue++;
        }
        return;
    }
}