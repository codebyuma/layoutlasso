app.controller("CreateLayoutCtrl", function($scope, $compile, AuthService, GridCompFactory, GridFactory) {

    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
        }
    });

    $scope.main_grid = GridFactory.main_grid;


    // key is the gridId, value is the grid object
    $scope.nestedGrids = GridFactory.nestedGrids;

    $scope.updateLocalGrids = function (){
        $scope.nestedGrids = GridFactory.nestedGrids;
        $scope.main_grid = GridFactory.main_grid;
    }

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
      $scope.updateLocalGrids();
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
       $scope.updateLocalGrids();
    }

    $scope.removeWidget = function(idNum) {
       GridFactory.removeWidget(idNum);
       $scope.updateLocalGrids();
    }

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }


    $scope.clearGrid = function() {
        GridFactory.clearGrid();
        $scope.updateLocalGrids();
    }

    $scope.loadGrid = function() {
        GridFactory.loadGrid($scope);
        $scope.updateLocalGrids();
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function (){
      GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
    }


    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})
