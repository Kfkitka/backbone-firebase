define(function(require) {

    'use strict';

    var $               = require('jquery'),
        HomeView        = require('views/Home'),
        SecondView      = require('views/Second'),
        Snap            = require('snap');

    return Backbone.Router.extend({
        routes: {
            "": "home",
            "second": "second"
        },
        initialize: function () {
            this._initSnapper();
            this.view = null;
        },
        home: function () {
            this._cleanUp();
            this.view = new HomeView();
            this.view.render();
            this.show();
        },
        second: function () {
            this._cleanUp();
            this.view = new SecondView();
            this.view.render();
            this.show();
        },
        _initSnapper: function() {
            this.snapper = new Snap({
                element: document.getElementById('content'),
                dragger: null,
                disable: 'right'
            });

            $('#slide-menu-button').click(function() {
                this.snapper.open('left');
            });
        },
        _cleanUp: function() {
            if (this.view) {
                this.view.remove();
            }

            this.view = null;
        },
        show: function () {
            $('#content').html(this.view.el);
            this.snapper.close();
        }
    });
});