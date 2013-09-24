define(function (require) {

    "use strict";

    var Backbone        = require('backbone'),
        Router          = require('router'),
        FastClick       = require('fastClick'),
        RatchetModal    = require('RatchetModal'),
        router          = new Router(),
        modalListener   = new RatchetModal();

    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    modalListener.listen();
    Backbone.history.start();
});