app.controller('templateModalCtrl', function($scope, $uibModalInstance, TemplateFactory, allTemplates, GridFactory){

	$scope.templates = allTemplates;

	$scope.getTemplate = function( template ){
		console.log( "template back from button", template.name, template._id )

		TemplateFactory.getTemplate( template._id )
		.then(function( templateToLoad ){
			$uibModalInstance.close(templateToLoad);
		})
	}

})