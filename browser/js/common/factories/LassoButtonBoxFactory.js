app.factory("LassoButtonBoxFactory", function(){

  var LassoButtonBoxFactory = {};

  // Initiate button box hover events
  LassoButtonBoxFactory.initEvents = function(scope){
    LassoButtonBoxFactory.buttonBoxVisible();
    LassoButtonBoxFactory.buttonBoxHide();
  }

  LassoButtonBoxFactory.buttonBoxHide = function(){
    $("#main-grid").on("mouseleave", ".grid-stack-item", function(event){
      event.stopPropagation(); // Stop event from propagating up the DOM
      var self = $(this);
      /* Last DOM element that is found if there are nested elements is the correct one to remove class from. */
      var targetBox = self.find(".lasso-button-box").last();
      targetBox.addClass("lasso-button-box-hide");
    })
  }

  LassoButtonBoxFactory.buttonBoxVisible = function(){
    $("#main-grid").on("mouseenter", ".grid-stack-item", function(event){
      event.stopPropagation(); // Stop event from propagating up the DOM
      var self = $(this);
      /* Last DOM element that is found if there are nested elements is the correct one to remove class from. */
      var targetBox = self.find(".lasso-button-box").last();
      targetBox.removeClass("lasso-button-box-hide");
    })
  }


  return LassoButtonBoxFactory;

})
