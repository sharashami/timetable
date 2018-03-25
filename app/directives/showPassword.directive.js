(function() {
    'use strict';

    angular
        .module('app')
        .directive('showPassword', showPassword);

    showPassword.$inject = ['$timeout'];

    function showPassword($timeout) {

        var directive = {
                link: link,
                restrict: 'A',
                scope: {}
            },
            input;

        return directive;

        function link(scope, element, attrs) {
            input = element.find("input:first");

            scope.$watch(function() {
                    return element.find("label input").prop('checked');
                },
                function(value) {
                    input.attr("type", value == false ? "password" : "text");
                });

        }
    }
})();