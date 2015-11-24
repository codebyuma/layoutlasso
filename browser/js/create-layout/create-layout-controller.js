app.controller("CreateLayoutCtrl", function($scope){

  var mainGrid = $(".gridster").gridster({
    widget_margins: [0, 0],
    widget_base_dimensions: [100, 100],
    max_cols: 10,
    min_cols: 10,
    min_rows: 15,
    max_size_x: true,
    autogenerate_stylesheet: true,
    resize: {
      enabled: true,
      axes: ["both"],

    },
    avoid_overlapped_widgets: true
  }).data("gridster");

  console.log(mainGrid);


  $scope.addNewGridElement = function(){
    mainGrid.add_widget("<div class='new new-element'><p>Here is a new widget!</p></div>", 10, 1)
  }
})
