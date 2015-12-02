app.factory("StylingFactory", function(){

  var pageStyleSheet = {};

  /* Function to apply styling of scope.styleGroup hash DOM elements  */

  var applyStylingToSelectedObjs = function(groupToStyle, stylesObj, nameOfClass, callback){
    for(var el in groupToStyle){
      groupToStyle[el].addClass(nameOfClass);
      groupToStyle[el].css(stylesObj);
    }
    callback();
  }

  /* Travese DOM and retrieve all elements with matching classes, jQuery method */

  var findMatchingClasses = function(className){
    return $("." + className);
  }

  /* Function to traverse widgets and populate styling on reload (via class name) TO BE WRITTEN */


  /* Load matching elements and remove inline styles that apply to that specific class. Required as all styles in editor are applied inline */

  var removeClassInlineStyles = function(className){
    var matchingElements =  findMatchingClasses(className);
    var stylesToRemove = pageStyleSheet[className];
    /* matching elements is a jQuery object, .each is a jQuery method to iterate over DOM elements in a returned jQUery array like object. */
    matchingElements.each(function(idx, el){
      // To use removeClass jQuery method, have to convert to jQuery obj.
      $(el).removeClass(className);
      console.log(el)
      for(var style in stylesToRemove){
        el.style.removeProperty("" + style + ""); /* Removing styles, as they are object properties on an element 'style' object (plain old js)*/
      }
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

  var updateStyleClass = function(updatedObj){

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
      console.log(pageStyleSheet);
    },

    getStyleSheetClassNames: getPageStyleSheetClasses,

    convertForSaving: function(){
      return JSON.stringify(pageStyleSheet);
    },

    removeStyleClass: removePageStyleClass,

    convertToEditableObj: convertToEditableClassObj
  }
})
