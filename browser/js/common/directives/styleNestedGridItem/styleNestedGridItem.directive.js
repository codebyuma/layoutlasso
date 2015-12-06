app.directive("styleNestedGridItem", function(StyleModeFactory, NestedStylingFactory){
  return {
    restrict: "A",
    template: "<span class='glyphicon glyphicon-pencil'></span>",
    link: function(scope, element, attrs){

      var styleThisElement = false;

      var mainGrid = $("#main-grid");
      var target = ".grid-stack-item";

      element.on("click", function(event){
        var parentIdentifier = $(element).data("element-selector");
        if(!styleThisElement){
          styleThisElement = !styleThisElement;
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeOut(300, NestedStylingFactory.toggleParentEditable(parentIdentifier, "editable-widget"));
          });
          styleThisElement = !styleThisElement;
        } else {
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeIn(300, NestedStylingFactory.toggleParentEditable(parentIdentifier, "editable-widget"))
            });
          };
          styleThisElement = !styleThisElement;
        })
      }
    }
  })
