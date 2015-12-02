app.factory("StylingFactory", function(){

  var pageStyleSheet = {};

  /* Function to apply styling of scope.styleGroup hash DOM elements  */

  var applyStylingToSelectedObjs = function(groupToStyle, stylesObj, callback){
    for(var idx in groupToStyle){
      groupToStyle[idx].css(stylesObj);
    }
    callback();
  }

  /* Generate a random class name based on Epoch Time (in milliseconds) if no class name is specified*/
  var generateClassName = function(){
    return "ll-class-" + Date.now() + "";
  }


  return {
    applyStylingToGroup: applyStylingToSelectedObjs,

    autoGenName: generateClassName,

    populateStyleSheetObject: function(stylesObj){
      if(!stylesObj.name) stylesObj.name = generateClassName();
      if(pageStyleSheet[stylesObj.name]){
        _.extend(pageStyleSheet[stylesObj.name], stylesObj.cssObj);
      } else {
        pageStyleSheet[stylesObj.name] = stylesObj.cssObj;
      }
      console.log(pageStyleSheet);
    },

    convertForSaving: function(){

    },

    convertToCss: function(){

    }
  }
})