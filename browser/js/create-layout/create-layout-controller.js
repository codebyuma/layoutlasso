app.controller("CreateLayoutCtrl", function($scope, $compile){

  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      //draggable: true,
      width: 12,
      float: true
  };

  // var grid = $('.grid-stack').gridstack(options).data('gridstack');
  $scope.main_grid = $('#main-grid').gridstack(options).data('gridstack');

  $scope.remove = "x";
  $scope.counter = 0;
  $scope.grid_counter = 1;

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
  <button class='lasso-x'id='lasso-x-btn-"+ id +"' ng-click='addNestedGrid(" +
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

  $scope.addNestedGrid = function(idNum){
      var thisWidget = $('#' + idNum);
      // remove buttons - they won't work when widget becomes a grid
      $('#lasso-nest-btn-'+idNum).remove();
      $('#lasso-x-btn-'+idNum).remove();

      // make selected widget into a grid
      $scope.grid_counter++;
      var newGridID = "grid" + $scope.grid_counter;
      thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      newGridID+ "'></div>")($scope));

      // save the new grid to nestedGrids object
      var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
      $scope.nestedGrids[newGridID] = newGrid;

      // add an Add Widget Button to the new grid
      $( "#" + idNum + " .lasso-button-box")
      .append($compile("<button ng-click='addNewGridElement(nestedGrids." + newGridID + ")'>Add Widget</button>")($scope));

      // put new widget into that grid
      // $scope.counter++;
      // var el = createElement($scope.counter);
      // newGrid.add_widget(el, 0, 0, 1, 1, true);
  }

  $scope.removeWidget = function (idNum){
        var grid = $('.grid-stack').data('gridstack'),
        el = $('#' + idNum);
        grid.remove_widget(el);
  }


})
