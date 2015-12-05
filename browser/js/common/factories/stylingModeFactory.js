app.factory("StyleModeFactory", function(StylingFactory){
  var StyleModeFactory = {};
  /* */
  var addToCurrentStylesObj = function(element){
  }

  var getParentWidgetId = function(targetElement){
    return $(targetElement).closest(".grid-stack-item").attr("id");
  }

  var styleRefCounter = 0;

  StyleModeFactory.removeIdentityClass = function(classDesignator){
    $(classDesignator).each(function(idx, el){
      $(el).removeClass(classDesignator);
    })
  }

  StyleModeFactory.clickEventsInit = function(scope){
    $("#main-grid").on("click", ".lasso-user-content", function(event){
      var self = $(event.target);
      console.log("PARENT ID: ", getParentWidgetId(self))
      if(self.hasClass("lasso-styling-in-progress")){
        self.removeClass("lasso-styling-in-progress");
        console.log("ASSIGNED STYLING DATA: ", self.data("styling-ref"));
        delete scope.styleGroup[self.data("styling-ref")];
        console.log("STYLEGROUP REMOVE: ", scope.styleGroup)

      } else {
        self.addClass("lasso-styling-in-progress");
        self.data("styling-ref", styleRefCounter);
        console.log("DATA ATTRIBUTE: ", self.data("styling-ref"));
        var elementToStyleObj = { widgetRef: getParentWidgetId(self), element: self }
        scope.styleGroup[styleRefCounter] = elementToStyleObj;
        console.log("STYLEGROUP ADDED: ", scope.styleGroup)
        styleRefCounter++;

      }
    })
  }




  return StyleModeFactory;
})
