app.controller('PageModalCtrl', function ($scope, $rootScope, project, ProjectFactory, PageFactory, $uibModalInstance){

  $scope.project = project;
  $scope.pages = project.pages;

  console.log("in page modal ctrl", project);
  $scope.cancel = function(){
  	//console.log("cancel!");
    $uibModalInstance.dismiss('cancel')
  }

  $scope.createPage = function (page){
    console.log("in create page");
    PageFactory.createPage(page)
    .then (function (thePage){
      $scope.page = thePage;
      $scope.project.pages.push($scope.page);
      return ProjectFactory.saveProject($scope.project)
    })
    .then (function (updatedProject){
      $scope.project = updatedProject;
      console.log("in createPage - the page was created", $scope.page)
      console.log("in createPage - updated project", $scope.project)
      $rootScope.$broadcast('page loaded', {proj: $scope.project, page: $scope.page});
      $uibModalInstance.close()
    })


  }

  $scope.loadPage = function (page){

    PageFactory.getPage(page._id)
    .then (function (thePage){
       $scope.page = thePage;
       $rootScope.$broadcast('page loaded', {proj: $scope.project, page: $scope.page});
       $uibModalInstance.close()
    })

  }




})

