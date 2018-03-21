<?php
namespace Api\Rests;

use Core\BaseRest;

class TurmasRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['turmas', 'save']
        ]);
        parent::add('GET', [
            ['turmas', 'listAll']
        ]);
        parent::add('PUT', [
            ['turmas/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['turmas/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['serie'], $req['turma'], $req['turno']);
        parent::response($req, 200);
    } 

    final public function listAll()
    {
        $turmas = $this->model->listAll();
        parent::response($turmas, 200);
    } 

    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req['serie'], $req['turma'], $req['turno']);
        parent::response("", 200);
        
    } 

    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    } 
}