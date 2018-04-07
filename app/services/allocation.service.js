(function() {
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
            assignCourseToProfessor: assignCourseToProfessor,
            removeAssignmentFromProfessor: removeAssignmentFromProfessor,
            listByProgramSemester: listByProgramSemester,
        };

        return service;

        ////////////////

        function listSemester() {
            return $http.get(API + '/semester');
        }

        function remainingList(semesterid) {
            return $http.get(API + '/courses/available/remaining/' + semesterid);
        }

        function listByProfessor(idprofessor, semesterid) {
            return $http.get(API + '/courses/professor/' + idprofessor + '/semester/' + semesterid);
        }

        function assignCourseToProfessor(course, idprofessor) {
            return $http.post(API + '/courses/' + course.id + '/professor/' + idprofessor);
        }

        function removeAssignmentFromProfessor(course) {
            return $http.delete(API + '/courses/' + course.id);
        }

        function listByProgramSemester(semesterid, course) {
            return $http.get(API + '/schedule/semester/' + semesterid + '/semester_number/' + course.semester_number + '/program/' + course.program_id);
        }
    }
})();