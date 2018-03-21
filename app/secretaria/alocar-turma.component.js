(function() {
    'use strict';

    angular
        .module('app')
        .component('alocaturma', {
            templateUrl: '/app/secretaria/aloca/alocar-turma.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['secretariaData', 'timeService', 'alocacaoData'];

    function controller(secretariaData, timeService, alocacaoData) {
        var $ctrl = this;
        $ctrl.setAno = setAno;
        $ctrl.saveTurma = saveTurma;
        $ctrl.reset = reset;

        ////////////////

        $ctrl.$onInit = function() {
            secretariaData.turma.list()
                .then(resp => $ctrl.turmas = resp.data)
                .then(turmas => $ctrl.turnos = [...new Set($ctrl.turmas.map(element => element.turno))])
                .then(() => {
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
                        })
                })

        };

        function reset() { $ctrl.turmas.forEach(element => element.check = false) }

        function setAno(ano) {
            $ctrl.selectedYear = ano;
            alocacaoData.turma.listByYear(ano.id)
                .then(resp => {
                    $ctrl.turmas.forEach(element => element.check = false);
                    resp.data.forEach(element => {
                        $ctrl.turmas[$ctrl.turmas.findIndex((elem, index, array) => {
                            if (elem.id == element.id)
                                return elem;
                        })].check = true;
                    })
                });
        }

        function saveTurma() {
            let dados = {
                idAno: $ctrl.selectedYear.id,
                turmas: []
            }
            $ctrl.turmas.forEach(function(element) {
                if (element.check === true)
                    dados.turmas.push(element.id);
            });
            alocacaoData.turma.save(dados)
                .then(resp => console.log(resp))
                .catch(error => console.log(error));
        }
    }
})();