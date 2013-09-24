define(function (require) {

    "use strict";

    var _               = require('lodash'),
        Backbone        = require('backbone'),
        Router          = require('router'),
        FastClick       = require('fastClick'),
        RatchetModal    = require('RatchetModal'),
        router          = new Router(),
        modalListener   = new RatchetModal(),
        vent            = _.extend({}, Backbone.Events);

    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    modalListener.listen();

    Backbone.Model.instances = {};
    Backbone.Model.instances.vent = vent;
    Backbone.history.start();
});