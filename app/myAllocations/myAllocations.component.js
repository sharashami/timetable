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

    controller.$inject = ['allocationService'];

    function controller(allocationService) {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() {
            getListByProfessor();
        };

        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function getListByProfessor() {
            allocationService.listByProfessor(1, 1)
                .then(resp => {
                    $ctrl.myCoursesList = resp.data;
                    $ctrl.programs = [...(new Set($ctrl.myCoursesList.map(e => e.program_description)))];
                });
        }
    }
})();