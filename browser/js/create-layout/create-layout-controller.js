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

  // key is the gridId, value is the grid object
  $scope.nestedGrids = {};
  $scope.nestedGrids["main-grid"] = $scope.main_grid;

// helper function to create a new element
var createElement = function(id, content) {
  var content = content || "Your content here";
  var el = $compile("<div class='grid-stack-item' id=" +
  id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'>\
  <div class='lasso-user-content'>" + content + "</div><div class='lasso-end-user-content'></div>\
  </div></div>\
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
        var grid = $('.grid-stack').data('gridstack'),
        el = $('#' + idNum);
        grid.remove_widget(el);
  }


// ========================= Converting To HTML ================================ //
  // This section is for creating a clean copy (without Lasso tools/buttons) of the layout
  // to export for the user's use in their own project.
  // This exportation uses the Gridstack system and requires a bower-install of Gridstack (not Bootstrap).

  $scope.convertedHTML = "";
  var userContentRegex = /<div class="lasso-user-content">[\s\S]*?<\/div><div class="lasso-end-user-content"><\/div>/im;

  // static grid that does not allow modification
  var export_options = {
      static_grid: true
  };

  $scope.export_grid = $('#export-grid').gridstack(export_options).data('gridstack');
  console.log("$scope.export_grid", $scope.export_grid);

  // helper function to create a new EXPORTABLE element - not the same as our internal lasso elements
  var createExportElement = function(id, content) {
    var content = content || "";
    var el = $compile("<div class='grid-stack-item'>\
    <div class='grid-stack-item-content'>\
    <div id='"+ id +"'>" + content + "</div></div></div>")($scope);
    return el;
  }

// adds a new EXPORTABLE grid to the main grid - static grid that cannot be modified in Layout Lasso
  $scope.addExportWidget = function(grid, id, x, y, w, h){
    grid = grid || $scope.export_grid;
    $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
    var el = createElement(id);
    var newWidget = grid.add_widget(el, x, y, w, h, false);
  }

  $scope.convertToHTML = function() {
    console.log("button clicked!");
    var nodes;
    for(var key in $scope.nestedGrids) {  // for each gridget
      nodes = $scope.nestedGrids[key].grid.nodes;
      for (var i = 0; i < nodes.length; i++) {  // for each widget in that gridget
         var matches = nodes[i].el[0].innerHTML.match(userContentRegex);
         if (matches.length == 0) {
           throw new Error("Error converting to html - No user content found.");
         } else {
           // create a new grid element matching the properties of that one
          console.log("content:", matches[0]);
         }
      }
    }
  }


}) // end of controller
