app.controller("CreateLayoutCtrl", function($scope, AUTH_EVENTS, AuthService, $rootScope, theUser, growl, GridCompFactory, GridFactory, ExportFactory, BrowserifyFactory, StyleSaveLoadFactory, StylingFactory, ModalFactory, StyleModeFactory, NestedStylingFactory, LassoButtonBoxFactory, ClassEditModeFactory) {


    $scope.user = theUser;
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
    // Boolean to indicate whether css styling mode is active
    $scope.stylingModeActive = false;

    $scope.currentClassInEdit = null;

    $scope.isSelectedClassToEdit = function(targetClass){
      return $scope.currentClassInEdit === targetClass;
    }


    // Toggle styling mode on or off. Thsi activates event listeners for style actions.
    $scope.toggleStyleMode = function(){
      StyleModeFactory.toggleStyleModeActions($scope);
      return;
    }

    LassoButtonBoxFactory.initEvents();

    GridFactory.init();

    $rootScope.project, $rootScope.page = null;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.save = false;
    $scope.change, $scope.message = null;

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
        $scope.user = null;
        $scope.closeAll();
    })

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data){
         AuthService.getLoggedInUser().then(function (user) {
              $scope.user = user;
         });
    })

    // ==== Loading, Creating and Saving Projects and Pages ===== //

    //new button - prompt user to create new project and/or page
    $scope.new = function() {
        if (!$scope.user) {
            $scope.promptUserLogin();
            ModalFactory.userLoginModal.result.then(function(user) {
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
            ModalFactory.userLoginModal.result.then(function(user) {
                $scope.promptProjectLoad(false); // false is used in the modal to show 'select project and create project'
            })
        } else {
            $scope.promptProjectLoad(false);
        }
    }

    // close button - prompt user to ask if they want to save the page first or not before closing
    $scope.close = function() {
        ModalFactory.launchCloseModal($scope);
        ModalFactory.closeModal.result.then(function(save) {
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
        $rootScope.page = data;
        $scope.save = false; // once GridFactory.saveGridBackend completes, update save flag on scope
        growl.success("Page saved!");

        if ($scope.closeSave) { // if we're supposed to close the project after the save, close it
            $scope.closeAll();
            $scope.closeSave = false;
        }
    })

    // clear and close all items on scope
    $scope.closeAll = function() {
        $rootScope.project = null;
        $rootScope.page = null;
        StyleModeFactory.deactivateStyleMode($scope);
        StyleSaveLoadFactory.resetStylesOnClose($scope);
        GridFactory.clearSavedGrid();
        $scope.clearGrid();
    }

    // prompt user to login or sign up
    $scope.promptUserLogin = function() {
        ModalFactory.launchUserLoginModal($scope)
        ModalFactory.userLoginModal.result.then(function(user) {
            $scope.user = user;
        })
    }

    // prompt user to create or select a project
    $scope.promptProjectLoad = function(_createProjBool) {
        ModalFactory.launchProjectLoadModal($scope, _createProjBool)
        ModalFactory.projectLoadModal.result.then(function(data) {
            $scope.user = data.user;
            $rootScope.project = data.project;
            // if they load a project, they then need to select a page next. So set the page on scope to null
            $rootScope.page = null;
            $scope.promptPageLoad(); // now that a project has loaded, prompt the user to create or load a page
        })

    }

    // prompt user to create or select a page to load/save
    $scope.promptPageLoad = function() {
        ModalFactory.launchPageLoadModal($scope)
        ModalFactory.pageLoadModal.result.then(function(data) {
            $rootScope.page = data.page;
            $rootScope.project = data.project;
            if ($scope.save) { // only save if the user has clicked save (vs. when loading a page)
                GridFactory.saveGridBackend($rootScope.page);
                $scope.save = false;
            } else { // if we're not in a save flow, then reset the items on scope and then load the grid for the loaded page
                StyleModeFactory.deactivateStyleMode($scope);
                StylingFactory.resetCurrentStyleSheetObjs();
                GridFactory.savedGrid = [];
                $scope.clearGrid();
                $scope.loadGrid($scope, $rootScope.page);
                StyleSaveLoadFactory.stylingToLoadFromBackend($rootScope.page.css)
                $scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
            }
        })
    }


    // ==== Modifying the grid on scope ===== //

    $scope.addNewGridElement = function(grid, content) {
        GridFactory.addNewGridElement($scope, grid, content);
        if($scope.stylingModeActive) StyleModeFactory.resetEditableLayers($scope); // Rescan GRID for editable layers if style mode active.
    }

    $scope.addNestedGrid = function(id) {
        GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = function(id, gridID){
      GridFactory.removeWidget(id, gridID, $scope);
      StyleModeFactory.resetEditableLayers($scope);
    }

    $scope.showGridManagement = false;
    $scope.toggleGridManagement = function () {
        $scope.showGridManagement = !$scope.showGridManagement;
        return;
    }


    //===== Templates ===== //

    $scope.loadTemplates = function () {
        ModalFactory.launchTemplatesLoadModal($scope)
        ModalFactory.templateModal.result.then(function(selectedItem){
            GridFactory.clearSavedGrid();
            GridFactory.loadGrid($scope, selectedItem);
            $scope.nestedGrids = GridFactory.getNestedGrids();
        })
        // If style mode is active, scan grid and show editable layer.
        if($scope.styleModeActive) NestedStylingFactory.findEditableLayer();

    }

    //===== Exporting ===== //
    $scope.exportHTML = function() {

        var pageName, projectName, filename;
        // Clear styling if trying to export in styling mode.
        if($scope.stylingModeActive) NestedStylingFactory.clearNestedStyling();
        StyleSaveLoadFactory.removeInlineStylingForHtmlExport();
        GridFactory.saveGridLocal();

        if ($rootScope.page && $rootScope.project){
            pageName = $rootScope.page.name.replace(/\s/g, '');
            projectName = $rootScope.project.name.replace(/\s/g, '');
            filename = projectName + "-" + pageName;
        } else {
            filename="layoutlasso"
        }

        var html = ExportFactory.convertToHTML();
        var css = ExportFactory.produceStyleSheet();

        if (css){
            html = ExportFactory.convertToHTML('<link rel="stylesheet" href="' + filename + ".css" + '">');
        }

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
            a.download = filename + ".html";
            a.click(); // simulates the launch
            window.URL.revokeObjectURL(url);
        }
        if(css){
          var cssBlob = new Blob([css], {
            type: "text/css"
          });
          var cssUrl = window.URL.createObjectURL(cssBlob);
          var b = document.createElement("a");
          b.href = cssUrl;

          b.download = filename + ".css";

          b.click();
          window.URL.revokeObjectURL(cssUrl);
        }
        StyleSaveLoadFactory.stylingBeforeClearToReload();
        if($scope.stylingModeActive) NestedStylingFactory.findEditableLayer($("#main-grid"), ".grid-stack-item");
    };

    $scope.gridEmpty = function() {
        return $scope.nestedGrids['main-grid'].grid.nodes.length == 0;
    }

    //===== Edit HTML ===== //
    $scope.animationsEnabled = true;

    $scope.editHTML = function(id) {
       ModalFactory.launchEditHtmlModal($scope, id);
       ModalFactory.editHtmlModal.result.then(function (newContent) {
         GridFactory.recreateWidget($scope, id, newContent);
       });
    };

    //====================== //

    // ========== Function to open class edit menu  and intiate event listeners. ========== */

    $scope.showClassPanel = function(){
      if($scope.classMenuOpen){
        ClassEditModeFactory.removeClassEditEventListeners($scope);
        $scope.classMenuOpen = !$scope.classMenuOpen;
      } else {
        $scope.classMenuOpen = !$scope.classMenuOpen;
        ClassEditModeFactory.initClassEditEventListeners($scope);
      }
    }

    //===== Components ===== //
    $scope.addNavBar = function() {
        GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.incrementCounter());
    }

    $scope.addComponents = function(id) {
      // launch modal so user can select components to add to a widget
      ModalFactory.launchAddComponentsModal($scope, id);
      ModalFactory.addComponentsModal.result.then(function(component){
          // append the selected component to the DOM
          if(component[1] == "button"){
            GridCompFactory.addButton($scope, component[0], component[2]);
          } else if (component[1] == 'image'){
            GridCompFactory.addImage($scope, component[0], component[2]);
          } else if (component[1] == 'video'){
            GridCompFactory.addVideo($scope, component[0], component[2]);
          } else if (component[1] === "inputForm") {
            GridCompFactory.addInputForm($scope, component[0]);
          } else if (component[1] === "list") {
            GridCompFactory.addList($scope, component[0]);
          } else if (component[1] === "jumbotron") {
            GridCompFactory.addJumbotron($scope, component[0]);
          } else if (component[1] === "panel") {
            GridCompFactory.addPanel($scope, component[0], component[2]);
          }
      })
    }

    $scope.addButtonToMain = function(type) {
        GridCompFactory.addButton($scope, GridFactory.main_grid, type);
        // Re-render editable layer on componenet addition.
        // StyleModeFactory.resetEditableLayers($scope);
      }

    $scope.addButton = function(type) {
        GridCompFactory.addButton($scope, GridFactory.incrementCounter(), type);
    }

    $scope.addVideo = function (url) {
        GridCompFactory.addVideo($scope, GridFactory.main_grid, GridFactory.incrementCounter(), url)
    }

    $scope.addImage = function (url) {
        GridCompFactory.addImage($scope, GridFactory.main_grid, GridFactory.incrementCounter(), url)
    }


})
