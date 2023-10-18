<?php

namespace  App\Classes;

class HelperSession {
    private $sessionData;

    public function setSessionData($sessionData)
    {
        $this->sessionData = $sessionData;
    }

    public function getSessionData()
    {
        return $this->sessionData;
    }
}
