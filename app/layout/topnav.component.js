(function() {
    'use strict';
    // {prop: '='}	Ligação bidirecional
    // {prop: '<'}	Ligação unidirecional
    // {prop: '@'}	Sem ligação
    // {prop: '&'}	Evento de saída

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('app')
        .component('topnav', {
            templateUrl: '/app/layout/topnav.html',
            //template: 'template',
            // transclude
            controller: topnavCtrl,
            controllerAs: '$ctrl',
            bindings: {

            },
        });

    topnavCtrl.$inject = ['$http', '$location', 'AuthService', 'user'];

    function topnavCtrl($http, $location, AuthService, user) {
        var $ctrl = this;
        $ctrl.$onInit = init;
        // $ctrl.$onChanges = function(changesObj) {};
        // $ctrl.$onDestroy = function() {};
        $ctrl.nome = user.getNome();
        $ctrl.deslogar = deslogar;

        ////////////////

        function init() {
            console.log("iniciei");
            let perfil = user.getPerfil();
            if (perfil == "secretaria") {
                $ctrl.links = [
                    { ref: "s.secretaria", text: "Início" },
                    { ref: "s.cadastro", text: "Cadastro" },
                    { ref: "s.alocar", text: "Alocar" },
                    { ref: "s.mapas", text: "Mapas" },
                    { ref: "s.documentacao", text: "Documentação" }
                ]
            } else if (perfil == "aluno") {
                $ctrl.links = [
                    { ref: "aluno", text: "Início" },
                    { ref: "download", text: "Downloads" },
                ]
            } else {
                $ctrl.links = [
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