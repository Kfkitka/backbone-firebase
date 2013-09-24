define(function(require) {

    'use strict';

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('views/Home'),
        SecondView  = require('views/Second'),
        MenuView    = require('views/Menu'),
        Snap        = require('snap'),
        Junior      = require('junior'),
        Globals     = require('util/globals');

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
            Globals.spinner.spin();

            Backbone.Model.instances.vent.on('rendered:home', function() {
                Globals.spinner.stop();
            });

            this.renderView(new HomeView());
            this._toggleSnapper();
        },

        second: function() {
            Globals.spinner.spin();

            Backbone.Model.instances.vent.on('rendered:second', function() {
                Globals.spinner.stop();
            });

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

            // TODO: Move this to some global.
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