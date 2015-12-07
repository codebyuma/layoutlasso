app.controller('templateModalCtrl', function ($scope, $uibModalInstance, TemplateFactory){

	
	 // moving this back in from the resolve as it was breaking on heroku
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