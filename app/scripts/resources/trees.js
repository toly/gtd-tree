/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .factory('Trees', function($rootScope, localStorageService){

        var trees_key = 'trees';

        function get_project_tree(project_id) {

            console.log(project_id, typeof project_id);

            return this.trees[project_id] || [{name: "Node", nodes: [], root: true}];
        }

        function save_project_tree(project_id, tree_data){
            this.trees[project_id] = tree_data;

            console.log(this.trees);

            localStorageService.add(trees_key, this.trees);
        }

        return {
            trees: localStorageService.get(trees_key) || {},
            get_project_tree: get_project_tree,
            save_project_tree: save_project_tree
        }

    });