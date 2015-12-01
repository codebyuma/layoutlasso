app.directive("cssApplicator", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    scope: {
      newClass: "="
    },
    link: function(scope, element, attrs){
      scope.newClass = [{ prop1: { key: "", value: ""}}]
      var fieldCounter =  1;
      scope.addNewCssField = function(){
        console.log();
        fieldCounter++;
        scope.newClass.push({ [prop + fieldCounter]: { key: "", value: ""}});
      }

      scope.getCssData = function(data){
          console.log(data);
      }
      console.log(scope.newClass);
    }
  }
})
