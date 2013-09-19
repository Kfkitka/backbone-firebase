require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "./",
    enforceDefine: false,
    deps: ["js/app"],
    waitSeconds: 200,
    paths: {
        "jquery"                : "./js/vendor/jquery-1.10.2",
        "lodash"                : "./js/vendor/lodash-1.3.1",
        "backbone"              : "./js/vendor/backbone-1.0.0",
        "text"                  : "./js/vendor/text-2.0.10",
        "firebase"              : "http://cdn.firebase.com/v0/firebase",
        "backboneFirebase"      : "./js/vendor/backbone-firebase",
        "snap"                  : "./js/vendor/snap-1.2.9",
        "fastClick"             : "./js/vendor/fastclick-0.6.9",

        // Application Folders
        "templates"             : "./tpl",
        "collections"           : "./js/collections",
        "models"                : "./js/models",
        "views"                 : "./js/views",

        // Routers
        "router"                : "./js/routers/Router"
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
            exports: "backboneFirebase"
        }
    }
});

define([], function () {
    "use strict";
});