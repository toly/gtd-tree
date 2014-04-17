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
                name: '',
                edit: true
            });
        };

        $scope.delete_childs = function(delete_node_id){
            var ids_for_delete = [],
                ids_scope = [delete_node_id],
                node_id;

            while (ids_scope.length > 0) {
                node_id = ids_scope.shift();
                var childs = $scope.get_childs(node_id);
                for (var node_num in childs){
                    var current_node_id = childs[node_num].id;
                    ids_scope.push(current_node_id);
                    ids_for_delete.push(current_node_id);
                }
            }

            $scope.nodes = $scope.nodes.filter(function(node){
                return ids_for_delete.indexOf(node.id) == -1;
            });

            $scope.save_project();
        };

        $rootScope.$watch('current_project', function(){
            $scope.nodes = Trees.get_project_tree($rootScope.current_project.id);
        });

        $scope.save_project = function(){
            Trees.save_project_tree($rootScope.current_project.id, $scope.nodes);
        }

    });