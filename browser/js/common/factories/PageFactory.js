app.factory('PageFactory', function($rootScope, $http){
    var PageFactory = {};

    PageFactory.createPage = function(_name, _userId){
        return $http.post('/api/pages', {name: _name, user: _userId})
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.getPages = function (){
        return $http.put('/api/pages/')
        .then(function(pages){
            return pages.data
        }, function(err){
            return err;
        })
    }

    PageFactory.savePage = function(id, updatedPage){
        return $http.put('/api/pages/' + id, updatedPage)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.getPage = function(id){
        return $http.get('/api/pages/' + id)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.deletePage = function(id){
        return $http.delete('/api/pages/' + id)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    return PageFactory;
});