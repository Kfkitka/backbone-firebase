define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Item                = require('models/ItemModel'),
        Firebase            = require('firebase'),
        BackboneFirebase    = require('backboneFirebase');

    return Backbone.Firebase.Collection.extend({
        model:      Item,
        firebase:   new Firebase('https://snapbase.firebaseio.com/items')
    });
});