app.controller("CreateLayoutCtrl", function($scope){

  $scope.options = {
    cell_height: 60,
    vertical_margin: 0
  }

  $scope.widgets = [{x: 0, y: 0, width: 1, height: 1}];

  $scope.addWidget = function() {
      var newWidget = { x:0, y:0, width:1, height:1 };
      $scope.widgets.push(newWidget);
  };

  $scope.removeWidget = function(w) {
      var index = $scope.widgets.indexOf(w);
      $scope.widgets.splice(index, 1);
  };

  // var options = {
  //     cell_height: 80,
  //     vertical_margin: 0,
  //     animate: false,
  //     margin: 0
  // };
  //
  // function addItemsToGrid(items){
  //   items.forEach(function(item){
  //     grid.add_widget(item, item.x, item.y, item.width, item.height);
  //   })
  // }
  //
  //
  // var grid = $('.grid-stack').gridstack(options).data('gridstack');
  // console.log(grid);
  //
  // $('.grid-stack').on('change', function(event, items){
  //   $scope.gridElements = items;
  //   addItemsToGrid($scope.gridElements);
  // })
  //
  // $scope.grid = grid;
  //
  // $scope.gridElements = [];
  //
  // $scope.addNewGridElement = function(){
  //   console.log(grid);
  //
  //   var el = $("<div></div>").addClass("new-element");
  //   grid.add_widget(el, 0, 0, 1, 1, false);
  //
  // }

})
