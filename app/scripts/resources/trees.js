/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .factory('Trees', function($rootScope, localStorageService){

        var trees_key = 'trees';

        function get_project_tree(project_id) {
            return this.trees[project_id] || [{name: "Node", nodes: [], root: true}];
        }

        function filter_significant_keys(nodes) {
            var significant_keys = [
                'id',
                'name',
                'done',
                'parent'
            ];

            var result_nodes = $.map(nodes, function(obj){
                return $.extend({}, obj);
            });

            for (var i = 0; i < result_nodes.length; i++) {
                for (var key in result_nodes[i]) {
                    if ( significant_keys.indexOf(key) < 0 ) {
                        delete result_nodes[i][key];
                    }
                }
            }

            return result_nodes;
        }

        function save_project_tree(project_id, tree_data){
            this.trees[project_id] = filter_significant_keys(tree_data);
            localStorageService.add(trees_key, this.trees);
        }

        function remove_project_tree(project_id){
            delete this.trees[project_id];
            localStorageService.add(trees_key, this.trees);
        }

        return {
            trees: localStorageService.get(trees_key) || {},
            get_project_tree: get_project_tree,
            save_project_tree: save_project_tree,
            remove_project_tree: remove_project_tree
        }

    });