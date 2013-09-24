define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('lodash'),
        Backbone    = require('backbone'),
        ItemsColl   = require('collections/ItemsCollection'),
        ItemView    = require('views/Item'),
        tpl         = require('text!templates/second.html'),
        Junior      = require('junior');

    return Backbone.View.extend({
        template: _.template(tpl),

        tagName: 'div',

        initialize: function() {
            this.items = new ItemsColl();
            this.listenTo(this.items, 'add', this.addOne);
        },

        events: {
            'keypress #new-item'    : 'createItem',
            'keypress .go-back'     : 'goBack'
        },

        render: function() {
            this.$el.html(this.template());
            this.input = this.$('#new-item');
            this.items.each(function(model) {
                this.addOne(model);
            }, this);

            // Need a callback for backfire collection render.
            this.trigger('rendered', this);

            return this;
        },

        addOne: function(item) {
            var model = item,
                view = new ItemView({model: model});

            this.$el.find('#item-list').prepend(view.render().el);
        },

        createItem: function(e) {
            if (e.keyCode == 13) {
                if (this.input.val() !== '') {
                    this.items.add({text: this.input.val()});
                    this.input.val('');
                }
            }
        },

        goBack: function() {
            Junior.Navigator.navigate('/', {
                trigger: true,
                animation: {
                    type: Junior.Navigator.animations.SLIDE_STACK,
                    direction: Junior.Navigator.directions.LEFT
                }
            });
        }
    });
});