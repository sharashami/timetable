<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class DisciplinasModel extends BaseModel
{
    final public function save($nome)
    {
        $query = "INSERT INTO tbl_ano (nome) VALUE (?)";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nome]);
    }

    final public function edit($id, $ano)
    {
        $query = "UPDATE tbl_ano SET nome = ? WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$ano, $id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM tbl_ano WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function list()
    {
        $query = "SELECT * FROM tbl_disciplinas";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function findByAno($ano)
    {
        $query = "SELECT * FROM tbl_ano a WHERE a.nome = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$ano]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
