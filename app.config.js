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
                        component: 'mainC'
                    }
                },
                data: { css: ['app/content/css/main.css'] }
            })
            .state('root.home', {
                url: '/home',
                views: {
                    'main': { component: 'myCourses' }
                },
                title: "Home"
            })
            .state('root.allocation', {
                url: '/allocation',
                views: {
                    'main': { component: 'myAllocations' }
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