(function () {
    'use strict';

    angular
        .module('app')
        .factory('allocationService', allocationService);

    allocationService.$inject = ['API', '$http'];

    function allocationService(API, $http) {
        var service = {
            remainingList: remainingList,
            listByProfessor: listByProfessor,
            listSemester: listSemester,
            listByProgramSemester: listByProgramSemester,
            listScheduleByProfessor: listScheduleByProfessor,
            assignCourseToProfessor: assignCourseToProfessor,
            removeAssignmentFromProfessor: removeAssignmentFromProfessor,
        };

        return service;

        ////////////////

        function listSemester() {
            return $http.get(API + '/semester');
        }

        function remainingList(semesterid) {
            return $http.get(API + '/courses/available/remaining/' + semesterid);
        }

        function listByProfessor(professorid, semesterid) {
            return $http.get(API + '/courses/professor/' + professorid + '/semester/' + semesterid);
        }

        function assignCourseToProfessor(course, professorid) {
            return $http.post(API + '/courses/' + course.id + '/professor/' + professorid);
        }

        function removeAssignmentFromProfessor(course) {
            return $http.delete(API + '/courses/' + course.id);
        }

        function listByProgramSemester(semesterid, course) {
            return $http.get(API + '/schedule/semester/' + semesterid + '/semester_number/' + course.semester_number + '/program/' + course.program_id);
        }

        function listScheduleByProfessor(semesterid, professorid) {
            return $http.get(API + '/schedule/semester/' + semesterid + '/professor/' + professorid);
        }
    }
})();