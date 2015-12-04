app.factory("TemplateFactory", function ( $http ){

	var TemplateFactory = {};

	TemplateFactory.getAll = function(){
		return $http.get('/api/templates/')
		.then(function( templates ){
			return templates.data
		})
	}

	TemplateFactory.getTemplate = function(id){
		return $http.get('/api/templates/' + id)
		.then(function( template ){
			return template.data;
		})
	}

	return TemplateFactory;

})