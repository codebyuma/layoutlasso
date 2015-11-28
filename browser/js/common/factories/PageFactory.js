app.factory('PageFactory', function($rootScope, $http){
    var PageFactory = {};

    PageFactory.createPage = function(_name, _userId){
        return $http.post('/api/page', {name: _name, user: _userId})
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.getPages = function (){
        return $http.put('/api/page/')
        .then(function(pages){
            return pages.data
        }, function(err){
            return err;
        })
    }

    PageFactory.savePage = function(id, updatedPage){
        return $http.put('/api/page/' + id, updatedPage)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.getPage = function(id){
        return $http.get('/api/page/' + id)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    PageFactory.deletePage = function(id){
        return $http.delete('/api/page/' + id)
        .then(function(page){
            return page.data
        }, function(err){
            return err;
        })
    }

    return PageFactory;
});