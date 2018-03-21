(function() {
    'use strict';

    angular
        .module('app')
        .controller('topNavCtrl', topNavCtrl);

    topNavCtrl.$inject = ['$http', '$location', 'AuthService', 'user'];

    function topNavCtrl($http, $location, AuthService, user) {
        var vm = this;
        vm.nome = user.getNome();
        vm.deslogar = deslogar;
        activate();

        ////////////////

        function activate() {
            let perfil = user.getPerfil();
            if (perfil == "secretaria") {
                vm.links = [
                    { ref: "s.secretaria", text: "Início" },
                    { ref: "s.cadastro", text: "Cadastro" },
                    { ref: "s.alocar", text: "Alocar" },
                    { ref: "s.mapas", text: "Mapas" },
                    { ref: "s.documentacao", text: "Documentação" }
                ]
            } else if (perfil == "aluno") {
                vm.links = [
                    { ref: "aluno", text: "Início" },
                    { ref: "download", text: "Downloads" },
                ]
            } else {
                vm.links = [
                    { ref: "professor", text: "Início" },
                    { ref: "gerencia", text: "Gerência" },
                    { ref: "relatorios", text: "Relatórios" },
                    { ref: "diario", text: "Diários" },
                ]
            }
        }

        function deslogar() {
            console.log("deslogar");
            AuthService.logout();
            $location.path('/login');
        };
    }
})();