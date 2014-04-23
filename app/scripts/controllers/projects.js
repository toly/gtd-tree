/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .controller('ProjectsCtrl', function($scope, $rootScope, Projects, Trees){

        // projects operations

        $scope.new_project = {};

        $scope.add_project = function(){
            Projects.create($scope.new_project);
            $scope.new_project = {};
            $scope.new_project_show = false;
        };

        $scope.remove_project = function(project_id) {

            var project = Projects.get_project(project_id);
            var confirm_delete = confirm('Are you sure you want to delete a project "' + project.title +'"?');

            if (!confirm_delete) return;

            if ($rootScope.current_project && $rootScope.current_project.id == project_id) {
                $rootScope.current_project = {};
            }
            Projects.remove(project_id);
            Trees.remove_project_tree(project_id);
        };

        $scope.select_project = function(project_id) {

            for (var i = 0; i < Projects.projects.length; i++) {
                if (Projects.projects[i].edit) {
                    return;
                }
            }

            $rootScope.current_project = Projects.get_project(project_id);
        };

        $scope.input_keypress = function(event, project) {
            if (event.keyCode == 13) {
                project.edit = false;
                Projects.update_project_title(project.id, project.title);
            }

        };

        // tree operations

    });