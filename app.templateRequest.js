(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$provide'];

    function config($provide) {
        $provide
            .decorator('$templateRequest', ['$delegate', function($delegate) {

                var fn = $delegate;

                $delegate = function(tpl) {
                    for (var key in fn) {
                        $delegate[key] = fn[key]
                    }
                    return fn.apply(this, [tpl, true]);
                };
                return $delegate;
            }]);
    };
}());