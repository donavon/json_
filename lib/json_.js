/* jshint unused:vars, sub:true */
/* global window, module */
(function () {
    "use strict";

    var JSON_ = {};

    function snakeToCamelCase(key) {
        // first_name -> firstName, isbn_10 -> isbn10, scores_a_1 -> scoresA1
        return key.replace(/(_+[a-z0-9])/g, function (snip) {
            return snip.toUpperCase().replace("_", "");
        });
    }

    function camelToSnakeCase(key) {
        // firstName -> first_name, isbn10 -> isbn_10, scoresA1 -> scores_a_1
        return key.replace(/([A-Za-z])([0-9])/g, function (snip, char, digit) {
            return char + "_" + digit;
        }).replace(/([A-Z])/g, function (snip) {
            return "_" + snip.toLowerCase();
        });
    }

    JSON_.parse = function parse(responseOrText, reviver) {
        if (typeof responseOrText === 'string') {
            var text = responseOrText.replace(/"([^"]*)"\s*:/g, snakeToCamelCase);
            return JSON.parse(text, reviver);
        }
        return responseOrText.text().then(parse); // Assume text is a Response object from fetch.
    };

    JSON_.stringify = function stringify(value, replacer, space) {
        var str = JSON.stringify(value, replacer, space);
        return str.replace(/"([^"]*)"\s*:/g, camelToSnakeCase);
    };

    // Export to popular environments boilerplate.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = JSON_;
    } else {
        window["JSON_"] = JSON_;
    }
})();