define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        tpl         = require('text!templates/menu.html'),
        Junior      = require('junior');

    var view = Backbone.View.extend({
        template: _.template(tpl),

        tagName: 'div',

        className: 'snap-drawer snap-drawer-left',

        events: {
            'click #show-home': 'showHome',
            'click #show-second': 'showSecond'
        },

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template()).attr('id', 'snapper');

            return this;
        },

        showSecond: function() {
            this.navigate('/second');
        },

        showHome: function() {
            this.navigate('/');
        },

        navigate: function(to) {
            Junior.Navigator.navigate(to, {
                trigger: true,
                animation: {
                    type: Junior.Navigator.animations.SLIDE_STACK,
                    direction: Junior.Navigator.directions.LEFT
                }
            });

            return false;
        }
    });

    return view;
});