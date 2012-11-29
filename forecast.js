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
         * St is the seasonal index/component at time t which indicates how much
         *  this period typically deviates from the average
         * c is the number of periods in the seasonal pattern ahead to forecast
         * Tt is the trend of the series at time t
         * b is the Smoothing constant beta, used to smooth Tt
         * y is the Smoothing constant gamma, used to Smoot St
         * Ft+h is the forecast for period h
         * p is the length of one seasons
         * 
         * TODO(el): Implement multiplicative prediction model too?
         */
        var t,       // Time t, also abused as iteration variable
            As1 = 0, // Average value of the first season, used to compue T0
            As2 = 0, // Average value of the second season, used to compute T0
            T0,      // Initial estimate of the slope
            L0,      // Initial estimate of the deseasonalized level
            I = [],  // Initial seasonal indices
            S = new Array(observations.length + c), // Seasonal indices
            SAverageIndex = 0, // Average of the sum of the seasonal indices
                               // for t = 1, 2, ..., lengthOfSeason
                               // used to compute S
            Lt,       // Level of the base value at time t
            Tt,       // Trend at time t
            Ltminus1, // Last observation's level of the base value at time t
            Ttminus1, // Last observation's trend at time t
            Yt,       // Y-value at time t
            smoothingConstants = smoothingConstants || {},
            alpha = smoothingConstants.alpha || 0.2,
            beta = smoothingConstants.beta || 0.2,
            gamma = smoothingConstants.gamma || 0.4,
            // TODO(el): Determine unknown smoothing constants by minimizing
            // the squared prediction error
            h,        // Period h
            Fth = []; // Forecast fore period h
        /*!
         * Determine the initial estimates of model parameters using a minimum
         * of two full seasons.
         * TODO(el): Validate that a minimum of two full seasons is available.
         */
        for (t=0; t < lengthOfSeason; ++t) { // Sum of season one
            As1 += observations[t];
        }
        As1 /= lengthOfSeason; // Average of seasons one
        for (t=lengthOfSeason; t < lengthOfSeason * 2; ++t) { // Sum of season 
            As2 += observations[t];                           // two
        }
        As2 /= lengthOfSeason; // Average of seasons two
        /*!
         * The initial estimate of the slope is found by taking the diﬀerence
         * of the average for the first two seasons and dividing by the length
         * of one season.
         */
        T0 = (As2 - As1) / lengthOfSeason;
        /*!
         * Estimate inital deseasonalized level using the following equation.
         */
        L0 = As1 - (lengthOfSeason / 2) * T0;
        /*!
         * Determine the initial seasonal indices for each season
         * t = 1, 2, ..., c as ratio of actual observation to the
         * seasonally average.
         */
        for (t=0; t < observations.length; ++t) {
            I[t] = observations[t] / (L0 + (t + 1) * T0);
        }
        for (t=0; t < lengthOfSeason; ++t) {
            S[t] = (I[t] + I[t+lengthOfSeason]) / 2;
            SAverageIndex += S[t];
        }
        for (t=0; t < lengthOfSeason; ++t) {              // Normalize indices
            S[t] = S[t] / SAverageIndex * lengthOfSeason; // so that they
        }                                                 // sum up to c
        console.log(S, T0, L0);
        return [];
    }

    root.forecast = forecast();
}.call(this));
