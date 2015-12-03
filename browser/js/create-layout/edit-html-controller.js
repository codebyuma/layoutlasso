app.controller('EditHTMLModalCtrl', function ($scope, $uibModalInstance) {


  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
