(function() {
    'use strict';

    angular
        .module('app')
        .component('main', {
            templateUrl: 'app/layout/main.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['$state'];

    function controller($state) {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() {

        };
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();