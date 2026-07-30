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

/* eslint-disable n/no-unpublished-require -- peer deps, present at lint/consumption time */
const htmlParser = require("@html-eslint/parser");
const htmlEslint = require("@html-eslint/eslint-plugin");
/* eslint-enable n/no-unpublished-require */

const pkg = require("../package.json");

/**
 * @fileoverview ESLint plugin for enforcing rules on external includes in HTML files
 * @author Morgan Stanley
 */

const PLUGIN_KEY = "externalincludes";

/**
 * @type {import('eslint').ESLint.Plugin}
 */
const plugin = {
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
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
    configs: {}
};

/**
 * Recommended configuration that enables the core rules. Shaped as an ESLint 9+
 * flat config object: scoped to HTML files, with the HTML parser wired up so
 * the rules' visitors actually run.
 */
plugin.configs.recommended = {
    files: ["**/*.html"],
    plugins: {
        [PLUGIN_KEY]: plugin,
        "@html-eslint": htmlEslint,
    },
    languageOptions: {
        parser: htmlParser,
    },
    rules: {
        [`${PLUGIN_KEY}/enforce-no-external-url`]: "error",
        [`${PLUGIN_KEY}/require-script-integrity`]: "warn"
    }
};

module.exports = plugin;
