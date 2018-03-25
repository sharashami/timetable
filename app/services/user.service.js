(function() {
    'use strict';

    angular
        .module('app')
        .factory('user', user);

    user.$inject = ['$localStorage', '$sessionStorage', '$injector', 'API', '$state'];

    function user($localStorage, $sessionStorage, $injector, API, $state) {

        var user = $localStorage.currentUser || $sessionStorage.currentUser;

        if (!user)
            user = { logged: false }

        var service = {
            reload: reload,
            // getSelf: getSelf,
            isLoggedIn: isLoggedIn,
            loggedIn: loggedIn,
            logout: logout,
            setName: setName,
            getName: getName,
            setEmail: setEmail,
            getEmail: getEmail,
            setProfile: setProfile,
            getProfile: getProfile,
            setToken: setToken,
            getToken: getToken,
            getPhoto: getPhoto,
            setPhoto: setPhoto,
            setType: setType,
            setId: setId,
            getId: getId
        };

        return service;

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

        function isLoggedIn() { return user.logged }

        function loggedIn() { user.logged = true }

        function setType(type) {
            //session
            if (type == "local")
                user = $localStorage.currentUser || ($localStorage.currentUser = { logged: false });
            else
                user = $sessionStorage.currentUser || ($sessionStorage.currentUser = { logged: false });
        }

        function logout() {
            if ($localStorage.currentUser)
                $localStorage.$reset();
            //delete $localStorage.currentUser
            else
                $sessionStorage.$reset();
            // delete $sessionStorage.currentUser;
            $state.go('access.login');
        }

        function reload() {
            return $injector.get('$http').get(API + "/users/me")
                .then(resp => {
                    setId(resp.data.id);
                    setName(resp.data.name);
                    setEmail(resp.data.email);
                    setToken(resp.data.token);
                    setProfile(resp.data.profile);
                    setPhoto(resp.data.photo);
                })
        }
    }
})();