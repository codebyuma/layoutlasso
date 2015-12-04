app.controller('EditHTMLModalCtrl', function ($scope, $uibModalInstance, content, GridFactory) {

  $scope.content = content;

  $scope.aceLoaded = function(_editor){
    _editor.getSession().setValue($scope.content);
    _editor.getSession().on('change', function () {
       $scope.content = _editor.getSession().getValue();
   });
  };

  $scope.save = function() {
    var newContent = $("#editable-content").html();

    // This function is used to fix the string because "<" and ">" were converted into "&lt;" and "&gt;"
    var convert = function(convert){
        return $("<span />", { html: convert }).text();
    };
    newContent = convert(newContent);
    $uibModalInstance.close($scope.content);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
