
app.controller("CreateLayoutCtrl", function($scope, $rootScope, $compile, theUser, GridCompFactory, GridFactory, $uibModal, ExportFactory) {


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

    $scope.close = function() {
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/close-modal/close-modal.html",
            controller: "CloseModalCtrl"
        })
        $rootScope.$on('close-save', function(event, data) {
            if (data.save) {
                $scope.closeSave = true;
                $scope.saveGrid();
            } else {
                $scope.closeAll();
            }
        })
    }

    $rootScope.$on('saved', function(event, data) {
        if ($scope.closeSave) {
            $scope.closeAll();
            $scope.closeSave = false;
        }
    })

    $scope.closeAll = function() {
        $scope.project = null;
        $scope.page = null;
        GridFactory.savedGrid = [];
        $scope.clearGrid();
    }

    // prompt user to login or sign up
    $scope.promptUserLogin = function() {
        $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/login-modal/login-modal.html",
            controller: "LoginModalCtrl"
        })
    }

    $rootScope.$on('user logged in', function(event, data) {
        $scope.user = data;
    })

    // prompt user to create a project and then a page within it 
    $scope.promptProjectLoad = function(_createProjBool) {
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

    $rootScope.$on('project loaded', function(event, data) {
        // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
        $scope.user = data.user;
        $scope.project = data.proj;
        $scope.page = null; // if they load a project, they then need to select a page. so set the page on scope to null

        // user has option to overwrite page or create new one to save to
        $scope.promptPageLoad();

    })

    // prompt user to create or select a page to load/save
    $scope.promptPageLoad = function() {
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


    $scope.clearGrid = GridFactory.clearGrid;

    $scope.loadGrid = function() {
        GridFactory.loadGrid($scope, $scope.page);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Exporting ===== //
    // TODO disable button if grid is empty

    var beautify = require('js-beautify').html;

    $scope.exportHTML = function(){
      GridFactory.saveGridLocal();
      var html = ExportFactory.convertToHTML();
      if (html) {
        html = beautify(html, { indent_size: 4 });
        $scope.convertedHTML = html;

        var htmlBlob = new Blob([html], {type : 'text/html'});
        var url = window.URL.createObjectURL(htmlBlob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "layoutlasso.html";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };

    $scope.gridEmpty = function() {
      return $scope.nestedGrids['main-grid'].grid.nodes.length == 0;
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