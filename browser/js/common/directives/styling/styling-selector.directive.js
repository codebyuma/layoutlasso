app.directive("stylingSelector", function(){
  return {
    restrict: 'E',
    template: "<button><span class='glyphicon glyphicon-pencil'></span></button>",
    scope: {
      id: "=",
      styleGroup: "="
    },
    link: function(scope, element, attrs){
      element.on("click", function(){
        var parentEl = document.getElementById(""+ scope.id +"");
        var buttonEl = $(parentEl).find("styling-selector").children().first();
        console.log("CURRENT ID:", parentEl, id);
        var elementToStyle = $(parentEl).find(".lasso-user-content").children().first();
        if(elementToStyle.length > 0) {
          if(!scope.styleGroup[id]){
            scope.styleGroup[id] = elementToStyle;
            buttonEl.addClass("style-group-active");
          } else if(scope.styleGroup[id]){
            delete scope.styleGroup[id];
            buttonEl.removeClass("style-group-active");
          }
        }
        console.log(scope.styleGroup);
      }
    }
  }
})
