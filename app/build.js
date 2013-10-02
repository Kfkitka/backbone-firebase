({
    appDir: './',
    baseUrl: './js',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery                : 'libs/jquery-1.10.2',
        lodash                : "libs/lodash-1.3.1",
        backbone              : "libs/backbone-1.0.0",
        text                  : "libs/text-2.0.10",
        firebase              : "libs/firebase",
        backboneFirebase      : "libs/backbone-firebase",
        snap                  : "libs/snap-1.2.9",
        fastClick             : "libs/fastclick-0.6.9",
        modernizr             : "libs/modernizr-2.6.2",
        RatchetModal          : "libs/ratchet-modal",
        junior                : "libs/junior",
        spin                  : "libs/spin-1.3.2",
        eventDispatcher       : "util/EventDispatcher",

        router                : "router/Router"
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
})