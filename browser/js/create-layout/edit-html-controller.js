app.controller('EditHTMLModalCtrl', function ($scope, $uibModalInstance, content, GridFactory) {

  $scope.content = content;

  $scope.save = function() {
    var newContent = $("#editable-content").html();

    // This function is used to fix the string because "<" and ">" were converted into "&lt;" and "&gt;"
    var convert = function(convert){
        return $("<span />", { html: convert }).text();
    };
    newContent = convert(newContent);
    $uibModalInstance.close(newContent);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
