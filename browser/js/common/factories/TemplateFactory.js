app.factory("TemplateFactory", function ( $http, GridFactory ){

	var TemplateFactory = {};


	TemplateFactory.getAll = function(){
		console.log('=-=-=-=-= hitting get all templates in factory')
		return $http.get('/api/templates/')
		.then(function( templates ){
			// templates.forEach(function (t){ console.log(t.data.name) })
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