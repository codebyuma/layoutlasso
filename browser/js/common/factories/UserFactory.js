app.factory('UserFactory', function($rootScope, $http){
    var UserFactory = {};

    UserFactory.createUser = function(_name, _userId){
        return $http.post('/api/user', {name: _name, user: _userId})
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    UserFactory.getUsers = function (){
        return $http.put('/api/user/')
        .then(function(users){
            return users.data
        }, function(err){
            return err;
        })
    }

    UserFactory.saveUser = function(id, updatedPage){
        return $http.put('/api/user/' + id, updatedPage)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    UserFactory.getUser = function(id){
        return $http.get('/api/user/' + id)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    UserFactory.deleteUser = function(id){
        return $http.delete('/api/user/' + id)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    return UserFactory;
});