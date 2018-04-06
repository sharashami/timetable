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
    final public function listPeriods( )
    {
        $stmt = parent::con()->prepare('SELECT * from period');
        $stmt->execute();    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function listWeekdays( )
    {
        $stmt = parent::con()->prepare('SELECT * from weekday');
        $stmt->execute();    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    final public function listWeekShifts( )
    {
        $stmt = parent::con()->prepare('SELECT * from shift');
        $stmt->execute();    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
