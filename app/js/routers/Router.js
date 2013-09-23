define(function(require) {

    'use strict';

    var $           = require('jquery'),
        HomeView    = require('views/Home'),
        SecondView  = require('views/Second'),
        MenuView    = require('views/Menu'),
        Snap        = require('snap'),
        Junior      = require('junior');

    return Junior.Router.extend({
        routes: {
            "": "home",
            "second": "second"
        },

        initialize: function() {
            this.view = null;
            this._initSnapper();
        },

        home: function() {
            this.renderView(new HomeView());
            this._toggleSnapper();
        },

        second: function() {
            this.renderView(new SecondView());
            this._toggleSnapper();
        },

        _initSnapper: function() {
            this.snapper = new Snap({
                element: document.getElementById('app-container'),
                dragger: null,
                disable: 'right'
            });
        },

        _toggleSnapper: function() {
            var self = this;

            this.menu = new MenuView();
            this.menu.render();

            $('body').prepend(this.menu.el);

            $('#slide-menu-button').click(function() {
                if ($('body').hasClass('snapjs-left')) {
                    self.snapper.close('left');
                } else {
                    self.snapper.open('left');
                }
            });
        }
    });
});