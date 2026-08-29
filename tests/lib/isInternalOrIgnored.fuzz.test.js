/*
 * Morgan Stanley makes this available to you under the Apache License,
 * Version 2.0 (the "License"). You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0.
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership. Unless required by applicable law or agreed
 * to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const fc = require('fast-check');
const { isInternalOrIgnored } = require('../../lib/isInternalOrIgnored');

// Bias arbitraries toward URL-shaped payloads so the URL-parsing / ignoreDomains
// code paths are actually exercised during fuzzing, instead of only hitting the
// guard clause at the top of isInternalOrIgnored.
const urlAtom = fc.constantFrom('http', 'https', ':', '/', '\\', '.', '-', '_', '@', '?', '&', '%', ' ');
const urlLikeString = fc.oneof(
  fc.string({ maxLength: 256 }),
  fc.array(urlAtom, { minLength: 1, maxLength: 32 }).map((atoms) => atoms.join(''))
);

describe('fuzz isInternalOrIgnored', () => {
  it('never throws and always returns a boolean for synthetic <script src=...> nodes', () => {
    fc.assert(
      fc.property(urlLikeString, (url) => {
        const node = { attributes: [{ key: { value: 'src' }, value: { value: url } }] };
        const result = isInternalOrIgnored(node, 'src', []);
        return typeof result === 'boolean';
      })
    );
  });

  it('should not throw for arbitrary non-node inputs', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        // Should not throw for any string
        isInternalOrIgnored(input);
      })
    );
  });

  it('never constructs a RegExp from ignoreDomains input (deterministic ReDoS guard)', () => {
    const OriginalRegExp = global.RegExp;
    let constructed = false;
    global.RegExp = new Proxy(OriginalRegExp, {
      construct(target, args) {
        constructed = true;
        return new target(...args);
      }
    });
    try {
      const node = { attributes: [{ key: { value: 'src' }, value: { value: '//evil.com/x.js' } }] };
      isInternalOrIgnored(node, 'src', ['(.+)+x', '.*', 'a|b']);
    } finally {
      global.RegExp = OriginalRegExp;
    }
    if (constructed) {
      throw new Error('isInternalOrIgnored constructed a RegExp from ignoreDomains input - possible ReDoS');
    }
  });

  it('completes within a sane time budget even with a regex-metacharacter-laden ignoreDomains entry (secondary ReDoS smoke check)', () => {
    const node = { attributes: [{ key: { value: 'src' }, value: { value: 'https://example.com/' + 'a'.repeat(2000) } }] };
    const start = Date.now();
    isInternalOrIgnored(node, 'src', ['(.+)+x']);
    if (Date.now() - start > 500) {
      throw new Error('isInternalOrIgnored exceeded 500ms - possible ReDoS');
    }
  });

  it('treats a value the URL parser cannot resolve as external', () => {
    const node = { attributes: [{ key: { value: 'src' }, value: { value: 'https://[::1' } }] };
    const result = isInternalOrIgnored(node, 'src', []);
    if (result !== false) {
      throw new Error('expected malformed URL to be treated as external');
    }
  });

  it('treats a node without an attributes array as external', () => {
    if (isInternalOrIgnored({}, 'src', []) !== false) {
      throw new Error('expected a node with no attributes array to be treated as external');
    }
  });

  it('skips malformed attribute entries missing a key or value', () => {
    const node = { attributes: [{ key: { value: 'src' } }, { value: { value: 'https://evil.com/x.js' } }] };
    if (isInternalOrIgnored(node, 'src', []) !== false) {
      throw new Error('expected node with only malformed attributes to be treated as external');
    }
  });

  it('treats a protocol-relative value with no host as external', () => {
    const node = { attributes: [{ key: { value: 'src' }, value: { value: '//' } }] };
    if (isInternalOrIgnored(node, 'src', []) !== false) {
      throw new Error('expected protocol-relative URL with no host to be treated as external');
    }
  });

  it('extracts a protocol-relative host that carries an explicit port', () => {
    const node = { attributes: [{ key: { value: 'src' }, value: { value: '//www.foo.com:8080/x.js' } }] };
    if (isInternalOrIgnored(node, 'src', ['.foo.com']) !== true) {
      throw new Error('expected port-qualified allowlisted host to be treated as internal/ignored');
    }
  });

  it('ignores non-string ignoreDomains entries instead of matching them', () => {
    const node = { attributes: [{ key: { value: 'src' }, value: { value: '//www.foo.com/x.js' } }] };
    if (isInternalOrIgnored(node, 'src', [123, '.foo.com']) !== true) {
      throw new Error('expected a valid string entry alongside a non-string entry to still match');
    }
  });
});