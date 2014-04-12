/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .controller('ProjectsCtrl', function($scope, $rootScope, Projects){

        $scope.add_project = function(){

            Projects.create($scope.new_project_title);

            $scope.new_project_title = '';
            $scope.new_project_show = false;
        }

    });