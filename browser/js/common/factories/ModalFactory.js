app.factory('ModalFactory', function($uibModal){
    var ModalFactory = {};

    ModalFactory.closeModal;

    ModalFactory.launchCloseModal = function (scope){
        ModalFactory.closeModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/close-modal/close-modal.html",
            controller: "CloseModalCtrl"
        })
    }

   
    return ModalFactory;
});