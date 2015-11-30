app.directive("cssApplicator", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    scope: {},
    link: function(scope, element, attrs){
      scope.getCssData = function(data){
          console.log(data);
      }
      console.log(scope.newClass);
    }
  }
})
