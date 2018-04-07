(function() {
    'use strict';

    angular
        .module('app')
        .component('mainC', {
            templateUrl: 'app/layout/main.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['$state', '$scope'];

    function controller($state, $scope) {
        var $ctrl = this;
        $ctrl.semesterActive;

        ////////////////

        // $scope.$watch(function() {
        //     return $ctrl.semesterActive;
        // }, function(value) {
        //     console.log(value);
        // });

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();