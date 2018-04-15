(function() {
    'use strict';

    angular
        .module('app')
        .component('myAllocations', {
            templateUrl: 'app/myAllocations/myAllocations.html',
            controller: controller,
            controllerAs: '$ctrl',
            require: { 'main': '^^mainC' },
            bindings: { Binding: '=' },
        });

    controller.$inject = ['allocationService', '$scope', 'user'];

    function controller(allocationService, $scope, user) {
        var $ctrl = this,
            week = {
                SEGUNDA: [],
                TERÇA: [],
                QUARTA: [],
                QUINTA: [],
                SEXTA: [],
                SÁBADO: []
            },
            period = {
                AB: angular.copy(week),
                CD: angular.copy(week)
            };
        $ctrl.courseActive = courseActive;

        $scope.$watch(() => $ctrl.main.activeSemester, value => {
            // console.log(value);
            if (value) {
                $ctrl.activeSemester = value;
                getListByProfessor();
                allocationService.listScheduleByProfessor($ctrl.activeSemester.id, user.getId())
                    .then(resp => { $ctrl.professorSchedule = organize(resp.data) });
            }
        });

        ////////////////

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function organize(data) {
            let list = {
                MANHÃ: angular.copy(period),
                TARDE: angular.copy(period)
            };
            data.forEach(e => { list[e.shift_description][e.period_description][e.day].push(e) });
            return list;
        }

        function getListByProfessor() {
            allocationService.listByProfessor(user.getId(), $ctrl.activeSemester.id)
                .then(resp => {
                    $ctrl.myCoursesList = resp.data;
                    $ctrl.programs = [...(new Set($ctrl.myCoursesList.map(e => e.program_description)))];
                });
        }

        function courseActive(course) {
            allocationService.listByProgramSemester($ctrl.activeSemester.id, course)
                .then(resp => { $ctrl.allocation = organize(resp.data) });
        }
    }
})();