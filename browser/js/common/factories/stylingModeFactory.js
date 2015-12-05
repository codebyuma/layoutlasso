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

  /* Initiating Click event listeners when in styling mode */
  StyleModeFactory.elementSelectEventListenerInit = function(scope){
    $("#main-grid").on("click", ".lasso-user-content", function(event){
      var self = $(event.target);
      console.log("EVENT TARGET CHILDREN ", self.children());
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

  /* Remove events when exiting out of styling mode */
  StyleModeFactory.removeClickEventHandlers = function(){
    $("#main-grid").off("click", ".lasso-user-content");
    return;
  }

  /* Remove lasso-styling in progress class */



  /* Remove an individual element from a class */

  /* Initiate all event Listeners and actions for styling mode */

  StyleModeFactory.toggleStyleModeActions = function(scope){
    if(!scope.classEditMode){
      if(!scope.stylingModeActive){
        scope.stylingModeActive = true;
        scope.styleMenuOpen = true;

        StyleModeFactory.elementSelectEventListenerInit(scope);

        $("#main-grid").on("mouseenter", ".lasso-user-content", function(event){
          event.stopPropagation();
          $(event.target).addClass("lasso-highlight-on-hover");

          $(event.target).on("mouseleave", function(event){
            $(this).removeClass("lasso-highlight-on-hover");
          })

        });
      } else if(scope.stylingModeActive){
        scope.stylingModeActive = false;
        StyleModeFactory.removeClickEventHandlers();
        scope.styleMenuOpen = false;
      }
    }
  }




  return StyleModeFactory;
})
