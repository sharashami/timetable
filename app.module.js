(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr',
            'ngAnimate',
            'ngStorage',
            'dndLists'
        ])
        .constant("API", "http://timetable/api");
})();