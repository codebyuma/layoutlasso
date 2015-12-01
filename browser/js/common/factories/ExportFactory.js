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

    var offsetMaker = function(sz, span) {
      return '<div class="col-' + sz + '-offset-' + span + '">';
    }

    // is this node a child of the same parent
    function isChildOfSameParent(node, parentId) {
      return (node.parentId === parentId);
    };

    // key is parent grid's Id, value is array of its child nodes
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
      return markGrids(visitedGrids);
    };

    // mark children nodes that are grids as grids
    function markGrids(visitedGrids) {
      var gridNumArray = [];
      for (var grid in visitedGrids) {
        gridNumArray.push(grid.slice(4));
      }
      GridFactory.savedGrid.forEach(function(node){
        if (gridNumArray.indexOf(node.id) >= 0) {
          node.grid = true;
        }
      })
      return visitedGrids;
    }

    ExportFactory.convertToHTML = function() {
      // TODO integrate save function here to save the current grid
      // TODO object names can't have hyphens  main-grid => gridmain
      console.log("button clicked!");
          var html = bits.container;
          var parentObj = makeParentObject();

          console.log("parentObj", parentObj);

          for (var key in parentObj){  // modify parentObj to include offset columns
            createOffsetNodes(parentObj[key]);
          }
          // start with main grid.
          // generateRow function will look for nested grids recursively
          html =  generateRow(html, parentObj['main-grid'], parentObj);
          html += bits.close; // closes container
          console.log("converted html is", html);
      };

  function createOffsetNodes(nodesArr) {
    var curr, nextXShouldBe, newWidth, newNode;
    nodesArr.sort(function(a, b){ // make sure nodesArr is sorted by x values
      return a.x - b.x;
    });
    for(var i = 0; i < nodesArr.length - 1; i++) {
      curr = nodesArr[i].x;
      nextXShouldBe = curr + nodesArr[i].width;
      if (nodesArr[i+1].x != nextXShouldBe){ // if next node is not sequentially next
        newWidth = nodesArr[i+1].x - nextXShouldBe;
        newNode = { offset: true, x: nextXShouldBe, width:  newWidth };
        nodesArr.splice(i+1, 0, newNode); // insert newNode into the array
      }
    }

    // check if the end needs an offset to span 12 columns
    var lastnode = nodesArr[nodesArr.length - 1];
    if (lastnode.x + lastnode.width !== 12) {
      newWidth = 12 - (lastnode.x + lastnode.width);
      nextXShouldBe = lastnode.x + lastnode.width;
      newNode = { offset: true, x: nextXShouldBe, width:  newWidth };
      nodesArr.splice(i+1, 0, newNode);
    }
  };

  function generateRow(html, nodesArr, parentObj, size) {
    var sz = size || "md";
    html += bits.row;
    for (var j = 0; j < nodesArr.length; j++){
        // check if node is an offset node (empty node)
        if (nodesArr[j].offset) {
          html += offsetMaker(sz, nodesArr[j].width);
        } else if (nodesArr[j].grid) {
          // find the grid in parent grid and build it
          html += colMaker(sz, nodesArr[j].width); // make column
          html += nodesArr[j].content; // add content to column
          html = generateRow(html, parentObj["grid" + nodesArr[j].id], parentObj);
        } else {
          html += colMaker(sz, nodesArr[j].width); // make column
          html += nodesArr[j].content;  // add content to column
        }
        html += bits.close; // close column
    } html += bits.close; // close row
    return html;
  };

  return ExportFactory;
});
