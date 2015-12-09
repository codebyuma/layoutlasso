app.factory("ClassEditModeFactory", function(StyleModeFactory, $rootScope){

  var ClassEditModeFactory = {};

  ClassEditModeFactory.initClassEditEventListeners = function(scope){
    $("class-display").on("mouseenter", ".class-selector", function(event){
      $("." + event.target.innerHTML).addClass("lasso-highlight-class");
    })

    $("class-display").on("mouseleave", ".class-selector", function(event){
      $("." + event.target.innerHTML).removeClass("lasso-highlight-class");
    })

    // $("class-display").on("click", ".class-selector", function(event){
    //   var self  = $(this);
    //   var targetSelector = "lasso-editing-class";
    //   if(self.hasClass(targetSelector)){
    //     self.removeClass(targetSelector);
    //     StyleModeFactory.resetScopeStyleObjs(scope, true);
    //   } else {
    //     // Remove styling from any other selected items first.
    //     $(targetSelector).removeClass(targetSelector);
    //     self.addClass(targetSelector);
    //   }
    // })
  }

  ClassEditModeFactory.removeClassEditEventListeners = function(){
    $("class-display").off("mouseenter", ".class-selector");
    $("class-display").off("mouseleave", ".class-selector");
    $("class-display").off("click", ".class-selector");
  }

    return ClassEditModeFactory;
})
