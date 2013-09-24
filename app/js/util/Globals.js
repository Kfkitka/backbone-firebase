define(function (require) {

    "use strict";

    var Spinner     = require('spin'),
        SpinnerOpts = { lines: 8, speed: 2, overlay: true };

    return {
        spinner: new Spinner(SpinnerOpts)
    }
});