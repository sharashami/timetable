<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class SeriesModel extends BaseModel
{
    final public function save($nome)
    {
        $query = "INSERT INTO tbl_series (nome) VALUE (?)";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$nome]);
    }

    final public function edit($id, $serie)
    {
        $query = "UPDATE tbl_series SET nome = ? WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$serie, $id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM tbl_series WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function listAll()
    {
        $query = "SELECT * FROM tbl_series";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
