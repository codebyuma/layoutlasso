app.factory("StyleSaveLoadFactory", function(StylingFactory){

  var getCurrentStylingToSave = function(){
    return StylingFactory.convertForSaving();
  }

  var findAndRemoveClassStyles = function(element){
    for(var prop in element.style){
      if(!isNaN(parseInt(prop))){
        console.log(element.style[prop]);
        element.style.removeProperty(element.style[prop]);
      }
    }
  }

  var findCurrentStylesAndRefresh = function(className, currentStyleObj){
    var elementsToStyle = StylingFactory.findClassElements(className);
    elementsToStyle.each(function(idx, el){
      findAndRemoveClassStyles(el);
      $(el).css(currentStyleObj[className]);
    })
  }

  var findInvalidClassesAndStyles = function(className, removedStyleObj){
    var elementsToRemoveStyling = StylingFactory.findClassElements(className);
    elementsToRemoveStyling.each(function(idx, el){
      findAndRemoveClassStyles(el);
      $el.removeClass(className);
    })
  }

  return {
    stylingToSave: getCurrentStylingToSave,

    stylingToLoadFromBackend: function(cssJson){
      var savedStyleObj = JSON.parse(cssJson);
      StylingFactory.populatePageStyleSheetOnLoad(savedStyleObj);
    },

    stylingToReloadOnClear: function(){
      var currentStyles = StylingFactory.getCurrentStyleSheet();
      var removedStyles = StylingFactory.getRemovedStyles();
      for(var style in removedStyles){
        findInvalidClassesAndStyles(style, removedStyles);
      }
      for(var style in currentStyles){
        findCurrentStylesAndRefresh(style, currentStyles);
      }
    }
  }

})
