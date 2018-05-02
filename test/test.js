var assert = require("assert");
var JSON_ = require("../.");

var responseStub = {
    text: function() {
        return Promise.resolve('{ "foo_bar": 1 }');
    }
};

describe('JSON_', function(){
    describe('parse (passing a string)', function (){
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
    describe('parse (passing a Response)', function (){
        it('should return a promise', function (){
            assert.equal(JSON_.parse(responseStub)  instanceof Promise, true);
        });
        it('that resolves with a camelCased JS object', function (done){
            JSON_.parse(responseStub).then(function (obj) {
                assert.equal(JSON.stringify(obj), JSON.stringify({ fooBar: 1 }));
                done();
            });
        });
    });
    describe('stringify', function (){
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
