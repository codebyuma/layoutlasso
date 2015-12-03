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
        var toStyle = StylingFactory.findClassElements(style);
        console.log(toStyle);

      }
    }
  }

})
