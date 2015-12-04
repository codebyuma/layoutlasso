app.factory("StyleSaveLoadFactory", function(StylingFactory){

  var getCurrentStylingToSave = function(){
    return StylingFactory.convertForSaving();
  }

  var findAndRemoveClassStyles = function(element, classStyleObj){
    for(var singleClass in classStyleObj){
      for(var prop in classStyleObj[singleClass]){
        console.log("PROPERTY: ", prop);
        element.style.removeProperty("" + prop + "");
      }
    }
  }

  var findCurrentStylesAndRefresh = function(className, currentStyleObj){
    var elementsToStyle = StylingFactory.findClassElements(className);
    elementsToStyle.each(function(idx, el){
      findAndRemoveClassStyles(el, currentStyleObj);
      $(el).css(currentStyleObj[className]);
    })
  }

  var findInvalidClassesAndStyles = function(className, removedStyleObj){
    var elementsToRemoveStyling = StylingFactory.findClassElements(className);
    elementsToRemoveStyling.each(function(idx, el){
      findAndRemoveClassStyles(el, removedStyleObj);
      $(el).removeClass(className);
    })
  }

  return {
    stylingToSave: getCurrentStylingToSave,

    stylingToLoadFromBackend: function(cssJson){
      var savedStyleObj = JSON.parse(cssJson);
      console.log(savedStyleObj);
      StylingFactory.resetCurrentStyleSheetObjs();
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
