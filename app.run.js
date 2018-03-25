(function() {
    'use strict';

    angular
        .module('app')
        .run(run)
        .constant("API", "http://timetable/api");

    run.$inject = ['$transitions', '$rootScope', 'user']

    function run($transitions, $rootScope, user) {

        $transitions.onBefore({}, function(transition) {
            $rootScope.title = transition.to().title;

            if (!transition.to().css) {
                $rootScope.css = transition.treeChanges().to
                    .filter(element => element.state.data)
                    .reduce((a, b) => a.state.data.css.concat(b.state.data.css)) || [];
                $rootScope.css = [...new Set($rootScope.css)];
            } else {
                $rootScope.css = transition.to().css;
            }
        });

        $transitions.onBefore({ to: 'access.login' }, function(transition) {
            console.log(user.isLoggedIn());
            if (user.isLoggedIn())
                return transition.router.stateService.target('root.home');
        });

        $transitions.onSuccess({}, function(transition) {

        });
    }
})();