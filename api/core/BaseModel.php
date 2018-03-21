<?php
namespace Core;

use PDO;
use PDOException;

abstract class BaseModel
{
    private $dsn, $user, $pass,
            $con, $error_con;
    
    public function __construct()
    {
        $this->dsn = DB['dsn'].';'.DB['charset'];
        $this->user = DB['user'];
        $this->pass = DB['pass'];
        $this->set_con();
    }
            
    private function set_con()
    {
        try {
            $this->con = new PDO($this->dsn, $this->user, $this->pass);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error ao conectar ao banco!" . $e->getMessage();
            die;
            $this->error_con = "Erro ao estabelecer conexão!";
        }
    }
    
    public function con()
    {
        return $this->con;
    }
    
    public function kill()
    {
        return $this->error_con;
    }
}