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

    final public function listByProgramSemester($semester_id,$semester_number,$program_id)
    {
        $query = "SELECT sched.id, pao.professor_id, wday.id as day_id, wday.description as day, 
                    s.id as shift_id ,s.description as shift_description, 
                    per.id as period_id ,per.description as period_description, psc.semester_number,
                    p.id as program_id, p.description as program_description,p.acronym as program_acronym, c.description as course_description, c.credits
                     
                    FROM professor_available_course pao
                    INNER JOIN schedule sched ON sched.prof_available_course_id = pao.id
                    INNER JOIN weekday wday ON wday.id = sched.weekday_id
                    INNER JOIN shift s ON s.id = sched.shift_id
                    INNER JOIN period per ON per.id = sched.period_id
                    INNER JOIN available_course ac ON ac.id = pao.available_course_id 
                    INNER JOIN program_structure_courses psc ON psc.id = ac.program_structure_course_id
                    INNER JOIN course c ON c.id = psc.course_id 
                    INNER JOIN program_structure ps ON ps.id = psc.program_structure_id 
                    INNER JOIN program p ON p.id = ps.program_id 
                    WHERE sched.semester_id = ? and psc.semester_number = ? and p.id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semester_id, $semester_number,$program_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    final public function listByProfessor($semester_id, $professor_id)
    {
        $query = "SELECT sched.id, wday.id as day_id, wday.description as day, 
                    s.id as shift_id ,s.description as shift_description, 
                    per.id as period_id ,per.description as period_description, psc.semester_number,
                    p.id as program_id, p.description as program_description,p.acronym as program_acronym, c.description as course_description, c.credits
                     
                    FROM professor_available_course pao
                    INNER JOIN schedule sched ON sched.prof_available_course_id = pao.id
                    INNER JOIN weekday wday ON wday.id = sched.weekday_id
                    INNER JOIN shift s ON s.id = sched.shift_id
                    INNER JOIN period per ON per.id = sched.period_id
                    INNER JOIN available_course ac ON ac.id = pao.available_course_id 
                    INNER JOIN program_structure_courses psc ON psc.id = ac.program_structure_course_id
                    INNER JOIN course c ON c.id = psc.course_id 
                    INNER JOIN program_structure ps ON ps.id = psc.program_structure_id 
                    INNER JOIN program p ON p.id = ps.program_id 
                    WHERE sched.semester_id = ? and  pao.professor_id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semester_id, $professor_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}



