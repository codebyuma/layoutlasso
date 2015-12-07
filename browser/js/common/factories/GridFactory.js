app.factory('GridFactory', function($http, $compile, PageFactory, ProjectFactory, UserFactory, $rootScope, StyleSaveLoadFactory, StyleModeFactory) {
    var GridFactory = {};

    var options = {
        cell_height: 80,
        vertical_margin: 0,
        margin: 0,
        width: 12,
        float: true
    };


    GridFactory.init = function (){
        GridFactory.counter = 0;
        GridFactory.main_grid = $('#main-grid').gridstack(options).data('gridstack');
        GridFactory.savedGrid = [];
        GridFactory.nestedGrids = {};
        // key is the gridId, value is the grid object
        GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid;
    }

    GridFactory.incrementCounter = function() {
      GridFactory.counter++;
      return GridFactory.counter;
    }

    GridFactory.getMainGrid = function() {
        return GridFactory.main_grid;
    }

    GridFactory.getNestedGrids = function() {
        return GridFactory.nestedGrids;
    }

    GridFactory.getWidgetById = function(id){
      var widget = $('#' + id);
      return widget[0];
    }

    GridFactory.getWidgetContentById = function(id) {
      var thisWidget = $('#' + id)[0];
      var content = getUserContent(thisWidget.innerHTML);
      return content;
    }

    GridFactory.isGrid = function(id) {
      if (GridFactory.nestedGrids[id]) {
        return true;
      } else return false;
    }

    GridFactory.getGridById = function(id) {
      return GridFactory.nestedGrids[id];
    }

    GridFactory.recreateWidget = function(scope, id, newContent) {
      var widget = GridFactory.getWidgetById(id);
      var html = replaceUserContent(widget.innerHTML, newContent);
      $('#' + id).find(".lasso-user-content")[0].innerHTML = newContent;
    }

    // helper function to create a new element
    GridFactory.createElement = function(scope, id, content) {
        var content = content || "<p>Your content here</p>";
        var el = $compile("<div class='grid-stack-item' id=" +
            id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'>\
  <div class='lasso-user-content'>" + content + "</div><div class='lasso-end-user-content'></div>\
  </div></div>\
  <div class='row'>\
  <div class='lasso-button-box' id='lasso-button-box-"+id+"''>\
  <button title='Remove widget' ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
  <button class='lasso-x' id='lasso-x-btn-" + id + "' ng-click='addNestedGrid(" +
            id + ")' class='btn btn-default lasso-nest-btn' title='Add nested grid' id='lasso-nest-btn-" +
            id + "'><span class='glyphicon glyphicon-th'></span></button>\
  <button title='Edit HTML' ng-click='editHTML(" +id + ")'><span class='glyphicon glyphicon-edit'></span></button>\
  <button class='lasso-addcomp-btn' ng-click='addComponents(" + id + ")'><span class='glyphicon glyphicon-modal-window'></span></button>\
            <button style-nested-grid-item data-element-selector=" + id + "></button>\
            </div></div></div>")(scope);

        return el;
    }

    // adds a new grid to the parent grid or main grid
    GridFactory.addNewGridElement = function(scope, grid, content) {
       grid = grid || GridFactory.main_grid;
       GridFactory.counter++;
       var el = GridFactory.createElement(scope, GridFactory.counter, content);
       var newWidget = grid.add_widget(el, 0, 0, 3, 2, true);
       StyleModeFactory.resetEditableLayers(scope);
   }

    GridFactory.addNestedGrid = function(scope, id) {
        var thisWidget = $('#' + id);

        // remove buttons
        $('#lasso-button-box-' + id).remove();
        $('#lasso-nest-btn-' + id).remove();
        $('#lasso-x-btn-' + id).remove();
        $('#lasso-addcomp-btn').remove();

        // make selected widget into a grid
        var newGridID = "grid" + id; // use the id number of the cell clicked
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
            newGridID + "'></div>")(scope));

        thisWidget.append($compile(" <div class='row nested-buttons'>\
  <div class='lasso-button-box' id='lasso-button-box-"+id+"''>\
  <button title='Remove widget' ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
  <button title='Edit HTML' ng-click='editHTML(" +id + ")'><span class='glyphicon glyphicon-edit'></span></button>\
  <button title='Add components' ng-click='addComponents(" + id + ")' class='lasso-addcomp-btn'><span class='glyphicon glyphicon-modal-window'></span></button>\
  <button style-nested-grid-item data-element-selector=" + id + "></button>\
  </div></div>")(scope))

        // save the new grid to nestedGrids object on the $scope
        var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
        GridFactory.nestedGrids[newGridID] = newGrid;

        // add an Add Widget Button to the newly nested grid
        $("#" + "lasso-button-box-" + id )
            .append($compile("<button title='Add nested grid' ng-click='addNewGridElement(nestedGrids." + newGridID + ")'><span class='glyphicon glyphicon-plus'></span></button>")(scope));

        StyleModeFactory.resetEditableLayers(scope);

        return newGrid;
    }

    // Function to build the original button box
    GridFactory.buildButtonBox = function(id, scope){

      return $compile("<div class='row'>\<div class='lasso-button-box' id='lasso-button-box-"+id+"''>\
      <button title='Remove widget' ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
      <button class='lasso-x' id='lasso-x-btn-" + id + "' ng-click='addNestedGrid(" + id + ")' class='btn btn-default lasso-nest-btn' title='Add nested grid' id='lasso-nest-btn-" + id + "'><span class='glyphicon glyphicon-th'></span></button>\
      <button title='Edit HTML' ng-click='editHTML(" +id + ")'><span class='glyphicon glyphicon-edit'></span></button>\
      <button class='lasso-addcomp-btn' ng-click='addComponents(" + id + ")'><span class='glyphicon glyphicon-modal-window'></span></button> <button style-nested-grid-item data-element-selector=" + id + "></button></div></div></div>")(scope);

    }

    // Check number siblings that exist on grid when removed.

    GridFactory.checkSiblingCount = function(element){
      return element.siblings().length === 0;
    }

    // Find and return the parent grid
    GridFactory.findParentGrid = function(element){
      return element.parent();
    }

    // Regenerate the previous buttons on the parent.
    GridFactory.generateParentButtons = function(el, scope){
      var parentOfElementToMod = GridFactory.findParentGrid(el);
      var elementId = parentOfElementToMod.attr("id");
      var elementToAppendTo = parentOfElementToMod.children(".grid-stack-item-content");
      $('#lasso-button-box-' + elementId).parent().remove()
      $('#lasso-button-box-' + elementId);
      $('#lasso-nest-btn-' + elementId).remove();
      $('#lasso-x-btn-' + elementId).remove();
      $('#lasso-addcomp-btn').remove();
      elementToAppendTo.append(GridFactory.buildButtonBox(elementId, scope));
    }

    // Remove the empty nested grid and change buttons on parent.
    GridFactory.removeEmptyGridElement = function(gridID, parent, scope){
      if(gridID === "main-grid") return;
      GridFactory.generateParentButtons(parent, scope);
      parent.remove();
      // delete GridFactory.nestedGrids[gridID];

    }


    GridFactory.removeWidget = function(idNum, gridID, scope) {
        var el = $('#' + idNum);
        var gridID = gridID || "main-grid";
        var siblingCountZero = GridFactory.checkSiblingCount(el);
        var parentGrid = GridFactory.findParentGrid(el);
        var parentId = parentGrid.attr("id");

        /*** Not sure if we need this, as we don't seem to pass in grid id? ***/
        GridFactory.nestedGrids[gridID].remove_widget(el);
        /* If the element has no siblings on removal, remove the empty grid */
        if(siblingCountZero){
          GridFactory.removeEmptyGridElement(parentId, parentGrid, scope);
        }
    }

    // ========================= Saving, clearing and loading grids to/from scope (so far) ================================ //
    var userContentRegex = /<div class="lasso-user-content">[\s\S]*?<\/div><div class="lasso-end-user-content"><\/div>/im;

    var getUserContent = function(html) { // takes a node's innerHTML and isolates user content
        var matches = html.match(userContentRegex);
        if (!matches) {
            throw new Error("Error - No user content found.");
        } else {
            return matches[0].slice(32, html.length).slice(0, -48);
        }
    };

    // takes node's innerHTML and newContent and returns string of html with replacement content
    var replaceUserContent = function(html, newContent) {
      return html.replace(userContentRegex, newContent);
    }

    GridFactory.saveGridLocal = function() {
        GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid;

        GridFactory.savedGrid = _.map($('.grid-stack .grid-stack-item:visible'), function(el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            var userContent = getUserContent(el.context.innerHTML);

            return { // store content here too.
                id: el.attr('id'),
                parentId: el[0].offsetParent.id,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                content: userContent
            };
        });

        GridFactory.savedGrid.gridCount = GridFactory.counter;

    }

    GridFactory.saveGridBackend = function(page) {
        var changes = {
            grid: GridFactory.savedGrid,
            css: StyleSaveLoadFactory.stylingToSave(),
            gridCount:  GridFactory.counter
        };
        PageFactory.savePage(page._id, changes)
            .then(function(updatedPage) {
                $rootScope.$broadcast('saved', updatedPage);
            })
    }

    GridFactory.clearGrid = function() {
        GridFactory.main_grid.remove_all();
        GridFactory.nestedGrids = {};
        GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid;

    }

    GridFactory.clearSavedGrid = function() {
        GridFactory.savedGrid = [];
    }

    GridFactory.loadGrid = function(scope, page) {
        GridFactory.clearGrid();

        if (GridFactory.savedGrid.length === 0) {
            if (page) {
                GridFactory.savedGrid = page.grid;
                GridFactory.savedGrid.gridCount = page.gridCount;
                GridFactory.counter = page.gridCount;
            }
        } else {
            GridFactory.counter = GridFactory.savedGrid.gridCount;
        }
        _.each(GridFactory.savedGrid, function(node) {
            if (node.parentId === "main-grid") { // should load main-grid first as it's first in the array
                var el = GridFactory.createElement(scope, node.id, node.content);
                var newWidget = GridFactory.main_grid.add_widget(el, node.x, node.y, node.width, node.height, false);
            } else {
                // call loadNestedGrid with the node to add
                GridFactory.loadNestedGrid(scope, node);
            }
        });
        GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid; // ===== not sure if I need to do this??????
        StyleSaveLoadFactory.stylingBeforeClearToReload();
    }

    GridFactory.loadNestedGrid = function(scope, node) {
        // parentId will be in form of grid#, like grid2
        // assume we always attach a nested grid to a parent grid that has the same id number, so grab the grid with that id number
        var parentId = node.parentId.slice(4);
        var thisWidget = $('#' + parentId);

        // add a subclass to the parent widget with the actual "grid-#"" id in it.
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
            node.parentId + "'></div>")(scope));

        // remove and re-add buttons to the outer grid div
        $('#lasso-button-box-' + parentId).remove();

        thisWidget.append($compile(" <div class='row nested-buttons'>\
  <div class='lasso-button-box'>\
  <button ng-click='removeWidget(" + parentId + ")'><span class='glyphicon glyphicon-remove'></span></button>\
   <button ng-click='editHTML(" + parentId + ")'><span class='glyphicon glyphicon-edit'></span></button>\
   <button style-nested-grid-item data-element-selector=" + parentId + "></button>\
  <button title='Add nested grid' ng-click='addNewGridElement(nestedGrids." + node.parentId + ")'><span class='glyphicon glyphicon-plus'></span></button>\
            </div></div>")(scope));

        // create a new grid and then save the grid to nestedGrids object on the $scope
        var newGrid = $('#' + node.parentId).gridstack(options).data('gridstack');
        GridFactory.nestedGrids[node.parentId] = newGrid;

        // create a new element using the node and add it to the grid-# parent div with the node's coordinates
        var el = GridFactory.createElement(scope, node.id, node.content);
        GridFactory.nestedGrids[node.parentId].add_widget(el, node.x, node.y, node.width, node.height, false);


    }

    return GridFactory;
})
