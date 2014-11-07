json_
=====

[![Build Status](https://travis-ci.org/YuzuJS/json_.png)](https://travis-ci.org/YuzuJS/json_)

Converts camelCase JavaScript objects to JSON snake_case and vise versa. This is a direct replacement for the built-in JSON object. In fact, this simply wraps the built-in JSON object. Very handy when your back_end APIs are not build using Node.js.

### First, get the package
json_ has zero dependencies and comes with AMD and CommonJS module boilerplate. If the last sentence meant nothing to you then simply drop the following into your page:

    <script src="https://raw.github.com/NobleJS/json_/master/lib/json_.js"></script>

```
npm install json_ --save
```

### Example

``` javascript
var JSON_ = require("json_");
var example = {
    firstName: "John",
    lastName: "Doe",
    isbn10: "1234567890"
};

console.log(JSON_.stringify(example)); // "{"first_name":"John","last_name":"Doe", "isbn_10": "1234567890"}"
```

And vise versa.

``` javascript
var JSON_ = require("json_");
var str = '{"ultimate_answer": 42}';

console.log(JSON_.parse(str)); // Object {ultimateAnswer: 42}
```

### Tests!
To run the unit tests...

```
npm test
```

### License
Released under MIT license
