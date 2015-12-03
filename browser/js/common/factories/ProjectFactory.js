app.factory('ProjectFactory', function($http){

    var ProjectFactory = {};

    ProjectFactory.createProject = function(_name){
        return $http.post('/api/projects/', {name: _name})
        .then(function(project){
            return project.data
        })
    }

    ProjectFactory.saveProject = function(updatedProject){
        return $http.put('/api/projects/' + updatedProject._id, updatedProject)
        .then(function(project){
            return project.data
        })
    }

    ProjectFactory.getProject = function(id){
        return $http.get('/api/projects/' + id)
        .then(function(project){
            return project.data
        })
    }

    ProjectFactory.deleteProject = function(id){
        return $http.delete('/api/projects/' + id)
        .then(function(project){
            return project.data
        })
    }

    return ProjectFactory;
});