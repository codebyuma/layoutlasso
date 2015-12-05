app.directive("classDisplay", function(StylingFactory, $rootScope){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      $("class-display").on("mouseenter", ".class-selector", function(event){
        console.log(event.target.innerHTML);
        $("." + event.target.innerHTML).addClass("lasso-highlight-class");
      })

      $("class-display").on("mouseleave", ".class-selector", function(event){
        $("." + event.target.innerHTML).removeClass("lasso-highlight-class");
      })

      scope.loadClassForEditing = function(className){
        scope.classEditMode = true;
        scope.newClass.name = className;
        scope.newClass.styles = StylingFactory.convertToEditableObj(className);
        scope.styleMenuOpen = true;
      }

      scope.removeClassStyling = function(className){
        // Removes inline styles and associated class name.
        StylingFactory.addToRemovedClassObj(className);
        StylingFactory.removeStyleClass(className);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
      }

      scope.closeMenu = function(){
        scope.classMenuOpen = false;
      }
    }
  }
})
