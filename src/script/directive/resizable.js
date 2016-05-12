define(["../app"], function(app) {
    app.directive("resizable", [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.resizable();
            }
        };
    }]);
});
