app.factory("LassoButtonBoxFactory", function(){

  var LassoButtonBoxFactory = {};

  // Initiate button box events

  LassoButtonBoxFactory.initEvents = function(scope){
    LassoButtonBoxFactory.buttonBoxVisible();
    LassoButtonBoxFactory.buttonBoxHide();
  }


  LassoButtonBoxFactory.buttonBoxHide = function(){
    $("#main-grid").on("mouseleave", ".grid-stack-item", function(event){
      event.stopPropagation();
      var self = $(this);
      var targetBox = self.find(".lasso-button-box").first();
      console.log("TARGET BOX: ", targetBox);
      targetBox.addClass("lasso-button-box-hide");
    })
  }

  LassoButtonBoxFactory.buttonBoxVisible = function(){
    $("#main-grid").on("mouseenter", ".grid-stack-item", function(event){
      event.stopPropagation();
      var self = $(this);
      var targetBox = self.find(".lasso-button-box").first();
      targetBox.removeClass("lasso-button-box-hide");
    })
  }

  return LassoButtonBoxFactory;

})
