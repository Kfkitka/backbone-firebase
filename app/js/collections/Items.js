define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Item                = require('models/Item'),
        Firebase            = require('firebase'),
        BackboneFirebase    = require('backboneFirebase');

    return Backbone.Firebase.Collection.extend({
        model:      Item,
        firebase:   'https://snapbase.firebaseio.com/items'
    });
});