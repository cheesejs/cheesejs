define(["../app"], function(app) {
	app.directive("panel", [function() {
		return {
			restrict: "EA",
			replace: true,
			transclude: true,
			templateUrl: "directive/panel",
			scope: {
				panelItems: "="
			},
			link: function(scope, element, attrs) {
				console.log();
				if (angular.isArray(scope.panelItems)) {
					scope.currentItem = scope.panelItems[0];
					for (var i = 0; i < scope.panelItems.length; i++) {
						if (scope.panelItems[i].selected) {
							scope.currentItem = scope.panelItems[i];
						}
					}
				}
			}
		};
	}]);
});