app.controller('templateModalCtrl', function ($scope, $uibModalInstance, TemplateFactory){

	

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