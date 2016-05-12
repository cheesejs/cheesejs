define(["../app"], function(app) {
    app.directive("draggable", ["$rootScope", function(rootScope) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var pushDraggableStack = function() {
                    rootScope.draggableStack = rootScope.draggableStack ? rootScope.draggableStack + 1 : 100;
                    element.css("z-index", rootScope.draggableStack);
                };
                element.draggable({
                    containment: element.parent(),
                    scroll: false,
                    snap:false,
                    handle: ".panel-handle",
                    start: function() {
                        pushDraggableStack();
                    }
                });
                element.on("click", function() {
                    pushDraggableStack();
                });
            }
        };
    }]);
});
