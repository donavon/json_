type Parse = typeof JSON.parse;
type Reviver = Parameters<Parse>[1];
type Stringify = typeof JSON.stringify;
type Replacer = Parameters<Stringify>[1];

const snakeToCamelCase = (key: string) =>
  // first_name -> firstName, isbn_10 -> isbn10, scores_a_1 -> scoresA1
  key.replace(/(_+[a-z0-9])/g, (snip: string) =>
    snip.toUpperCase().replace('_', '')
  );

const camelToSnakeCase = (key: string) =>
  // firstName -> first_name, isbn10 -> isbn_10, scoresA1 -> scores_a_1
  key
    .replace(/([A-Za-z])([0-9])/g, (_unused, char, digit) => char + '_' + digit)
    .replace(/([A-Z])/g, snip => '_' + snip.toLowerCase());

function parse(text: string | Response, reviver?: Reviver): any;
function parse(response: Response, reviver?: Reviver): Promise<any>;
function parse(responseOrText: string | Response, reviver?: Reviver): any {
  if (typeof responseOrText === 'string') {
    const text = responseOrText.replace(/"([^"]*)"\s*:/g, snakeToCamelCase);
    return JSON.parse(text, reviver);
  }
  return responseOrText
    .text()
    .then((text: string) => JSON_.parse(text, reviver)); // Assume text is a Response object from fetch.
}

function stringify(value: any, replacer?: Replacer, space?: number): string {
  const str = JSON.stringify(value, replacer, space);
  return str.replace(/"([^"]*)"\s*:/g, camelToSnakeCase);
}

const JSON_ = {
  parse,
  stringify,
};

export default JSON_;
