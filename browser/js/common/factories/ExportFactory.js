app.factory('ExportFactory', function(GridFactory) {

  var ExportFactory = {};

    // for html generator
    var bits = {
        container: '<div class="container">',
        row: '<div class="row">',
        close: '</div>'
    };

  function colMaker(sz, span) {
    return '<div class="col-' + sz + '-' + span + '">';
  }

  function offsetMaker(sz, span) {
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

  function separateRows(nodesArr) {
  // Modifies nodesArr to be an array of arrays where each subarray is a ROW of nodes
    var rowsArray = [];
    for (var i = 0; i < nodesArr.length; i++) {
      if (rowsArray[nodesArr[i].y] == undefined) {
        rowsArray[nodesArr[i].y] = [nodesArr[i]];
      } else {
        rowsArray[nodesArr[i].y].push(nodesArr[i]);
      }
    }
    return rowsArray;
  }

  function createOffsetNodes(nodesArr) {
    // Expect nodesArr to be an array of arrays by row
    var curr, nextXShouldBe, newWidth, newNode;

    nodesArr.forEach(function(subarr){
      subarr.sort(function(a, b){ // make sure nodesArr is sorted by x values
        return a.x - b.x;
      });
      for(var i = 0; i < subarr.length - 1; i++) {
        curr = subarr[i].x;
        nextXShouldBe = curr + subarr[i].width;
        if (subarr[i+1].x != nextXShouldBe){ // if next node is not sequentially next
          newWidth = subarr[i+1].x - nextXShouldBe;
          newNode = { offset: true, x: nextXShouldBe, width:  newWidth };
          subarr.splice(i+1, 0, newNode); // insert newNode into the array
        }
      }
      // check if the end needs an offset to span 12 columns
      var lastnode = subarr[subarr.length - 1];
      if (lastnode.x + lastnode.width !== 12) {
        newWidth = 12 - (lastnode.x + lastnode.width);
        nextXShouldBe = lastnode.x + lastnode.width;
        newNode = { offset: true, x: nextXShouldBe, width:  newWidth };
        subarr.splice(i+1, 0, newNode);
      }
    });

  };

  function generateRow(html, nodesArr, parentObj, size) {
    var sz = size || "md";

    nodesArr.forEach(function(subarr){
      html += bits.row;
      for (var j = 0; j < subarr.length; j++){
          // check if node is an offset node (empty node)
          if (subarr[j].offset) {
            html += offsetMaker(sz, subarr[j].width);
          } else if (subarr[j].grid) {
            // find the grid in parent grid and build it
            html += colMaker(sz, subarr[j].width); // make column
            html += subarr[j].content; // add content to column
            html = generateRow(html, parentObj["grid" + subarr[j].id], parentObj);
          } else {
            html += colMaker(sz, subarr[j].width); // make column
            html += subarr[j].content;  // add content to column
          }
          html += bits.close; // close column
      } html += bits.close; // close row
    });
    return html;
  };

  ExportFactory.convertToHTML = function() {
        var html = bits.container;
        var parentObj = makeParentObject();

        for (var key in parentObj) {
          parentObj[key] = separateRows(parentObj[key]); // modify parentObj to distinguish between rows
          createOffsetNodes(parentObj[key]); // modify parentObj to include offset columns
        }
        // start with main grid.
        // generateRow function will build nested grids recursively
        html =  generateRow(html, parentObj['main-grid'], parentObj);
        html += bits.close; // closes container
        console.log("converted html is", html);
        return html;
    };

  return ExportFactory;
});
