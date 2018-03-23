<?php
namespace Api\Rests;

use Core\BaseRest;

class OfertaDisciplinasRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        parent::add('POST', [
            ['disciplinas', 'save']
        ]);
        parent::add('GET', [
            ['disciplinas/ofertada/:ideixo', 'list'],
            ['disciplinas/ofertada/:ideixo/professor/:idprofessor', 'listByProfessor']
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
        $disciplinas = $this->model->list(parent::getParam("ideixo"));
        parent::response($disciplinas, 200);
    } 

    final public function listByProfessor()
    {
        $disciplinas = $this->model->listByProfessor(parent::getParam("ideixo"),parent::getParam("idprofessor"));
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