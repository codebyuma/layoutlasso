app.factory("NestedStylingFactory", function(){
  // Factory to deal with styling nested elements on a grid.

  var NestedStylingFactory = {};

  // Check each element to see if a nested grid is inside.


  var checkIfNestedGrid = function(targetElement){

  }

  /* Helper function to add editable class to the element to be styled when the nested styling button is clicked */
  NestedStylingFactory.toggleParentEditable = function(parentIdentifier, classToRemove){
    var parentEl = $("#" + parentIdentifier).children(".grid-stack-item-content").first();
    if(parentEl.hasClass(classToRemove)){
      parentEl.removeClass(classToRemove);
    } else {
      parentEl.addClass(classToRemove);
    }
  }

  // Find and highlight all stylable elements
  NestedStylingFactory.findEditableLayer = function(mainGridElement, targetElementDesignator){
    var targets = mainGridElement.find(targetElementDesignator);
    var editableTargets = [];
    if(targets.length) {
      targets.each(function(idx, el){
        var children = $(el).children(".grid-stack-nested").length;
        if(!children){
          editableTargets.push($(el));
        }
      })
      editableTargets.forEach(function(el){
        el.children(".grid-stack-item-content").addClass("editable-widget");
      })
    } else {
      mainGridElement
      .children(targetElementDesignator)
      .each(function(idx, el){
        $(el).addClass("editable-widget")
      })
    }

  }

  // Remove editable styling on close of style mode

  // NestedStylingFactory.removeEditableIndicators

  return NestedStylingFactory;

})
