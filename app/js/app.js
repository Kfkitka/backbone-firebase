define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        Router      = require('router'),
        FastClick   = require('fastClick'),
        router      = new Router();

    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    Backbone.history.start();
});