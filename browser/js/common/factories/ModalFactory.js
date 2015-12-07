app.factory('ModalFactory', ['$uibModal', function($uibModal, GridFactory, UserFactory, TemplateFactory, ProjectFactory){
    var ModalFactory = {};

    ModalFactory.closeModal;
    ModalFactory.userLoginModal;
    ModalFactory.projectLoadModal;
    ModalFactory.pageLoadModal;
    ModalFactory.templateModal;
    ModalFactory.editHtmlModal;
    ModalFactory.addComponentsModal;

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

    ModalFactory.launchProjectLoadModal = function (scope, _createProjBool){
        ModalFactory.projectLoadModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/project-modal/project-modal.html",
            controller: "ProjectModalCtrl",
            resolve: {
                createProjBool: _createProjBool, // boolean used to indicate what to ngshow in the modal
                user: function(UserFactory) { // get user again to have projects populated
                    if (scope.user)
                        return UserFactory.getUser(scope.user._id);
                }
            }
        })
    }

    ModalFactory.launchPageLoadModal = function (scope){
        ModalFactory.pageLoadModal = $uibModal.open({
            animation: scope.animationEnabled,
            templateUrl: "/js/page-modal/page-modal.html",
            controller: "PageModalCtrl",
            resolve: { // getting from factory so we can populate pages in the project
                project: function(ProjectFactory) {
                    return ProjectFactory.getProject(scope.project._id);
                }
            }
        })
    }

    ModalFactory.launchTemplatesLoadModal = function (scope){
        ModalFactory.templateModal = $uibModal.open({
            animation: scope.animationsEnabled,
            templateUrl: 'js/template-modal/template-modal.html',
            controller: 'templateModalCtrl',
            resolve: {
                allTemplates: function(TemplateFactory){
                    return TemplateFactory.getAll();
                }
            }
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
}]);
