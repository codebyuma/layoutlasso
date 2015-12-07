app.controller('ProjectModalCtrl', function($scope, createProjBool, UserFactory, ProjectFactory, ModalFactory, $uibModalInstance) {

     $scope.projects = null;
     $scope.hasProjects = false;

    if (ModalFactory.getUser()!==null){
        UserFactory.getUser(ModalFactory.getUser()._id)
        .then (function (user){
            $scope.user = user;
            if ($scope.user) {
                $scope.projects = user.projects;
                $scope.hasProjects = $scope.projects.length;
            }
        })
    }


    $scope.createProj = ModalFactory.getCreateProjBool(); // flag for determining if this is a 'new' or 'load' request. If undefined, then we're in the 'save' flow
    $scope.inSave = false; // flag for determining if this was called by hitting the save button. 

    if ($scope.createProj === undefined) {
        $scope.inSave = true; // Modal will show both load and create options as we're in the 'save' flow
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.createProject = function(project) {

        ProjectFactory.createProject(project.name, $scope.user)
            .then (function (theUpdates){
                $scope.project = theUpdates.project;
                $scope.user = theUpdates.user;
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