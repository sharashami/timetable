(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngStorage',
            'angularModalService',
            'ngAnimate',
            'ngMessages',
            'toastr',
            'angular-loading-bar',
            'dndLists',
            'ngSanitize'
        ])
        .config(config)
        // .constant('API', 'http://escola.fidiasoftware.com.br/api/')
        .constant('API', 'http://osmira/api/')
        .filter('capitalize', function() {
            return function(input, scope) {
                if (input != null)
                    input = input.toLowerCase();
                return input.substring(0, 1).toUpperCase() + input.substring(1);
            }
        });

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        var serialize = function(obj, prefix) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p,
                        v = obj[p];
                    str.push(typeof v == "object" ?
                        serialize(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        };
        // send all requests payload as query string
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return serialize(data);
        };

        // set all post requests content type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        // $httpProvider.defaults.headers.options = {};
        $httpProvider.defaults.headers.common['Accept'] = 'application/json; odata=verbose';

        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
})();