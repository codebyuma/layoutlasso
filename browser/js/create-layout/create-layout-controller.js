app.controller("CreateLayoutCtrl", function($scope){

  // $scope.options = {
  //   cell_height: 60,
  //   vertical_margin: 0
  // }

  // $scope.widgets = [{x: 0, y: 0, width: 1, height: 1}];

  // $scope.addWidget = function() {
  //     var newWidget = { x:0, y:0, width:1, height:1 };
  //     $scope.widgets.push(newWidget);
  // };

  // $scope.removeWidget = function(w) {
  //     var index = $scope.widgets.indexOf(w);
  //     $scope.widgets.splice(index, 1);
  // };

   // function addItemsToGrid(items){
  //   items.forEach(function(item){
  //     grid.add_widget(item, item.x, item.y, item.width, item.height);
  //   })
  // }

    // console.log(grid);
  
  // $('.grid-stack').on('change', function(event, items){
  //   $scope.gridElements = items;
  //   addItemsToGrid($scope.gridElements);
  // })

 // $scope.gridElements = [];
 //  $scope.grid = grid;

 // BELOW HERE WORKS

  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      //draggable: true,
      width: 6,
      float: true
  };

  
  var grid = $('.grid-stack').gridstack(options).data('gridstack');


 
  
  $scope.addNewGridElement = function(){
    console.log(grid);
  
    var el = $("<div class='grid-stack-item'><div class='grid-stack-item-content new-element'></div></div>");
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
    console.log("grid now", grid);

  }


// $(function () {
//             var options = {
//                 width: 6,
//                 float: true
//             };
//             $('#grid1').gridstack(options);
//             // $('#grid2').gridstack(options);

//             var items = [
//                 {x: 0, y: 0, width: 2, height: 2},
//                 {x: 3, y: 1, width: 1, height: 2},
//                 {x: 4, y: 1, width: 1, height: 1},
//                 {x: 2, y: 3, width: 3, height: 1},
//                 {x: 2, y: 5, width: 1, height: 1}
//             ];

//             $('.grid-stack').each(function () {
//                 var grid = $(this).data('gridstack');

//                 _.each(items, function (node) {
//                     grid.add_widget($('<div><div class="grid-stack-item-content" /><div/>'),
//                         node.x, node.y, node.width, node.height);
//                 }, this);
//             });
//         });

})
