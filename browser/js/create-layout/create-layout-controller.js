app.controller("CreateLayoutCtrl", function($scope){

  $(function () {
      var options = {
          cell_height: 80,
          vertical_margin: 10
      };
      $('.grid-stack').gridstack(options);
  });

  //
  // var options = {
  //     cell_height: 80,
  //     vertical_margin: 10,
  //     height: 15
  // }
  //
  // console.log("GRIDSTACK", $('.grid-stack').gridstack(options));
})
