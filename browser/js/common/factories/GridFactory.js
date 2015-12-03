app.factory('GridFactory', function($http, $compile, PageFactory, ProjectFactory, UserFactory, $rootScope) {
    var GridFactory = {};

    var options = {
        cell_height: 80,
        vertical_margin: 0,
        margin: 0,
        width: 12,
        float: true
    };

    GridFactory.counter = 0;
    GridFactory.main_grid = $('#main-grid').gridstack(options).data('gridstack');
    GridFactory.savedGrid = [];

    GridFactory.nestedGrids = {};
    // key is the gridId, value is the grid object
    GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid;

    GridFactory.getMainGrid = function() {
        return GridFactory.main_grid;
    }

    GridFactory.getNestedGrids = function() {
        return GridFactory.nestedGrids;
    }

    GridFactory.getWidgetContentById = function(id) {
      var thisWidget = $('#' + id)[0];
      var content = getUserContent(thisWidget.innerHTML);
      return content;
    }

    GridFactory.getParentGridOfWidget = function(id) {
      var thisWidget= $('#' + id);
      var parent = thisWidget.parent().data('gridstack');
      return parent;
    }

    GridFactory.getParentGridIDOfWidget = function(id) {
      var thisWidget= $('#' + id);
      var parentID = thisWidget.parent()[0].id;
      return parentID;
    }

    GridFactory.updateWidgetContentById = function(scope, id, newContent) {
      var thisWidget = $('#' + id)[0];
      thisWidget.innerHTML = replaceUserContent(thisWidget.innerHTML, newContent);
    }

    GridFactory.recreateWidget = function(scope, id, newContent) {
      // find parent
      var grid = GridFactory.getParentGridOfWidget(id);
      // destroy the existing widget
      var parentGridID = GridFactory.getParentGridIDOfWidget(id);
      GridFactory.removeWidget(id, parentGridID);
      // create a new widget with the same parent and ID as before but with new content
      var newWidget = GridFactory.addNewGridElement(scope, grid, newContent, id);
    }

    // helper function to create a new element
    GridFactory.createElement = function(scope, id, content) {
        var content = content || "Your content here";
        var el = $compile("<div class='grid-stack-item' id=" +
            id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'>\
  <div class='lasso-user-content'>" + content + "</div><div class='lasso-end-user-content'></div>\
  </div></div>\
  <div class='row'>\
  <div class='lasso-button-box'>\
  <button ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
  <button class='lasso-x' id='lasso-x-btn-" + id + "' ng-click='addNestedGrid(" +
            id + ")' class='btn btn-default lasso-nest-btn' id='lasso-nest-btn-" +
            id + "'><span class='glyphicon glyphicon-th'></span></button>\
            <button ng-click='editHTML(" +id + ")' id='lasso-nest-btn-" +
              id + "'><span class='glyphicon glyphicon-edit'></span></button>\
  <styling-selector ng-click='getElementToStyle(" + id + ")'></styling-selector>\
  </div></div></div>")(scope);

        return el;
    }

    // <div class='lasso-html-box'><code>user's html goes here</code><div>\

    // adds a new grid to the parent grid or main grid
    GridFactory.addNewGridElement = function(scope, grid, content, id) {
        var grid = grid || GridFactory.main_grid;
        if (!id) {
          GridFactory.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
          id = GridFactory.counter;
        }
        var el = GridFactory.createElement(scope, id, content);
        var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
        return newWidget;
    }

    GridFactory.addNestedGrid = function(scope, id) {
        var thisWidget = $('#' + id);

        // remove buttons
        $('#lasso-nest-btn-' + id).remove();
        $('#lasso-x-btn-' + id).remove();

        // make selected widget into a grid
        var newGridID = "grid" + id; // use the id number of the cell clicked
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
            newGridID + "'></div>")(scope));

        // save the new grid to nestedGrids object on the $scope
        var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
        GridFactory.nestedGrids[newGridID] = newGrid;

        // add an Add Widget Button to the newly nested grid
        $("#" + id + " .lasso-button-box")
            .append($compile("<button ng-click='addNewGridElement(nestedGrids." + newGridID + ")'>Add Widget</button>")(scope));
    }

    GridFactory.removeWidget = function(idNum, gridID) {
        var el = $('#' + idNum);
        var gridID = gridID || "main-grid";
        GridFactory.nestedGrids[gridID].remove_widget(el);
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

    }

    GridFactory.saveGridBackend = function(page) {
        page.grid = GridFactory.savedGrid;
        PageFactory.savePage(page)
            .then(function(updatedPage) {
                $rootScope.$broadcast('saved');
            })
    }

    GridFactory.clearGrid = function() {
        GridFactory.main_grid.remove_all();
        GridFactory.nestedGrids = {};
    }


    GridFactory.loadGrid = function(scope, page) {
        GridFactory.clearGrid();

        if (GridFactory.savedGrid.length === 0) {
            if (page) {
                GridFactory.savedGrid = page.grid;
            }
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
    }


    GridFactory.loadNestedGrid = function(scope, node) {
        // parentId will be in form of grid#, like grid2
        // assume we always attach a nested grid to a parent grid that has the same id number, so grab the grid with that id number
        var thisWidget = $('#' + node.parentId.slice(4));

        // add a subclass to the parent widget with the actual "grid-#"" id in it.
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
            node.parentId + "'></div>")(scope));

        // create a new grid and then save the grid to nestedGrids object on the $scope
        var newGrid = $('#' + node.parentId).gridstack(options).data('gridstack');
        GridFactory.nestedGrids[node.parentId] = newGrid;

        // create a new element using the node and add it to the grid-# parent div with the node's coordinates
        var el = GridFactory.createElement(scope, node.id);
        GridFactory.nestedGrids[node.parentId].add_widget(el, node.x, node.y, node.width, node.height, false);

    }

    return GridFactory;
})
