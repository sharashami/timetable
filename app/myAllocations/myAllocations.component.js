(function() {
    'use strict';

    angular
        .module('app')
        .component('myAllocations', {
            templateUrl: 'app/myAllocations/myAllocations.html',
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

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();