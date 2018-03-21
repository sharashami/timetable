<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;
use PDOException;

final class AlocacoesModel extends BaseModel
{

    public function getTeachersByClass($idTurma)
    {
        $result = parent::con()->prepare("SELECT ts.* FROM tbl_turmas ts INNER JOIN tbl_turma t ON t.id_ano = ? AND t.id_turma = ts.id");
        $result->execute([
            $idAno
        ]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function saveTeacherInDisciplineByClass($req)
    {
        parent::con()->prepare("INSERT INTO tbl_turma_disciplina_professor (id_turma, id_disciplina, id_professor) VALUES (?, ?, ?)")->execute([
            $req["idTurma"],
            $req["idDisciplina"],
            $req["idProfessor"]
        ]);
    }

    public function saveStudentInClass($idTurma, $idAluno)
    {
        try {
            parent::con()->beginTransaction();
            
            parent::con()->prepare("INSERT INTO tbl_turma_aluno (id_turma, id_aluno) VALUE (?, ?)")->execute([
                $idTurma,
                $idAluno
            ]);
            $idTurmaAluno = parent::con()->lastInsertId();
            
            $idsDisciplinas = parent::con()->prepare("SELECT id FROM tbl_disciplinas");
            $idsDisciplinas->execute();
            
            while ($row = $idsDisciplinas->fetch(PDO::FETCH_OBJ)) {
                parent::con()->prepare("INSERT INTO tbl_historicos () VALUES ()")->execute();
                $idHistorico = parent::con()->lastInsertId();
                parent::con()->prepare("INSERT INTO tbl_turma_aluno_historico SET id_turma_aluno = $idTurmaAluno, id_historico = $idHistorico, id_disciplina = $row->id")->execute();
            }
            
            parent::con()->commit();
        } catch (PDOException $exception) {
            
            parent::con()->rollBack();
            throw $exception;
        }
    }

    public function updateTeacherInDisciplineByClass($req)
    {
        parent::con()->prepare("UPDATE tbl_turma_disciplina_professor SET id_professor = ? WHERE id_turma = ? AND id_disciplina = ?")->execute([
            $req["idProfessor"],
            $req["idTurma"],
            $req["idDisciplina"]
        ]);
    }

    public function updateClasses(array $req)
    {
        parent::con()->prepare("INSERT INTO tbl_turma (id_ano, id_turma) VALUES" . implode(",", $req))->execute();
    }

    public function deleteTeacherOfDiscipline($req)
    {
        parent::con()->prepare("DELETE FROM tbl_turma_disciplina_professor WHERE id_turma = ? AND id_disciplina = ?")->execute([
            $req["idTurma"],
            $req["idDisciplina"]
        ]);
    }

    public function deleteClasses($idAno, array $idTurma)
    {
        parent::con()->prepare("DELETE FROM tbl_turma WHERE id_ano = ? AND id_Turma IN (" . implode(",", $idTurma) . ")")->execute([
            $idAno
        ]);
    }

    public function listCLassesByYear($idAno)
    {
        $result = parent::con()->prepare("SELECT ts.*, t.id as id_turma FROM tbl_turmas ts INNER JOIN tbl_turma t ON t.id_ano = ? AND t.id_turma = ts.id");
        $result->execute([
            $idAno
        ]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function listDisciplinesWithTeachersByClass($idTurma)
    {
        $result = parent::con()->prepare("SELECT d.*, p.id as id_professor, u.nome as nome_professor 
            FROM tbl_disciplinas d 
            LEFT JOIN tbl_turma_disciplina_professor tdp ON tdp.id_turma = ? AND d.id = tdp.id_disciplina
            LEFT JOIN tbl_professores p ON p.id = tdp.id_professor
            LEFT JOIN tbl_usuarios u ON u.id = p.id_usuario");
        $result->execute([
            $idTurma
        ]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function listStudentWithoutClass()
    {
        $result = parent::con()->prepare("SELECT u.nome, ta.id as id_aluno, tta.id_turma FROM tbl_usuarios u
            INNER JOIN tbl_alunos ta ON u.id = ta.id_usuario
            LEFT JOIN tbl_turma_aluno tta ON ta.id = tta.id_aluno WHERE tta.id_aluno IS NULL");
        $result->execute();
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function listStudentByClass($idTurma)
    {
        $result = parent::con()->prepare("SELECT u.nome, ta.id as id_aluno, tta.id_turma FROM tbl_turma_aluno tta
            INNER JOIN tbl_alunos ta ON ta.id = tta.id_aluno
            INNER JOIN tbl_usuarios u ON u.id = ta.id_usuario WHERE tta.id_turma = ?");
        $result->execute([
            $idTurma
        ]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}
