define(["../app"], function(app) {
	app.filter('trusthtml', ["$sce", function(sce) {
		return function(input) {
			return sce.trustAsHtml(input);
		};
	}]);
});