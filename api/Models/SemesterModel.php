<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class SemesterModel extends BaseModel
{
    final public function save($description)
    {
        $result = parent::con()->prepare("INSERT INTO semester (description) VALUE (?)");

        $result->execute([$description ]);

    }

    final public function edit($id, $description)
    {
        
        $result = parent::con()->prepare("UPDATE semester SET description=? WHERE id = ?");

        $result->execute([$description, $id]);

    }

    final public function delete($id)
    {
        $query = "DELETE FROM semester WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function list()
    {
        $query = "SELECT * FROM semester";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function getEnabled()
    {
        $query = "SELECT * FROM semester WHERE enabled = 'true'";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    

    final public function enable($id)
    {
        $query = "UPDATE semester SET enabled ='false';";
        $stmt = parent::con()->prepare($query);
        $stmt->execute();

        
        $query = "UPDATE semester SET enabled ='true' WHERE id = ?;";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }
}
