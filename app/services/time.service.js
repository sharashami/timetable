(function() {
    'use strict';

    angular
        .module('app')
        .service('timeService', timeService);

    timeService.$inject = ['$http', 'API'];

    function timeService($http, API) {
        var service = {
            anoAtual: anoAtual
        };

        return service;

        ////////////////

        function anoAtual() { return $http.get(API + "times") }
    }
})();