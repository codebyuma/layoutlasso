app.directive("classDisplay", function(StylingFactory, $rootScope, StyleModeFactory, ClassEditModeFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      scope.removeClassStyling = function(className){
        // Removes inline styles and associated class name.
        StylingFactory.addToRemovedClassObj(className);
        StylingFactory.removeStyleClass(className);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
      }

      scope.closeMenu = function(){
        scope.classMenuOpen = false;
        scope.classEditMode = false;
        scope.currentClassInEdit = null;
        $(".lasso-styling-in-progress").removeClass("lasso-styling-in-progress");
        StyleModeFactory.resetScopeStyleObjs(scope);
      }
    }
  }
})
