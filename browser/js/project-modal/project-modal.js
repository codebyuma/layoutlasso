app.controller('ProjectModalCtrl', function ($scope, $rootScope, $uibModalInstance){



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
    console.log("in create project");
    $rootScope.$broadcast('project created', project);
    $uibModalInstance.close()

  }



})

