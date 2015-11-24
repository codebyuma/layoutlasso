app.controller("CreateLayoutCtrl", function($scope){

  var options = {
      cell_height: 80,
      vertical_margin: 0,
      animate: false,
      margin: 0
  };


  var grid = $('.grid-stack').gridstack(options).data('gridstack');
  console.log(grid);



  $scope.addNewGridElement = function(){
    console.log(grid);
    var el = $("<div>").addClass("new-element");
    grid.add_widget(el, 200, 200, 50, 50, true)
  }

})
