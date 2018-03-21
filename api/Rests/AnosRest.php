<?php
namespace Api\Rests;

use Core\BaseRest;

class AnosRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['anos', 'save']
        ]);
        parent::add('GET', [
            ['anos', 'listAll']
        ]);
        parent::add('PUT', [
            ['anos/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['anos/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function listAll()
    {
        $anos = $this->model->listAll();
        parent::response($anos, 200);
    } 

    final public function edit($req)
    {
        $this->model->edit(getParam("id"), $req['nome']);
        parent::response("", 200);
        
    } 

    final public function delete($req)
    {
        $this->model->delete(getParam("id"));
        parent::response("", 200);
    } 
}