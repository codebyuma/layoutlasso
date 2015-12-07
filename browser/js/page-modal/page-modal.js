app.controller('PageModalCtrl', function($scope, ProjectFactory, PageFactory, $uibModalInstance) {

    // moving this back in from the resolve as it was breaking on heroku
    ProjectFactory.getProject(ModalFactory.getProject()._id)
    .then (function (project){
       $scope.project = project;
       $scope.pages = project.pages;
       $scope.hasPages = $scope.pages.length;
 
    })
    
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.createPage = function(page) {
        PageFactory.createPage(page)
            .then(function(thePage) {
                $scope.page = thePage;
                $scope.project.pages.push($scope.page);
                return ProjectFactory.saveProject($scope.project)
            })
            .then(function(updatedProject) {
                $scope.project = updatedProject;
                $uibModalInstance.close({
                    project: $scope.project,
                    page: $scope.page
                })
            })
    }

    $scope.loadPage = function(page) {
        PageFactory.getPage(page._id)
            .then(function(thePage) {
                $scope.page = thePage;
                $uibModalInstance.close({
                    project: $scope.project,
                    page: $scope.page
                })
            })

    }




})