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
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $httpProvider.interceptors.push("HttpInterceptor");

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('root', {
                abstract: true,
                views: {
                    '@': {
                        component: 'main'
                    }
                },
                data: { css: ['app/content/css/main.css'] }
            })
            .state('root.home', {
                url: '/home',
                views: {
                    'main': {
                        template: '<h1>asdfsdfsadf</h1>'
                    }
                },
                title: "Home"
            })
            .state('root.404', {
                url: '/404',
                views: {
                    'main': {
                        template: '<h1 class="text-center">Página não encontrada!</h1>'
                    }
                }
            })
            // ACESS
            .state('access', {
                abstract: true,
                data: { css: ['app/content/css/login.css'] }
            })
            .state('access.login', {
                url: '/login',
                views: { '@': { component: 'login' } },
                title: "Login",
            })
            .state('access.recovery', {
                url: '/recovery',
                views: { '@': { component: 'recovery' } },
                title: "Recovery",
            })
            .state('access.reset', {
                url: '/reset',
                views: { '@': { component: 'reset' } },
                title: "Reset",
            })
            .state('access.register', {
                url: '/register',
                views: { '@': { component: 'register' } },
                title: "Register",
            });

        $locationProvider.html5Mode(true);
    }
})();