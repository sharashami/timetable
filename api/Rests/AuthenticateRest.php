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
            ['authenticate/login', 'login'],
            ['authenticate/logout', 'logout']
        ]);
    }

    public function login($req)
    {
        if ($dados = $this->model->login($req['email'], $req['password'])) {
            $token = JWT::newToken([
                'name' => $dados['name']
            ]);
            
            $this->response([
                "logged" => true,
                "id" => $dados["id"],
                "name" => $dados["name"],
                "profile" => $dados["profile"],
                "token" => $token
            ]);
        } else {
            $this->response(null, 403);
        }    
    }

    public function logout($req)
    {
        $this->response();
    }
}
