define(function(require) {

    'use strict';

    var $           = require('jquery'),
        HomeView    = require('views/Home'),
        SecondView  = require('views/Second'),
        MenuView    = require('views/Menu'),
        Snap        = require('snap');

    return Backbone.Router.extend({
        routes: {
            "": "home",
            "second": "second"
        },

        initialize: function() {
            this.view = null;
        },

        home: function() {
            this._cleanUp();
            this.view = new HomeView();
            this.show();
        },

        second: function() {
            this._cleanUp();
            this.view = new SecondView();
            this.show();
        },

        _initMenu: function() {
            this.menu = new MenuView();
            this.menu.render();
            $('body').prepend(this.menu.el);
        },

        _initSnapper: function() {
            this.snapper = new Snap({
                element: document.getElementById('snapper'),
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

            if (this.menu) {
                this.menu.remove();
            }

            this.menu = null;
            this.view = null;
        },

        show: function () {
            this._initMenu();
            this.view.render();
            $('body').prepend(this.view.el);
            this._initSnapper();
            this.snapper.close();
            $('body').removeClass('snapjs-left'); // ?? page loads with this class set.
        }
    });
});