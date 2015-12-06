app.factory("StyleSaveLoadFactory", function(StylingFactory, StyleModeFactory){


  var removeQuotationMarks = function(string){
    return string.replace('"', '');
  }

  var buildCssObject = function(obj){
    var convertedObj = " {\n" // Opening bracket.
    for(var prop in obj){
      convertedObj += "\t" + prop + ": "; // Indent individual css properties.
      convertedObj += removeQuotationMarks(obj[prop]) + ";\n"; /* remove quotation marks from object string and add semi-colon and new line*/

    }
    convertedObj += "\n}\n\n"; // End of css style spaced with new line.
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

      $(el).css(removedStyleObj);

    })
  }

  return {
    stylingToSave: getCurrentStylingToSave,

    stylingToLoadFromBackend: function(cssJson){
      if(cssJson){
        var savedStyleObj = JSON.parse(cssJson);
        StylingFactory.resetCurrentStyleSheetObjs();
        StylingFactory.populatePageStyleSheetOnLoad(savedStyleObj);
      }
      return;
    },

    stylingBeforeClearToReload: function(){
      var currentStyles = StylingFactory.getCurrentStyleSheet();
      var removedStyles = StylingFactory.getRemovedStyles();

      var pastStyling = _.extend(currentStyles, removedStyles);
      console.log("RECOMBINED STYLING: ", pastStyling);

      for(var style in currentStyles){
        findCurrentStylesAndRefresh(style, currentStyles[style]);
      }
    },

    resetStylesOnClose: function(scope){
      StylingFactory.resetCurrentStyleSheetObjs();
      scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames() /* resets values in class menu.*/
    },

    removeInlineStylingForHtmlExport: function(){
      var assignedByStyleSheet = StylingFactory.getCurrentStyleSheet();
      for(var className in assignedByStyleSheet){
        var elementsToRemoveStyling = StylingFactory.findClassElements(className);
        elementsToRemoveStyling.each(function(idx, el){
          findAndRemoveClassStyles(el, assignedByStyleSheet[className]);
        })
      }
    },

    removeElementSelectedClassOnSave: StyleModeFactory.removeIdentityClass,

    produceStyleSheetForExport: parseAndFormatToExport
  }

})
