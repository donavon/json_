import JSON_ from '.';
import { installGlobals } from '@remix-run/node';

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

const testCases = [
  ['first_name', 'firstName'],
  ['address_1', 'address1'],
  ['scores_a_1_b_2', 'scoresA1B2'],
];

describe('JSON_', function() {
  describe('parse', function() {
    describe('when passed a string', function() {
      testCases.forEach(([snakeCasedKey, camelCasedKey]) => {
        it(`should return ${camelCasedKey} given ${snakeCasedKey}`, function() {
          const results = JSON_.parse(`{"${snakeCasedKey}": ""}`);
          const expected = JSON.parse(`{"${camelCasedKey}": ""}`);
          expect(results).toEqual(expected);
        });
      });
    });

    describe('when passed a Response', function() {
      it('should return a promise', function() {
        const response = new Response('{ "foo_bar": 1 }');
        const promise = JSON_.parse(response);
        expect(promise).toBeInstanceOf(Promise);
      });
      it('that resolves with a camelCased JS object', async () => {
        const response = new Response('{ "foo_bar": 1 }');
        const obj = await JSON_.parse(response);
        expect(obj).toEqual({ fooBar: 1 });
      });
    });
  });

  describe('stringify', function() {
    testCases.forEach(([snakeCasedKey, camelCasedKey]) => {
      it(`should return ${snakeCasedKey} given ${camelCasedKey}`, function() {
        const results = JSON_.stringify({ [camelCasedKey]: '' });
        const expected = JSON.stringify({ [snakeCasedKey]: '' });
        expect(results).toBe(expected);
      });
    });
  });
});
