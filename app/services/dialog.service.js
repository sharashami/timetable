(function() {
    'use strict';

    angular
        .module('app')
        .factory('dialogService', dialogService);

    dialogService.$inject = ['ModalService'];

    function dialogService(ModalService) {

        var service = service;

        return service;

        ////////////////

        function service(body = {}) {
            var header = body.title || "Aviso";
            var block = body.block || false;
            var fnClose = body.fnClose;

            return {
                danger: modal('/app/modals/delete2.html')
            }

            ////////////////

            function modal(url) {
                ModalService.showModal({
                    templateUrl: url,
                    controllerAs: 'vm',
                    controller: function(close) {
                        var vm = this;
                        vm.header = header;
                        vm.block = block ? { backdrop: 'static', keyboard: false } : {};
                        vm.fnClose = fnClose;
                        vm.close = result => {
                            close(result, 200);
                            this.closed = true;
                        };
                    },
                    preClose: modal => modal.element.modal('hide')
                }).then(function(modal) {
                    modal.element.modal(modal.controller.block);
                    modal.element.one('hidden.bs.modal', () => {
                        if (!modal.controller.closed)
                            modal.controller.close(false)
                    });
                    modal.close.then(function(result) {
                        modal.controller.fnClose(result);
                    });
                });
            }
        }
    }
})();