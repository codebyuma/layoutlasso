app.controller('ProjectModalCtrl', function($scope, createProjBool, UserFactory, ProjectFactory, user, $uibModalInstance) {

    $scope.user = user;

    if ($scope.user) {
        $scope.projects = user.projects;
        $scope.hasProjects = $scope.projects.length;
    } else {
        $scope.projects = null;
        $scope.hasProjects = false;
    }

    $scope.createProj = createProjBool; // flag for determining if this is a 'new' or 'load' request. If undefined, then we're in the 'save' flow
    $scope.inSave = false; // flag for determining if this was called by hitting the save button. 

    if ($scope.createProj === undefined) {
        $scope.inSave = true; // Modal will show both load and create options as we're in the 'save' flow
    }

    $scope.cancel = function() {
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
                $scope.inSave = false;
                $uibModalInstance.close({
                    project: $scope.project,
                    user: $scope.user
                })
            })


    }

    $scope.loadProject = function(project) {

        ProjectFactory.getProject(project._id)
            .then(function(theProject) {
                $scope.project = theProject;
                $scope.inSave = false;
                $uibModalInstance.close({
                    project: $scope.project,
                    user: $scope.user
                })
            })

    }

})