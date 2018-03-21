(function() {
    'use strict';

    angular
        .module('app')
        .component('cadconsulta', {
            templateUrl: '/app/secretaria/cadastro/cadastro.consulta.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['secretariaData', 'ModalService', '$filter'];

    function controller(secretariaData, ModalService, $filter) {
        var $ctrl = this;
        $ctrl.buscar = buscar;

        ////////////////

        $ctrl.$onInit = function() { $ctrl.tipo = "ESCOLHA" };

        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function buscar() {
            switch ($ctrl.tipo) {
                case 'professor':
                    $ctrl.toSee = toSeeProfessor;
                    $ctrl.edit = editProfessor;
                    $ctrl.delete = deleteProfessor;
                    secretariaData.professor.list()
                        .then((resp) => $ctrl.dados = resp.data);
                    break;
                case 'aluno':
                    $ctrl.toSee = toSeeAluno;
                    $ctrl.edit = editAluno;
                    $ctrl.delete = deleteAluno;
                    secretariaData.aluno.list()
                        .then(resp => $ctrl.dados = resp.data);
                default:
                    break;
            }
        }

        //PROFESSOR
        function toSeeProfessor(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/seeEdit-professor.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Visualizando: ' + $ctrl.dados[id].nome + '.';
                    vm.acao = 'see';

                    activate();

                    function activate() { vm.dados = angular.copy($ctrl.dados[id]); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((result) => {});
            });
        }

        function editProfessor(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/seeEdit-professor.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando: ${$ctrl.dados[id].nome}.`;
                    vm.acao = 'Editar';
                    vm.close = (result) => {
                        vm.result = result;
                        close(vm, 200);
                    }

                    activate();

                    function activate() {
                        vm.dados = angular.copy($ctrl.dados[id]);
                        $ctrl.disciplinas = $ctrl.dados[id].disciplinas;
                    }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result === true) {
                        let disciplinas = [];
                        for (let d of vm.dados.disciplinas)
                            if (d.check === true)
                                disciplinas.push(d.id);
                        vm.dados.disciplinas = angular.toJson(disciplinas);
                        secretariaData.professor.edit(vm.dados)
                            .then(resp => { $ctrl.buscar(); });
                    }
                });
            });
        }

        function deleteProfessor(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar ${$ctrl.dados[id].nome}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === true) {
                        secretariaData.professor.delete($ctrl.dados[id].id)
                            .then(() => $ctrl.buscar());
                    }
                });
            });
        }

        //ALUNO
        function toSeeAluno(id) {
            console.log($ctrl.dados[id]);
            ModalService.showModal({
                templateUrl: '/app/modals/seeEdit-aluno.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = 'Visualizando: ' + $ctrl.dados[id].nome + '.';
                    vm.acao = 'see';

                    activate();

                    function activate() { vm.dados = angular.copy($ctrl.dados[id]); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((result) => {});
            });
        }

        function editAluno(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/seeEdit-aluno.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Editando: ${$ctrl.dados[id].nome}.`;
                    vm.acao = 'Editar';
                    vm.close = (result) => {
                        vm.result = result;
                        close(vm, 200);
                    }

                    activate();

                    function activate() { vm.dados = angular.copy($ctrl.dados[id]) }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then((vm) => {
                    if (vm.result) {
                        let dados = angular.copy(vm.dados);
                        dados.data_nascimento = $filter('date')(new Date(dados.data_nascimento), 'yyyy-MM-dd');
                        secretariaData.aluno.edit(dados)
                            .then(() => $ctrl.buscar());
                    }
                });
            });
        }

        function deleteAluno(id) {
            ModalService.showModal({
                templateUrl: '/app/modals/delete.html',
                controllerAs: 'vm',
                controller: function(close) {
                    var vm = this;
                    vm.header = `Você realmente quer deletar ${$ctrl.dados[id].nome}?`;
                    vm.close = (result) => { close(result, 200); }
                },
                preClose: (modal) => { modal.element.modal('hide'); }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        secretariaData.aluno.delete($ctrl.dados[id].id)
                            .then(() => $ctrl.buscar());
                    }
                });
            });
        }
    }
})();