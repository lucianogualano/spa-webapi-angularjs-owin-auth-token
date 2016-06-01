(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthenticaitonCtrl', AuthenticaitonCtrl);


    AuthenticaitonCtrl.$inject = ['$location','$log', '$scope', 'authService'];

    function AuthenticaitonCtrl($location, $log, $scope, authService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'registerController';
        $log.debug("Just started register controller!");

        vm.email = null;
        vm.password = null;
        vm.errorMessage = null;

        vm.hasAuthenticationError = false;

        function registerCommand(email, password) {
            // Set default GUID for ID to empty
           // var id = "00000000-0000-0000-0000-000000000000";

            authService.register(email, password).then(function (status) {
                $log.debug("Signed up user " + vm.email + " status is " + status.status);
                //$routeParams.redirect will have the route
                //they were trying to go to initially                
                vm.hasAuthenticationError = false;
                // Save the credentials

                // Redirect the path to the user dashboard
                $location.path('/login');

            }, function (error) {
                $log.error("Registration failed " + error.status);
                vm.hasAuthenticationError = true;
            });
        }
        /**
         * @desc Send login credentials
         */
        function loginCommand(email, password) {
            // Set default GUID for ID to empty
          //  var id = "00000000-0000-0000-0000-000000000000";

            authService.login(email, password).then(function (status) {
                $log.debug("Logged in user " + email + " status is " + status.status);
                vm.hasAuthenticationError = false;

                var isAuthenticated = authService.isUserAuthenticated();

                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (status.status != 200) {
                    //notificationService.displayError("Authenication failed.");
                    vm.hasAuthenticationError = true;
                    return;
                }

                //if (status && $routeParams && $routeParams.redirect) {
                //    path = path + $routeParams.redirect;
                //}
                $location.path('/dashboard');
            });
        }

        function logoutUser() {
            authService.logout();
            $location.path('/');

        }

        // Check if the user has been authenticated
        vm.isUserLoggedIn = function () {
            return authService.isUserAuthenticated();
        }

        // Send login registration details
        vm.signup = function () {
            registerCommand(vm.email, vm.password);
        }

        // Send login registration details
        vm.login = function () {
            loginCommand(vm.email, vm.password);
        }

        vm.logout = function () {
            logoutUser();
        }
    }
})();

