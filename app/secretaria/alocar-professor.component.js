(function() {
    'use strict';

    angular
        .module('app')
        .component('alocaprof', {
            templateUrl: '/app/secretaria/aloca/alocar-professor.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['secretariaData', 'alocacaoData', 'timeService'];

    function controller(secretariaData, alocacaoData, timeService) {
        var $ctrl = this;
        $ctrl.setAno = setAno;
        $ctrl.setTurma = setTurma;
        $ctrl.setProfessor = setProfessor;
        $ctrl.unsetProfessor = unsetProfessor;

        ////////////////

        $ctrl.$onInit = function() {
            // secretariaData.ano.list().then(resp => $ctrl.anos = resp.data);
            secretariaData.ano.list()
                .then(resp => $ctrl.anos = resp.data)
                .then(anos => {
                    timeService.anoAtual()
                        .then(resp => resp.data.ano)
                        .then(anoAtual => {
                            anos.sort(function(a, b) {
                                return b.nome - a.nome;
                            }).some(element => {
                                if (element.nome <= anoAtual) {
                                    $ctrl.setAno(element);
                                    return true;
                                };
                            });
                        });
                });


            // secretariaData.turma.list().then(resp => $ctrl.turmas = resp.data);

            // secretariaData.disciplina.list().then(resp => {
            //     $ctrl.disciplinas = resp.data;
            //     $ctrl.disciplinas.forEach(elem => elem.id = angular.fromJson(elem.id));
            // });

            secretariaData.professor.list().then(resp => {
                $ctrl.professores = resp.data;
                $ctrl.professores.forEach(elem => elem.disciplinas = angular.fromJson('' + elem.disciplinas.replace(/"/g, "") + ''));
            });

            // //
            // secretariaData.turma.list()
            //     .then(resp => $ctrl.turmas = resp.data)
            //     .then(turmas => $ctrl.turnos = [...new Set($ctrl.turmas.map(element => element.turno))])
            //     .then(() => {
            //         secretariaData.ano.list()
            //             .then(resp => $ctrl.anos = resp.data)
            //             .then(anos => {
            //                 timeService.anoAtual()
            //                     .then(resp => resp.data.ano)
            //                     .then(anoAtual => {
            //                         anos.sort(function(a, b) {
            //                             return b.nome - a.nome;
            //                         }).some(element => {
            //                             if (element.nome <= anoAtual) {
            //                                 $ctrl.setAno(element);
            //                                 return true;
            //                             };
            //                         });
            //                     });
            //             })
            //     })

        };

        function setAno(ano) {
            $ctrl.selectedYear = ano;
            alocacaoData.turma.listByYear(ano.id).then(resp => {
                $ctrl.selectedTurma = null;
                $ctrl.turmas = resp.data;

            });
        }

        function setTurma(turma) {
            $ctrl.disciplinas = null;
            $ctrl.selectedTurma = turma;
            alocacaoData.turma.getDisciplinesWithTeachers(turma.id_turma)
                .then(resp => {
                    $ctrl.disciplinas = resp.data;
                    $ctrl.disciplinas.forEach(elem => elem.id = angular.fromJson(elem.id));
                });
        }

        function setProfessor(d, p) {
            let copyDisciplina = angular.copy(d);

            if ((copyDisciplina.id_professor && p.id_professor) && copyDisciplina.id_professor != p.id_professor) {
                alocacaoData.discipline.updateTeacher($ctrl.selectedTurma.id_turma, d.id, p.id_professor)
                    .then(resp => {
                        d.id_professor = p.id_professor;
                        d.nome_professor = p.nome
                    });
            } else if (!copyDisciplina.id_professor && p.id_professor) {
                alocacaoData.discipline.saveTeacher($ctrl.selectedTurma.id_turma, d.id, p.id_professor)
                    .then(resp => {
                        d.id_professor = p.id_professor;
                        d.nome_professor = p.nome
                    });
            }
        }

        function unsetProfessor(d) {
            alocacaoData.discipline.deleteTeacher($ctrl.selectedTurma.id_turma, d.id)
                .then(() => d.id_professor = null);
        }
    }
})();