define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/home.html');

    var view = Backbone.View.extend({
        template: _.template(tpl),

        tagName: 'div',

        events: {
            'click .button': 'btnClick'
        },

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template());
            this.trigger('rendered', this);

            return this;
        },

        btnClick: function(e) {
            e.preventDefault();
        }
    });

    return view;
});