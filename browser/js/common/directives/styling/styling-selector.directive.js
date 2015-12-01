app.directive("stylingSelector", function(){
  return {
    restrict: 'E',
    template: "<button><span class='glyphicon glyphicon-pencil'></span></button>",
    link: function(scope, element, attrs){
      element.on("click", function(event){
        var styleSelector = $(this).data("styleSelectorRef");
        var parentEl = document.getElementById(styleSelector);
        var buttonEl = $(parentEl).find("styling-selector").children().first();
        console.log("CURRENT ID:", parentEl, styleSelector);
        var elementToStyle = $(parentEl).find(".lasso-user-content").children().first();
        console.log("TO STYLE: ", elementToStyle);
        if(elementToStyle.length > 0) {
          if(!scope.styleGroup[styleSelector]){
            scope.styleGroup[styleSelector] = elementToStyle;
            buttonEl.addClass("style-group-active")
          } else if(scope.styleGroup[styleSelector]){
            delete scope.styleGroup[styleSelector];
            buttonEl.removeClass("style-group-active")
          }
        }
        console.log("STYLE GROUP OBJECT:", scope.styleGroup);
      })
    }
  }
})
