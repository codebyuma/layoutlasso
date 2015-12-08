app.directive("stylingModeSelector", function($rootScope){
  return {
    restrict: 'E',
    template: "<button class='btn lasso-toolbar-btn elements'>Styling Mode</button>",
    link: function(scope, element, attrs){

      element.on("click", function(event){
        scope.toggleStyleMode();
        if(scope.stylingModeActive){
          $(element).children("button").addClass("style-mode-active");
          $(element).children("button").text("Exit Styling");
        } else {
          $(element).children("button").removeClass("style-mode-active");
          $(element).children("button").text("Styling Mode");
        }
        $rootScope.$digest();
      })
    }
  }
})
