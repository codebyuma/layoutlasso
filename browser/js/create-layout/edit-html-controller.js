app.controller('EditHTMLModalCtrl', function ($scope, $uibModalInstance, content, GridFactory) {

  $scope.content = content;
  $scope.id = $uibModalInstance.id;

  $scope.save = function(newContent) {
    // send newcontent
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
