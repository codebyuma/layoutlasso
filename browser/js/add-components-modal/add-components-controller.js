app.controller('AddComponentsModalCtrl', function ($scope, $uibModalInstance, id) {

  $scope.buttons = ["default", "primary", "success", "info", "warning", "danger"];

  $scope.mediaItems = ["image", "video"];

  $scope.save = function(component) {
    component.unshift(id);
    $uibModalInstance.close(component);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
