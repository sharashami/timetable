<?php
namespace Api\Rests;

use Core\BaseRest;

class CoursesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['disciplinas', 'save']
        ]);
        parent::add('GET', [
            ['disciplinas', 'list']
        ]);
        parent::add('PUT', [
            ['disciplinas/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['disciplinas/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function list()
    {
        $disciplinas = $this->model->list();
        parent::response($disciplinas, 200);
    } 

    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req['nome']);
        parent::response("", 200);
        
    } 

    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    } 
}