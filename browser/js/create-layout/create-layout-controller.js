app.controller("CreateLayoutCtrl", function($scope, $compile){


  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      //draggable: true,
      width: 6,
      float: true
  };

  
  var grid = $('.grid-stack').gridstack(options).data('gridstack');


  $scope.text = "x";
  
  $scope.addNewGridElement = function(){
  
    var el = $compile("<div class='grid-stack-item'><div class='grid-stack-item-content new-element'><button ng-click='removeWidget()'> {{ text }} </button></div></div>")($scope);
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);

  }


  $scope.removeWidget = function (){
    console.log("in remove");
    //grid.remove_widget(widget);
  }


})
