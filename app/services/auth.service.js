(function() {
    "use strict";

    angular.module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['API', '$localStorage', '$http', 'user'];

    function AuthService(API, $localStorage, $http, user) {
        var service = {
            login: login,
            logout: logout
        };

        return service;

        ////////////////
        function login(usuario, senha, callback) {
            $http
                .post(API + "authenticate", {
                    'usuario': usuario,
                    'senha': senha
                })
                .then(function(response) {
                    console.log(response);
                    if (response.data.logged) {
                        user.setNome(response.data.nome);
                        user.setPerfil(response.data.perfil);
                        user.setToken(response.data.token);
                        user.loggedIn();
                        $http.defaults.headers.common.Authorization = 'Bearer ' + user.getToken();
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
                .catch(function(response) {
                    console.log("Erro na requisição de autenticação!");
                });
        }

        function logout() {
            // delete $localStorage.currentUser;
            user.logout();
        }
    }
})();