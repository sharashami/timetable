(function() {
    'use strict';

    angular
        .module('app')
        .directive('ngIndeterminate', ngIndeterminate);

    ngIndeterminate.$inject = [];

    function ngIndeterminate() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                ngIndeterminate: '<'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('ngIndeterminate', function(value) { element[0].indeterminate = !!value });
        }
    }
})();