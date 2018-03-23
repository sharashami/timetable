(function() {
    'use strict';

    angular
        .module('app')
        .run(run)

    run.$inject = ['$transitions', '$rootScope']

    function run($transitions, $rootScope) {

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

        $transitions.onSuccess({}, function(transition) {

        });
    }
})();