app.directive("classEditSelector", function(ClassEditModeFactory, $rootScope){
  return {
    restrict: "A",
    link: function(scope, element, attrs){

      element.on("click", function(event){
        scope.$parent.currentClassInEdit = ClassEditModeFactory.getElementClassData(element);
        // element.addClass("lasso-editing-class");
        $rootScope.$digest();
      })
    }
  }
})
