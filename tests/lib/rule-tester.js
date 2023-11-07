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

const { RuleTester: ESLintRuleTester } = require("eslint");

const FILE_NAME = "test.html";

class RuleTester extends ESLintRuleTester {
    constructor(options) {
        super(options);
    }

    run(name, rule, tests) {
        super.run(name, rule, {
            valid: tests.valid.map((test) => ({
                ...test,
                filename: FILE_NAME,
            })),
            invalid: tests.invalid.map((test) => ({
                ...test,
                filename: FILE_NAME,
            })),
        })
    }
}

module.exports = function createRuleTester() {
    return new RuleTester({
        parser: require.resolve("@html-eslint/parser"),
    });
}