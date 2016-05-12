define(['../app'],function(){angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put("directive/panel",
    "<div class=panel draggable resizable><div class=panel-title><div class=panel-handle></div><div class=panel-tab ng-repeat=\"content in panelItems track by $index\" ng-class=\"$parent.currentItem==content?'active':''\" ng-click=\"$parent.currentItem=content\"><span ng-bind=content.title></span></div></div><div class=panel-content-list><div class=panel-content ng-repeat=\"content in panelItems track by $index\" ng-include=content.url ng-show=\"$parent.currentItem==content\"></div></div></div>");
  $templateCache.put("page/blank",
    "<div class=panel-content-embed></div>");
  $templateCache.put("page/pageDesigner",
    "<div class=\"panel-content-embed panel-content-designer\"></div>");
}]);
});