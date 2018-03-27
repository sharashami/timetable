(function() {
    'use strict';

    angular
        .module('app')
        .factory('HttpInterceptor', HttpInterceptor);

    HttpInterceptor.$inject = ['$q', 'user', '$rootScope'];

    function HttpInterceptor($q, user, $rootScope) {

        return {
            request: function(config) {
                if (user.isLoggedIn())
                    config.headers['Authorization'] = 'Bearer ' + user.getToken() || null;

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