app.factory('ProjectFactory', function($rootScope, $http){
    var ProjectFactory = {};

    ProjectFactory.createProject = function(_name, _userId){
        return $http.post('/api/project/', {name: _name, user: _userId})
        .then(function(project){
            console.log("project factory project", project);
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.saveProject = function(id, updatedProject){
        return $http.put('/api/project/' + id, updatedProject)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.getProject = function(id){
        return $http.get('/api/project/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.deleteProject = function(id){
        return $http.delete('/api/project/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    return ProjectFactory;
});