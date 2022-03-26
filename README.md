# json\_

[![Build Status](https://travis-ci.org/donavon/json_.svg?branch=master)](https://travis-ci.org/donavon/json_) [![npm version](https://img.shields.io/npm/v/json_.svg)](https://www.npmjs.com/package/json_)

Converts camelCase JavaScript objects to JSON snake_case and vise versa. This is a direct replacement for the built-in JSON object. In fact, this simply wraps the built-in JSON object. Very handy when your back_end APIs are not build using Node.js.
It also supports converting a `fetch` response stream into a camelCased object.

> NOTE: New version 3.0 completely re-written in TypeScript, so it's fully typed.

## First, get the package

Install json\_ and include it in your build.

```bash
npm install json_ --save
```

Then import it like this.

```js
import JSON_ from 'json_';
```

## Example

```js
const example = {
  firstName: 'John',
  lastName: 'Doe',
  isbn10: '1234567890',
};

console.log(JSON_.stringify(example));
// {"first_name":"John","last_name":"Doe", "isbn_10": "1234567890"}
```

And vise versa.

```js
import JSON_ from 'json_';
const str = '{"ultimate_answer": 42}';

console.log(JSON_.parse(str));
// {ultimateAnswer: 42}
```

## Using with `fetch`

You can use `json_` directly with the JavaScript `fetch` API to convert
the `Response` into an `Object` with snakeCase.

Let's say you have a function that returns snake_case weather data, something like this.

```js
const fetchWeather = async zip => {
  const response = fetch(`${weatherUrl}?zip=${zip}`);
  const json = await response.json();
  return json;
};

const data = await fetchWeather('10285');
console.log(data);
// {current_temp: 85, reporting_station: 'New York, NY'}
```

You can easily convert the resolved object to camelCase by replacing the call to `Response.json()`
to a call to `JSON_.parse(Response)`, like this.

```diff
- const json = await response.json();
+ const json = await JSON_.parse(response);
```

The resulting code looks like this

```js
import JSON_ from 'json_';

const fetchWeather = async zip => {
  const response = fetch(`${weatherUrl}?zip=${zip}`);
  const json = await JSON_.parse(response);
  return json;
};

const data = await fetchWeather('10285');
console.log(data);
// {currentTemp: 85, reportingStation: 'New York, NY'}
```

## Tests!

100% unit test coverage. To run the unit tests and get a coverage report:

```
npm test coverage
```

## License

Copyright Donavon West. Released under MIT license
