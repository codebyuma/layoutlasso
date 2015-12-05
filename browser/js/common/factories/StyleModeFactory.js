app.factory("StyleModeFactory", function(StylingFactory, $compile, $rootScope){
  var StyleModeFactory = {};
  /* */
  var styleRefCounter = 0;

  var getParentWidgetId = function(targetElement){
    return $(targetElement).closest(".grid-stack-item").attr("id");
  }

  var addToSelectedElementToStyleGroup = function(scope, element){
    element.addClass("lasso-styling-in-progress");
    element.data("styling-ref", styleRefCounter);
    console.log("DATA ATTRIBUTE: ", element.data("styling-ref"));
    var elementToStyleObj = { widgetRef: getParentWidgetId(element), element: element }
    scope.styleGroup[styleRefCounter] = elementToStyleObj;
    console.log("STYLEGROUP ADDED: ", scope.styleGroup)
    styleRefCounter++;
  }

  var removeSelectedElementFromStyleGroup = function(scope, element){
    element.removeClass("lasso-styling-in-progress");
    console.log("ASSIGNED STYLING DATA: ", element.data("styling-ref"));
    delete scope.styleGroup[element.data("styling-ref")];
    console.log("STYLEGROUP ON REMOVE: ", scope.styleGroup)
  }


  StyleModeFactory.removeIdentityClass = function(classDesignator){
    $("." + classDesignator).each(function(idx, el){
      $(el).removeClass(classDesignator);
    })
  }


  /* Initiating Click event listeners when in styling mode */
  StyleModeFactory.elementSelectEventListenerInit = function(scope){
    $("#main-grid").on("click", ".lasso-user-content", function(event){
      var self = $(event.target);
      var defaultHtml = $compile("<p>Edit or style this html!</p>")(scope);
      if(!scope.styleMenuOpen){
        scope.styleMenuOpen = true;
        $rootScope.$digest();
      }
      if(self.hasClass("lasso-user-content")){
        if(self.children().length === 0){
          self.html(defaultHtml);
          addToSelectedElementToStyleGroup(scope, $(self.children()[0]));
        } else {
          return;
        }
      } else if(self.hasClass("lasso-styling-in-progress")){
        removeSelectedElementFromStyleGroup(scope, self);
      } else {
        addToSelectedElementToStyleGroup(scope, self);
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
