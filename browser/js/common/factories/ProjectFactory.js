app.factory('ProjectFactory', function($http, UserFactory){

    var ProjectFactory = {};

    ProjectFactory.createProject = function(_name, user){
        var objectToReturn = {};
        return $http.post('/api/projects/', {name: _name})
        .then(function(savedProject){
            objectToReturn.project = savedProject.data; 
            return UserFactory.updateUserProjects(user._id, savedProject.data._id)
        })
        .then(function(savedUser){
            objectToReturn.user = savedUser;
            return objectToReturn;
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