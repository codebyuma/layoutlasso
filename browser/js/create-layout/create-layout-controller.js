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
  $scope.counter = 0;

  $scope.addNewGridElement = function(){
    $scope.counter++;
    var el = $compile("<div class='grid-stack-item' id=" + $scope.counter + "><div class='grid-stack-item-content new-element'><button ng-click='removeWidget()'> {{ text }} </button></div></div>")($scope);
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);

  }


  $scope.removeWidget = function (widget){
    console.log("grid", grid);
    $(document).click(function(event){
      // console.log("here", event.toElement.parentNode);
      // grid.remove_widget(event.toElement.parentNode);
        var grid = $('.grid-stack').data('gridstack'),
        //el = $(this).closest('.grid-stack-item')
        el = event.toElement.parentNode.parentNode;

        console.log("el", $(el).attr('id'));

        grid.remove_widget(el);
    })

    //grid.remove_widget(widget);
  }


})
