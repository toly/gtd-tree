/**
 * Created by toly on 12.04.14.
 */

angular.module('gtdTreeApp')
    .factory('Projects', function($rootScope, localStorageService){

        console.log(localStorageService);

        var projects_key = 'projects';

        function create_project(project_title) {
            var new_project_id = this.get_last_project_id() + 1;
            this.projects.push({
                id: new_project_id,
                title: project_title
            });

            this.save();
        }

        function get_last_project_id() {
            var max_id = 0;
            for (var project in this.projects) {
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

        return {
            projects: localStorageService.get(projects_key) || [],
            get_last_project_id: get_last_project_id,
            create: create_project,
            save: save
        };

    });