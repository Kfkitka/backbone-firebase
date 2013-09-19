define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/item.html');

    return Backbone.View.extend({
        tagName: "li",

        template: _.template(tpl),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template({data: this.model.toJSON()}));
            return this;
        }
    });
});