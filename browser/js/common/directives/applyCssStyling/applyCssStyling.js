app.directive("cssApplicator", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    scope: {
      newClass: "="
    },
    link: function(scope, element, attrs){
      scope.newClass = [{ key: "", value: ""}]
      var fieldCounter =  1;

      scope.addNewCssField = function(){
        fieldCounter++;
        var fieldName = "prop" + fieldCounter;
        scope.newClass.push({ key: "", value: ""});
      }
      
      scope.getCssData = function(data){
          data.forEach(function(cssObj){
            console.log(cssObj.key, ":", cssObj.value);
          })
          console.log("SCOPE: ", scope.styleGroup)
      }
      console.log(scope.newClass);
    }
  }
})
