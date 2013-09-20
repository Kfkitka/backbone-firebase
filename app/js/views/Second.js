define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        ItemsColl   = require('collections/Items'),
        ItemView    = require('views/Item'),
        tpl         = require('text!tpl/second.html');

    return Backbone.View.extend({
        template: _.template(tpl),

        initialize: function() {
            this.items = new ItemsColl();
            this.listenTo(this.items, 'add', this.addOne);
        },

        events: {
            'keypress #new-item' : 'createItem'
        },

        render: function() {
            this.$el.html(this.template());
            this.input = this.$('#new-item');
            this.items.each(function(model) {
                this.addOne(model);
            }, this);

            return this;
        },

        addOne: function(item) {
            var model = item,
                view = new ItemView({model: model});

            this.$el.find('#item-list').prepend(view.render().el);
        },

        createItem: function(e) {
            if (e.keyCode == 13) {
                this.items.add({text: this.input.val()});
                this.input.val('');
            }
        }
    });
});