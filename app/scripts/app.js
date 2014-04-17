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
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($rootScope, localStorageService, Projects) {

        // load projects form local storage
        $rootScope.projects = Projects.projects;
        $rootScope.current_project = {};
    });
