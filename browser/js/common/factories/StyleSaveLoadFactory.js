app.factory("StyleSaveLoadFactory", function(StylingFactory){


  var parseAndFormatToExport = function(){

  }

  var getCurrentStylingToSave = function(){
    return StylingFactory.convertForSaving();
  }

  var findAndRemoveClassStyles = function(element, classStyleObj){
    for(var prop in classStyleObj){
      element.style.removeProperty("" + prop + "");
    }
  }

  var findCurrentStylesAndRefresh = function(className, currentStyleObj){
    var elementsToStyle = StylingFactory.findClassElements(className);
    elementsToStyle.each(function(idx, el){
      findAndRemoveClassStyles(el, currentStyleObj);
      $(el).css(currentStyleObj);
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
      StylingFactory.resetCurrentStyleSheetObjs();
      StylingFactory.populatePageStyleSheetOnLoad(savedStyleObj);
    },

    stylingBeforeClearToReload: function(){
      var currentStyles = StylingFactory.getCurrentStyleSheet();
      var removedStyles = StylingFactory.getRemovedStyles();
      console.log("CURRENT STYLES: ", currentStyles);
      console.log("REMOVED: ", removedStyles);
      for(var className in removedStyles){
        findInvalidClassesAndStyles(className, removedStyles[className]);
      }
      for(var style in currentStyles){
        findCurrentStylesAndRefresh(style, currentStyles[style]);
      }
    },

    resetStylesOnClose: function(scope){
      StylingFactory.resetCurrentStyleSheetObjs();
      scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames() /* resets values in class menu.*/
    }
  }

})
