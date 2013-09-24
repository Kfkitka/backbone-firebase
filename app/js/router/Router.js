define(function(require) {

    'use strict';

    var $           = require('jquery'),
        HomeView    = require('views/Home'),
        SecondView  = require('views/Second'),
        MenuView    = require('views/Menu'),
        Snap        = require('snap'),
        Junior      = require('junior'),
        Spinner     = require('spin');

    return Junior.Router.extend({
        routes: {
            "": "home",
            "second": "second"
        },

        initialize: function() {
            this.view = null;
            this._initSpinner();
            this._initSnapper();
        },

        home: function() {
            this.startSpinner();
            var homeView = new HomeView();

            homeView.on('rendered', function() {
                this.removeSpinner();
            }, this);

            this.renderView(homeView);
            this._toggleSnapper();
        },

        second: function() {
            this.startSpinner();
            var secondView = new SecondView();

            secondView.on('rendered', function() {
                this.removeSpinner();
            }, this);

            this.renderView(secondView);
            this._toggleSnapper();
        },

        _initSpinner: function() {
            var opts = {
                lines: 8, // The number of lines to draw
                length: 5, // The length of each line
                width: 5, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 2, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto', // Left position relative to parent in px
                overlay: true
            };

            this.spinner = new Spinner(opts);
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
        },

        startSpinner: function() {
            var target = document.getElementById('app-container');
            this.spinner.spin(target);
        },

        removeSpinner: function() {
            this.spinner.stop();
        }
    });
});