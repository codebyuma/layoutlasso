app.controller("CreateLayoutCtrl", function($scope, $compile, theUser, GridCompFactory, GridFactory, StylingFactory) {

    $scope.user = theUser;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget;

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = GridFactory.clearGrid;

    $scope.loadGrid = function(){
        GridFactory.loadGrid($scope);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function (){
      GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
    }


    /* ===== GRID STYLING SCOPE OBJECTS  =====*/
    // CSS Setting and Getting on elements

    // This object has elements to be styled assigned to it, with id's as keys.
    $scope.styleGroup = {};

    /* Object to allow two-way binding of css form. Is populated by the directive css-applicator. */
    $scope.newClass = {};

    // Requried for two-way binding of currently applied classes, retrieved from the StylingFactory stylsheet object, re-populated based on other actions applystyling and class-display directives.
    $scope.pageStyleSheet = [];

    $scope.classEditMode = false;

})
