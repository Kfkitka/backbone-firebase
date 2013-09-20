define(function (require) {

    "use strict";

    var $               = require('jquery'),
        _               = require('lodash'),
        Backbone        = require('backbone'),
        tpl             = require('text!tpl/home.html'),
        RatchetModal    = require('RatchetModal');

    var view = Backbone.View.extend({
        template: _.template(tpl),

        tagName: 'div',

        className: 'snap-content',

        events: {
            'click .button': 'btnClick'
        },

        initialize: function() {
            this.modalListener = new RatchetModal();
            this.modalListener.listen();
        },

        render: function() {
            this.$el.html(this.template()).attr('id', 'snapper');

            return this;
        },

        btnClick: function(e) {
            e.preventDefault();
        }
    });

    return view;
});