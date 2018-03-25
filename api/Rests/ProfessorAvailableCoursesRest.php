<?php
namespace Api\Rests;

use Core\BaseRest;

class ProfessorAvailableCoursesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('GET', [
            ['courses/available/:idfield/professor/:idprofessor', 'list']
        ]);
        parent::add('POST', [
            ['courses/available/:idavailablecourse/professor/:idprofessor/', 'save']

        ]);
        parent::add('PUT', [
            ['courses/available/professor/:id/laboratory/:idlaboratory/', 'setLaboratory']
        ]);
        
        parent::add('DELETE', [
            ['courses/available/professor/:id', 'delete']
        ]);
    }

    final public function save()
    {
        $this->model->save(parent::getParam("idavailablecourse"),parent::getParam("idprofessor"));
        parent::response("", 200);
    } 

    final public function setLaboratory()
    {
        $this->model->setLaboratory(parent::getParam("id"),parent::getParam("idlaboratory"));
        parent::response("", 200);
    } 
    final public function list()
    {
        $courses = $this->model->list(parent::getParam("idfield"),parent::getParam("idprofessor"));
        parent::response($courses, 200);
    } 

    final public function listByProfessor()
    {
        $courses = $this->model->listByProfessor(parent::getParam("idfield"),parent::getParam("idprofessor"));
        parent::response($courses, 200);
    } 


    final public function delete()
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    } 
}