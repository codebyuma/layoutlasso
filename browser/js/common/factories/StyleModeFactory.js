app.factory("StyleModeFactory", function(StylingFactory, $compile, $rootScope, NestedStylingFactory){
  var StyleModeFactory = {};
  /* Counter to assign key value to each element to be styled in the group*/
  var styleRefCounter = 0;

  var getParentWidgetId = function(targetElement){
    return $(targetElement).closest(".grid-stack-item").attr("id");
  }

  var addSelectedElementToStyleGroup = function(scope, element){
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

  /* Display elements in the class to be edited and add to currently being styled object */
  StyleModeFactory.displayElementsInStyledClass = function(scope, className){
    var elementsInClass = $("." + className);
    elementsInClass.each(function(idx, el){
      addSelectedElementToStyleGroup(scope, $(el)); /* Need to convert element back into jQuery object to allow application of styling */
    })
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
      /* If the element is the element holder and a user has no content in it, add some content to avoid throwing errors */
      if(self.hasClass("lasso-user-content")){
        if(self.children().length === 0){
          self.html(defaultHtml);
          addSelectedElementToStyleGroup(scope, $(self.children()[0]));
        } else {
          return;
        }
        /* Check if item is currently part of the elements to be styled */
      } else if(self.hasClass("lasso-styling-in-progress")){
        /* Check if editing in class mode (updating a class), if so clicking a selected item will remove it from the group and also remove inline styling for a better user experience */
        if(scope.classEditMode){
          StylingFactory.revertClassOnSelectedElement(self, scope.newClass.name, scope);
          removeSelectedElementFromStyleGroup(scope, self);
        }
        removeSelectedElementFromStyleGroup(scope, self);
        return;
      } else {
        addSelectedElementToStyleGroup(scope, self);
        return;
      }
    })
  }

  /* Reset all styling mode objects on scope when exiting style mode */

    StyleModeFactory.resetScopeStyleObjs = function(scope){
      StyleModeFactory.removeIdentityClass("lasso-styling-in-progress");
      scope.newClass.name = "";
      scope.newClass.styles = [{key: "", value: ""}];
      scope.styleGroup = {};
      scope.classEditMode = false;
      scope.styleMenuOpen = false;
      return;
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

  /* Remove class from styling buttons REMOVED, will return if ng-cloak not working */



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
        $("styling-mode-selector")
        .removeClass("style-mode-active")
        .text("Styling Mode");
        NestedStylingFactory.clearNestedStyling();
        StyleModeFactory.resetScopeStyleObjs(scope);
        scope.stylingModeActive = false;
        StyleModeFactory.removeEventHandlers();
        scope.styleMenuOpen = false;
      }
    }
  }




  return StyleModeFactory;
})
