app.controller('templateModalCtrl', function ($scope, $uibModalInstance, TemplateFactory, allTemplates){

	

	TemplateFactory.getAll()
	.then (function (allTemplates){
		$scope.templates = allTemplates;
	})

	$scope.getTemplate = function( template ){
		TemplateFactory.getTemplate( template._id )
		.then(function( templateToLoad ){
			$uibModalInstance.close(templateToLoad);
		})
	}

})