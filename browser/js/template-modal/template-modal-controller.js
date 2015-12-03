app.controller('templateModalCtrl', function($scope, CreateLayoutCtrl, TemplateFactory, allTemplates){

	$scope.templates = allTemplates;

	$scope.getTemplate = TempleFactory.getTemplate;

})