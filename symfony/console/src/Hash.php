<?php

namespace Hash;

class Hash {
    /**
     * Receives a string password and hashes it.
     *
     * @param string $password
     * @return string $hash
     */
    public static function hash($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }
    /**
     * Verifies if an hash corresponds to the given password.
     *
     * @param string $string
     * @param string $hash
     * @return boolean True if the hash was generated from de password, False otherwise.
     */
    public static function checkHash($string, $hash) {
        if (password_verify($string, $hash)) {
            return true;
        }
        return false;
    }
}