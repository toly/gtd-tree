/**
 * Created by toly on 15.04.14.
 */

angular.module('gtdTreeApp')
    .controller('TreeCtrl', function($scope, $rootScope, Trees){

        $scope.delete = function(data) {
            data.nodes = [];
        };
        $scope.add = function(data) {
            var post = data.nodes.length + 1;
            var newName = data.name + '-' + post;
            data.nodes.push({name: newName,nodes: []});
        };

        $scope.tree = [{name: "Node", nodes: [], root: true}];

        $rootScope.$watch('current_project', function(){
            $scope.tree = Trees.get_project_tree($rootScope.current_project.id);
        });

        $scope.save_project = function(){
            Trees.save_project_tree($rootScope.current_project.id, $scope.tree);
        }

    });