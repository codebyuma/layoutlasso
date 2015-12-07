app.controller('SignupModalCtrl', function($scope, AuthService, $uibModalInstance){

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.sendSignUp = function(signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function(user) {
            $scope.user = user;
            $uibModalInstance.close(user)
        }).catch(function() {
            $scope.error = 'An account with this email address already exists.';
        });

    };	

})