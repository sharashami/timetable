<?php
namespace Api\Rests;

use Core\BaseRest;

final class AlocacoesRest extends BaseRest
{

    public function __construct()
    {
        parent::__construct();
        
        $this->add('GET', [
            ['alocacoes/anos/:id/turmas', 'getClassesByYear'],
            ['alocacoes/professores/turmas/:id', 'getTeachersByClass'],
            ['alocacoes/professores/disciplinas/turmas/:idTurma', 'getDisciplinesWithTeachersByClass'],
            ['alocacoes/alunos/semturmas', 'getStudentWithoutClass'],
            ['alocacoes/turmas/:idTurma/alunos', 'getStudentByClass']
        ]);
        $this->add('POST', [
            ['alocacoes/turmas', 'alocaTurmas'],
            ['alocacoes/turmas/:idTurma/disciplinas/:idDisciplina/professores', 'saveTeacherInDisciplineByClass'],
            ['alocacoes/alunos', 'saveStudentInClass'],
        ]);
        $this->add('PUT', [
            ['alocacoes/turmas/:idTurma/disciplinas/:idDisciplina/professores', 'updateTeacherInDisciplineByClass'],
        ]);
        $this->add('DELETE', [
            ['alocacoes/professores/turmas/:idTurma/disciplinas/:idDisciplina', 'deleteTeacherOfDiscipline'],
        ]);
    }

    public function getClassesByYear()
    {
        $this->response($this->model->listCLassesByYear(parent::getParam("id")));
    }

    public function getTeachersByClass(){
        $this->response($this->model->listTeachersByClass(parent::getParam("id")));
    }

    public function getDisciplinesWithTeachersByClass(){
        $this->response($this->model->listDisciplinesWithTeachersByClass(parent::getParam("idTurma")));
    }
    
    public function getStudentWithoutClass(){
        $this->response($this->model->listStudentWithoutClass());
    }

    public function getStudentByClass(){
        $this->response($this->model->listStudentByClass(parent::getParam("idTurma")));
    }
    
    public function saveTeacherInDisciplineByClass($req)
    {
        $req["idTurma"] = parent::getParam("idTurma");
        $req["idDisciplina"] = parent::getParam("idDisciplina");
        $this->model->saveTeacherInDisciplineByClass($req);
        $this->response();
    }
    
    public function saveStudentInClass($req)
    {
        $this->model->saveStudentInClass($req['id_turma'], $req['id_aluno']);
        $this->response();
    }
    
    public function updateTeacherInDisciplineByClass($req)
    {
        $req["idTurma"] = parent::getParam("idTurma");
        $req["idDisciplina"] = parent::getParam("idDisciplina");
        $this->model->updateTeacherInDisciplineByClass($req);
        $this->response();
    }
    
    
    public function deleteTeacherOfDiscipline($req)
    {
        $req["idTurma"] = parent::getParam("idTurma");
        $req["idDisciplina"] = parent::getParam("idDisciplina");
        $this->model->deleteTeacherOfDiscipline($req);
        $this->response();
    }

    public function alocaTurmas($req)
    {
        $turmaInTable = array_map(function ($element) {
            return $element['id'];
        }, $this->model->listCLassesByYear($req['idAno']));
        
        $turmaClient = $req["turmas"] ?? [];
        
        $add = array_diff($turmaClient, $turmaInTable);
        if (is_array($add) && sizeof($add) > 0) {
            $toAdd = [];
            foreach ($add as $value)
                $toAdd[] = '("' . $req['idAno'] . '", ' . $value . ')';
            $this->model->updateClasses($toAdd);
        }
        
        $ToDelete = array_diff($turmaInTable, $turmaClient);
        if (is_array($ToDelete) && sizeof($ToDelete) > 0)
            $this->model->deleteClasses($req['idAno'], $ToDelete);
       
        $this->response($req, 200);
    }
    

}
