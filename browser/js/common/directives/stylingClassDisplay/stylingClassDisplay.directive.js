app.directive("classDisplay", function(StylingFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){

      scope.removeClassStyling = function(className){
        // Removes inline styles and associated class name.
        StylingFactory.removeStyleClass(className);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
        console.log(scope.pageStyleSheet);
      }
    }
  }
})
