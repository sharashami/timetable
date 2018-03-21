<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class NomenclaturasModel extends BaseModel
{
    final public function save($nome)
    {
        $query = "INSERT INTO tbl_nomenclatura (nome) VALUE (?)";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nome]);
    }

    final public function edit($id, $nomenclatura)
    {
        $query = "UPDATE tbl_nomenclatura SET nome = ? WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nomenclatura, $id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM tbl_nomenclatura WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function listAll()
    {
        $query = "SELECT * FROM tbl_nomenclatura";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
