<?php
namespace Api\Rests;

use Core\BaseRest;

class ProfessorCoursesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('GET', [
            ['professorCourses/professor/:idprofessor/semester/:idsemester', 'list']
        ]);
        parent::add('POST', [
            ['professorCourses/:idavailablecourse/professor/:idprofessor', 'save']

        ]);
        parent::add('DELETE', [
            ['professorCourses/:idavailablecourse', 'delete']
        ]);
    }

    final public function save()
    {
        $this->model->save(parent::getParam("idavailablecourse"),parent::getParam("idprofessor"));
        parent::response("", 200);
    } 
 
    final public function list()
    {
        $courses = $this->model->list(parent::getParam("idsemester"),parent::getParam("idprofessor"));
        parent::response($courses, 200);
    } 

    final public function listByProfessor()
    {
        $courses = $this->model->listByProfessor(parent::getParam("idsemester"),parent::getParam("idprofessor"));
        parent::response($courses, 200);
    } 


    final public function delete()
    {
        $this->model->delete(parent::getParam("idavailablecourse"));
        parent::response("");
    } 
}