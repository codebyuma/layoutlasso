app.factory('ProjectFactory', function($http){
    var ProjectFactory = {};

    // remove user id? when do we add it to the user's project list then?
    ProjectFactory.createProject = function(_name){
        return $http.post('/api/projects/', {name: _name})
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.saveProject = function(updatedProject){
        return $http.put('/api/projects/' + updatedProject._id, updatedProject)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.getProject = function(id){
        return $http.get('/api/projects/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    ProjectFactory.deleteProject = function(id){
        return $http.delete('/api/projects/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err;
        })
    }

    return ProjectFactory;
});