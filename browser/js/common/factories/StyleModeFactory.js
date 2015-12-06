app.factory("StyleModeFactory", function(StylingFactory, $compile, $rootScope, NestedStylingFactory){
  var StyleModeFactory = {};
  /* Counter to assign key value to each element to be styled in the group*/
  var styleRefCounter = 0;

  var getParentWidgetId = function(targetElement){
    return $(targetElement).closest(".grid-stack-item").attr("id");
  }

  var addToSelectedElementToStyleGroup = function(scope, element){
    element.addClass("lasso-styling-in-progress");
    element.data("styling-ref", styleRefCounter);
    var elementToStyleObj = { widgetRef: getParentWidgetId(element), element: element }
    scope.styleGroup[styleRefCounter] = elementToStyleObj;
    styleRefCounter++;
  }

  var removeSelectedElementFromStyleGroup = function(scope, element){
    element.removeClass("lasso-styling-in-progress");
    delete scope.styleGroup[element.data("styling-ref")];
  }


  StyleModeFactory.removeIdentityClass = function(classDesignator){
    $("." + classDesignator).each(function(idx, el){
      $(el).removeClass(classDesignator);
    })
  }

  StyleModeFactory.initiateStylingHoverEvents = function(){
    $("#main-grid").on("mouseenter", ".lasso-user-content", function(event){
      event.stopPropagation();
      $(event.target).addClass("lasso-highlight-on-hover");

      $(event.target).on("mouseleave", function(event){
        $(this).removeClass("lasso-highlight-on-hover");
      })

    });
  }

  /* Reset and rescan GRID for editable layers on adding new elements or widgets or any other GRID actions */

  StyleModeFactory.resetEditableLayers = function(scope){
    if(scope.stylingModeActive){
      NestedStylingFactory.clearNestedStyling() // Remove all styling
      NestedStylingFactory.findEditableLayer($("#main-grid"), ".grid-stack-item"); // Re-render on correct elements.
    } else {
      NestedStylingFactory.clearNestedStyling();
    }
    return;
  }

  /* Initiating Click event listeners when in styling mode */
  StyleModeFactory.elementSelectEventListenerInit = function(scope){
    StyleModeFactory.initiateStylingHoverEvents();
    $("#main-grid").on("click", ".lasso-user-content", function(event){
      var self = $(event.target);
      var defaultHtml = $compile("<p>Edit or style this html!</p>")(scope);
      if(!scope.styleMenuOpen){
        scope.styleMenuOpen = true;
        $rootScope.$digest(); // Requried as the change of scope value does not trigger any $scope digest.
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

  /* Remove event handlers for lasso-user-content elements when exiting out of styling mode */
  StyleModeFactory.removeEventHandlers = function(){
    $("#main-grid").off("click", ".lasso-user-content");
    $("#main-grid").off("mouseenter", ".lasso-user-content");
    return;
  }

  /* Function to reset all style mode attributes to apply on function that load and close a project. Ensures all menus and actions are deactivated and event listeners are toggled off. */

  StyleModeFactory.deactivateStyleMode = function(scope){
    NestedStylingFactory.clearNestedStyling();
    if(scope.stylingModeActive){
      StyleModeFactory.toggleStyleModeActions(scope);
    }
    scope.classMenuOpen = false;
    scope.styleMenuOpen = false;
    scope.classEditMode = false;
    return;
  }

  /* Remove lasso-styling in progress class */



  /* Remove an individual element from a class */


  /* find and apply display-none to nested grid element to allow editing of native html */

  StyleModeFactory.findNestedGrid = function(parentId, callback){
    var parent = $("#" + parentId);
    var toDisplayNone = parent.children(".grid-stack-nested").first();
    if(toDisplayNone.length) callback(toDisplayNone);
    return;
  }

  /* Initiate all event Listeners and actions for styling mode */

  StyleModeFactory.toggleStyleModeActions = function(scope){
    var mainGrid = $("#main-grid");
    if(!scope.classEditMode){
      if(!scope.stylingModeActive){
        scope.stylingModeActive = true;
        scope.styleMenuOpen = true;
        NestedStylingFactory.findEditableLayer(mainGrid, ".grid-stack-item");
        StyleModeFactory.elementSelectEventListenerInit(scope);
        /* */

      } else if(scope.stylingModeActive){
        $("styling-mode-selector").removeClass("style-mode-active");
        NestedStylingFactory.clearNestedStyling();
        scope.stylingModeActive = false;
        StyleModeFactory.removeEventHandlers();
        scope.styleMenuOpen = false;
      }
    }
  }




  return StyleModeFactory;
})
