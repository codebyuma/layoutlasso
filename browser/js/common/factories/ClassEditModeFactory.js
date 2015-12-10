app.factory("ClassEditModeFactory", function(){

  var ClassEditModeFactory = {};

  /* Function to retrieve data element and return jquery array like object of matching elements */
  ClassEditModeFactory.findTargetClass = function(event){
    var targetClass = $(event.target).data("class-name");
    return $("." + targetClass);
  }

  ClassEditModeFactory.initClassEditEventListeners = function(scope){
    $("class-display").on("mouseenter", ".class-selector", function(event){
      ClassEditModeFactory.findTargetClass(event).addClass("lasso-highlight-class");
    })

    $("class-display").on("mouseleave", ".class-selector", function(event){
      ClassEditModeFactory.findTargetClass(event).removeClass("lasso-highlight-class");
    })
  }

  ClassEditModeFactory.removeClassEditEventListeners = function(){
    $("class-display").off("mouseenter", ".class-selector");
    $("class-display").off("mouseleave", ".class-selector");
    $("class-display").off("click", ".class-selector");
  }

  return ClassEditModeFactory;
})
