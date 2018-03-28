<?php
namespace Api\Rests;

use Core\BaseRest;

class SemesterRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['semester', 'save']
        ]);
        parent::add('GET', [
            ['semester', 'list'],
            ['semester/enabled', 'getEnabled']
        ]);
        parent::add('PUT', [
            ['semester/:id', 'edit'],
            ['semester/enable/:id', 'enable'],
        ]);
        parent::add('DELETE', [
            ['semester/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['description']);
        parent::response("", 200);
    } 

    final public function list()
    {
        $courses = $this->model->list();
        parent::response($courses, 200);
    } 

    final public function getEnabled()
    {
        $s = $this->model->getEnabled();
        parent::response($s, 200);
    } 
    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req['description']);
        parent::response("", 200);
        
    } 

    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    }
    
    final public function enable()
    {
        $this->model->enable(parent::getParam("id"));
        parent::response("", 200);
    } 
}