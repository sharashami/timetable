(function() {
    'use strict';

    angular
        .module('app')
        .service('user', user);

    user.$inject = ['$localStorage', '$sessionStorage', '$injector', 'API', '$state'];

    function user($localStorage, $sessionStorage, $injector, API, $state) {

        var vm = this,
            user = $localStorage.currentUser || $sessionStorage.currentUser || null;

        // getSelf= getSelf;
        vm.isLoggedIn = isLoggedIn;
        vm.loggedIn = loggedIn;
        vm.logout = logout;
        vm.setName = setName;
        vm.getName = getName;
        vm.setEmail = setEmail;
        vm.getEmail = getEmail;
        vm.setProfile = setProfile;
        vm.getProfile = getProfile;
        vm.setToken = setToken;
        vm.getToken = getToken;
        vm.getPhoto = getPhoto;
        vm.setPhoto = setPhoto;
        vm.setId = setId;
        vm.getId = getId;

        ////////////////

        function getId() { return user.id }

        function setId(id) { user.id = id }

        function getName() { return user.name }

        function setName(name) { user.name = name }

        function getEmail() { return user.email }

        function setEmail(email) { user.email = email }

        function getProfile() { return user.profile }

        function setProfile(profile) { user.profile = profile }

        function getToken() { return user.token }

        function setToken(token) { user.token = token }

        function getPhoto() { return user.photo }

        function setPhoto(photo) { user.photo = photo }

        function isLoggedIn() { return !!user }

        function loggedIn(remember) {
            user = remember ? ($localStorage.currentUser = {}) : ($sessionStorage.currentUser = {});
        }

        function logout() {
            $localStorage.currentUser ? $localStorage.$reset() : $sessionStorage.$reset();
            user = null;
            $state.go('access.login');
        }
    }
})();