<?php
namespace Api\Rests;

use Core\BaseRest;

class NomenclaturasRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['nomenclaturas', 'save']
        ]);
        parent::add('GET', [
            ['nomenclaturas', 'listAll']
        ]);
        parent::add('PUT', [
            ['nomenclaturas/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['nomenclaturas/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function listAll()
    {
        $nomenclaturas = $this->model->listAll();
        parent::response($nomenclaturas, 200);
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