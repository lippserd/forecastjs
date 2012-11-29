/*!
 * forecast.js
 * Copyright (C) 2012 Eric Lippmann
 * forecast.js may be freely distributed under the MIT license.
 */

/**
 * Time series forecasting models.
 */
; (function () {
    'use strict';

    var // Reference to `window` in the browser, `exports`, `global` on
        // the server
        root = this;

    function forecast () {
        if (!(this instanceof forecast)) {
            return new forecast();
        }
    }

    root.forecast = forecast();
}.call(this));
