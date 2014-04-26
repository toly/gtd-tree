/**
 * Created by toly on 15.04.14.
 */

angular.module('gtdTreeApp')
    .controller('TreeCtrl', function($scope, $rootScope, Trees){

        $scope.nodes = [];
        $scope.focus_id = null;
        $scope.indexes = {};
        $scope.cut_node_id = null;
        $scope.show_done_tasks = true;

        $scope.set_all_expand = function(bool_expand) {
            for (var i = 0; i < $scope.nodes.length; i++) {
                if ($scope.nodes[i].id == null) continue;
                $scope.nodes[i].hide_childs = bool_expand;
            }
        };

        $scope.remove_done_tasks = function() {
            $scope.nodes = $scope.nodes.filter(function(node){
                return node.done != true;
            });
            $scope.save_project();
        };

        $scope.set_cut_node_id = function(node_id) {
            if ($scope.cut_node_id == node_id) {
                $scope.cut_node_id = null;
            } else {
                $scope.cut_node_id = node_id;
            }
        };

        $scope.set_parent_node = function(parent_node_id) {
            for (var i = 0; i < $scope.nodes.length; i++) {
                if ($scope.nodes[i].id == $scope.cut_node_id) {
                    $scope.nodes[i].parent = parent_node_id;
                    $scope.cut_node_id = null;
                    $scope.save_project();
                    return;
                }
            }
        };

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

            $scope.focus_id = new_id;
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

        $scope.delete_node = function(delete_node_id){
            $scope.delete_childs(delete_node_id);
            $scope.nodes = $scope.nodes.filter(function(node){
                return node.id != delete_node_id;
            });
            $scope.save_project();
        };

        $scope.done_nodes = function(){
            return $scope.nodes.filter(function(node){
                return node.done;
            });
        };

        $scope.get_progress = function(){
            return {
                total: $scope.nodes.length,
                done: $scope.done_nodes().length
            };
        };

        $scope.key_press_node_input = function(event, node){
           if (event.keyCode == 13){
               node.edit = false;
               $scope.focus_id = null;
               $scope.save_project();
           }
        };

        $rootScope.$watch('current_project', function(){
            $scope.nodes = Trees.get_project_tree($rootScope.current_project.id);
        });

        $scope.save_project = function(){
            Trees.save_project_tree($rootScope.current_project.id, $scope.nodes);
        };

        $scope.node_input_unfocus = function(node) {
            node.edit = false;
            $scope.focus_id = null;
            $scope.save_project();
        };

        function build_indexes(){
            $scope.indexes = {};

            function tree_walk(parent, nesting, indexes){
                var childs = $scope.get_childs(parent);

                for (var node_id in childs){
                    var node = childs[node_id];
                    var new_indexes = indexes.slice(0);
                    new_indexes.push(parseInt(node_id) + 1);

                    var index_str = new_indexes.join('.');
                    if (index_str.length == 1) {
                        index_str += '.';
                    }

                    $scope.indexes[node.id] = index_str;

                    tree_walk(node.id, nesting + 1, new_indexes);
                }
            }

            tree_walk(null, 0, []);
        }

        $scope.make_pdf = function(){

            $scope.is_pdf_rendering = true;

            build_indexes()

            var doc = new jsPDF('p','pt','a4');

            for (var i=0; i < $scope.nodes.length; i++){
                if ($scope.nodes[i].hover) {
                    $scope.nodes[i].hover = false;
                }
            }

            doc.addHTML(document.getElementById('project'), 10, 10, function(){
                doc.output('dataurlnewwindow', {});
                $scope.is_pdf_rendering = false;
            });
        };

    });