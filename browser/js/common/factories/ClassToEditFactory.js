app.factory("ClassToEditFactory", function(ClassEditModeFactory, StyleModeFactory, StylingFactory) {

  var ClassToEditFactory = {};
  /* Load selected class css properties and values into styling menu. Convert from key:value pair to object for use in application. Then have red outline for all selected elements */
  ClassToEditFactory.loadClassToEdit = function(scope, className){
    scope.newClass.name = className;
    scope.newClass.styles = StylingFactory.convertToEditableObj(className);
    scope.styleMenuOpen = true;
    StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
  }

  // Set class edit mode to true and then load css properties.

  ClassToEditFactory.setClassAndLoad = function(scope, className){
    scope.classEditMode = true;
    ClassEditModeFactory.loadClassToEdit(scope, className);
  }

  return ClassToEditFactory;
});
