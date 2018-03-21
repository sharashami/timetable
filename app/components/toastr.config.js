(function() {
    'use strict';

    angular
        .module('app')
        .config(configContainer)
        .config(configToasts);

    //CONTAINER
    configContainer.$inject = ['toastrConfig'];

    function configContainer(toastrConfig) {
        angular
            .extend(toastrConfig, {
                autoDismiss: false,
                containerId: 'toast-container', //toast-container
                maxOpened: 5,
                newestOnTop: true,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                preventOpenDuplicates: false,
                target: 'body'
            });
    }

    //TOASTS
    configToasts.$inject = ['toastrConfig'];

    function configToasts(toastrConfig) {
        angular
            .extend(toastrConfig, {
                allowHtml: false,
                closeButton: false,
                closeHtml: '<button>&times;</button>',
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                messageClass: 'toast-message',
                onHidden: null,
                onShown: null,
                onTap: null,
                progressBar: false,
                tapToDismiss: true,
                templates: {
                    toast: 'directives/toast/toast.html',
                    progressbar: 'directives/progressbar/progressbar.html'
                },
                timeOut: 3000,
                titleClass: 'toast-title',
                toastClass: 'toast'
            });
    }
}());