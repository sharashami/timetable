(function() {
    'use strict';

    angular
        .module('app')
        .component('formaluno', {
            templateUrl: '/app/secretaria/cadastro/form-aluno.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
                acao: '<',
                dados: '<'
            },
        });

    controller.$inject = ['secretariaData', '$filter'];

    function controller(secretariaData, $filter) {
        var $ctrl = this;
        $ctrl.saveAluno = saveAluno;

        ////////////////

        $ctrl.$onInit = function() {
            $ctrl.data = $ctrl.dados;

            if ($ctrl.dados && $ctrl.dados.data_nascimento)
                $ctrl.data.data_nascimento = new Date($ctrl.data.data_nascimento.replace(/-/g, ","));

            secretariaData.turma.list()
                .then(resp => $ctrl.turmas = resp.data);
            secretariaData.ano.list()
                .then(resp => $ctrl.anos = resp.data);
        };

        function saveAluno() {
            let data = angular.copy($ctrl.data);
            data.data_nascimento = $filter('date')(new Date(data.data_nascimento), 'yyyy-MM-dd');
            secretariaData.aluno.save(data)
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
            $ctrl.faluno.$setUntouched();
            $ctrl.faluno.$setPristine();
        }
    }
})();