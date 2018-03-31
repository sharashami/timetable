(function() {
    'use strict';

    angular
        .module('app')
        .directive('resizeCourses', resizeCourses);

    resizeCourses.$inject = ['$window'];

    function resizeCourses($window) {

        var directive = {
                link: link,
                restrict: 'A',
                scope: {}
            },
            w = angular.element($window),
            top = 0,
            footer = 60,
            nav = 66;

        return directive;

        function link(scope, element, attrs) {
            if (w.width() > 768) {
                resize(element.find('ul')[0], element);
                w.bind('resize', function() {
                    resize(element.find('ul')[0], element);
                });
            }
        }

        function resize(ref, element) {
            top = ref.offsetTop;
            while ((ref = ref.offsetParent) != null)
                top += ref.offsetTop;
            element.find('ul').css({
                'max-height': '' + w.height() - (top + nav + footer) + 'px',
                'overflow-y': 'auto'
            });
        }
    }
})();