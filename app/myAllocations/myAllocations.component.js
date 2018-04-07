(function() {
    'use strict';

    angular
        .module('app')
        .component('myAllocations', {
            templateUrl: 'app/myAllocations/myAllocations.html',
            controller: controller,
            controllerAs: '$ctrl',
            require: { 'main': '^^mainC' },
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['allocationService', '$scope', 'user'];

    function controller(allocationService, $scope, user) {
        var $ctrl = this;
        $ctrl.semesterActive;
        $ctrl.courseActive = courseActive;

        ////////////////

        $scope.$watch(() => $ctrl.main.semesterActive, value => {
            // console.log(value);
            if (value) {
                $ctrl.semesterActive = value;
                getListByProfessor();
            }
        });

        $ctrl.$onInit = function() {};

        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function getListByProfessor() {
            allocationService.listByProfessor(user.getId(), $ctrl.semesterActive.id)
                .then(resp => {
                    $ctrl.myCoursesList = resp.data;
                    $ctrl.programs = [...(new Set($ctrl.myCoursesList.map(e => e.program_description)))];
                });
        }

        function courseActive(course) {
            console.log(course);
            allocationService.listByProgramSemester($ctrl.semesterActive.id, course)
                .then(resp => console.log(resp.data))
                .catch(err => console.log("deu merda"));
        }
    }
})();