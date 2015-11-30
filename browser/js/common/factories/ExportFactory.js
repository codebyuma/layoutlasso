app.factory('ExportFactory', function(GridFactory) {

  var ExportFactory = {};

    // for html generator
    var bits = {
        container: '<div class="container">',
        row: '<div class="row">',
        nl: '<br />',
        close: '</div>'
    };

    var colMaker = function(sz, span) {
      return '<div class="col-' + sz + '-' + span + '">';
    }

    // is this node a child of the same parent
    function isChildOfSameParent(node, parentId) {
      return (node.parentId === parentId);
    };

    function makeParentObject() {
      var visitedGrids = {};
      GridFactory.savedGrid.forEach(function(node, index){
        if (!visitedGrids[node.parentId]) {
          visitedGrids[node.parentId] = [];
          visitedGrids[node.parentId].push(node);
        } else {
          visitedGrids[node.parentId].push(node);
        }
      })
      return visitedGrids;
    };

// use grid-stack x values to know what is next to what (columns)
// use grid-stack y values to group into rows
// use width to know how width the element is
// use height to know how tall the element is

    ExportFactory.convertToHTML = function() {
      console.log("button clicked!");

          var parentObj = makeParentObject();
          console.log("parentObj", parentObj);
          for (var key in parentObj) {  // for each parent
              // use generateHTML function to build
              // grid system for each ROW
              // and each parent grid
          }

      };

  function generateHTML(newHTML, r, c, content, sz){

    var sz = sz || "md";
    var rows = r, cols = c;
    var span = 0; // number of Bootstrap columns to span across

    // generate the html
    newHTML += bits.container;
    for (var i = 0; i < rows; i++) {
        newHTML += bits.row;
        for (var j = 0; j < cols; j++){
            // make column
            newHTML += colMaker(sz, span);
            // add content to column
            newHTML += content;
            // close column
            newHTML += bits.close;
        } // close row
        newHTML += bits.close;
    } // close container
    newHTML += bits.close;
  }

  return ExportFactory;
});
