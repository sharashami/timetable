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

    controler.$inject = [];

    function controler() {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();