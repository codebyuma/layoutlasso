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
      }

      var assignClassName = function(nameVariable){
        if(!nameVariable) return StylingFactory.autoGenName();
        return nameVariable;
      }

      scope.addNewCssField = function(){
        fieldCounter++;
        scope.newClass.styles.push({ key: "", value: ""});
      }

      scope.removeStyle = function(style){
        var toRemoveIdx = scope.newClass.styles.indexOf(style.key);
        scope.newClass.styles.splice(toRemoveIdx, 1);
        console.log("STYLES NOW:", scope.newClass.styles)
      }

      scope.getCssFormData = function(data){
        var cssToApply = {};
        data.styles.forEach(function(cssObj){
          cssToApply[cssObj.key] = cssObj.value;
        })

        var newClassName = assignClassName();

        StylingFactory.populateStyleSheetObject({name: newClassName, cssObj: cssToApply})

        console.log("CSS TO APPLY OBJECT: ", cssToApply);

        StylingFactory.applyStylingToGroup(scope.styleGroup, cssToApply, resetScopeStyleObjs);


      }
      console.log("SCOPE NEW CLASS:", scope.newClass);
    }
  }
})
