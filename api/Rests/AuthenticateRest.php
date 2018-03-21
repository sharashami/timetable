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
        if ($dados = $this->model->autenticar($req['usuario'], $req['senha'])) {
            $token = JWT::newToken([
                'nome' => $dados['nome']
            ]);
            
            // $this->model->setToken($dados['id'], $token);
            $this->response([
                "logged" => true,
                "nome" => $dados["nome"],
                "perfil" => $dados["perfil"],
                "token" => $token
            ]);
        } else {
            $this->response([
                "logged" => false,
                "mensagem" => "não foi possível autenticar"
            ]);
        }
    }
}
