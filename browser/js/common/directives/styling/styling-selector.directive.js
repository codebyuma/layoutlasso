app.directive("stylingSelector", function(){
  return {
    restrict: 'E',
    template: "<button><span class='glyphicon glyphicon-pencil'></span></button>",
    link: function(scope, element, attrs){

        scope.getElementToStyle = function(id){
          var parentEl = document.getElementById(""+ id +"");
          var buttonEl = $(parentEl).find("styling-selector").children().first();
          console.log("CURRENT ID:", parentEl, id);
          var elementToStyle = $(parentEl).find(".lasso-user-content").children().first();
          if(elementToStyle.length > 0) {
            if(!scope.styleGroup[id]){
              scope.styleGroup[id] = elementToStyle;
              buttonEl.addClass("style-group-active")
            } else if(scope.styleGroup[id]){
              delete scope.styleGroup[id];
              buttonEl.removeClass("style-group-active")
            }
          }

          console.log(scope.styleGroup);
        }
    }
  }
})
