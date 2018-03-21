<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class AuthenticateModel extends BaseModel
{
    final public function autenticar($usuario, $senha)
    {
        $query =
        "SELECT u.nome, auth.id, auth.perfil, auth.token 
        FROM tbl_usuarios u, tbl_usuarios_auth auth 
        WHERE (auth.usuario = ? AND auth.senha = ?) AND u.id = auth.id_usuario";
        
        $stmt = parent::con()->prepare($query);
        $stmt->bindParam(1, $usuario);
        $stmt->bindParam(2, $senha);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    final public function setToken($id, $token)
    {
        $query =
        "UPDATE tbl_usuarios_auth
        SET token = ?
        WHERE id = ?";

        $stmt = parent::con()->prepare($query);
        $stmt->bindParam(1, $token);
        $stmt->bindParam(2, $id);
        $stmt->execute();
    }
}
