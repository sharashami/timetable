<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class ProgramsModel extends BaseModel
{
    final public function save($nome,$credito)
    {
        $query = "INSERT INTO disciplina (nome,credito) VALUE (?,?)";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nome, $credito]);
    }

    final public function edit($id, $nome, $credito)
    {
        $query = "UPDATE disciplina SET nome = ?, credito = ? WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nome, $credito, $id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM disciplina WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function list()
    {
        $query = "SELECT * FROM disciplina";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function findByNome($nome)
    {
        $query = "SELECT * FROM disciplina a WHERE a.nome = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$ano]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
