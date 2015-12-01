app.controller('ProjectModalCtrl', function ($scope, $rootScope, user, $uibModalInstance){

  $scope.user = user;
  $scope.projects = user.projects;
  console.log("in project modal, user is", $scope.user) // projects are just ids right now. need to populate?
  console.log("in project modal, user's projects are", $scope.projects);
  //$scope.projects = $scope.user.
  // $scope.ok = function(){
  //   console.log("OK!");
  //   $uibModalInstance.close()
  // }

  $scope.cancel = function(){
  	//console.log("cancel!");
    $uibModalInstance.dismiss('cancel')
  }

  $scope.createProject = function (project){

    // call create in project factory
    console.log("in create project:", project);
    $rootScope.$broadcast('project created', project);
    $uibModalInstance.close()

  }

    $scope.loadProject = function (project){

    // call create in project factory
    console.log("in load project:", project);
    $rootScope.$broadcast('project loaded', project);
    $uibModalInstance.close()

  }




})

