'use strict';

angular.module('gtdTreeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($rootScope, Projects) {

        // load projects form local storage
        $rootScope.projects = Projects.projects;

    });
