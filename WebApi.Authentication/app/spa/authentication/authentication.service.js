(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$log', 'localStorageService'];

    // Use web api to communicate with server login authenitcaion
    function authService($http, $log, localStorageService) {

        var serviceBase = '/api/account/';

        var authService = {
            isUserAuthenticated,
            register: register,
            registrationFailed: registrationFailed,
            login: login,
            logout: logout,
            getToken: getToken
        };

        return authService;

        /**
         * @description
         */
        function register(email, password) {
            $log.debug("Register user name " + email);
            var data = {
                Email: email,
                Password: password
            };
            return $http.post(serviceBase + 'register', data)
                .then(function (response) {
                    storeUser(email, password);
                    $log.debug("Response status is " + response.status);
                    return response;
                },
            function (responseHeaders) {
                $log.debug("Failed sign up of user name " + email);
                logout();
                return responseHeaders;
            });
        };


        /**
          * @description
          */
        function registrationFailed(response) {
            $log.debug("Registration failed");
            //notificationService.displayError('Registration failed. Try again.');
        }

        /**
         * @description
         */
        // AuthenticationService in user with credentials
        function login(email, password) {
            $log.debug("Login with email" + email);
            var loginData = {
                grant_type: 'password',
                username: email,
                password: password
            };

            // use $.param jQuery function to serialize data from JSON 
            var dataSerialized = $.param(loginData);

            return $http({
                url : '/Token', 
                method : 'POST',
                data: dataSerialized,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then(function (response) {
                $log.debug("Response is " + response);
                storeUser(email, password, response.data.access_token);
                return response;
            },
            function (responseHeaders) {
                $log.debug("Failed login with email " + email + ". Response was " + responseHeaders);
                logout();
                return responseHeaders;
            });
        };

        /**
         * @description Logout
         */
        function logout() {
            clearCache();
        };

        /**
         * @description Check to see if the user is logged in
         */
        function isUserAuthenticated() {
            var authData = localStorageService.get('authorizationData');
            var authData1 = localStorageService.get('authorizationData1');
            return authData !== null;
        }

        /**
         * @description Get access token if it exists
         */
        function getToken() {
            var token = null;
            var authData = localStorageService.get('authorizationData');
            if(authData !== null)
            {
                token = authData.Token;
            }
            return token;
        }

        /**
         * @description Store login credentials into local storage
         */
        function storeUser(email, password, tokenKey) {

            localStorageService.set('authorizationData', { Email: email, Token: tokenKey });
        }

        /**
         * @description Remove login credentials from local storage
         */
        function clearCache() {
            localStorageService.remove('authorizationData');
        };
    };
})();