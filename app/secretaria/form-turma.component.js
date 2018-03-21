(function() {
    'use strict';

    angular
        .module('app')
        .component('formturma', {
            templateUrl: '/app/secretaria/cadastro/form-turma.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['secretariaData', 'ModalService'];

    function controller(secretariaData, ModalService) {
        var $ctrl = this;
        $ctrl.$onInit = init;

        $ctrl.getAnos = getAnos;
        $ctrl.getNomenclaturas = getNomenclaturas;
        $ctrl.getSeries = getSeries;
        $ctrl.getTurmas = getTurmas;

        $ctrl.data = {};
        $ctrl.saveAno = saveAno;
        $ctrl.editAno = editAno;
        $ctrl.deleteAno = deleteAno;
        $ctrl.saveNomenclatura = saveNomenclatura;
        $ctrl.editNomenclatura = editNomenclatura;
        $ctrl.deleteNomenclatura = deleteNomenclatura;
        $ctrl.saveSerie = saveSerie;
        $ctrl.editSerie = editSerie;
        $ctrl.deleteSerie = deleteSerie;
        $ctrl.saveTurma = saveTurma;
        $ctrl.editTurma = editTurma;
        $ctrl.deleteTurma = deleteTurma;

        ////////////////

        function init() {
            $ctrl.dados = {};
            $ctrl.getAnos();
            $ctrl.getNomenclaturas();
            $ctrl.getSeries();
            $ctrl.getTurmas();
        };

        // ANO
        function saveAno() {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Novo Ano.';
                    vm.label = 'Ano';
                    vm.acao = 'SALVAR';
                    vm.close = (result) => {
                        $ctrl.data.input = vm.input;
                        close(result, 200);
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((result) => {
                    if (result === true) {
                        secretariaData.ano.salve($ctrl.data)
                            .then(() => $ctrl.getAnos());
                    }
                });
            });
        }

        function editAno(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando ano ${$ctrl.dados.anos[id].nome}.`;
                    vm.label = 'Ano';
                    vm.acao = 'EDITAR';
                    vm.close = (result) => {
                        vm.result = result;
                        vm.ano = {
                            id: $ctrl.dados.anos[id].id,
                            nome: vm.input
                        };
                        close(vm, 200);
                    };

                    activate();

                    function activate() {
                        vm.input = $ctrl.dados.anos[id].nome;
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        secretariaData.ano.edit(vm.ano)
                            .then(resp => $ctrl.getAnos());
                    }
                });
            });
        }

        function deleteAno(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar ${$ctrl.dados.anos[id].nome}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === true) {
                        secretariaData.ano.delete($ctrl.dados.anos[id].id)
                            .then(() => $ctrl.getAnos());
                    }
                });
            });
        }

        function getAnos() {
            secretariaData.ano.list()
                .then(resp => $ctrl.dados.anos = resp.data);
        }

        //NOMENCLATURA
        function saveNomenclatura() {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Nova Nomenclatura.';
                    vm.label = 'Nomenclatura';
                    vm.acao = 'SALVAR';
                    vm.close = (result) => {
                        $ctrl.data.input = vm.input.toUpperCase();
                        close(result, 200);
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((result) => {
                    if (result === true) {
                        secretariaData.nomenclatura.salve($ctrl.data)
                            .then(() => $ctrl.getNomenclaturas());
                    }
                });
            });
        }

        function editNomenclatura(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando nomenclatura ${$ctrl.dados.nomenclaturas[id].nome}.`;
                    vm.label = 'Nomenclatura';
                    vm.acao = 'EDITAR';
                    vm.close = (result) => {
                        vm.result = result;
                        vm.nomenclatura = {
                            id: $ctrl.dados.nomenclaturas[id].id,
                            nome: vm.input.toUpperCase()
                        };
                        close(vm, 200);
                    };

                    activate();

                    function activate() {
                        vm.input = $ctrl.dados.nomenclaturas[id].nome;
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        secretariaData.nomenclatura.edit(vm.nomenclatura)
                            .then(() => $ctrl.getNomenclaturas());
                    }
                });
            });
        }

        function deleteNomenclatura(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar ${$ctrl.dados.nomenclaturas[id].nome}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === true) {
                        secretariaData.nomenclatura.delete($ctrl.dados.nomenclaturas[id].id)
                            .then(() => $ctrl.getNomenclaturas());
                    }
                });
            });
        }

        function getNomenclaturas() {
            secretariaData.nomenclatura.list()
                .then(resp => $ctrl.dados.nomenclaturas = resp.data);
        }

        //SERIE
        function saveSerie() {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Nova Serie.';
                    vm.label = 'Serie';
                    vm.acao = 'SALVAR';
                    vm.close = (result) => {
                        $ctrl.data.input = vm.input;
                        close(result, 200);
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((result) => {
                    if (result === true) {
                        secretariaData.serie.salve($ctrl.data)
                            .then(() => $ctrl.getSeries());
                    }
                });
            });
        }

        function editSerie(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turma.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando serie ${$ctrl.dados.series[id].nome}.`;
                    vm.label = 'Serie';
                    vm.acao = 'EDITAR';
                    vm.close = (result) => {
                        vm.result = result;
                        vm.serie = {
                            id: $ctrl.dados.series[id].id,
                            nome: vm.input
                        };
                        close(vm, 200);
                    };

                    activate();

                    function activate() {
                        vm.input = $ctrl.dados.series[id].nome;
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        secretariaData.serie.edit(vm.serie)
                            .then(() => $ctrl.getSeries());
                    }
                });
            });
        }

        function deleteSerie(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar ${$ctrl.dados.series[id].nome}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === true) {
                        secretariaData.serie.delete($ctrl.dados.series[id].id)
                            .then(() => $ctrl.getSeries());
                    }
                });
            });
        }

        function getSeries() {
            secretariaData.serie.list()
                .then(resp => $ctrl.dados.series = resp.data);
        }

        //TURMA
        function saveTurma() {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turmas.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Nova Turma.';
                    vm.label = 'Turma';
                    vm.acao = 'SALVAR';
                    vm.close = (result) => {
                        // $ctrl.data.input = vm.input;
                        vm.result = result;
                        close(vm, 200);
                    }

                    activate();

                    function activate() {
                        vm.series = $ctrl.dados.series;
                        vm.nomenclaturas = $ctrl.dados.nomenclaturas;
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        //vm.dados.turno = vm.dados.turno.toUpperCase();
                        secretariaData.turma.salve(vm.dados)
                            .then(resp => {
                                console.log(resp);
                                $ctrl.getTurmas()
                            }).catch(resp => console.log(resp));
                    }
                });
            });
        }

        function editTurma(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/addEdit-turmas.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando turma 
                    ${$ctrl.dados.turmas[id].serie} 
                    ${$ctrl.dados.turmas[id].turma} 
                    ${$ctrl.dados.turmas[id].turno}`;
                    vm.label = 'Turma';
                    vm.acao = 'EDITAR';
                    vm.close = (result) => {
                        vm.result = result;
                        vm.turma = {
                            id: $ctrl.dados.turmas[id].id,
                            dados: vm.dados
                        };
                        close(vm, 200);
                    };

                    activate();

                    function activate() {
                        vm.series = $ctrl.dados.series;
                        vm.nomenclaturas = $ctrl.dados.nomenclaturas;

                        vm.dados = {};
                        vm.dados.serie = $ctrl.dados.turmas[id].serie;
                        vm.dados.turma = $ctrl.dados.turmas[id].turma;
                        vm.dados.turno = $ctrl.dados.turmas[id].turno.toLowerCase();
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        secretariaData.turma.edit(vm.turma)
                            .then(() => $ctrl.getTurmas());
                    }
                });
            });
        }

        function deleteTurma(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar 
                    ${$ctrl.dados.turmas[id].serie} 
                    ${$ctrl.dados.turmas[id].turma} 
                    ${$ctrl.dados.turmas[id].turno}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === true) {
                        secretariaData.turma.delete($ctrl.dados.turmas[id].id)
                            .then(() => $ctrl.getTurmas());
                    }
                });
            });
        }

        function getTurmas() {
            secretariaData.turma.list()
                .then(resp => $ctrl.dados.turmas = resp.data);
        }
    }
})();