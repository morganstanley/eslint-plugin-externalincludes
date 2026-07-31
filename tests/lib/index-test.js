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
const plugin = require("../../lib/index");
const pkg = require("../../package.json");

describe("plugin entry point", () => {
    it("exposes meta matching package.json", () => {
        assert.strictEqual(plugin.meta.name, pkg.name);
        assert.strictEqual(plugin.meta.version, pkg.version);
    });

    it("exposes both rules", () => {
        assert.ok(plugin.rules["enforce-no-external-url"]);
        assert.ok(plugin.rules["require-script-integrity"]);
    });

    describe("configs.recommended (flat config)", () => {
        const recommended = plugin.configs.recommended;

        it("scopes itself to HTML files", () => {
            assert.deepStrictEqual(recommended.files, ["**/*.html"]);
        });

        it("registers itself and @html-eslint under resolvable plugin keys", () => {
            assert.strictEqual(recommended.plugins.externalincludes, plugin);
            assert.ok(recommended.plugins["@html-eslint"]);
        });

        it("wires up the HTML parser", () => {
            assert.ok(recommended.languageOptions.parser);
        });

        it("enables both rules with the expected severities", () => {
            assert.strictEqual(recommended.rules["externalincludes/enforce-no-external-url"], "error");
            assert.strictEqual(recommended.rules["externalincludes/require-script-integrity"], "warn");
        });
    });

    describe("configs.recommendedLegacy (.eslintrc-shaped)", () => {
        const legacy = plugin.configs.recommendedLegacy;

        it("registers the plugin under the legacy string-array shape", () => {
            assert.deepStrictEqual(legacy.plugins, ["externalincludes"]);
        });

        it("enables both rules with the expected severities", () => {
            assert.strictEqual(legacy.rules["externalincludes/enforce-no-external-url"], "error");
            assert.strictEqual(legacy.rules["externalincludes/require-script-integrity"], "warn");
        });

        it("has no files/languageOptions - legacy .eslintrc has no such primitive", () => {
            assert.strictEqual(legacy.files, undefined);
            assert.strictEqual(legacy.languageOptions, undefined);
        });
    });
});
