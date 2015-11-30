app.directive("cssApplicator", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/applyCssStyling/applyCssStyling.template.html',
    scope: {},
    link: function(scope, element, attrs){
      console.log(scope.styleApplicator);
    }
  }
})
