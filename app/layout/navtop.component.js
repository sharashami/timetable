(function() {
    'use strict';

    angular
        .module('app')
        .component('navTop', {
            templateUrl: 'app/layout/navtop.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['user', 'AuthService'];

    function controller(user, AuthService) {
        var $ctrl = this;
        $ctrl.user = user;
        $ctrl.logout = logout;

        ////////////////

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function logout() {
            AuthService.logout()
                .then(resp => user.logout());
        }
    }
})();