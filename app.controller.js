(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['$state', '$rootScope'];

    function appCtrl($state, $rootScope) {
        // vm.getCss = function() {
        //     return $rootScope.getCss();
        // };
        var vm = this;
        vm.getCss = getCss;
        vm.getTitle = getTitle;

        activate();

        ////////////////

        function activate() {
            vm.state = $state;
        };

        function getCss() {
            if ($state.current.data)
                return $state.current.data.css;
            // return $state.current.data ? $state.current.data.css : [];
        };

        function getTitle() {
            if ($state.current.data)
                return $state.current.data.title;
            // return $state.current.data ? $state.current.data.title : [];
        };
    }
})();