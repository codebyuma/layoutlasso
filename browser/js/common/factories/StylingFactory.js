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

  /* Generate a random class name based on Epoch Time (in milliseconds) if no class name is specified*/
  var generateClassName = function(){
    return "ll-class-" + Date.now() + "";
  }

// Getter for pageStyleSheet, primarily to update menu on scope.
  var getPageStyleSheetClasses = function(){
    return Object.keys(pageStyleSheet);
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

    convertToCss: function(){

    }
  }
})
