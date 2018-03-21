<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class TurmasModel extends BaseModel
{
    final public function save($serie, $turma, $turno)
    {
        $query = "INSERT INTO tbl_turmas (serie, turma, turno) VALUE (?, ?, ?)";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$serie, $turma, $turno]);
    }

    final public function edit($id, $serie, $turma, $turno)
    {
        $query = "UPDATE tbl_turmas SET serie = ?, turma = ?, turno = ? WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$serie, $turma, $turno, $id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM tbl_turmas WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function listAll()
    {
        $query = "SELECT * FROM tbl_turmas";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function find($serie, $turma, $turno)
    {
        $query = "SELECT * FROM tbl_turmas WHERE serie = ? && turma = ? && turno = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$serie, $turma, $turno]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
