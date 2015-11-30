app.factory('ProjectFactory', function($http){
    var ProjectFactory = {};


    ProjectFactory.createProject = function(_name, _userId){
        return $http.post('/api/projects/', {name: _name, user: _userId})
        .then(function(project){
            return project.data
        }, function(err){
            return err; // @OB/ND beware!
        })
    }

    ProjectFactory.saveProject = function(updatedProject){
        return $http.put('/api/projects/' + updatedProject._id, updatedProject)
        .then(function(project){
            return project.data
        }, function(err){
            return err; // @OB/ND beware!
        })
    }

    ProjectFactory.getProject = function(id){
        return $http.get('/api/projects/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err; // @OB/ND beware!
        })
    }

    ProjectFactory.deleteProject = function(id){
        return $http.delete('/api/projects/' + id)
        .then(function(project){
            return project.data
        }, function(err){
            return err; // @OB/ND beware!
        })
    }

    return ProjectFactory;
});