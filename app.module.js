(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr',
            'ngAnimate',
            'ngStorage'
        ])
        .constant("API", "http://timetable/api");
})();