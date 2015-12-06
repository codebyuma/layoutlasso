app.directive("styleNestedGridItem", function(StyleModeFactory){
  return {
    restrict: "A",
    template: "<span class='glyphicon glyphicon-pencil'></span>",
    link: function(scope, element, attrs){

      var styleThisElement = false;

      element.on("click", function(event){
        console.log("ELEMENT ID: ", $(element).data("element-selector"));
        var parentIdentifier = $(element).data("element-selector");
        if(!styleThisElement){
          styleThisElement = !styleThisElement;
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeOut()
          });
        } else {
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeIn()
          });
          styleThisElement = !styleThisElement;
        }
      })
    }
  }
})
