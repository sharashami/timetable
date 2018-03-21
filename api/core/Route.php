<?php

namespace Core;

class Route
{
    public function __construct()
    {
        $urlArray = explode('/', explode('&', $this->getUrl())[0]);
        $rest = '\\Api\\Rests\\'.ucfirst($urlArray[0]).'Rest';

        if ($rest) {
            (new $rest)->isRest($urlArray)->run();
        } else {
            exit("api nao encontrada!");
        }
    }

    private function getUrl()
    {
        // return parse_url($_SERVER['REDIRECT_QUERY_STRING'] ?? "index", PHP_URL_PATH);
        // return parse_url(substr($_SERVER['PATH_INFO'] ?? "/index", 1), PHP_URL_PATH);
        return parse_url($_SERVER['QUERY_STRING'], PHP_URL_PATH);
    }
}
