app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendSignUp = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function (user) {
            $scope.user = user;
            $state.go('create');
        }).catch(function () {
            $scope.error = 'An account with this email address already exists.';
        });

    };

});