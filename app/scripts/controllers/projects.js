/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .controller('ProjectsCtrl', function($scope, $rootScope, Projects){

        $scope.new_project = {};

        $scope.add_project = function(){

            Projects.create($scope.new_project);

            $scope.new_project = {};
            $scope.new_project_show = false;
        };

        $scope.remove_project = function(project_id) {
            Projects.remove(project_id);
        };

    });