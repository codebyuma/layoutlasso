app.directive("cssApplicator", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    link: function(scope, element, attrs){
      scope.newClass = [{ key: "", value: ""}]
      var fieldCounter =  1;

      scope.addNewCssField = function(){
        fieldCounter++;
        var fieldName = "prop" + fieldCounter;
        scope.newClass.push({ key: "", value: ""});
      }

      scope.getCssData = function(data){
        var cssToApply = {};
        data.forEach(function(cssObj){
          cssToApply[cssObj.key] = cssObj.value;
        })

        console.log("CSS TO APPLY OBJECT: ", cssToApply);

        for(var idx in scope.styleGroup){
          scope.styleGroup[idx].css(cssToApply);
        }

        

        scope.newClass = [{key: "", value: ""}];
        scope.styleGroup = {};
      }
      console.log("SCOPE NEW CLASS:", scope.newClass);
    }
  }
})
