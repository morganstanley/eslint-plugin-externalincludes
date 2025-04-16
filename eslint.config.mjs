import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import licenseHeader from "eslint-plugin-license-header";

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the license header as an array of strings
const LICENSE_HEADER = [
    "/*",
    " * Morgan Stanley makes this available to you under the Apache License,",
    " * Version 2.0 (the \"License\"). You may obtain a copy of the License at",
    " *",
    " *      http://www.apache.org/licenses/LICENSE-2.0.",
    " *",
    " * See the NOTICE file distributed with this work for additional information",
    " * regarding copyright ownership. Unless required by applicable law or agreed",
    " * to in writing, software distributed under the License is distributed on an",
    " * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express",
    " * or implied. See the License for the specific language governing permissions",
    " * and limitations under the License.",
    " */"
];

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

// Get the ESLint configurations from plugins
const eslintRecommended = compat.extends("eslint:recommended");
const eslintPluginRecommended = compat.extends("plugin:eslint-plugin/recommended");
const nRecommended = compat.extends("plugin:n/recommended");

// Create the flat config array
export default [
    // Base configuration with ignores
    {
        ignores: ["node_modules/**"]
    },
    
    // Include the plugin configurations
    ...eslintRecommended,
    ...eslintPluginRecommended,
    ...nRecommended,
    
    // Global configuration
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: "latest"
        },
        linterOptions: {
            reportUnusedDisableDirectives: true
        },
        rules: {
            "eslint-plugin/require-meta-docs-description": ["error", {
                pattern: "^(Enforce|Require|Disallow|Prefer).+\\.$",
            }],
            "n/no-extraneous-require": "off"
        }
    },
    
    // Disable problematic rules for the config file itself
    {
        files: ["**/eslint.config.mjs"],
        rules: {
            "n/no-extraneous-import": "off",
            "n/no-unpublished-import": "off"
        }
    },
    
    // Add license header check for all JavaScript files
    {
        files: ["**/*.js"],
        plugins: {
            "license-header": licenseHeader
        },
        rules: {
            "license-header/header": ["error", LICENSE_HEADER]
        }
    },
    
    // Configuration for test files
    {
        files: ["**/tests/*.js"],
        languageOptions: {
            globals: {
                ...globals.mocha,
            }
        }
    },

    // Enable Mocha globals for all test files (Flat config way)
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.mocha,
            }
        }
    }
];
