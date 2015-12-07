app.factory('ModalFactory', function($uibModal, GridFactory, UserFactory, TemplateFactory, ProjectFactory){
    var ModalFactory = {};

    ModalFactory.closeModal;
    ModalFactory.userLoginModal;
    ModalFactory.projectLoadModal;
    ModalFactory.pageLoadModal;
    ModalFactory.templateModal;
    ModalFactory.editHtmlModal;
    ModalFactory.addComponentsModal;
    ModalFactory.createProjBool;
    ModalFactory.user;
    ModalFactory.project;
    
    ModalFactory.launchCloseModal = function (scope){
        ModalFactory.closeModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/close-modal/close-modal.html",
            controller: "CloseModalCtrl"
        })
    }

    ModalFactory.launchUserLoginModal = function (scope){
        ModalFactory.userLoginModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/login-modal/login-modal.html",
            controller: "LoginModalCtrl"
        })
    }

    ModalFactory.getCreateProjBool = function (){
        return ModalFactory.createProjBool;
    }

    ModalFactory.getUser = function (){
        return ModalFactory.user;
    }

    ModalFactory.getProject = function (){
        return ModalFactory.project;
    }


    ModalFactory.launchProjectLoadModal = function (scope, _createProjBool){
        ModalFactory.createProjBool = _createProjBool;
        ModalFactory.user = scope.user;
        ModalFactory.projectLoadModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/project-modal/project-modal.html",
            controller: "ProjectModalCtrl"
        })
    }

    ModalFactory.launchPageLoadModal = function (scope){
        ModalFactory.project = scope.project;
        ModalFactory.pageLoadModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/page-modal/page-modal.html",
            controller: "PageModalCtrl"
        })
    }

    ModalFactory.launchTemplatesLoadModal = function (scope){
        ModalFactory.templateModal = $uibModal.open({
            animation: scope.animationsEnabled,
            templateUrl: 'js/template-modal/template-modal.html',
            controller: 'templateModalCtrl'
        })
    }

   
ModalFactory.launchEditHtmlModal = function (scope, id){
        ModalFactory.editHtmlModal = $uibModal.open({
         animation: scope.animationsEnabled,
         templateUrl: '/js/create-layout/edit-html-modal.html',
         controller: 'EditHTMLModalCtrl',
         resolve: {
           content: function () {
             return GridFactory.getWidgetContentById(id);
           }
         }
       });
    }


    ModalFactory.launchAddComponentsModal = function (scope, id) {
      ModalFactory.addComponentsModal = $uibModal.open({
        animation: scope.animationsEnabled,
        templateUrl: '/js/add-components-modal/add-components.html',
        controller: 'AddComponentsModalCtrl',
        resolve: {
          id: function () {
            return id;
          }
        }
      });
    }

    return ModalFactory;
});