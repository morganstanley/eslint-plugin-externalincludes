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

"use strict";

/**
 * @fileoverview ESLint plugin for enforcing rules on external includes in HTML files
 * @author Morgan Stanley
 */

/**
 * @type {import('eslint').ESLint.Plugin}
 */
module.exports = {
    /**
     * Rule definitions for the plugin
     */
    rules: {
        "enforce-no-external-url": require("./rules/enforce-no-external-url"),
        "require-script-integrity": require("./rules/require-script-integrity")
    },
    /**
     * Shareable configurations for the plugin
     */
    configs:
    {
        /**
         * Recommended configuration that enables the core rules
         */
        recommended: {
            plugins:["externalincludes"],
            rules: {
                "externalincludes/enforce-no-external-url": "error",
                "externalincludes/require-script-integrity": "warn"
            }
        }
    }
}
