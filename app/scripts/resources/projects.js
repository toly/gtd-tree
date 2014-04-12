/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .factory('Projects', function($rootScope, localStorageService){

        var projects_key = 'projects';

        function create_project(new_project) {
            new_project.id = this.get_last_project_id() + 1;
            this.projects.push(new_project);
            this.save();
        }

        function get_last_project_id() {
            var max_id = 0;
            for (var project_num in this.projects) {
                var project = this.projects[project_num];
                if (project.id > max_id) {
                    max_id = project.id;
                }
            }
            return max_id;
        }

        function save() {
            localStorageService.add(projects_key, this.projects);
            $rootScope[projects_key] = this.projects;
        }

        function remove_project(project_id) {
            this.projects = this.projects.filter(function(project){
                return project.id != project_id;
            });
            this.save();
        }

        function get_project(project_id) {
            for (var project_num in this.projects) {
                if (this.projects[project_num].id == project_id) {
                    return this.projects[project_num];
                }
            }
        }

        return {
            projects: localStorageService.get(projects_key) || [],
            get_last_project_id: get_last_project_id,
            create: create_project,
            remove: remove_project,
            save: save,
            get_project: get_project
        };

    });