app.directive("styleNestedGridItem", function(StyleModeFactory, NestedStylingFactory){
  return {
    restrict: "A",
    template: "<span class='glyphicon glyphicon-pencil'></span>",
    link: function(scope, element, attrs){
      var self = $(element);
      var styleThisElement = false;

      var mainGrid = $("#main-grid");
      var target = ".grid-stack-item";

      element.on("click", function(event){
        var parentIdentifier = self.data("element-selector");
        if(!scope.stylingModeActive) return;
        if(!styleThisElement){
          styleThisElement = !styleThisElement;
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeOut(300,  NestedStylingFactory.toggleParentEditable(parentIdentifier, "lasso-editable-widget"));
          });
          self.addClass("lasso-hide-children-active");
          styleThisElement = !styleThisElement;
        } else {
          StyleModeFactory.findNestedGrid(parentIdentifier, function(el){
            el.fadeIn(300, NestedStylingFactory.toggleParentEditable(parentIdentifier, "lasso-editable-widget"))
            });
            self.removeClass("lasso-hide-children-active");
        };
        styleThisElement = !styleThisElement;
      })
    }
  }
})
