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

    /**
     * Returns forecasts for the next `c` periods of time series data
     * `oberservations` using the (Holt-Winter's) additive triple exponential
     * smoothing model.
     *
     * @param {Number[]} observations Time series data (a one dimensional array of y-values)
     * @param {Number} lengthOfSeason
     * @param {Number} c Number of periods in the seasonal pattern ahead to forecast
     * @param {Object} smoothingConstants
     * @returns {Number[]} Forecast for the next `c` periods
     */
    forecast.prototype.HoltWinters = function (observations, lengthOfSeason, c,
                                               smoothingConstants
    ) {
        /*!
         * The additive Holt-Winter's prediction model is denoted by the
         * following equations:
         *
         * Lt = a * ( Yt - St-c ) + ( 1 - a ) * ( Lt-1 + Tt-1 )
         * Tt = b * ( Lt - Lt-1 ) + ( 1 - b ) * Tt-1
         * St = y * ( Yt - Lt ) + ( 1 - y ) * St-c
         * Ft+h = Lt + h * Tt + St-p+1+(h-1)%p
         * 
         * **
         * 
         * The multiplicative Holt-Winter's prediction model is denoted by the
         * following equations:
         *
         * Lt = a * ( Yt / St-c ) + ( 1 - a ) * ( Lt-1 + Tt-1 )
         * Tt = b * ( Lt - Lt-1 ) + ( 1 - b ) * Tt-1
         * St = y * ( Yt / Lt ) + ( 1 - y ) * St-c
         * Ft+h = ( Lt + h * Tt) * St-p+1+(h-1)%p
         *
         * Where:
         *
         * Lt is the deseasonalized level at time t
         * a is the smoothing constant alpha, used to smooth Lt
         * Yt is the observed value at time t
         * St is the seasonal index/component at time t
         * c is the number of periods in the seasonal pattern ahead to forecast
         * Tt is the trend of the series at time t
         * b is the Smoothing constant beta, used to smooth Tt
         * y is the Smoothing constant gamma, used to Smoot St
         * Ft+h is the forecast for period h
         * p is the length of one seasons
         */
    }

    root.forecast = forecast();
}.call(this));
