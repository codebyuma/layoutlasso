app.directive("classDisplay", function(StylingFactory){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/stylingClassDisplay/stylingClassDisplay.template.html",
    link: function(scope, element, attrs){
      console.log("PAGE STYLESHEET:", scope);
    }
  }
})
