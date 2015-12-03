app.factory("StyleSaveLoadFactory", function(StylingFactory){

  var getCurrentStylingToSave = function(){
    return StylingFactory.convertForSaving();
  }

  return {
    stylingToSave: getCurrentStylingToSave,

    stylingToLoadFromBackend: function(cssJson){
      var savedStyleObj = JSON.parse(cssJson);
      StylingFactory.populatePageStyleSheetOnLoad(savedStyleObj);
    },

    stylingToReloadOnClear: function(){
      var currentStyles = StylingFactory.getCurrentStyleSheet();
      for(var style in currentStyles){
        var elementsToStyle = StylingFactory.findClassElements(style);
        elementsToStyle.each(function(idx, el){
          for(var prop in el.style){
            if(!isNaN(parseInt(prop))){
              console.log(el.style[prop]);
              el.style.removeProperty(el.style[prop]);
            }
          }
          $(el).css(currentStyles[style]);
        })
      }
    }
  }

})
