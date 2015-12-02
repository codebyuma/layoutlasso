app.factory('PageFactory', function($rootScope, $http){
    var PageFactory = {};

    PageFactory.createPage = function(pageToSave){
        return $http.post('/api/pages', pageToSave)
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

    PageFactory.savePage = function(id, updatedPageGrid){
        return $http.put('/api/pages/' + id, updatedPageGrid)
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