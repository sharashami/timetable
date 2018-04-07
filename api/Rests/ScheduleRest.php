<?php
namespace Api\Rests;

use Core\BaseRest;

class ScheduleRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('GET', [
            ['schedule/shifts', 'listShifts'],
            ['schedule/periods', 'listWeekdays'],
            ['schedule/weekdays', 'listPeriods'],
            [
                'schedule/semester/:semester_id/semester_number/:semester_number/program/:program_id', 
                'listByProgramSemester'
                
            ],
            ['schedule/semester/:semester_id/professor/:professor_id/', 'listByProfessor']
        ]);
        parent::add('PUT', [
            ['courses/professor/:id/laboratory/:idlaboratory', 'setLaboratory']
        ]);
        
    }
 

    final public function setLaboratory()
    {
        $this->model->setLaboratory(parent::getParam("id"),parent::getParam("idlaboratory"));
        parent::response("", 200);
    }

    final public function listByProgramSemester()
    {
        $r = $this->model->listByProgramSemester(
            parent::getParam("semester_id"),
            parent::getParam("semester_number"),
            parent::getParam("program_id")
        );
        
        parent::response($r, 200);
    }

    final public function listByProfessor()
    {
        $r = $this->model->listByProfessor(parent::getParam("semester_id"),parent::getParam("professor_id"));
        parent::response($r, 200);
    }

    final public function listShifts()
    {
        $r = $this->model->listShifts();
        parent::response($r, 200);
    } 

    final public function listWeekdays()
    {
        $r = $this->model->listWeekdays();
        parent::response($r, 200);
    } 
    final public function listPeriods()
    {
        $r = $this->model->listPeriods();
        parent::response($r, 200);
    } 
 
}