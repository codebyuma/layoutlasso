app.directive("classDisplay", function(StylingFactory, $rootScope){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      scope.loadClassForEditing = function(className){
        scope.classEditMode = true;
        scope.newClass.name = className;
        scope.newClass.styles = StylingFactory.convertToEditableObj(className);
        scope.styleMenuOpen = true;
        console.log(scope.newClass);
      }

      scope.removeClassStyling = function(className){
        // Removes inline styles and associated class name.
        StylingFactory.removeStyleClass(className);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
      }

      scope.closeMenu = function(){
        scope.classMenuOpen = false;
      }
    }
  }
})
