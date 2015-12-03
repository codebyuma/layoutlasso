app.factory("TemplateFactory", function ( $http, GridFactory ){

	var TempateFactory = {};


	TemplateFactory.getAll = function(){
		return $http.get('/api/templates')
		.then(function( templates ){
console.log("=-=-=-=-=-= templates sending -- name of first in group: ", templates.data[0].name)
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