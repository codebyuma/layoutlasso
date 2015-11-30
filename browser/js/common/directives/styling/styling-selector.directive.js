app.directive("stylingSelector", function(){
  return {
    restrict: 'E',
    template: "<button><span class='glyphicon glyphicon-pencil'></span></button>",
    link: function(scope, element, attrs, ngClick){
        scope.getElementToStyle = function(id){
          var parentEl = document.getElementById(""+ id +"");
          console.log("CURRENT ID:", parentEl, id);
          var elementToStyle = $(parentEl).find(".lasso-user-content").children().first();
          console.log(elementToStyle);
          if(elementToStyle.length > 0) {
            console.log(elementToStyle);

            scope.styleGroup.push(elementToStyle);
          }
          scope.styleGroup.forEach(function(el){
            
          })
          console.log(scope.styleGroup);
        }
    }
  }
})
