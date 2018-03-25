<?php
namespace Api\Rests;

use Core\BaseRest;
use Core\JWT;

class AuthenticateRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        $this->add('POST', [
            ['authenticate', 'login']
        ]);
    }

    public function login($req)
    {
        if ($dados = $this->model->autenticar($req['login'], $req['password'])) {
            $token = JWT::newToken([
                'name' => $dados['name']
            ]);
            
            // $this->model->setToken($dados['id'], $token);
            $this->response([
                "logged" => true,
                "name" => $dados["name"],
                "profile" => $dados["profile"],
                "token" => $token
            ]);
        } else {
            $this->response([
                "logged" => false,
                "message" => "não foi possível autenticar"
            ]);
        }
    }
}
