(function() {
    'use strict';

    angular
        .module('app')
        .component('reset', {
            templateUrl: 'app/login/reset.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = [];

    function controller() {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();