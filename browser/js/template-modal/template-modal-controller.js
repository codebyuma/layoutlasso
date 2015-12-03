app.controller('templateModalCtrl', function($scope, TemplateFactory, allTemplates){

	$scope.templates = allTemplates;

	$scope.getTemplate = TemplateFactory.getTemplate;

})