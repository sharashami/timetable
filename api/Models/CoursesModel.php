<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class CoursesModel extends BaseModel
{
    final public function save($shift,$semester_id,$program_structure_course_id)
    {
        $query = "INSERT INTO available_course (shift_id, semester_id,program_structure_course_id) VALUES (?,?,?);";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$shift,$semester_id,$program_structure_course_id]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM available_course WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function list($semester_id)
    {
        $query = "SELECT ac.id, p.description as program_description,p.acronym as program_acronym, c.description as course_description, c.credits, 
            s.description as shift_description, psc.semester_number 
            FROM available_course ac 
            INNER JOIN shift s ON s.id = ac.shift_id
            INNER JOIN program_structure_courses psc ON psc.id = ac.program_structure_course_id
            INNER JOIN course c ON c.id = psc.course_id 
            INNER JOIN program_structure ps ON ps.id = psc.program_structure_id 
            INNER JOIN program p ON p.id = ps.program_id 
            WHERE semester_id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semester_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function remainingList($semester_id)
    {
        $query = "SELECT ac.id, p.acronym as program_acronym,  p.description as program_description,p.acronym as program_acronym, c.description as course_description, c.credits, 
        s.description as shift_description, psc.semester_number 
        FROM available_course ac 
        INNER JOIN shift s ON s.id = ac.shift_id
        INNER JOIN program_structure_courses psc ON psc.id = ac.program_structure_course_id
        INNER JOIN course c ON c.id = psc.course_id 
        INNER JOIN program_structure ps ON ps.id = psc.program_structure_id 
        INNER JOIN program p ON p.id = ps.program_id 
        WHERE ac.id IN (
                SELECT ac.id FROM available_course  ac  
                    WHERE NOT EXISTS (
                                SELECT pao.available_course_id 
                                FROM professor_available_course pao 
                                WHERE ac.id = pao.available_course_id 
                                AND ac.semester_id = ?)
        )  ORDER BY course_description ASC;";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semester_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    final public function listByProfessor($semester_id,$professor_id)
    {
        $query = "SELECT ac.id, p.acronym as program_acronym, 
            p.description as program_description, c.description as course_description, 
            c.credits, s.description as shift_description, psc.semester_number 
            FROM  professor_available_course pao 
            INNER JOIN available_course ac ON ac.id = pao.available_course_id 
            INNER JOIN shift s ON s.id = ac.shift_id
            INNER JOIN program_structure_courses psc ON psc.id = ac.program_structure_course_id
            INNER JOIN course c ON c.id = psc.course_id 
            INNER JOIN program_structure ps ON ps.id = psc.program_structure_id 
            INNER JOIN program p ON p.id = ps.program_id 
            WHERE semester_id = ? AND pao.professor_id = ? ORDER BY course_description ASC";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semester_id, $professor_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    final public function assignCourseToProfessor( $available_course_id , $professor_id)
    {
        $query = "INSERT INTO professor_available_course (professor_id,available_course_id) VALUES (?,?);";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$professor_id, $available_course_id]);
    }
    
    final public function removeAssignmentFromProfessor($id)
    {
        $query = "DELETE FROM professor_available_course WHERE available_course_id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }


}
