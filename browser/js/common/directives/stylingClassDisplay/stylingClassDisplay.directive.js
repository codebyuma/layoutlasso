app.directive("classDisplay", function(StylingFactory, $rootScope, StyleModeFactory, ClassEditModeFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      scope.toggleClassForEditing = function(className){
        console.log("THIS EVENT: ", event);
        if(!scope.classEditMode){
          scope.classEditMode = true;
          scope.newClass.name = className;
          scope.newClass.styles = StylingFactory.convertToEditableObj(className);
          scope.styleMenuOpen = true;
          StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
        } else {
          StyleModeFactory.resetScopeStyleObjs(scope, true);
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
        ClassEditModeFactory.removeClassEditEventListeners();
        StyleModeFactory.resetScopeStyleObjs(scope);
      }
    }
  }
})
