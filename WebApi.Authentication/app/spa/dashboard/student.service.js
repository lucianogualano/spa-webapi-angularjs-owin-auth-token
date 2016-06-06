(function () {
    'use strict';

    angular
        .module('app')
        .factory('studentService', studentService);

    studentService.$inject = ['$http','authService'];

    function studentService($http, authService) {
        var service = {
            getStudents: getStudents
        };

        return service;

        /**
         * Get all students
         */
        function getStudents() {
            var token = authService.getToken();
            console.log(token);

            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            console.log("Trying to get students");
            return $http.get('/api/students', { headers });
        }
    }
})();