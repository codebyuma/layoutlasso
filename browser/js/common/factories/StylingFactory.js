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

  /* Travese DOM and retrieve all elements with matching classes */

  var findMatchingClasses = function(className){
    return $("." + className);
  }

  /* Function to traverse widgets and populate styling on reload (via class name) */


  /* Load matching elements and remove inline styles that apply to that specific class. Required as all styles in editor are applied inline */

  var removeClassInlineStyles = function(className){
    var matchingElements =  findMatchingClasses(className);
    var stylesToRemove = pageStyleSheet[className];
    console.log(matchingElements);
    matchingElements.each(function(idx, el){
      for(var style in stylesToRemove){
        el.style.removeProperty("" + style + "");
      }
    })
  }


  /* Generate a random class name based on Epoch Time (in milliseconds) if no class name is specified*/
  var generateClassName = function(){
    return "ll-class-" + Date.now() + "";
  }

// Getter for pageStyleSheet, primarily to update menu on scope.
  var getPageStyleSheetClasses = function(){
    return Object.keys(pageStyleSheet);
  }

  var removePageStyleClass = function(name){
    removeClassInlineStyles(name);
    delete pageStyleSheet[name];
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

    getStyleSheetClassNames: function(){
      return Object.keys(pageStyleSheet);
    },

    convertForSaving: function(){
      return JSON.stringify(pageStyleSheet);
    },

    removeStyleClass: removePageStyleClass,

    convertToCss: function(){

    }
  }
})
