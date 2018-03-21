(function() {
    'use strict';

    angular
        .module('app')
        .component('login', {
            templateUrl: '/app/login/login.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['$http', '$location', 'AuthService', 'user'];

    function controller($http, $location, AuthService, user) {
        var $ctrl = this;
        $ctrl.logar = logar;
        $ctrl.deslogar = deslogar;

        ////////////////

        // $ctrl.$onInit = function() {};
        // $ctrl.$onChanges = function(changesObj) {};
        // $ctrl.$onDestroy = function() {};

        function logar() {
            AuthService.login($ctrl.usuario, $ctrl.senha, function(logged) {
                if (logged === true) {
                    console.log("logado");
                    $location.path('/' + user.getPerfil());
                } else {
                    console.log("deslogado")
                    $location.path('/login');
                }
            })
        };

        function deslogar() {
            console.log("deslogar");
        };
    }
})();