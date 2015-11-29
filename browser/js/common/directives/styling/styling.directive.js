app.directive("applyStyling", function(){
  return {
    restrict: 'E',
    template: "<button ng-click='getElementToStyle()'><span class='glyphicon glyphicon-pencil'></span></button>",
    link: function(scope, element, attrs){
      scope.getElementToStyle = function(){
        var elementToStyle = $(element).closest(".grid-stack-item-content").find(".lasso-user-content").children()[0];
        scope.styleGroup.push(elementToStyle);
        console.log(scope.styleGroup);
        console.log("THIS HAS BEEN CLICKED!", $(element).closest(".grid-stack-item-content").find(".lasso-user-content").children()
      );
        console.log("CLOSEST USER CONTENT:");
      }
    }
  }
})
