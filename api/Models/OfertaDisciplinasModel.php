<?php
namespace Api\Models;

use Core\BaseModel;
use PDO;

class OfertaDisciplinaModel extends BaseModel
{
    final public function save($turno,$semestre_letivo,$disciplina)
    {
        $query = "INSERT INTO oferta_disciplina (turno, semestre_letivo,disciplina) VALUES (?,?,?);";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$turno,$semestre_letivo,$disciplina]);
    }

    final public function delete($id)
    {
        $query = "DELETE FROM oferta_disciplina WHERE id = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$id]);
    }

    final public function list($semestre_letivo)
    {
        $query = "SELECT c.nome as nome_curso, d.nome as nome_disciplina, d.credito, t.nome as nome_turno, md.semestre FROM oferta_disciplina od"+ 
            "INNER JOIN turno t ON t.id = od.turno"+
            "INNER JOIN matriz_disciplinas md ON md.id = od.matriz_disciplina"+
            "INNER JOIN disciplina d ON d.id = md.disciplina "+
            "INNER JOIN matriz_curricular mc ON mc.id = md.matriz "+
            "INNER JOIN curso c ON c.id = mc.curso "+
            "WHERE semestre_letivo = ?";
        $stmt = parent::con()->prepare($query);
        $stmt->execute([$semestre_letivo]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
