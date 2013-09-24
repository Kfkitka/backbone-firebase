require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "./",
    enforceDefine: true,
    deps: ["js/main"],
    waitSeconds: 200,
    paths: {
        "jquery"                : "./js/libs/jquery-1.10.2",
        "lodash"                : "./js/libs/lodash-1.3.1",
        "backbone"              : "./js/libs/backbone-1.0.0",
        "text"                  : "./js/libs/text-2.0.10",
        "firebase"              : "http://cdn.firebase.com/v0/firebase",
        "backboneFirebase"      : "./js/libs/backbone-firebase",
        "snap"                  : "./js/libs/snap-1.2.9",
        "fastClick"             : "./js/libs/fastclick-0.6.9",
        "modernizr"             : "./js/libs/modernizr-2.6.2",
        "RatchetModal"          : "./js/libs/ratchet-modal",
        "junior"                : "./js/libs/junior",
        "spin"                  : "./js/libs/spin-1.3.2",

        // Application Folders
        "templates"             : "./js/templates",
        "collections"           : "./js/collections",
        "models"                : "./js/models",
        "views"                 : "./js/views",

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

define([], function () {
    "use strict";
});