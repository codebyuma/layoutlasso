app.controller('EditHTMLModalCtrl', function ($scope, $uibModalInstance, GridFactory, BrowserifyFactory, ModalFactory) {

  var content;
  
  GridFactory.getWidgetContentById(ModalFactory.getId())
  .then (function (_content){
    content = _content;
  });


  $scope.aceLoaded = function(_editor){
    var html = BrowserifyFactory.beautifyHTML(content);
    _editor.getSession().setValue(html);
    _editor.getSession().on('change', function () {
       content = _editor.getSession().getValue();
   });
  };

  $scope.save = function() {
    $uibModalInstance.close(content);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
