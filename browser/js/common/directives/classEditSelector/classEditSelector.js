app.directive("classEditSelector", function(ClassEditModeFactory, ClassToEditFactory, StyleModeFactory, $rootScope){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      /* Need to access the current active scope outside of the stylingClassDisplay Directive scope, so reference $parent, which is the parent scope (active high level scope) */
      var layoutScope = scope.$parent;

      scope.toggleClassForEditing = function(className){
        if(!layoutScope.classEditMode){
          layoutScope.currentClassInEdit = ClassEditModeFactory.getElementClassData(element);
          ClassToEditFactory.loadClassToEdit(layoutScope, className);
        } else {
          if(layoutScope.isSelectedClassToEdit(className)){
            // Deactivate edit mode and remove styling from staging menu.
            StyleModeFactory.resetScopeStyleObjs(layoutScope, true);
            layoutScope.classEditMode = false;
          } else {
            layoutScope.currentClassInEdit = ClassEditModeFactory.getElementClassData(element);
            ClassToEditFactory.loadClassToEdit(layoutScope, className);
          }
        }
      }
    }
  }
})
