(function() {
    "use strict";

    angular
        .module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['API', '$http'];

    function AuthService(API, $http) {
        var service = {
            signIn: signIn,
            logout: logout
        };

        return service;

        ////////////////

        function signIn(login) {
            return $http.post(API + "/authenticate/login", login);
        }

        function logout() {
            return $http.post(API + "/authenticate/logout");
        }
    }
})();