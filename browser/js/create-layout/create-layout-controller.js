app.controller("CreateLayoutCtrl", function($scope, $rootScope, $compile, theUser, GridCompFactory, GridFactory, $uibModal) {

    $scope.user = theUser;
    $scope.project, $scope.page = null;
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
      GridFactory.saveGridLocal(); // sarah should call this directly
      if ($scope.user && $scope.project){
        GridFactory.saveGridBackend($scope);
      } else {
        if (!$scope.user){
            // prompt user to login or sign up first
            $uibModal.open({
                animation: $scope.animationEnabled,
                templateUrl: "/js/login-modal/login-modal.html",
                controller: "LoginModalCtrl"
            })
        
            $rootScope.$on('user logged in', function (event, data){
                $scope.user = data;
                console.log("ANNNND user is in");
                if (!$scope.project){
                    // open uibmodal to create project and page
                    $uibModal.open({
                        animation: $scope.animationEnabled,
                        templateUrl: "/js/project-modal/project-modal.html",
                        controller: "ProjectModalCtrl",
                        resolve: {
                            user: function (UserFactory){
                                return UserFactory.getUser($scope.user._id);
                            }
                        }
                     })
                }
            })
        } else {
            // open uibmodal to create project and page
                    $uibModal.open({
                        animation: $scope.animationEnabled,
                        templateUrl: "/js/project-modal/project-modal.html",
                        controller: "ProjectModalCtrl",
                        resolve: { // getting from factory so we can populate projects
                            user: function (UserFactory){
                                return UserFactory.getUser($scope.user._id);
                            }
                        }
                     })
        }
      }
    }

    $rootScope.$on('project loaded', function (event, data){            
             console.log("dataaaaa", data)
            // update the user and project on scope
            // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
            $scope.user = data.user;
            $scope.project = data.proj;
            console.log("rootscope on. and the project is", $scope.project);
            // call GridFactory.saveGridBackend($scope);??

            if (!$scope.page){
                // open page modal
                $uibModal.open({
                        animation: $scope.animationEnabled,
                        templateUrl: "/js/page-modal/page-modal.html",
                        controller: "PageModalCtrl",
                        resolve: { // getting from factory so we can populate pages
                            project: function (ProjectFactory){
                                return ProjectFactory.getProject($scope.project._id);
                            }
                        }
                     })
            }

     })

    $rootScope.$on('page loaded', function (event, data){            
            // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
            $scope.page = data.page;
            $scope.project = data.proj;
            // call GridFactory.saveGridBackend($scope);??
     })


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
