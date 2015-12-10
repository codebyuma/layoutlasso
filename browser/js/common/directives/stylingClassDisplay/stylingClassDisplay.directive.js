app.directive("classDisplay", function(StylingFactory, $rootScope, StyleModeFactory, ClassEditModeFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      /* INTENT IS TO REFACTOR ALL THIS JQUERY MESS INTO A PROPER DIRECTIVE FOR EACH CLASS ON THE MENU */
      scope.toggleClassForEditing = function(className){
        var self = $(event.target); /* event is passed into scope of directive implicitly from ng-click directive on element. Use this to get current element clicked on and then convert to jQuery object to add styling. */
        if(!scope.classEditMode){
          scope.classEditMode = true;
          scope.currentClassInEdit = self.data("class-name");
          scope.newClass.name = className;
          scope.newClass.styles = StylingFactory.convertToEditableObj(className);
          scope.styleMenuOpen = true;
          StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
          self.addClass("lasso-editing-class");

        } else {
          /* If element hit by ng-click event*/
          if(self.hasClass("lasso-editing-class")){
            $(".lasso-editing-class").removeClass("lasso-editing-class");
            // Deactivate edit mode and remove styling from staging menu.
            StyleModeFactory.resetScopeStyleObjs(scope, true);
            scope.classEditMode = false;
          } else {
            $(".lasso-editing-class").removeClass("lasso-editing-class");
            self.addClass("lasso-editing-class");
            StyleModeFactory.resetScopeStyleObjs(scope, true);
            scope.classEditMode = true;
            scope.newClass.name = className;
            scope.newClass.styles = StylingFactory.convertToEditableObj(className);
            StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
          }
        }
      }

      scope.removeClassStyling = function(className){
        // Removes inline styles and associated class name.
        StylingFactory.addToRemovedClassObj(className);
        StylingFactory.removeStyleClass(className);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
      }

      scope.closeMenu = function(){
        scope.classMenuOpen = false;
        scope.classEditMode = false;
        $(".lasso-styling-in-progress").removeClass("lasso-styling-in-progress");
        $(".lasso-editing-class").removeClass("lasso-editing-class");
        StyleModeFactory.resetScopeStyleObjs(scope);
      }
    }
  }
})
