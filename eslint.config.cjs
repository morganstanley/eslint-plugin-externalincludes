const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [...compat.extends(
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:n/recommended",
), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest"
    },

    rules: {
        "eslint-plugin/require-meta-docs-description": ["error", {
            pattern: "^(Enforce|Require|Disallow|Prefer).+\\.$",
        }],
        "n/no-extraneous-require": "off"
    },
}, {
    files: ["**/tests/*.js"],

    languageOptions: {
        globals: {
            ...globals.mocha,
        },
    },
}];