app.controller("CreateLayoutCtrl", function($scope, $rootScope, $compile, theUser, GridCompFactory, GridFactory, $uibModal) {

    $scope.user = theUser;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.testModal = function (){
        $uibModal.open({
                animation: $scope.animationEnabled,
                templateUrl: "/js/login-modal/login-modal.html",
                controller: "LoginModalCtrl"
                // resolve: {
                //     product: function(){
                //         return theProduct
                //     },
                //     user : function(){
                //     return $scope.user;
                //   }
                // }
            })
    }

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget; 

    $scope.saveGrid = function (){
      GridFactory.saveGridLocal();
      if ($scope.user){
        GridFactory.saveGridBackend($scope);
      } else {
        // prompt user to login or sign up first
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/login-modal/login-modal.html",
            controller: "LoginModalCtrl"
        })
        $rootScope.$on('user logged in', function (event, data){
            $scope.user = data;
            console.log("ANNNND user is in");
            // open uibmodal to create project and page
            $uibModal.open({
                animation: $scope.animationEnabled,
                templateUrl: "/js/project-modal/project-modal.html",
                controller: "ProjectModalCtrl"
             })
        })
      }
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


    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})
