app.controller("CreateLayoutCtrl", function($scope, $rootScope, $compile, theUser, GridCompFactory, GridFactory, $uibModal) {

    $scope.user = theUser;
    $scope.project, $scope.page = null;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();
    $scope.save = false;

    //prompt user to create new project and/or page
    $scope.new = function() {
        $scope.promptProjectLoad(true);
    }

    // prompt user to open project and page
    $scope.open = function() {
        $scope.promptProjectLoad(false);
    }

    $scope.promptUserLogin = function() {
        // prompt user to login or sign up first
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/login-modal/login-modal.html",
            controller: "LoginModalCtrl"
        })
    }

    $rootScope.$on('user logged in', function(event, data) {
        $scope.user = data;
    })

    $scope.promptProjectLoad = function(_createProjBool) {
        // open uibmodal to create project and page
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/project-modal/project-modal.html",
            controller: "ProjectModalCtrl",
            resolve: {
                createProjBool: _createProjBool,
                user: function(UserFactory) {
                    return UserFactory.getUser($scope.user._id);
                }
            }
        })
    }


    $scope.addNewGridElement = function(grid, content) {
        GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
        GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget;

    $scope.saveGrid = function() {
        $scope.save = true;
        GridFactory.saveGridLocal(); // sarah should call this directly
        if ($scope.user && $scope.project && $scope.page) {
            GridFactory.saveGridBackend($scope.user, $scope.project, $scope.page);
            $scope.save = false;
        } else {

            if (!$scope.user) {
                $scope.promptUserLogin();
                $rootScope.$on('user logged in', function(event, data) {
                    $scope.user = data;
                    if (!$scope.project) {
                        $scope.promptProjectLoad();
                    }
                })
            } else {
                $scope.promptProjectLoad();
            }
        }
    }

    $scope.promptPageSave = function() {
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/page-modal/page-modal.html",
            controller: "PageModalCtrl",
            resolve: { // getting from factory so we can populate pages
                project: function(ProjectFactory) {
                    return ProjectFactory.getProject($scope.project._id);
                }
            }
        })
    }

    $rootScope.$on('project loaded', function(event, data) {

        // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
        $scope.user = data.user;
        $scope.project = data.proj;
        $scope.page = null;

        console.log("rootscope on. and the project is", $scope.project);

        // open page modal
        // user has option to overwrite page or create new one to save to
        $scope.promptPageSave();



    })

    $rootScope.$on('page loaded', function(event, data) {
        // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
        $scope.page = data.page;
        $scope.project = data.proj;


        // may not want to save the grid every time we load a page? 
        if ($scope.save) {
            GridFactory.saveGridBackend($scope.user, $scope.project, $scope.page);
            $scope.save = false;
        } else {
            GridFactory.savedGrid = [];
            $scope.clearGrid();
            $scope.loadGrid($scope, $scope.page);

        }
    })


    $scope.clearGrid = GridFactory.clearGrid;

    $scope.loadGrid = function() {
        GridFactory.loadGrid($scope, $scope.page);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function() {
        GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
    }


    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})