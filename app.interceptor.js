(function() {
    'use strict';

    angular
        .module('app')
        .factory('HttpInterceptor', HttpInterceptor);

    HttpInterceptor.$inject = ['$q', 'user', '$rootScope'];

    function HttpInterceptor($q, user, $rootScope) {

        return {
            request: function(config) {
                var token = user.getToken();

                if (token)
                    config.headers['Authorization'] = 'Bearer ' + token;

                return config;
            },

            responseError: function(response) {
                if (response.status === 403) {
                    $rootScope.$evalAsync(function() {
                        console.log("Não Autorizado!");
                        user.logout();
                    });
                }

                return $q.reject(response);
            }
        };
    };
})();