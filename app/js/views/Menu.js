define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/menu.html');

    var view = Backbone.View.extend({
        template: _.template(tpl),

        tagName: 'div',

        className: 'snap-drawer snap-drawer-left',

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template()).attr('id', 'snapper');

            return this;
        }
    });

    return view;
});