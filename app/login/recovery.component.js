(function() {
    'use strict';

    angular
        .module('app')
        .component('recovery', {
            templateUrl: 'app/login/recovery.html',
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