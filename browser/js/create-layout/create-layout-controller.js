app.controller("CreateLayoutCtrl", function($scope, $compile, AuthService, GridCompFactory, GridFactory) {

    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
        }
    });

    $scope.main_grid = GridFactory.getMainGrid();

    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = function(idNum) {
       GridFactory.removeWidget(idNum);
    }



    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = function() {
        GridFactory.clearGrid();
    }

    $scope.loadGrid = function(){
        GridFactory.loadGrid($scope);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function (){
      GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
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

      // Strategy - find all things with the same parent..
      // make container/rows/cols for that parent.
      // start innermost..?

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
                    // make column
                    newHTML += colMaker(sz, span);
                    // add content to column
                    newHTML += node.content;
                    // close column
                    newHTML += bits.close;
                } // close row
                newHTML += bits.close;
            } // close container
            newHTML += bits.close;

        });


      }

    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})
