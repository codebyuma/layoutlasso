app.controller('templateModalCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance, TemplateFactory, allTemplates){

	$scope.templates = allTemplates;

	$scope.getTemplate = function( template ){
		TemplateFactory.getTemplate( template._id )
		.then(function( templateToLoad ){
			$uibModalInstance.close(templateToLoad);
		})
	}

}])