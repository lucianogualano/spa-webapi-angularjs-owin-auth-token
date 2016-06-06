(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$location', 'studentService'];

    function DashboardCtrl($location, studentService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'dashboard';
        vm.students = null;

        activate();

        /**
         * Get the students on loading the controller.
         */

        function activate() {
            var promise = studentService.getStudents();

            promise.then(function (results) {
                vm.students = results.data;
            }, function (error) {

            });
        }
    }
})();
