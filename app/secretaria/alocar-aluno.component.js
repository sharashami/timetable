(function() {
    'use strict';

    angular
        .module('app')
        .component('alocaaluno', {
            templateUrl: '/app/secretaria/aloca/alocar-aluno.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
                acao: '<'
            },
        });

    controller.$inject = ['secretariaData', 'alocacaoData', 'timeService', 'dialogService'];

    function controller(secretariaData, alocacaoData, timeService, dialogService) {
        var $ctrl = this;
        $ctrl.setAno = setAno;
        $ctrl.setLeftAno = setLeftAno;
        $ctrl.setTurma = setTurma;
        $ctrl.setLeftTurma = setLeftTurma;

        $ctrl.selectAll = function(side, check) {
            if (check) {
                eval("$ctrl.models.lists." + side).forEach(element => {
                    if (element.selected) "$ctrl.models.lists.selectedsRight"
                })
            }
        };

        $ctrl.remover = function() {
            dialogService({
                fnClose: function(result) { console.log(result) }
            }).danger;
        }

        $ctrl.dndSelected = dndSelected;
        $ctrl.drop = drop;

        ////////////////

        $ctrl.$onInit = function() {
            console.log($ctrl.acao);

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

            $ctrl.models = {
                selected: null,
                lists: {
                    selectedsLeft: 0,
                    selectedsRight: 0,
                    left: [],
                    right: []
                }
            };

        };

        function dndSelected(item) {
            $ctrl.models.selected = item;
        }

        function setAno(ano) {
            $ctrl.models.lists.right = null;
            $ctrl.selectedTurma = null;
            $ctrl.selectedYear = ano;
            alocacaoData.turma.listByYear(ano.id).then(resp => $ctrl.turmas = resp.data);
        }

        function setLeftAno(ano) {
            $ctrl.models.lists.left = null;
            if (ano) {
                $ctrl.selectedLeftTurma = null;
                $ctrl.selectedLeftYear = ano;
                alocacaoData.turma.listByYear(ano.id).then(resp => $ctrl.turmasLeft = resp.data);
            } else {
                $ctrl.selectedLeftYear = "Sem Turma";
                alocacaoData.aluno.withoutClass()
                    .then(resp => { $ctrl.models.lists.left = resp.data.map(element => new Object({ label: element })) });
            }
        }

        function setTurma(turma) {
            $ctrl.selectedTurma = turma;
            $ctrl.models.lists.right = null;
            alocacaoData.aluno.listByClass(turma.id_turma)
                .then(resp => { $ctrl.models.lists.right = resp.data.map(element => new Object({ label: element })) });
        }

        function setLeftTurma(turma) {
            $ctrl.selectedLeftTurma = turma;
            $ctrl.models.lists.left = null;
            alocacaoData.aluno.listByClass(turma.id_turma)
                .then(resp => { $ctrl.models.lists.left = resp.data.map(element => new Object({ label: element })) });
        }

        function drop(index, item) {
            console.log(item.label.id_aluno);
            console.log($ctrl.selectedTurma.id_turma);

            alocacaoData.aluno.save({ id_turma: $ctrl.selectedTurma.id_turma, id_aluno: item.label.id_aluno })
                .then(resp => console.log(resp));
            return item;
        }

    }
})();