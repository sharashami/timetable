(function() {
    'use strict';

    angular
        .module('app')
        .component('navTop', {
            templateUrl: 'app/layout/navtop.html',
            controller: controller,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
                semester: '='
            },
        });

    controller.$inject = ['user', 'AuthService', 'allocationService'];

    function controller(user, AuthService, allocationService) {
        var $ctrl = this;
        $ctrl.user = user;
        $ctrl.logout = logout;
        $ctrl.setSemester = setSemester;

        ////////////////

        $ctrl.$onInit = function() {
            $ctrl.links = [
                { href: 'root.home', label: 'Minhas Disciplinas' },
                { href: 'root.allocation', label: 'Minhas Alocações' },
            ];

            allocationService.listSemester()
                .then(resp => {
                    $ctrl.semesters = resp.data;
                    ////
                    $ctrl.semesters.push({ id: "2", description: "2019.1", enabled: "0" });
                    $ctrl.setSemester($ctrl.semesters.find(e => !!e.enabled));
                });
        };

        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};

        function logout() {
            AuthService.logout()
                .then(resp => user.logout());
        }

        function setSemester(semester) {
            $ctrl.semester = semester;
            // $ctrl.semesterActive = semester;
            // $rootScope.semesterActive = semester;
        }
    }
})();