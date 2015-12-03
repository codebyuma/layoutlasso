app.directive("stylingSelector", function($rootScope){
  return {
    restrict: 'E',
    template: "<button><span class='glyphicon glyphicon-pencil'></span></button>",
    link: function(scope, element, attrs){
      var findButton = function(parent){
        return $(parent).find("styling-selector").children().first();
      }

      var getElementToStyle = function(parent){
        return $(parent).find(".lasso-user-content").children().first();
      }

      var styleGroupPopulated = function(){
        // Check if style group populated and return boolean.
        console.log(Object.keys(scope.styleGroup));
        return Object.keys(scope.styleGroup).length === 0;
      }

      element.on("click", function(event){
        var styleSelector = $(this).data("styleSelectorRef");
        var parentEl = document.getElementById(styleSelector);
        var buttonEl = findButton(parentEl);
        var elementToStyle = getElementToStyle(parentEl);

        if(elementToStyle.length > 0) {
          if(styleGroupPopulated()){
            scope.styleMenuOpen = true;
            $rootScope.$digest();
          }
          if(!scope.styleGroup[styleSelector]){
            scope.styleGroup[styleSelector] = elementToStyle;
            buttonEl.addClass("style-group-active")
          } else if(scope.styleGroup[styleSelector]){
            delete scope.styleGroup[styleSelector];
            buttonEl.removeClass("style-group-active")
          }
        }
      })
    }
  }
})
