/* ----------------------------------
 * MODAL v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

 /*global define, module, ender*/

/**
 * I am just experimenting here,
 * I could not get Ratchet components to load otherwise.
 */

define('RatchetModal', [],
    function() {

        'use strict';

        var RatchetModal = RatchetModal || function () {
            var self = this;

            this.findModals = function (target) {
                var i;
                var modals = document.querySelectorAll('a');
                for (; target && target !== document; target = target.parentNode) {
                    for (i = modals.length; i--;) {
                        if (modals[i] === target) return target;
                    }
                }
            };

            this.getModal = function (event) {
                var modalToggle = this.findModals(event.target);
                if (modalToggle && modalToggle.hash) return document.querySelector(modalToggle.hash);
            };

            this.listen = function () {
                window.addEventListener('click', function (event) {
                    var modal = self.getModal(event);
                    if (modal) modal.classList.toggle('active');
                });
            };
        };

        return RatchetModal;
    }
);