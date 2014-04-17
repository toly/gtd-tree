/**
 * Created by toly on 17.04.14.
 */

angular.module('gtdTreeApp')
    .directive('customAutofocus', function() {
        return{
            restrict: 'A',

            link: function(scope, element, attrs){
                scope.$watch(function(){
                    return scope.$eval(attrs.customAutofocus);
                },function (newValue){
                    if (newValue == true){
                        element[0].focus();
                    }
                });
            }
        };
    });
