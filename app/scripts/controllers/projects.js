/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .controller('ProjectsCtrl', function($scope, $rootScope){

        $scope.add_project = function(){

            $rootScope.projects.push({
                title: $scope.new_project_title
            });

            $scope.new_project_title = '';
            $scope.new_project_show = false;
        }

    });