<?php
namespace Api\Rests;

use Core\BaseRest;

final class ProfessoresRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        $this->add('POST', [
            ['professores', 'save']
        ]);
        $this->add('GET', [
            ['professores', 'list'],
            ['professores/:id', 'read']
        ]);
        $this->add('PUT', [
            ['professores/:id', 'edit']
        ]);
        $this->add('DELETE', [
            ['professores/:id', 'delete']
        ]); 
    }

    final public function save($req)
    {
        if($r = $this->model->save($req))
            $this->response("Erro ao salvar! $r", 400);  
        $this->response("", 200);
    } 

    final public function edit($req)
    {
        $this->model->edit(parent::getParam("id"), $req);
        parent::response("", 200);   
    } 

    final public function delete($req)
    {
        $this->model->delete(parent::getParam("id"));
        parent::response("", 200);
    } 
 
    final public function list()
    {
        $professores = $this->model->list();
        $professores ? $this->response($professores) : $this->response("", 200);
    }
    final public function read()
    {
        $professores = $this->model->read(parent::getParam("id"));
        $professores ? $this->response($professores) : $this->response("", 200);
    } 
}
