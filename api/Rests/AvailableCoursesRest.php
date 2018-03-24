<?php
namespace Api\Rests;

use Core\BaseRest;

class AvailableCoursesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['courses', 'save']
        ]);
        parent::add('GET', [
            ['courses/available/:idfield', 'list'],
            ['courses/available/:idfield/professor/:idprofessor', 'listByProfessor']
        ]);
        parent::add('PUT', [
            ['courses/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['courses/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function list()
    {
        $courses = $this->model->list(parent::getParam("idfield"));
        parent::response($courses, 200);
    } 

    final public function listByProfessor()
    {
        $courses = $this->model->listByProfessor(parent::getParam("idfield"),parent::getParam("idprofessor"));
        parent::response($courses, 200);
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
}