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
            assignCourseToProfessor: assignCourseToProfessor,
            removeAssignmentFromProfessor: removeAssignmentFromProfessor
        };

        return service;

        ////////////////

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
    }
})();