app.controller('CloseModalCtrl', function($scope, $rootScope, $uibModalInstance) {

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.save = function (){
       // $rootScope.$broadcast('close-save', { save: true });
        $uibModalInstance.close(true)
    }

    $scope.close = function (){
       // $rootScope.$broadcast('close-save', { save: false });
        $uibModalInstance.close(false)
    }



})