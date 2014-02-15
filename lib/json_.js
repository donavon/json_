/* jshint unused:vars, sub:true */
/* global window, define, module */
(function () {
    "use strict";

    var JSON_ = {};

    function snakeToCamelCase(key) {
        // first_name -> firstName
        return key.replace(/(_+[a-z])/g, function (snip) {
            return snip.toUpperCase().replace("_", "");
        });
    }

    function camelToSnakeCase(key) {
        // firstName -> first_name
        return key.replace(/([A-Z])/g, function (snip) {
            return "_" + snip.toLowerCase();
        });
    }

    JSON_.parse = function parse(text, reviver) {
        text = text.replace(/"([^"]*)"\s*:/g, snakeToCamelCase);
        return JSON.parse(text, reviver);
    };

    JSON_.stringify = function stringify(value, replacer, space) {
        var str = JSON.stringify(value, replacer, space);
        return str.replace(/"([^"]*)"\s*:/g, camelToSnakeCase);
    };

    // Export to popular environments boilerplate.
    if (typeof define === "function" && define.amd) {
        define(JSON_);
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = JSON_;
    } else {
        window["JSON_"] = JSON_;
    }
}());
