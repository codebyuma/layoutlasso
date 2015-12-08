app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, ModalFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.launchLogin = function () {
                ModalFactory.launchUserLoginModal(scope);
            }

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('create');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
