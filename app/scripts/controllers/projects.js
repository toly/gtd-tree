/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .controller('ProjectsCtrl', function($scope, $rootScope, Projects){

        // projects operations

        $scope.new_project = {};

        $scope.add_project = function(){
            Projects.create($scope.new_project);
            $scope.new_project = {};
            $scope.new_project_show = false;
        };

        $scope.remove_project = function(project_id) {
            if ($rootScope.current_project && $rootScope.current_project.id == project_id) {
                $rootScope.current_project = {};
            }
            Projects.remove(project_id);
        };

        $scope.select_project = function(project_id) {
            $rootScope.current_project = Projects.get_project(project_id);
        };

        // tree operations

    });