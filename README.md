json_
=====

Converts camelCase JavaScript objects to JSON snake_case and vise versa. This is a direct replacement for the built-in JSON object. In fact, this simply wraps the built-in JSON object.

### First, get the package

```
$ git clone git@github.com:NobleJS/json_.git
```

### Example

``` javascript
var JSON_ = require("json_");
var example = {
    firstName: "John",
    lastName: "Doe"
};

console.log(JSON_.stringify(example)); // "{"first_name":"John","last_name":"Doe"}"
```

And vise versa.

``` javascript
var JSON_ = require("json_");
var str = '{"ultimate_answer": 42}';

console.log(JSON_.parse(str)); // Object {ultimateAnswer: 42}
```

### License
Released under MIT license
