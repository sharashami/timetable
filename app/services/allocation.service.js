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
            addCourseInProfessor: addCourseInProfessor,
            removeCourseInProfessor: removeCourseInProfessor
        };

        return service;

        ////////////////

        function remainingList(semesterid) {
            return $http.get(API + '/courses/available/remaining/' + semesterid);
        }

        function listByProfessor(idprofessor, semesterid) {
            return $http.get(API + '/professorCourses/professor/' + idprofessor + '/semester/' + semesterid);
        }

        function addCourseInProfessor(course, idprofessor) {
            return $http.post(API + '/professorCourses/' + course.id + '/professor/' + idprofessor);
        }

        function removeCourseInProfessor(course) {
            return $http.delete(API + '/professorCourses/' + course.id);
        }
    }
})();