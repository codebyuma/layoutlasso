app.controller('LoginModalCtrl', function ($scope, $rootScope, AuthService, $state, $uibModalInstance){



  $scope.ok = function(){
    console.log("OK!");
    $uibModalInstance.close()
  }

  $scope.cancel = function(){
  	console.log("cancel!");
    $uibModalInstance.dismiss('cancel')
  }

  	$scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function (user) {
            $scope.user = user;
            $rootScope.$broadcast('user logged in', user);
            $uibModalInstance.close()
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };


     $scope.sendSignUp = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function (user) {
            $scope.user = user;
            $rootScope.$broadcast('user logged in', user);
            $uibModalInstance.close()
        }).catch(function () {
            $scope.error = 'Account with this email address already exists.';
        });

    };


})

