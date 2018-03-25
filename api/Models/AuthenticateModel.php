<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class AuthenticateModel extends BaseModel
{
    final public function autenticar($usuario, $senha)
    {
        $query =
        "SELECT u.name, auth.id, auth.profile, auth.token 
        FROM user u, usuario_auth auth 
        WHERE (auth.login = ? AND auth.password = ?) AND u.id = auth.id";
        
        $stmt = parent::con()->prepare($query);
        $stmt->bindParam(1, $usuario);
        $stmt->bindParam(2, $senha);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    final public function setToken($id, $token)
    {
        $query =
        "UPDATE usuario_auth
        SET token = ?
        WHERE id = ?";

        $stmt = parent::con()->prepare($query);
        $stmt->bindParam(1, $token);
        $stmt->bindParam(2, $id);
        $stmt->execute();
    }
}
