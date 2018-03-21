(function() {
    'use strict';

    angular
        .module('app')
        .service('user', user);

    user.$inject = ['$localStorage', '$http'];

    function user($localStorage, $http) {
        var user;

        if (!$localStorage.currentUser)
            user = $localStorage.currentUser = { logged: false };
        else
            user = $localStorage.currentUser;

        this.isLoggedIn = isLoggedIn;
        this.loggedIn = loggedIn;
        this.logout = logout;
        this.setNome = setNome;
        this.getNome = getNome;
        this.setPerfil = setPerfil;
        this.getPerfil = getPerfil;
        this.setToken = setToken;
        this.getToken = getToken;

        ////////////////

        function getNome() {
            return user.nome;
        }

        function setNome(nome) {
            user.nome = nome;
        }

        function getPerfil() {
            return user.perfil;
        }

        function setPerfil(perfil) {
            user.perfil = perfil;
        }

        function getToken() {
            return user.token;
        }

        function setToken(token) {
            user.token = token;
        }

        function isLoggedIn() {
            return user.logged
        }

        function loggedIn() {
            user.logged = true;
        }

        function logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = "";
        }
    }
})();