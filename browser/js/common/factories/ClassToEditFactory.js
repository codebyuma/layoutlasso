app.factory("ClassToEditFactory", function(ClassEditModeFactory, StyleModeFactory, StylingFactory) {

  var ClassToEditFactory = {};

  ClassToEditFactory.loadClassToEdit = function(scope, className){
    scope.newClass.name = className;
    scope.newClass.styles = StylingFactory.convertToEditableObj(className);
    scope.styleMenuOpen = true;
    StyleModeFactory.displayElementsInStyledClass(scope, scope.newClass.name);
  }

  ClassToEditFactory.setClassAndLoad = function(scope, className){
    scope.classEditMode = true;
    ClassEditModeFactory.loadClassToEdit(scope, className);
  }

  return ClassToEditFactory;
});
