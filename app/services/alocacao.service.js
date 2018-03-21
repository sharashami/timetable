(function() {
    'use strict';

    angular
        .module('app')
        .factory('alocacaoData', alocacaoData)

    alocacaoData.$inject = ['$q', '$http', 'API', 'toastr'];

    function alocacaoData($q, $http, API, toastr) {
        var service = {
            turma: {
                save: saveTurma,
                listByYear: getClassAllocationOfClassByYear,
                getDisciplinesWithTeachers: getDisciplinesWithTeachers
            },
            discipline: {
                saveTeacher: saveTeacher,
                updateTeacher: updateTeacher,
                deleteTeacher: deleteTeacher
            },
            aluno: {
                withoutClass: withoutClass,
                save: saveAluno,
                listByClass: listByClass
            }
        };

        return service;

        ////////////////

        function getClassAllocationOfClassByYear(idAno) {
            return $http.get(API + "alocacoes/anos/" + idAno + "/turmas");
        }

        function saveTurma(dados) {
            return $http.post(API + "alocacoes/turmas", dados);
        }

        function getDisciplinesWithTeachers(idTurma) {
            return $http.get(API + "alocacoes/professores/disciplinas/turmas/" + idTurma);
        }

        function saveTeacher(idTurma, idDisciplina, idProfessor) {
            return $http.post(API + "alocacoes/turmas/" + idTurma + "/disciplinas/" + idDisciplina + "/professores", { idProfessor: idProfessor })
                .then(resp => {
                    toastr.success('Modificação Salva!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não Modificado!');
                    console.log(err);
                });
        }

        function updateTeacher(idTurma, idDisciplina, idProfessor) {
            return $http.put(API + "alocacoes/turmas/" + idTurma + "/disciplinas/" + idDisciplina + "/professores", { idProfessor: idProfessor })
                .then(resp => {
                    toastr.success('Modificação Salva!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não Modificado!');
                    console.log(err);
                });
        }

        function deleteTeacher(idTurma, idDisciplina) {
            return $http.delete(API + "alocacoes/professores/turmas/" + idTurma + "/disciplinas/" + idDisciplina)
                .then(resp => {
                    toastr.success('Removido com sucesso!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não Removido!');
                    console.log(err);
                });
        }

        function withoutClass() {
            return $http.get(API + "alocacoes/alunos/semturmas");
        }

        function saveAluno(dados) {
            return $http.post(API + "alocacoes/alunos", dados);
        }

        function listByClass(idTurma) {
            return $http.get(API + "alocacoes/turmas/" + idTurma + "/alunos");
        }
    }
})();