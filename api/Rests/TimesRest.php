<?php
namespace Api\Rests;

use Core\BaseRest;

class TimesRest extends BaseRest
{
    public function __construct()
    {
        parent::__construct();
        
        parent::add('GET', [
            ['times', 'getAnoAtual']
        ]);
    }

    final public function getAnoAtual($req)
    {
        date_default_timezone_set('America/Fortaleza');
        $date = date('Y');
        parent::response(["ano" => $date], 200);
    } 
}