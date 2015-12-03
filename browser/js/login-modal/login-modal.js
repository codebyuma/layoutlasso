app.controller('LoginModalCtrl', function($scope, AuthService, $uibModalInstance) {


    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.error = null;

        AuthService.login(loginInfo).then(function(user) {
            $scope.user = user;
            $uibModalInstance.close(user)
        }).catch(function() {
            $scope.error = 'Please enter valid login credentials.';
        });

    };


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