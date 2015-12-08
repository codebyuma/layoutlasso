app.directive("stylingModeSelector", function($rootScope){
  return {
    restrict: 'E',
    link: function(scope, element, attrs){

      element.on("click", function(event){
        scope.toggleStyleMode();
        if(scope.stylingModeActive){
          $(element).addClass("style-mode-active");
          $(element).text("Exit Styling");
        } else {
          $(element).removeClass("style-mode-active");
          $(element).text("Styling Mode");
        }
        $rootScope.$digest();
      })
    }
  }
})
