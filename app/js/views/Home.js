define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/home.html');

    var view = Backbone.View.extend({
        template: _.template(tpl),

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return view;
});