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
            console.log("in authservice login function in signup control")
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Account with this email address already exists.';
        });

    };

});