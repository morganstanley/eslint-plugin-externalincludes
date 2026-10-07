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

const assert = require("assert");
const { requirePeerDep } = require("../../lib/requirePeerDep");

describe("requirePeerDep", () => {
    it("returns the module when it's installed", () => {
        assert.strictEqual(requirePeerDep("assert"), require("assert"));
    });

    it("rethrows a clearer, actionable error when the module isn't found", () => {
        assert.throws(
            () => requirePeerDep("@morgan-stanley/this-package-does-not-exist-12345"),
            (err) => {
                assert.ok(err.message.includes("@morgan-stanley/this-package-does-not-exist-12345"));
                assert.ok(err.message.includes("npm install"));
                return true;
            }
        );
    });

    it("rethrows unrelated errors unchanged", () => {
        // A malformed .json fixture fails with a SyntaxError (not MODULE_NOT_FOUND) when
        // required, exercising requirePeerDep's plain `throw e;` fallback. Kept as .json
        // (not .js) so mocha's recursive spec glob under tests/ doesn't try to run it.
        // The exact V8 message wording for a JSON parse error varies by Node version, so
        // assert on the error type/code rather than message text.
        assert.throws(
            () => requirePeerDep("../tests/fixtures/malformed.json"),
            (err) => {
                assert.ok(err instanceof SyntaxError);
                assert.notStrictEqual(err.code, "MODULE_NOT_FOUND");
                return true;
            }
        );
    });
});
