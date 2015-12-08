app.directive("classDisplay", function(StylingFactory, $rootScope, StyleModeFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      // $("class-display").on("mouseenter", ".class-selector", function(event){
      //   console.log(event.target.innerHTML);
      //   $("." + event.target.innerHTML).addClass("lasso-highlight-class");
      // })
      //
      // $("class-display").on("mouseleave", ".class-selector", function(event){
      //   $("." + event.target.innerHTML).removeClass("lasso-highlight-class");
      // })
      //
      // $("class-display").on("click", ".class-selector", function(event){
      //   var self  = $(this);
      //   var targetSelector = "lasso-editing-class";
      //   if(self.hasClass(targetSelector)){
      //     self.removeClass(targetSelector);
      //     StyleModeFactory.resetScopeStyleObjs(scope, true);
      //     $rootScope.$digest();
      //   } else {
      //     // Remove styling from any other selected items first.
      //     $(targetSelector).removeClass(targetSelector);
      //     self.addClass(targetSelector);
      //   }
      // })

      scope.loadClassForEditing = function(className){
        scope.classEditMode = true;
        scope.newClass.name = className;
        scope.newClass.styles = StylingFactory.convertToEditableObj(className);
        scope.styleMenuOpen = true;
        StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
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
