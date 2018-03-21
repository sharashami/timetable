(function() {
    'use strict';

    angular
        .module('app')
        .factory('secretariaData', secretariaData)

    secretariaData.$inject = ['$q', '$http', 'API', 'toastr'];

    function secretariaData($q, $http, API, toastr) {
        var service = {
            professor: {
                save: saveProfessor,
                list: getProfessores,
                edit: editProfessor,
                delete: deleteProfessor
            },
            aluno: {
                save: saveAluno,
                list: getAluno,
                edit: editAluno,
                delete: deleteAluno
            },
            ano: {
                salve: salveAno,
                list: getAnos,
                edit: editAno,
                delete: deleteAno
            },
            nomenclatura: {
                salve: salveNomenclatura,
                list: getNomenclatura,
                edit: editNomenclatura,
                delete: deleteNomenclatura
            },
            serie: {
                salve: salveSerie,
                list: getSerie,
                edit: editSerie,
                delete: deleteSerie
            },
            turma: {
                salve: salveTurma,
                list: getTurma,
                edit: editTurma,
                delete: deleteTurma
            },
            disciplina: {
                list: getDisciplinas,
            }
        };

        return service;

        ////////////////

        //PROFESSOR
        function saveProfessor(data) {
            return $http.post(API + "professores", data)
                .then(resp => {
                    toastr.success('Professor Cadastro!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Professor não Cadastrado!');
                    console.log(err);
                });
        }

        function getProfessores() {
            return $http.get(API + "professores");
        }

        function editProfessor(data) {
            return $http.put(API + "professores/" + data.id, data)
                .then(resp => {
                    toastr.success('Professor Atualizado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Professor não Atualizado!');
                    console.log(err);
                });
        }

        function deleteProfessor(id) {
            return $http.delete(API + "professores/" + id)
                .then(resp => {
                    toastr.success('Professor Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Professor não Apagado!');
                    console.log(err);
                });
        }

        //ALUNO
        function saveAluno(data) {
            return $http.post(API + "alunos", data)
                .then(resp => {
                    toastr.success('Aluno Cadastro!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Aluno não Cadastrado!');
                    console.log(err);
                });
        }

        function editAluno(data) {
            return $http.put(API + "alunos/" + data.id, data)
                .then(resp => {
                    toastr.success('Modificado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não modificado!');
                    console.log(err);
                });
        }

        function getAluno() {
            return $http.get(API + "alunos");
        }

        function deleteAluno(id) {
            return $http.delete(API + "alunos/" + id)
                .then(resp => {
                    toastr.success('Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não apagado!');
                    console.log(err);
                });
        }

        //ANO
        function salveAno(data, callback) {
            return $http.post(API + "anos", data)
                .then(resp => {
                    toastr.success('Salvo!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não salvo!');
                    console.log(err);
                });
        }

        function getAnos() {
            return $http.get(API + "anos");
        }

        function editAno(data, callback) {
            return $http.put(API + "anos/" + data.id, { nome: data.nome })
                .then(resp => {
                    toastr.success('Modificado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não modificado!');
                    console.log(err);
                });
        }

        function deleteAno(id) {
            return $http.delete(API + "anos/" + id)
                // .then(function(response) {
                //     return response.data;
                // })
                // .catch(function(err) {
                //     return $q.reject(err);
                // });
                .then(resp => {
                    toastr.success('Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não apagado!');
                    console.log(err);
                });
        }

        //NOMENCLATURA
        function salveNomenclatura(data) {
            return $http.post(API + "nomenclaturas", data)
                .then(resp => {
                    toastr.success('Salvo!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não salvo!');
                    console.log(err);
                });
        }

        function getNomenclatura() {
            return $http.get(API + "nomenclaturas");
        }

        function editNomenclatura(data) {
            return $http.put(API + "nomenclaturas/" + data.id, { nome: data.nome })
                .then(resp => {
                    toastr.success('Modificado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não modificado!');
                    console.log(err);
                });
        }

        function deleteNomenclatura(id) {
            return $http.delete(API + "nomenclaturas/" + id)
                .then(resp => {
                    toastr.success('Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não apagado!');
                    console.log(err);
                });
        }

        //SERIE
        function salveSerie(data) {
            return $http.post(API + "series", data)
                .then(resp => {
                    toastr.success('Salvo!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não salvo!');
                    console.log(err);
                });
        }

        function getSerie() {
            return $http.get(API + "series");
        }

        function editSerie(data) {
            return $http.put(API + "series/" + data.id, { nome: data.nome })
                .then(resp => {
                    toastr.success('Modificado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não modificado!');
                    console.log(err);
                });
        }

        function deleteSerie(id) {
            return $http.delete(API + "series/" + id)
                .then(resp => {
                    toastr.success('Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não apagado!');
                    console.log(err);
                });
        }

        //TURMA
        function salveTurma(data) {
            return $http.post(API + "turmas", data)
                .then(resp => {
                    toastr.success('Salvo!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não salvo!');
                    console.log(err);
                });
        }

        function getTurma() {
            return $http.get(API + "turmas");
        }

        function editTurma(data) {
            return $http.put(API + "turmas/" + data.id, data.dados)
                .then(resp => {
                    toastr.success('Modificado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não modificado!');
                    console.log(err);
                });
        }

        function deleteTurma(id) {
            return $http.delete(API + "turmas/" + id)
                .then(resp => {
                    toastr.success('Apagado!');
                    console.log(resp.data);
                })
                .catch(err => {
                    toastr.error('Não apagado!');
                    console.log(err);
                });
        }

        //DISCIPLINAS
        function getDisciplinas() {
            return $http.get(API + "disciplinas");
        }
    }
})();