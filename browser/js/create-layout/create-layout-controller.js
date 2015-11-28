app.controller("CreateLayoutCtrl", function($scope, $compile){


  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      //draggable: true,
      width: 12,
      float: true
  };

  
  var grid = $('.grid-stack').gridstack(options).data('gridstack');

  $scope.text = "x";
  $scope.counter = 0;

  $scope.addNewGridElement = function(){
    $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
    var el = $compile("<div class='grid-stack-item' id=" + $scope.counter + "><div class='grid-stack-item-content new-element'><button ng-click='removeWidget(" + $scope.counter + ")'> {{ text }} </button></div></div>")($scope);
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);

  }


  $scope.removeWidget = function (idNum){
    
        var grid = $('.grid-stack').data('gridstack'),
        el = $('#' + idNum);
        grid.remove_widget(el);

  }


})
