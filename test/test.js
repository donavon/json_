var assert = require("assert");
var JSON_ = require("../.");

describe('JSON_', function(){
    describe('parse', function(){
        it('should return camelCase property names given snake_case JSON', function (){
            var data;
            data = JSON_.parse('{"first_name": ""}');
            assert.equal(Object.keys(data)[0], "firstName");

            data = JSON_.parse('{"isbn_10": ""}');
            assert.equal(Object.keys(data)[0], "isbn10");

            data = JSON_.parse('{"scores_a_1": ""}');
            assert.equal(Object.keys(data)[0], "scoresA1");
        });
    });
    describe('stringify', function(){
        it('should return snake_case JSON given an object with camelCase property names', function (){
            var data;
            data = JSON_.stringify({firstName: ""});
            assert.notEqual(data.indexOf("first_name"), -1);

            data = JSON_.stringify({isbn10: ""});
            assert.notEqual(data.indexOf("isbn_10"), -1);

            data = JSON_.stringify({scoresA1: ""});
            assert.notEqual(data.indexOf("scores_a_1"), -1);
        });
    });
});
