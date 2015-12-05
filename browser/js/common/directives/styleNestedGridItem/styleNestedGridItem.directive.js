app.directive("styleNestedGridItem", function(StyleModeFactory){
  return {
    restrict: "A",
    template: "<span class='glyphicon glyphicon-pencil'></span>",
    link: function(scope, element, attrs){
      element.on("click", function(event){
        console.log("ELEMENT ID: ", $(element).data("element-selector"));
        var parentIdentifier = $(element).data("element-selector");
        StyleModeFactory.findAndTempRemoveChildElements(parentIdentifier);

      })
    }
  }
})
