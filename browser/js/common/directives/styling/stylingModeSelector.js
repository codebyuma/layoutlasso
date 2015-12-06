app.directive("stylingModeSelector", function($rootScope){
  return {
    restrict: 'E',
    link: function(scope, element, attrs){

      element.on("click", function(event){
        scope.toggleStyleMode();
        if(scope.stylingModeActive){
          $(element).addClass("style-mode-active");
        } else {
          $(element).removeClass("style-mode-active");
        }
        $rootScope.$digest();
      })
    }
  }
})
