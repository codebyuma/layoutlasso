app.controller("CreateLayoutCtrl", function($scope, $compile, AuthService, PageFactory, ProjectFactory, UserFactory, LayoutComponentFactory) {

    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
        }
    });

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
    $scope.savedGrid = [];

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
  <button ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
  <button class='lasso-x' id='lasso-x-btn-"+ id +"' ng-click='addNestedGrid(" +
  id + ")' class='btn btn-default lasso-nest-btn' id='lasso-nest-btn-"+
  id +"'><span class='glyphicon glyphicon-th'></span></button>\
  <styling-selector ng-click='getElementToStyle("+ id +")'></styling-selector>\
  </div></div></div>")($scope);

  return el;
  }



    // adds a new grid to the main grid
    $scope.addNewGridElement = function(grid, content) {
        grid = grid || $scope.main_grid;
        $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
        if (!content)
            var el = createElement($scope.counter);
        else
            var el = createElement($scope.counter, content);
        var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
    }

    $scope.addNavBar = function(){
      // Nav bar can only be added to the main grid...for now.
      var grid = $scope.main_grid
      $scope.counter++;
      /* LayoutComponentFactory just holds code to generate basic HTML and bootstrap components. */
      var el = createElement($scope.counter, LayoutComponentFactory.addNavBar())
      // Navbar takes up whole width of grid.
      var newWidget = grid.add_widget(el, 0, 0, 12, 1, true);
    }

  $scope.text = "x";
  $scope.counter = 0;

    $scope.addNestedGrid = function(id) {
        var thisWidget = $('#' + id);
        console.log("in add nestedgrid, this widget", thisWidget);
        // remove buttons
        $('#lasso-nest-btn-' + id).remove();
        $('#lasso-x-btn-' + id).remove();

        // make selected widget into a grid
        //$scope.grid_counter++;
        var newGridID = "grid" + id; // use the id number of the cell clicked
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
            newGridID + "'></div>")($scope));

        // save the new grid to nestedGrids object on the $scope
        var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
        $scope.nestedGrids[newGridID] = newGrid;

        // add an Add Widget Button to the newly nested grid
        $("#" + id + " .lasso-button-box")
            .append($compile("<button ng-click='addNewGridElement(nestedGrids." + newGridID + ")'>Add Widget</button>")($scope));
    }

    $scope.removeWidget = function(idNum) {
        var el = $('#' + idNum);
        $scope.main_grid.remove_widget(el);
    }



    // ========================= Saving, clearing and loading grids to/from scope (so far) ================================ //
    $scope.saveGrid = function() {

        $scope.nestedGrids["main-grid"] = $scope.main_grid;

        console.log("$scope.savedGrid before", $scope.savedGrid);

        $scope.savedGrid = _.map($('.grid-stack .grid-stack-item:visible'), function(el) {
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

        console.log("$scope.savedGrid after", $scope.savedGrid);

        // ==== saving to the backend ====
        // need to review our models, too many circular references. For now:
        //      create project
        //      create page with the project's id
        //      add the page to the project's array of pages?
        //      add the project to the user's array of projects?

        // just creating a new project each time for now to test saving
        // Should instead create one with a user inputted name and save that one until they close it
        // same with the page - don't create a new one each time

        ProjectFactory.createProject("project"+$scope.counter, $scope.user._id)
        .then (function (project){
            console.log("project", project);
            $scope.project = project; // store newly created project on scope
            $scope.user.projects.push(project._id); // add that project id to the user on scope
            return UserFactory.saveUser($scope.user) // save the updated user

        })
        .then (function (user){
            $scope.user = user;
            return PageFactory.createPage($scope.project._id, "page"+$scope.counter, $scope.user._id, $scope.savedGrid)
            .then (function (page){
                $scope.page = page; // store the newly created page on the scope
                console.log('saved page', page);
                return page;
            })
        })
        .then (function (page){
            $scope.project.pages.push(page._id); // add the newly create page to the project on scope
            ProjectFactory.saveProject($scope.project) // save that project to the backend
            .then (function (updatedProject){
                $scope.project = updatedProject;
                console.log("updated project", $scope.project);
            })
        })

        console.log(JSON.stringify($scope.savedGrid));
    }

    $scope.clearGrid = function() {
        $scope.main_grid.remove_all();
        $scope.nestedGrids = {};
    }

    $scope.loadGrid = function() {
        $scope.clearGrid();

        // ===== LOAD GRID FROM BACKEND ====
        // need to review this process / user flow for saving and loading from the backend
        if (_.isEmpty($scope.savedGrid)){
            // assuming you must create/load a project and page before you start
            if ($scope.project && $scope.user && $scope.page){
                $scope.savedGrid = $scope.page.grid;
            }

        }

        _.each($scope.savedGrid, function(node) {
            if (node.parentId === "main-grid") { // should load main-grid first as it's first in the array
                var el = createElement(node.id, node.content);
                var newWidget = $scope.main_grid.add_widget(el, node.x, node.y, node.width, node.height, false);
            } else {
                // call loadNestedGrid with the node to add
                $scope.loadNestedGrid(node);
           }
        });
        $scope.nestedGrids["main-grid"] = $scope.main_grid; // ===== not sure if I need to do this??????

    }

    $scope.loadNestedGrid = function(node) {
        // parentId will be in form of grid#, like grid2
        // assume we always attach a nested grid to a parent grid that has the same id number, so grab the grid with that id number
        var thisWidget = $('#' + node.parentId.slice(4));

        // add a subclass to the parent widget with the actual "grid-#"" id in it.
        thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      node.parentId + "'></div>")($scope));

        // great a new grid and then save the grid to nestedGrids object on the $scope
        var newGrid = $('#' + node.parentId).gridstack(options).data('gridstack');
        $scope.nestedGrids[node.parentId] = newGrid;

        // create a new element using the node and add it to the grid-# parent div with the node's coordinates
        var el = createElement(node.id);
        $scope.nestedGrids[node.parentId].add_widget(el, node.x, node.y, node.width, node.height, false);

    }

    var userContentRegex = /<div class="lasso-user-content">[\s\S]*?<\/div><div class="lasso-end-user-content"><\/div>/im;

    var getUserContent = function(html) {  // takes a node's innerHTML and isolates user content
      var matches = html.match(userContentRegex);
      if (matches.length == 0) {
        throw new Error("Error - No user content found.");
      } else {
         return matches[0].slice(32, html.length).slice(0, -48);
      }
    };


    // ========================= Converting To HTML ================================ //
      // This section is for creating a clean copy (without Lasso tools) of the layout

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

      $scope.convertToHTML = function() {
    // Use $scope.savedGrid to construct Bootstrap html to export
        console.log("button clicked!");

        _.each($scope.savedGrid, function(node) {
            console.log("node is", node);

            var parent = $scope.nestedGrids[node.parentId];
            console.log("parent is", parent);

            var sz = "md";
            var newHTML = "";

            var rows = parent.grid.width; // ???
            var cols = 0; // idk how to find number of columns
            var span = 0; // number of Bootstrap columns to span across
            var key;

            // generate the html
            newHTML += bits.container;
            for (var i = 0; i < rows; i++) {
                newHTML += bits.row;
                for (var j = 0; j < cols; j++){
                    // check the hash obj
                    key = "r" + i + "c" + j;
                    newHTML += colMaker(sz, span);
                    if (coordinateHash.hasOwnProperty(key)) { // add content
                        newHTML += coordinateHash[key];
                    }
                    newHTML += bits.close;
                }
                newHTML += bits.close;
            }
            newHTML += bits.close;

        });


      }




    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})
