app.controller("LeftMenuCtrl", function($scope, AUTH_EVENTS, AuthService, $rootScope, growl, GridCompFactory, GridFactory, $uibModal, ExportFactory, $timeout, BrowserifyFactory, StyleSaveLoadFactory, StylingFactory, ModalFactory, TemplateFactory) {


$scope.addNewGridElement = function(grid, content) {
         GridFactory.addNewGridElement($rootScope, grid, content);
    }



})