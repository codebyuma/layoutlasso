app.controller('ProjectModalCtrl', function ($scope, $rootScope, UserFactory, ProjectFactory, user, $uibModalInstance){

  $scope.user = user;
  $scope.projects = user.projects;
  console.log("in project modal, user is", $scope.user) // projects are just ids right now. need to populate?
  console.log("in project modal, user's projects are", $scope.projects);


  $scope.cancel = function(){
  	//console.log("cancel!");
    $uibModalInstance.dismiss('cancel')
  }

  $scope.createProject = function (project){

    // call create in project factory
    // CONTINUE HEREEEE. Also update ProjectFactory (See comment)
    console.log("in create project:", project);
    ProjectFactory.createProject(project.name)
    .then (function (theProject){
      $scope.project = theProject;
      $scope.user.projects.push($scope.project);
      return UserFactory.saveUser($scope.user)
    })
    .then (function (updatedUser){
      $scope.user = updatedUser;
      console.log("in createProject - the project was created", $scope.project)
      console.log("in createProject - updated user", $scope.user)
      $rootScope.$broadcast('project loaded', {proj: $scope.project, user: $scope.user});
      $uibModalInstance.close()
    })



    

  }

  $scope.loadProject = function (project){

    // call create in project factory
    console.log("in load project:", project);

    ProjectFactory.getProject(project._id)
    .then (function (theProject){
      
       $scope.project = theProject;
       $rootScope.$broadcast('project loaded', {proj: $scope.project, user: $scope.user});
       $uibModalInstance.close()
    })

  }




})

