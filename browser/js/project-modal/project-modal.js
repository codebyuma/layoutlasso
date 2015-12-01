app.controller('ProjectModalCtrl', function ($scope, $rootScope, ProjectFactory, user, $uibModalInstance){

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
    // CONTINUE HEREEEE
    console.log("in create project:", project);
    ProjectFactory.createProject(project.name)
    .then (function (theProject){
      $scope.project = theProject;
      $rootScope.$broadcast('project created', theProject);
     $uibModalInstance.close()
    })



    

  }

  $scope.loadProject = function (project){

    // call create in project factory
    console.log("in load project:", project);

    // don't need to call ProjectFactory.getProject as we resolved the projects on the user already
    // ProjectFactory.getProject(project.id)
    // .then (function (theProject){
        $scope.project = project;
        $rootScope.$broadcast('project loaded', project);
        $uibModalInstance.close()
   // })

    

  }




})

