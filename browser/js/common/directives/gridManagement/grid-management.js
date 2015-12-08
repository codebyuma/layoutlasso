app.directive('gridManagement', function ($rootScope, StyleModeFactory, GridFactory, NestedStylingFactory, ModalFactory, StylingFactory, StyleSaveLoadFactory) {
	return {
		restrict: "E",
		templateUrl: "js/common/directives/gridManagement/grid-management.html",
		link: function (scope) {

			$("")

			scope.clearGrid = function(){
		    	StyleModeFactory.deactivateStyleMode(scope);
      			GridFactory.clearGrid();
      			scope.nestedGrids = GridFactory.getNestedGrids();
    			scope.pageStyleSheet = [];
    		}

		    scope.saveGrid = function() {
		        scope.save = true; // flag indicates user has hit save button (used in promptProjectPage to determine if to save the page after loading it)
		        NestedStylingFactory.clearNestedStyling(); // Clear any nested styling classes from DOM.
		        StyleSaveLoadFactory.removeElementSelectedClassOnSave("lasso-styling-in-progress");
		        GridFactory.saveGridLocal(); // save the grid to scope
		        if (scope.user && $rootScope.project && $rootScope.page) {
		            GridFactory.saveGridBackend($rootScope.page)
		        } else {
		            if (!scope.user) {
		                scope.promptUserLogin();
		                ModalFactory.userLoginModal.result.then(function(user) {
		                    scope.user = user;
		                    if (!rootScope.project) {
		                        scope.promptProjectLoad();
		                    }
		                })
		            } else {
		                scope.promptProjectLoad();
		            }
		        }
		        if(scope.stylingModeActive){
		          NestedStylingFactory.findEditableLayer($("#main-grid"), ".grid-stack-item");
		        }
		    }

		    scope.loadGrid = function() {
		        GridFactory.loadGrid(scope, scope.page);
		        scope.nestedGrids = GridFactory.getNestedGrids();
		        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
		        if(scope.styleModeActive) NestedStylingFactory.findEditableLayer();
		    }

		}
	}
})
