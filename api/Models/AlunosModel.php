<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;
use PDOException;

class AlunosModel extends BaseModel
{

    final public function save($req)
    {
        try {
            parent::con()->beginTransaction();
            
            parent::con()->prepare("INSERT INTO tbl_usuarios (nome, email, data_nascimento, sexo) VALUES (?, ?, ?, ?)")->execute([
                $req['nome'],
                $req['email'],
                $req['data_nascimento'],
                $req['sexo']
            ]);
            
            $id = parent::con()->lastInsertId();
            
            if (isset($req['usuario']) && isset($req['senha']))
                parent::con()->prepare("INSERT INTO tbl_usuarios_auth (usuario, senha, perfil, id_usuario) VALUE (?, ?, ?, ?)")->execute([
                    $req['usuario'],
                    $req['senha'],
                    'aluno',
                    $id
                ]);
            
            parent::con()->prepare("INSERT INTO tbl_alunos (id_usuario, inep) VALUES (?, ?)")->execute([
                $id,
                $req['inep'] ?? null
            ]);
            
            $id = parent::con()->lastInsertId();
            
            if (isset($req['turma']))
                parent::con()->prepare("INSERT INTO tbl_turma_aluno (id_turma, id_aluno, id_ano) VALUES (?, ?, ?)")->execute([
                    $req['turma'],
                    $id,
                    $req['ano']
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
            
            parent::con()->prepare("UPDATE tbl_usuarios SET nome = ?, email = ?, data_nascimento = ?, sexo = ? WHERE id = ?")->execute([
                $req['nome'],
                $req['email'],
                $req['data_nascimento'],
                $req['sexo'],
                $id
            ]);
            
            if (isset($req['turma']))
                parent::con()->prepare("UPDATE tbl_turma_aluno SET id_turma = ?, id_ano = ? WHERE id_aluno = ?")->execute([
                    $req['turma'],
                    $req['ano'],
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
                        'aluno',
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
            
            parent::con()->prepare("DELETE FROM tbl_turma_aluno WHERE id_aluno = (SELECT id FROM tbl_alunos WHERE id_usuario = ?);
                    DELETE FROM tbl_alunos WHERE id_usuario = ?;
                    DELETE FROM tbl_usuarios_auth WHERE id_usuario = ?;
                    DELETE FROM tbl_usuarios WHERE id = ?")->execute([
                        $id,
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
        $result = parent::con()->prepare("SELECT u.* FROM tbl_alunos a, tbl_usuarios u WHERE a.id_usuario = u.id");
        $result->execute();
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}
