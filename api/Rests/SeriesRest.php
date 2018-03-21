<?php
namespace Api\Rests;

use Core\BaseRest;

class SeriesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['series', 'save']
        ]);
        parent::add('GET', [
            ['series', 'listAll']
        ]);
        parent::add('PUT', [
            ['series/:id', 'edit']
        ]);
        parent::add('DELETE', [
            ['series/:id', 'delete']
        ]);
    }

    final public function save($req)
    {
        $this->model->save($req['input']);
        parent::response("", 200);
    } 

    final public function listAll()
    {
        $series = $this->model->listAll();
        parent::response($series, 200);
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