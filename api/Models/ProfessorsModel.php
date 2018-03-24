<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;
use PDOException;

class ProfessorsModel extends BaseModel
{

    final public function save($req)
    {
        try {
            parent::con()->beginTransaction();
            
            parent::con()->prepare("INSERT INTO tbl_usuarios (nome, email, sexo) VALUES (?, ?, ?)")->execute([
                $req['nome'],
                $req['email'],
                $req['sexo']
            ]);
            
            $id = parent::con()->lastInsertId();
            
            parent::con()->prepare("INSERT INTO tbl_professores (id_usuario, disciplinas) VALUES (?, ?)")->execute([
                $id,
                $req['disciplinas']
            ]);
            
            if (isset($req['usuario']) && isset($req['senha']))
                parent::con()->prepare("INSERT INTO tbl_usuarios_auth (usuario, senha, perfil, id_usuario) VALUE (?, ?, ?, ?)")->execute([
                    $req['usuario'],
                    $req['senha'],
                    'professor',
                    $id
                ]);
            
            parent::con()->commit();
        } catch (PDOException $exception) {
            
            parent::con()->rollBack();
            throw $exception;
        }
    }

    final public function edit($id, $req)
    {
        try {
            parent::con()->beginTransaction();
            
            parent::con()->prepare("UPDATE tbl_usuarios SET nome = ?, email = ?, sexo = ? WHERE id = ?")->execute([
                $req['nome'],
                $req['email'],
                $req['sexo'],
                $id
            ]);
            
            parent::con()->prepare("UPDATE tbl_professores SET disciplinas = ? WHERE id_usuario = ?")->execute([
                $req['disciplinas'],
                $id
            ]);
            
            if (isset($req['usuario']) && isset($req['senha'])) {
                $stmt = parent::con()->prepare("SELECT * FROM tbl_usuarios_auth WHERE id_usuario = ? ");
                $stmt->execute([
                    $id
                ]);
                
                if ($stmt->fetch(PDO::FETCH_ASSOC)) {
                    parent::con()->prepare("UPDATE tbl_usuarios_auth SET usuario = ?, senha = ? WHERE id_usuario = ?")->execute([
                        $req['usuario'],
                        $req['senha'],
                        $id
                    ]);
                } else {
                    parent::con()->prepare("INSERT INTO tbl_usuarios_auth (usuario, senha, perfil, id_usuario) VALUE (?, ?, ?, ?)")->execute([
                        $req['usuario'],
                        $req['senha'],
                        'professor',
                        $id
                    ]);
                }
            }
            
            parent::con()->commit();
        } catch (PDOException $exception) {
            
            parent::con()->rollBack();
            throw $exception;
        }
    }

    final public function delete($id)
    {
        try {
            parent::con()->beginTransaction();
            
            parent::con()->prepare("DELETE FROM tbl_professores WHERE id_usuario = ?;
                    DELETE FROM tbl_usuarios_auth WHERE id_usuario = ?;
                    DELETE FROM tbl_usuarios WHERE id = ?")->execute([
                $id,
                $id,
                $id
            ]);
            
            parent::con()->commit();
        } catch (PDOException $exception) {
            
            parent::con()->rollBack();
            throw $exception;
        }
    }
 
    final public function list()
    {
        //$result = parent::con()->prepare("SELECT u.*, p.id as id_professor, p.disciplinas FROM tbl_professores p, tbl_usuarios u WHERE p.id_usuario = u.id");
        $result = parent::con()->prepare("SELECT u.* FROM professor p INNER JOIN user u ON p.id = u.id;");
        
        $result->execute();
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    
    final public function read($id)
    {
        //$result = parent::con()->prepare("SELECT u.*, p.id as id_professor, p.disciplinas FROM tbl_professores p, tbl_usuarios u WHERE p.id_usuario = u.id");
        $stmt = parent::con()->prepare("SELECT u.* FROM professor p INNER JOIN user u ON p.id = u.id WHERE p.id = ?;");
        $stmt->execute([$id]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}
