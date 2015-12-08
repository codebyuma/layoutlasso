app.factory("StylingFactory", function(){

  var pageStyleSheet = {};

  var removedStyles = {};

  /* Apply styling of scope.styleGroup hash DOM elements  */

  var applyStylingToSelectedObjs = function(groupToStyle, stylesObj, nameOfClass, callback){
    for(var elObj in groupToStyle){
      groupToStyle[elObj].element.addClass(nameOfClass);
      groupToStyle[elObj].element.css(stylesObj);
    }
    callback();
  }

  /* Travese DOM and retrieve all elements with matching classes, jQuery method */

  var findMatchingClasses = function(className){
    return $("." + className);
  }


  /* Looping functon to remove inline styling properties from an element  stylesToRemove is an object representing all styles related to that class in javascript object form with properties as keys, and el is NOT a jquery object but a DOM element not converted to jQuery. */
  var stripElementInlineStyles = function(stylesToRemove, el){
    for(var style in stylesToRemove){
      el.style.removeProperty("" + style + ""); /* Removing styles, as they are object properties on an element 'style' object (plain old js)*/
    }
  }

  /* Load matching elements and remove inline styles that apply to that specific class. Required as all styles in editor are applied inline. Second argument updateOrExport is a boolean, if it is not defined or false, the class name will be removed from the element. Otherwise it is retained for update and export to HTML purposes.*/

  var removeClassInlineStyles = function(className, updateOrExport){
    var matchingElements =  findMatchingClasses(className);
    var stylesToRemove = pageStyleSheet[className];
    /* matching elements is a jQuery object, .each is a jQuery method to iterate over DOM elements in a returned jQUery array like object. */
    matchingElements.each(function(idx, el){
      /* To use removeClass jQuery method, have to convert to jQuery obj. Will not remove class if applying updated class stylings*/
      if(!updateOrExport) $(el).removeClass(className);
      stripElementInlineStyles(stylesToRemove, el);
    })
  }


  /* Generate a random class name based on Epoch Time (in milliseconds) if no class name is specified*/
  var generateClassName = function(){
    return "ll-class-" + Date.now() + "";
  }

  // Getter for pageStyleSheet Class names, primarily to update menu on scope.
  var getPageStyleSheetClasses = function(){
    return Object.keys(pageStyleSheet);
  }

  /* Getter for pageStylesheet css objects. This allows for methods to load a single class for editing.*/

  var getSingleClassForEditing = function(name){
    return pageStyleSheet[name];
  }

  /* Conversion of stored CSS object in pageStyleSheet to editing compatible format. Converts from object to array of objects */

  var convertToEditableClassObj = function(name){
    var styleArray = [];
    var cssObj = getSingleClassForEditing(name)
    for(var style in cssObj){
      styleArray.push({ key: style.toString(), value: cssObj[style]});
    }
    return styleArray;
  }

  /* Run when clicking the update button when updating styles on a class.*/
  var updateStyleClass = function(updatedObj, name){
    var original = getSingleClassForEditing(name);
    // Remove any css properties that have been removed during edit
    for(var property in original){
      if(!updatedObj.hasOwnProperty(property)){
        delete original[property];
      }
    }
    // For remaining css properties, replace old values with any new ones.
    _.extend(original, updatedObj);
    /* Return the source of 'truth', from the pageStyleSheet object in this factory. Ensures the value is consistent */
    return getSingleClassForEditing(name);
  }


  /* Facilitates the removal of a whole class and associated styling for all elements with that class name*/
  var removePageStyleClass = function(name){
    removeClassInlineStyles(name);
    delete pageStyleSheet[name]; /* Removing class from pageStylesheet object. */
  }


  return {
    applyStylingToGroup: applyStylingToSelectedObjs,

    autoGenName: generateClassName,

    populateStyleSheetObject: function(stylesObj){
      if(pageStyleSheet[stylesObj.name]){
        _.extend(pageStyleSheet[stylesObj.name], stylesObj.cssObj);
      } else {
        pageStyleSheet[stylesObj.name] = stylesObj.cssObj;
      }
    },

    updateSpecificClass: updateStyleClass,

    getStyleSheetClassNames: getPageStyleSheetClasses,

    convertForSaving: function(){
      return JSON.stringify(pageStyleSheet);
    },

    applyUpdatedStyling: function(classElements, styleObj){
      classElements.each(function(idx, el){
        $(el).css(styleObj)
      })
      return;
    },

    populatePageStyleSheetOnLoad: function(cssObj){
      pageStyleSheet = cssObj;
    },

    findClassElements: findMatchingClasses,

    resetInlineStyles: removeClassInlineStyles,

    removeStyleClass: removePageStyleClass,

    convertToEditableObj: convertToEditableClassObj,

    addToRemovedClassObj: function(className){
      removedStyles[className] = pageStyleSheet[className];
      return;
    },



    getRemovedStyles: function(){
      return removedStyles;
    },

    getCurrentStyleSheet: function(){
      return pageStyleSheet;
    },

    revertClassOnSelectedElement: function(element, className, scope){
      var stylesToRemove = pageStyleSheet[className];
      /* Need to add element[0] as element is a jQuery array like object. Even for a single element. */
      stripElementInlineStyles(stylesToRemove, element[0])
      element.removeClass(className);
      delete scope.styleGroup[element.data("styling-ref")];
      return;
    },

    resetCurrentStyleSheetObjs: function(){
      pageStyleSheet = {};
      removedStyles = {};
      return;
    }
  }
})
