/**
 * Created by toly on 15.04.14.
 */

angular.module('gtdTreeApp')
    .controller('TreeCtrl', function($scope, $rootScope, Trees){


        $scope.nodes = [];

        $scope.get_new_id = function(){
            var max_id = 0;
            for (var i = 0; i < $scope.nodes.length; i++){
                if ($scope.nodes[i].id > max_id) {
                    max_id = $scope.nodes[i].id;
                }
            }
            return max_id + 1;
        };

        $scope.get_childs = function(parent_id){
           return $scope.nodes.filter(function(item){
               return item.parent === parent_id;
           });
        };

        $scope.add_child = function(parent_id){
            var new_id = $scope.get_new_id();
            $scope.nodes.push({
                id: new_id,
                parent: parent_id,
                name: 'node ' + new_id
            });
        };

        $rootScope.$watch('current_project', function(){
            $scope.nodes = Trees.get_project_tree($rootScope.current_project.id);
        });

        $scope.save_project = function(){
            Trees.save_project_tree($rootScope.current_project.id, $scope.nodes);
        }

    });