<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class ScheduleModel extends BaseModel
{
    final public function setLaboratory( $id , $laboratory_id)
    {
        $query = "UPDATE professor_available_course SET laboratory_id = ? WHERE id=?;";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$laboratory_id, $id]);
    }
    

}
