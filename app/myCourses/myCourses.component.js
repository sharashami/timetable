(function() {
    'use strict';

    angular
        .module('app')
        .component('myCourses', {
            templateUrl: 'app/myCourses/myCourses.html',
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
        $ctrl.addCourse = addCourse;
        $ctrl.removeCourse = removeCourse;
        $ctrl.activeSemester;

        ////////////////

        $scope.$watch(() => $ctrl.main.activeSemester, value => {
            // console.log(value);
            if (value) {
                $ctrl.activeSemester = value;
                getListByProfessor();
                getRemainingList();
            }
        });


        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function addCourse(course) {
            let index = $ctrl.remainingList.indexOf(course);
            allocationService.assignCourseToProfessor(course, user.getId())
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
            allocationService.remainingList($ctrl.activeSemester.id)
                .then(resp => $ctrl.remainingList = resp.data);
        }

        function getListByProfessor() {
            allocationService.listByProfessor(user.getId(), $ctrl.activeSemester.id)
                .then(resp => $ctrl.myCoursesList = resp.data);
        }
    }
})();