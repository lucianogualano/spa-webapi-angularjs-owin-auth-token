(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];
    run.$inject = ['$rootScope', '$location', 'authService'];

    var app = angular.module('app', ['ngRoute', 'ngResource', 'LocalStorageModule']);
    app.config(config);
    app.run(run);

    /**
     * Application run entry point, listen for main events
     */
    function run($rootScope, $location, authService) {
        //$rootScope.$on("$routeChangeStart", function (evt, to, from) {
        //    if (to.authorize === true) {
        //        if (!authService.authentication.isAuthenticated) {
        //            $location.path("/");
        //        }
        //    }
        //});

        //$rootScope.$on("$routeChangeError", function (evt, to, from, error) {
        //    if (error instanceof AuthorizationError) {
        //        $location.path("/login").search("returnTo", to.originalPath);
        //    }
        //});

        //$(document).ready(function () {
        //    $('[data-toggle=offcanvas]').click(function () {
        //        $('.row-offcanvas').toggleClass('active');
        //    });
        //});
    }

    /**
     * Application configuration entry point to configure routing.
     */
    function config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/spa/home/home.html'
        })
        .when('/register', {
            templateUrl: '/spa/authentication/register.html',
            controller: 'AuthenticaitonCtrl',
            controllerAs: 'authCtrl'
        })
        .when('/login', {
            templateUrl: '/spa/authentication/login.html',
            controller: 'AuthenticaitonCtrl',
            controllerAs: 'authCtrl'
        })
        .when('/dashboard', {
            templateUrl: '/spa/dashboard/dashboard.html',
            controller: 'AuthenticaitonCtrl',
            controllerAs: 'authCtrl'
        })
        .otherwise({
            redirectTo: "/"
        });
        //GoogleMapApi.configure({
        //    //    key: 'your api key',
        //    v: '3.17',
        //    libraries: 'places'
        //});

        $locationProvider.html5Mode(true);

        $logProvider.debugEnabled(true);

      
    }
})();