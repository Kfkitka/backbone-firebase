define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        ItemsColl   = require('collections/Items'),
        tpl         = require('text!tpl/item.html');

    return Backbone.View.extend({
        tagName: "li",

        template: _.template(tpl),

        events: {
            'click a.item-delete' : 'deleteItem'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.items = new ItemsColl();
        },

        render: function() {
            this.$el.html(this.template({data: this.model.toJSON()}));
            return this;
        },

        deleteItem: function(e) {
            this.items.remove(this.model);
            e.preventDefault();
        }
    });
});