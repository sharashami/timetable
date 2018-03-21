<?php
namespace Api\Rests;

use Core\BaseRest;

class AlunosRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        $this->add('POST', [
            ['alunos', 'save']
        ]);
        $this->add('GET', [
            ['alunos', 'list']
        ]);
        $this->add('PUT', [
            ['alunos/:id', 'edit']
        ]);
        $this->add('DELETE', [
            ['alunos/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req);
        $this->response($req, 200);
    }
    
    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req);
        parent::response($req, 200);   
    } 
    
    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response($req, 200);
    } 

    final public function list()
    {        
        $alunos = $this->model->list();
        $alunos ? $this->response($alunos) : $this->response("", 200);
    } 
}
