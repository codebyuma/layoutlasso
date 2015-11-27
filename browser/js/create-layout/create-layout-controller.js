app.controller("CreateLayoutCtrl", function($scope, $compile){

  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      width: 12,
      float: true
  };

  $scope.main_grid = $('#main-grid').gridstack(options).data('gridstack');
  $scope.remove = "x";
  $scope.counter = 0;
  $scope.grid_counter = 1;
  $scope.res = [];

  // key is the gridId, value is the grid object
  $scope.nestedGrids = {};

// helper function to create a new element
var createElement = function(id, content) {
  var content = content || "Your content here";
  var el = $compile("<div class='grid-stack-item' id=" +
  id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'><div>" + content + "</div></div></div>\
  <div class='row'>\
  <div class='lasso-button-box'>\
  <button ng-click='removeWidget(" + id + ")'> {{ remove }} </button>\
  <button class='lasso-x' id='lasso-x-btn-"+ id +"' ng-click='addNestedGrid(" +
  id + ")' class='btn btn-default lasso-nest-btn' id='lasso-nest-btn-"+
  id +"'>Nest Grid</button>\
  </div></div></div>")($scope);
  return el;
}

// adds a new grid to the main grid
  $scope.addNewGridElement = function(grid){
    grid = grid || $scope.main_grid;
    $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
    var el = createElement($scope.counter);
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
  }

  $scope.addNestedGrid = function(id){
      var thisWidget = $('#' + id);
      // remove buttons
      $('#lasso-nest-btn-'+id).remove();
      $('#lasso-x-btn-'+id).remove();

      // make selected widget into a grid
      $scope.grid_counter++;
      var newGridID = "grid" + $scope.grid_counter;
      thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      newGridID+ "'></div>")($scope));

      // save the new grid to nestedGrids object on the $scope
      var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
      $scope.nestedGrids[newGridID] = newGrid;

      // add an Add Widget Button to the newly nested grid
      $( "#" + id + " .lasso-button-box")
      .append($compile("<button ng-click='addNewGridElement(nestedGrids." + newGridID + ")'>Add Widget</button>")($scope));
  }

  $scope.removeWidget = function (idNum){
        var grid = $('.grid-stack').data('gridstack')
        el = $('#' + idNum);
        grid.remove_widget(el);
  }

  $scope.saveGrid = function (){
    $scope.res = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {
        el = $(el);
        var node = el.data('_gridstack_node');
        return {
            id: el.attr('data-custom-id'),
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height
        };
    });
    alert(JSON.stringify($scope.res));
  }

  $scope.clearGrid = function (){
    $scope.main_grid.remove_all();
  }

  // $scope.loadGrid = function (){
  //   var serialization = [
  //     {x: 0, y: 0, width: 2, height: 2},
  //     {x: 3, y: 1, width: 1, height: 2},
  //     {x: 4, y: 1, width: 1, height: 1},
  //     {x: 2, y: 3, width: 3, height: 1},
  //     {x: 1, y: 4, width: 1, height: 1},
  //     {x: 1, y: 3, width: 1, height: 1},
  //     {x: 2, y: 4, width: 1, height: 1},
  //     {x: 2, y: 5, width: 1, height: 1}
  //   ];

  //   serialization = GridStackUI.Utils.sort(serialization);

  //   var grid = $('.grid-stack').data('gridstack');
  //   grid.remove_all();

  //   _.each(serialization, function (node) {
  //       grid.add_widget($('<div><div class="grid-stack-item-content" /></div>'), 
  //           node.x, node.y, node.width, node.height);
  //   });
  // }

})
