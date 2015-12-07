app.controller('AddComponentsModalCtrl', function ($scope, $uibModalInstance, id) {

  $scope.buttons = ["default", "primary", "success", "info", "warning", "danger"];

  $scope.mediaItems = ["image", "video"];

  $scope.save = function(component) {
  	console.log("component to save from component modal: ", component)
    component.unshift(id);
    $uibModalInstance.close(component);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
