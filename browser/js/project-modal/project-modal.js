app.controller('ProjectModalCtrl', function($scope, $rootScope, createProjBool, UserFactory, ProjectFactory, user, $uibModalInstance) {

    $scope.user = user;
    $scope.projects = user.projects;
    $scope.hasProjects = $scope.projects.length;
    $scope.createProj = createProjBool; // flag for determining if this is a 'new' or 'load' request
    $scope.inSave = false; // flag for determining if this was called by hitting the save button. 


    if ($scope.createProj === undefined) {
        $scope.inSave = true; // Modal will show both load and create options as we're in the 'save' flow
    }


    $scope.cancel = function() {
        //console.log("cancel!");
        $uibModalInstance.dismiss('cancel')
    }

    $scope.createProject = function(project) {

        ProjectFactory.createProject(project.name)
            .then(function(theProject) {
                $scope.project = theProject;
                $scope.user.projects.push($scope.project);
                return UserFactory.saveUser($scope.user)
            })
            .then(function(updatedUser) {
                $scope.user = updatedUser;
                $rootScope.$broadcast('project loaded', {
                    proj: $scope.project,
                    user: $scope.user
                });
                $scope.inSave = false;
                $uibModalInstance.close()
            })


    }

    $scope.loadProject = function(project) {

        ProjectFactory.getProject(project._id)
            .then(function(theProject) {

                $scope.project = theProject;
                $rootScope.$broadcast('project loaded', {
                    proj: $scope.project,
                    user: $scope.user
                });
                $scope.inSave = false;
                $uibModalInstance.close()
            })

    }




})