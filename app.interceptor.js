(function() {
    'use strict';

    angular
        .module('app')
        .factory('HttpInterceptor', HttpInterceptor);

    HttpInterceptor.$inject = ['$q'];

    function HttpInterceptor($q) {

        return {
            request: function(config) {

                return config;
            },

            responseError: function(response) {

                return $q.reject(response);
            }
        };
    };
})();