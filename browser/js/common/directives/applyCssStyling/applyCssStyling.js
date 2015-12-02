app.directive("cssApplicator", function(StylingFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    link: function(scope, element, attrs){
      scope.newClass.styles = [{ key: "", value: ""}];
      var fieldCounter =  1;

      var resetScopeStyleObjs = function(){
        scope.newClass.name = "";
        scope.newClass.styles = [{key: "", value: ""}];
        scope.styleGroup = {};
        return;
      }

      var assignClassName = function(nameVariable){
        if(!nameVariable) return StylingFactory.autoGenName();
        return nameVariable;
      }

      var applyStylingAndClass = function(nameOfClass, stylingObj, styleGroup){
        StylingFactory.populateStyleSheetObject({name: nameOfClass, cssObj: stylingObj})
        StylingFactory.applyStylingToGroup(styleGroup, stylingObj, nameOfClass, resetScopeStyleObjs);
        return;
      }

      scope.addNewCssField = function(){
        fieldCounter++;
        scope.newClass.styles.push({ key: "", value: ""});
        return;
      }

      scope.removeStyle = function(style){
        var toRemoveIdx = scope.newClass.styles.indexOf(style.key);
        scope.newClass.styles.splice(toRemoveIdx, 1);
        return;
      }

      scope.getCssFormData = function(data){
        var cssToApply = {};

        data.styles.forEach(function(cssObj){
          cssToApply[cssObj.key] = cssObj.value;
        })

        var newClassName = assignClassName(scope.newClass.name);

        applyStylingAndClass(newClassName, cssToApply, scope.styleGroup);
      }
      console.log("SCOPE NEW CLASS:", scope.newClass);
    }
  }
})
