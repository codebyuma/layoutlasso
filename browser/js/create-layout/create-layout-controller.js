app.controller("CreateLayoutCtrl", function($scope, $compile, AuthService, GridCompFactory, GridFactory) {

    // @OB/ND could use resolve instead
    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
        }
    });

    $scope.main_grid = GridFactory.getMainGrid();

    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content); // @OB/ND we don't think you need to pass scope through (though you'd have to refactor the factory method)
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    // @OB/ND $scope.removeWidget = GridFactory.removeWidget
    $scope.removeWidget = function(idNum) {
       GridFactory.removeWidget(idNum);
    }

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = function() {
        GridFactory.clearGrid();
    }

    $scope.loadGrid = function() {
        GridFactory.loadGrid($scope);
        $scope.nestedGrids = GridFactory.getNestedGrids();
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
