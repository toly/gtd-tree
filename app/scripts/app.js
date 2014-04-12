'use strict';

angular.module('gtdTreeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
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
    }).run(function ($rootScope) {

        $rootScope.projects = [{
            id: 1,
            title: 'title project',
            description: 'desc'
        }];

    });
