(function() {
    'use strict';

    angular
        .module('app')
        .component('myCourses', {
            templateUrl: 'app/myCourses/myCourses.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    controller.$inject = ['allocationService'];

    function controller(allocationService) {
        var $ctrl = this;
        $ctrl.addCourse = addCourse;
        $ctrl.removeCourse = removeCourse;

        ////////////////

        $ctrl.$onInit = function() {
            getRemainingList();
            getListByProfessor();
        };

        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function addCourse(course) {
            let index = $ctrl.remainingList.indexOf(course);
            allocationService.assignCourseToProfessor(course, 1)
                .then(resp => {
                    $ctrl.myCoursesList.push($ctrl.remainingList.splice(index, 1)[0]);
                    getRemainingList();
                });
        }

        function removeCourse(course) {
            allocationService.removeAssignmentFromProfessor(course)
                .then(resp => {
                    $ctrl.myCoursesList.splice($ctrl.myCoursesList.indexOf(course), 1);
                    getRemainingList();
                });
        }

        function getRemainingList() {
            allocationService.remainingList(1)
                .then(resp => { $ctrl.remainingList = resp.data });
        }

        function getListByProfessor() {
            allocationService.listByProfessor(1, 1)
                .then(resp => {
                    $ctrl.myCoursesList = resp.data;
                });
        }
    }
})();