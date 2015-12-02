app.factory('GridFactory', function($http, $compile, PageFactory, ProjectFactory, UserFactory) {
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

    GridFactory.getMainGrid = function (){
    	return GridFactory.main_grid;
    }

    GridFactory.getNestedGrids = function (){
    	return GridFactory.nestedGrids;
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
  <styling-selector ng-click='getElementToStyle(" + id + ")'></styling-selector>\
  </div></div></div>")(scope);

        return el;
    }

    // adds a new grid to the main grid
    GridFactory.addNewGridElement = function(scope, grid, content) {
        grid = grid || GridFactory.main_grid;
        GridFactory.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
		var el = GridFactory.createElement(scope, GridFactory.counter, content);
        var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
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
         console.log("newgridid", newGridID);
         console.log("nested grids:", GridFactory.nestedGrids);
    }

    GridFactory.removeWidget = function(idNum) {
        var el = $('#' + idNum);
        GridFactory.main_grid.remove_widget(el);
    }

    // ========================= Saving, clearing and loading grids to/from scope (so far) ================================ //
    var userContentRegex = /<div class="lasso-user-content">[\s\S]*?<\/div><div class="lasso-end-user-content"><\/div>/im;

    var getUserContent = function(html) {  // takes a node's innerHTML and isolates user content
      var matches = html.match(userContentRegex);
      if (matches.length == 0) {
        throw new Error("Error - No user content found.");
      } else {
         return matches[0].slice(32, html.length).slice(0, -48);
      }
    };

    GridFactory.saveGrid = function(user) {

        GridFactory.nestedGrids["main-grid"] = GridFactory.main_grid;
        console.log("select", $('.grid-stack .grid-stack-item:visible'))

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

        // ==== saving to the backend ====
        // need to review our models, too many circular references. For now:
        //      create project
        //      create page with the project's id
        //      add the page to the project's array of pages?
        //      add the project to the user's array of projects?

        // just creating a new project each time for now to test saving
        // Should instead create one with a user inputted name and save that one until they close it
        // same with the page - don't create a new one each time

        // ProjectFactory.createProject("project"+$scope.counter, $scope.user._id)
        // .then (function (project){
        //     console.log("project", project);
        //     $scope.project = project; // store newly created project on scope
        //     $scope.user.projects.push(project._id); // add that project id to the user on scope
        //     return UserFactory.saveUser($scope.user) // save the updated user

        // })
        // .then (function (user){
        //     $scope.user = user;
        //     return PageFactory.createPage($scope.project._id, "page"+$scope.counter, $scope.user._id, $scope.savedGrid)
        //     .then (function (page){
        //         $scope.page = page; // store the newly created page on the scope
        //         console.log('saved page', page);
        //         return page;
        //     })
        // })
        // .then (function (page){
        //     $scope.project.pages.push(page._id); // add the newly create page to the project on scope
        //     ProjectFactory.saveProject($scope.project) // save that project to the backend
        //     .then (function (updatedProject){
        //         $scope.project = updatedProject;
        //         console.log("updated project", $scope.project);
        //     })
        // })

        console.log(JSON.stringify(GridFactory.savedGrid));
    }

    GridFactory.clearGrid = function (){
    	GridFactory.main_grid.remove_all();
        GridFactory.nestedGrids = {};
    }


    GridFactory.loadGrid = function (scope){
    	GridFactory.clearGrid();

        // ===== LOAD GRID FROM BACKEND ====
        // need to review this process / user flow for saving and loading from the backend
        // if (_.isEmpty($scope.savedGrid)){
        //     // assuming you must create/load a project and page before you start
        //     if ($scope.project && $scope.user && $scope.page){
        //         $scope.savedGrid = $scope.page.grid;
        //     }

        // }

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


    GridFactory.loadNestedGrid = function (scope, node){
    	 // parentId will be in form of grid#, like grid2
        // assume we always attach a nested grid to a parent grid that has the same id number, so grab the grid with that id number
        var thisWidget = $('#' + node.parentId.slice(4));

        // add a subclass to the parent widget with the actual "grid-#"" id in it.
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      node.parentId + "'></div>")(scope));

        // great a new grid and then save the grid to nestedGrids object on the $scope
        var newGrid = $('#' + node.parentId).gridstack(options).data('gridstack');
        GridFactory.nestedGrids[node.parentId] = newGrid;

        // create a new element using the node and add it to the grid-# parent div with the node's coordinates
        var el = GridFactory.createElement(scope, node.id);
        GridFactory.nestedGrids[node.parentId].add_widget(el, node.x, node.y, node.width, node.height, false);

    }

    return GridFactory;
})
