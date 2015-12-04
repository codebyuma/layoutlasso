app.controller("CreateLayoutCtrl", function($scope, $rootScope, theUser, GridCompFactory, GridFactory, $uibModal, ExportFactory, $timeout, BrowserifyFactory, StyleSaveLoadFactory, StylingFactory, TemplateFactory) {

    GridFactory.init();
    $scope.user = theUser;
    $scope.project, $scope.page = null;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.save = false;
    $scope.change, $scope.message = null;

    $rootScope.$on('user logged out', function(event, data) {
        $scope.user = null;
        $scope.closeAll();
    })

    // helper function to show message on screen for 2 seconds (ex. save confirmation)
    $scope.showMessage = function(_message) {
        $scope.message = _message;
        $scope.change = true; // trigger confirmation message on the page

        $timeout(function() {
            $scope.change = false;
            $scope.message = false;
        }, 2000);

    }

    // ==== Loading, Creating and Saving Projects and Pages ===== //

    //new button - prompt user to create new project and/or page
    $scope.new = function() {
        if (!$scope.user) {
            $scope.promptUserLogin();
            $scope.userLoginModal.result.then(function(user) {
                $scope.promptProjectLoad(true); // true is used in the modal to show 'create project' only
            })
        } else {
            $scope.promptProjectLoad(true);
        }
    }

    // open button - prompt user to open project and page
    $scope.open = function() {
        if (!$scope.user) {
            $scope.promptUserLogin();
            $scope.userLoginModal.result.then(function(user) {
                $scope.promptProjectLoad(false); // false is used in the modal to show 'select project and create project'
            })
        } else {
            $scope.promptProjectLoad(false);
        }
    }

    // close button - prompt user to ask if they want to save the page first or not before closing
    $scope.close = function() {
        var closeModal = $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/close-modal/close-modal.html",
            controller: "CloseModalCtrl"
        })

        closeModal.result.then(function(save) {
            if (save) {
                $scope.closeSave = true; // flag to indicate that project and page should be removed from scope after we save
                $scope.saveGrid();
            } else {
                $scope.closeAll();
            }

        })
    }

    // this broadcast comes from GridFactory.saveGridBackend
    $rootScope.$on('saved', function(event, data, $timeout) {
        $scope.showMessage("Page saved");

        if ($scope.closeSave) { // if we're supposed to close the project after the save, close it
            $scope.closeAll();
            $scope.closeSave = false;
        }
    })

    // clear and close all items on scope
    $scope.closeAll = function() {
        $scope.project = null;
        $scope.page = null;
        StyleSaveLoadFactory.resetStylesOnClose($scope);
        GridFactory.clearSavedGrid();
        $scope.clearGrid();
    }

    // prompt user to login or sign up
    $scope.promptUserLogin = function() {
        $scope.userLoginModal = $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/login-modal/login-modal.html",
            controller: "LoginModalCtrl"
        })
        $scope.userLoginModal.result.then(function(user) {
            $scope.user = user;
        })
    }

    // prompt user to create or select a project
    $scope.promptProjectLoad = function(_createProjBool) {
        var projectLoadModal = $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/project-modal/project-modal.html",
            controller: "ProjectModalCtrl",
            resolve: {
                createProjBool: _createProjBool, // boolean used to indicate what to ngshow in the modal
                user: function(UserFactory) { // get user again to have projects populated
                    if ($scope.user)
                        return UserFactory.getUser($scope.user._id);
                }
            }
        })

        projectLoadModal.result.then(function(data) {
            // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
            $scope.user = data.user;
            $scope.project = data.project;
            $scope.page = null; // if they load a project, they then need to select a page next. So set the page on scope to null
            $scope.promptPageLoad(); // now that a project has loaded, prompt the user to create or load a page
        })

    }

    // prompt user to create or select a page to load/save
    $scope.promptPageLoad = function() {
        var pageLoadModal = $uibModal.open({
            animation: $scope.animationEnabled,
            templateUrl: "/js/page-modal/page-modal.html",
            controller: "PageModalCtrl",
            resolve: { // getting from factory so we can populate pages in the project
                project: function(ProjectFactory) {
                    return ProjectFactory.getProject($scope.project._id);
                }
            }
        })

        pageLoadModal.result.then(function(data) {
            // DO WE WANT TO ADD THIS TO THE SESSION SO IT PERSISTS?
            $scope.page = data.page;
            $scope.project = data.project;
            if ($scope.save) { // only save if the user has clicked save (vs. when loading a page)
                GridFactory.saveGridBackend($scope.page);
                $scope.save = false;
            } else { // if we're not in a save flow, then reset the items on scope and then load the grid for the loaded page
                StylingFactory.resetCurrentStyleSheetObjs();
                GridFactory.savedGrid = [];
                $scope.clearGrid();
                $scope.loadGrid($scope, $scope.page);
                StyleSaveLoadFactory.stylingToLoadFromBackend($scope.page.css)
                $scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
            }
        })
    }


    // ==== Modifying the grid on scope ===== //

    $scope.addNewGridElement = function(grid, content) {
        GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
        GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget;

    $scope.saveGrid = function() {
        $scope.save = true; // flag indicates user has hit save button (used in promptProjectPage to determine if to save the page after loading it)
        GridFactory.saveGridLocal(); // save the grid to scope
        if ($scope.user && $scope.project && $scope.page) {
            GridFactory.saveGridBackend($scope.page);
            $scope.save = false;
        } else {
            if (!$scope.user) {
                $scope.promptUserLogin();
                $scope.userLoginModal.result.then(function(user) {
                    $scope.user = user;
                    if (!$scope.project) {
                        $scope.promptProjectLoad();
                    }
                })
            } else {
                $scope.promptProjectLoad();
            }
        }
    }

    $scope.clearGrid = function(){
      GridFactory.clearGrid();
      $scope.pageStyleSheet = [];
    }

    $scope.loadGrid = function() {
        GridFactory.loadGrid($scope, $scope.page);
        $scope.nestedGrids = GridFactory.getNestedGrids();
        $scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
    }

    //===== Templates ===== //

    $scope.loadTemplates = function () {
        var templateModal = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/template-modal/template-modal.html',
            controller: 'templateModalCtrl',
            resolve: {
                allTemplates: function(TemplateFactory){
                    return TemplateFactory.getAll();
                }
            }
        })

        templateModal.result.then(function(selectedItem){
            if(!selectedItem){
                console.log('No template selected');
            }
            console.log("selected template in layout ctrl", selectedItem._id)
            // $scope.selectedTemplate = selectedItem;
            GridFactory.clearSavedGrid();
            GridFactory.loadGrid($scope, selectedItem);
        })
    }


    //===== Exporting ===== //
    $scope.exportHTML = function() {
        StyleSaveLoadFactory.removeInlineStylingForHtmlExport();
        GridFactory.saveGridLocal();
        var html = ExportFactory.convertToHTML();
        var css = ExportFactory.produceStyleSheet();
        if (html) {
            html = BrowserifyFactory.beautifyHTML(html, {
                indent_size: 4
            });
            $scope.convertedHTML = html;

            var htmlBlob = new Blob([html], {
                type: 'text/html'
            });
            var url = window.URL.createObjectURL(htmlBlob);
            var a = document.createElement("a");
            a.href = url;
            if ($scope.page && $scope.project){
                a.download = $scope.project.name + "-" + $scope.page.name + ".html";
            } else {
                a.download = "layoutlasso.html";
            }
            a.click();
            window.URL.revokeObjectURL(url);
        }
        if(css){
          var cssBlob = new Blob([css], {
            type: "text/css"
          });
          var cssUrl = window.URL.createObjectURL(cssBlob);
          var b = document.createElement("a");
          b.href = cssUrl;
          if ($scope.page && $scope.project){
            b.download = $scope.project.name + "-" + $scope.page.name + ".css";
          } else {
            b.download = "layoutlassoStylesheet.css";
          }
          b.click();
          window.URL.revokeObjectURL(cssUrl);
        }
        StyleSaveLoadFactory.stylingBeforeClearToReload();
    };

    $scope.gridEmpty = function() {
        return $scope.nestedGrids['main-grid'].grid.nodes.length == 0;
    }

    //===== Edit HTML ===== //
    $scope.animationsEnabled = true;

    $scope.editHTML = function(id) {
         var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: '/js/create-layout/edit-html-modal.html',
         controller: 'EditHTMLModalCtrl',
         resolve: {
           content: function () {
             return GridFactory.getWidgetContentById(id);
           }
         }
       });
       modalInstance.result.then(function (newContent) {
         GridFactory.recreateWidget($scope, id, newContent);
       });
    };
    //====================== //

    $scope.showClassPanel = function(){
      $scope.classMenuOpen = !$scope.classMenuOpen;
    }


    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function() {
        GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.incrementCounter());
    }


    /* ===== GRID STYLING SCOPE OBJECTS  =====*/
    // CSS Setting and Getting on elements

    // This object has elements to be styled assigned to it, with id's as keys.
    $scope.styleGroup = {};

    /* Object to allow two-way binding of css form. Is populated by the directive css-applicator. */
    $scope.newClass = {};

    /* Requried for two-way binding of currently applied classes, retrieved from the StylingFactory stylsheet object, re-populated based on other actions applystyling and class-display directives. */
    $scope.pageStyleSheet = [];

    // boolean to define whether a style is being updated;
    $scope.classEditMode = false;
    // Boolean to indicate whether the css styling menu is open or not.
    $scope.styleMenuOpen = false;
    // Boolean to indicate if class menu is open or not.
    $scope.classMenuOpen = false;
})
