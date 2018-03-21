<?php
namespace Core;

use PDOException;

class ExceptionCustom extends BaseRest
{

    public function __construct()
    {
        set_exception_handler([
            $this,
            'exception_handler'
        ]);
    }

    public function exception_handler($exception)
    {
        switch ($exception) {
            case $exception instanceof PDOException:
                $this->response([
                    'error' => $exception->getMessage()
                ], 400);
            default:
                $this->response([
                    'error' => "Uncaught exception: " . $exception->getMessage()
                ], 500);
        }
    }
}