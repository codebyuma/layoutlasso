app.factory("StyleSaveLoadFactory", function(StylingFactory){


  var removeQuotationMarks = function(string){
    return string.replace('"', '');
  }

  var buildCssObject = function(obj){
    var convertedObj = " {\n" // Opening bracket.
    for(var prop in obj){
      convertedObj += "\t" + prop + ": ";
      convertedObj += removeQuotationMarks(obj[prop]) + ";\n";

    }
    convertedObj += "\n}\n\n"; // End of css style spacing with two brackets.
    return convertedObj;
  }

  var parseAndFormatToExport = function(){
    var cssToExport = "";
    var classesToExport = StylingFactory.getCurrentStyleSheet();
    for(var classStyle in classesToExport){
      var className = "." + classStyle;
      cssToExport += className;
      cssToExport += buildCssObject(classesToExport[classStyle]);
    }
    return cssToExport;
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
    },

    produceStyleSheetForExport: parseAndFormatToExport
  }

})
