<?php
namespace Api\Rests;

use Core\BaseRest;

class CoursesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['courses', 'save'],
            ['courses/:idavailablecourse/professor/:idprofessor', 'assignCourseToProfessor']

        ]);
        parent::add('GET', [
            ['courses/available/:semesterid', 'list'],//all courses
            ['courses/available/remaining/:semesterid', 'remainingList'],//free courses
            ['courses/professor/:idprofessor/semester/:idsemester', 'listByProfessor']
        ]);
        parent::add('PUT', [
            ['courses/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['courses/:id', 'delete'],
            ['courses/:idavailablecourse', 'removeAssignmentFromProfessor']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function list()
    {
        $courses = $this->model->list(parent::getParam("semesterid"));
        parent::response($courses, 200);
    } 

    final public function remainingList()
    {
        $courses = $this->model->remainingList(parent::getParam("semesterid"));
        parent::response($courses);
    } 

    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req['name']);
        parent::response("", 200);
        
    } 

    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    } 
    
    final public function listByProfessor()
    {
        $courses = $this->model->listByProfessor(parent::getParam("idsemester"),parent::getParam("idprofessor"));
        parent::response($courses);
    } 
    final public function assignCourseToProfessor()
    {
        $this->model->assignCourseToProfessor(parent::getParam("idavailablecourse"),parent::getParam("idprofessor"));
        parent::response("");
    } 
    final public function removeAssignmentFromProfessor()
    {
        $this->model->removeAssignmentFromProfessor(parent::getParam("idavailablecourse"));
        parent::response("");
    } 
}