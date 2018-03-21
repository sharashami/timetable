(function() {
    'use strict';

    angular
        .module('app')
        .component('formprof', {
            templateUrl: '/app/secretaria/cadastro/form-prof.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
                acao: '<',
                dados: '<'
            },
        });

    controller.$inject = ['secretariaData'];

    function controller(secretariaData) {
        var $ctrl = this;
        $ctrl.checkPass = checkPass;
        $ctrl.saveProf = saveProf;
        $ctrl.validPass = validPass;

        ////////////////

        $ctrl.$onInit = function() {
            console.log($ctrl.acao);
            $ctrl.data = $ctrl.dados || {};
            secretariaData.disciplina.list()
                .then(resp => {
                    $ctrl.disciplinas = resp.data;
                    if ($ctrl.data.disciplinas)
                        for (let d of $ctrl.data.disciplinas) {
                            $ctrl.disciplinas
                                .find((element, index, array) => {
                                    if (element.id == d)
                                        element.check = true;
                                })
                        }
                    $ctrl.data.disciplinas = $ctrl.disciplinas;
                });
        };

        function saveProf() {
            var disciplinas = [];
            for (let d of $ctrl.disciplinas)
                if (d.check === true)
                    disciplinas.push(d.id);
            $ctrl.data.disciplinas = angular.toJson(disciplinas);
            secretariaData.professor.save($ctrl.data)
                .then(() => resetData());
        }

        function checkPass() {
            if ($ctrl.data.senha && $ctrl.data.confsenha) {
                if (($ctrl.data.senha.length == 0 || $ctrl.data.confsenha.lenght == 0) || ($ctrl.data.senha == $ctrl.data.confsenha))
                    return false;
                return true;
            }
            return false;
        }

        function validPass(invalid) {
            if (invalid || ($ctrl.data.usuario && $ctrl.data.usuario.length < 1))
                $ctrl.data.senha = $ctrl.data.confsenha = "";
        }

        function resetData() {
            $('form button[type="reset"]').click();
            $ctrl.data = {};
            $ctrl.fprof.$setUntouched();
            $ctrl.fprof.$setPristine();
        }
    }
})();