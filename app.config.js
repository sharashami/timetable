/**
 * State Change Events
 * View Load Events
 * $rootScope.$on()
 * 
 * RELATIVE paths
 * 'main' - 'main' view in parent template
 * ' ' - unnamed view in parent template
 * 
 * ABSOLUTE (uses @ symbol)
 * 'list@contacts' - 'list' view in 'contacts' state's template
 * 'list@' - 'list' view in index.html.
 * '@contacts' - unnamed view in 'contacts' state's template
 * '@' - unnamed view in index.html
 * 
 *              // views
                // params
                // resolve
                // controller
                // controllerAs
                // parent
                // data
                // onEnter
                // onExit
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .run(run);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    run.$inject = ['$rootScope', '$http', '$location', '$localStorage', '$state', 'user'];

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('s', {
                abstract: true,
                // url: '/',
                views: {
                    'topNav@': { component: 'topnav' },
                    '@': { templateUrl: 'app/secretaria/index.html' }
                },
                data: {
                    css: ['/app/content/css/mdb.min.css', '/app/content/css/default.css']
                }
            })
            .state('s.secretaria', {
                url: '/secretaria',
                views: { '': { templateUrl: 'app/secretaria/index.html' } },
                data: { title: 'Secretaria' },
            })
            // CADASTRO
            .state('s.cadastro', {
                url: '/secretaria/cadastro',
                views: { '': { templateUrl: '/app/secretaria/cadastro/cadastro.html' } },
                data: { title: 'Cadastro' },
            })
            .state('s.cadastro.professor', {
                url: '/professor',
                views: { '': { component: 'formprof' } },
                data: { title: 'Cadastro | Professor' },
            })
            .state('s.cadastro.aluno', {
                url: '/aluno',
                views: { '': { component: 'formaluno' } },
                data: { title: 'Cadastro | Aluno' },
            })
            .state('s.cadastro.turma', {
                url: '/turma',
                views: { '': { component: 'formturma' } },
                data: { title: 'Cadastro | Turma' },
            })
            .state('s.cadastro.consulta', {
                url: '/consulta',
                views: { '': { component: 'cadconsulta' } },
                data: { title: 'Cadastro | Consulta' },
            })
            //ALOCAR
            .state('s.alocar', {
                url: '/secretaria/alocar',
                views: { '': { templateUrl: '/app/secretaria/aloca/alocar.html' } },
                data: { title: 'Alocar' },
            })
            .state('s.alocar.professor', {
                url: '/professor',
                views: { '': { component: 'alocaprof' } },
                data: { title: 'Alocar | Professor' },
            })
            .state('s.alocar.aluno', {
                url: '/aluno',
                views: { '': { component: 'alocaaluno' } },
                data: { title: 'Alocar | Aluno' },
            })
            .state('s.alocar.matricula', {
                url: '/matricula',
                views: { '': { template: '<alocaaluno acao="$resolve.acao" />' } },
                data: { title: 'Matricula | Aluno' },
                resolve: { acao: function() { return 'matrícula' } }
            })
            .state('s.alocar.turma', {
                url: '/turma',
                views: { '': { component: 'alocaturma' } },
                data: { title: 'Alocar | Turma' },
            })
            //PROFESSOR
            .state('p', {
                abstract: true,
                // url: '/',
                views: {
                    'topNav@': { component: 'topnav' },
                    '@': { templateUrl: 'app/secretaria/index.html' }
                },
                data: {
                    css: ['/app/content/css/mdb.min.css', '/app/content/css/default.css']
                }
            })
            .state('p.professor', {
                url: '/professor',
                views: { '': { templateUrl: 'app/professor/index.html' } },
                data: { title: 'Professor' },
            })
            .state('p.gerencia', {
                url: '/professor/gerencia',
                views: { '': { templateUrl: '/app/professor/gerencia.html' } },
                data: { title: 'Professor | Gerência' },
            })
            .state('p.relatorios', {
                url: '/professor/relatorios',
                views: { '': { templateUrl: '/app/professor/relatorio.html' } },
                data: { title: 'Professor | Relatórios' },
            })
            .state('a', {
                abstract: true,
                // url: '/',
                views: {
                    'topNav@': { component: 'topnav' },
                    '@': { templateUrl: 'app/aluno/aluno.html' }
                },
                data: {
                    css: ['/app/content/css/mdb.min.css', '/app/content/css/default.css']
                }
            })
            .state('a.aluno', {
                url: '/aluno',
                views: { '': { templateUrl: '/app/aluno/aluno.html' } },
                data: { title: 'Aluno' },
            })
            .state('login', {
                url: '/login',
                component: 'login',
                data: {
                    css: ['/app/content/css/login.css'],
                    title: 'Login'
                }
            })
            .state('404', {
                url: '/404',
                template: '<h1 class="text-center" style="margin-top: 60px">Página não encontrada!</h1>',
            });

        $locationProvider.html5Mode(true);
    }

    function run($rootScope, $http, $location, $localStorage, $state, user) {
        $rootScope.$on('$locationChangeStart',
            function(event, next, current) {
                // console.log(next.data);
                // console.log($state);
                // if (next.authorize) {
                if (!user.isLoggedIn()) {
                    $rootScope.$evalAsync(function() {
                        $location.path('/login');
                    })
                }
                // }
            }
        );
    }
}())