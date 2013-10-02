require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "./",
    enforceDefine: false,

    waitSeconds: 200,
    paths: {
        "jquery"                : "./js/libs/jquery-1.10.2",
        "lodash"                : "./js/libs/lodash-1.3.1",
        "backbone"              : "./js/libs/backbone-1.0.0",
        "text"                  : "./js/libs/text-2.0.10",
        "firebase"              : "./js/libs/firebase",
        "backboneFirebase"      : "./js/libs/backbone-firebase",
        "snap"                  : "./js/libs/snap-1.2.9",
        "fastClick"             : "./js/libs/fastclick-0.6.9",
        "modernizr"             : "./js/libs/modernizr-2.6.2",
        "RatchetModal"          : "./js/libs/ratchet-modal",
        "junior"                : "./js/libs/junior",
        "spin"                  : "./js/libs/spin-1.3.2",
        "eventDispatcher"       : "./js/util/EventDispatcher",

        // Application Folders
        "templates"             : "./js/templates",
        "collections"           : "./js/collections",
        "models"                : "./js/models",
        "views"                 : "./js/views",
        "util"                  : "./js/util",

        // Routers
        "router"                : "./js/router/Router"
    },
    shim: {
        backbone: {
            deps: ["lodash", "jquery"],
            exports: "Backbone"
        },
        jqueryMobile : {
            deps : ["jquery"]
        },
        backboneFirebase: {
            deps: ["backbone", "firebase"],
            exports: "Backbone.Firebase"
        },
        firebase: {
            exports: "Firebase"
        },
        junior: {
            deps: ['backbone'],
            exports: 'Jr'
        },
        spin: {
            exports: "Spinner"
        }
    }
});

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