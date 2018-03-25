(function() {
    'use strict';

    angular
        .module('app')
        .component('login', {
            templateUrl: 'app/login/login.html',
            controller: controler,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controler.$inject = ['AuthService', 'toastr', '$state', 'user'];

    function controler(AuthService, toastr, $state, user) {
        var $ctrl = this;

        $ctrl.signIn = function() {
            AuthService.signIn($ctrl.login)
                .then(resp => {
                    console.log(resp);
                    if (resp.data.logged === true) {
                        $ctrl.remember === true ? user.setType("local") : user.setType();
                        user.loggedIn();
                        user.setToken(resp.data.token);
                        user.setName(resp.data.name);
                        user.setProfile(resp.data.profile);
                        $state.go('root.home');
                    }
                })
                .catch(error => {
                    if (error.status === 403)
                        toastr.error('Login ou Senha inválidos!');
                });
        };


        ////////////////

        $ctrl.$onInit = function() {
            $ctrl.login = {};
        };
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();