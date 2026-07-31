# eslint-plugin-externalincludes

![Lifecycle Active](https://img.shields.io/badge/Lifecycle-Active-brightgreen)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/%40morgan-stanley%2Feslint-plugin-externalincludes.svg)](https://www.npmjs.com/package/@morgan-stanley/eslint-plugin-externalincludes)
[![CI](https://github.com/morganstanley/eslint-plugin-externalincludes/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/morganstanley/eslint-plugin-externalincludes/actions/workflows/continuous-integration.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/morganstanley/eslint-plugin-externalincludes/badge)](https://securityscorecards.dev/viewer/?uri=github.com/morganstanley/eslint-plugin-externalincludes)
[![codecov](https://codecov.io/gh/MorganStanley/eslint-plugin-externalincludes/branch/main/graph/badge.svg)](https://codecov.io/gh/MorganStanley/eslint-plugin-externalincludes)

Suite of @html-eslint ESLint rules for working with external references such as script src and link hrefs.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@morgan-stanley/eslint-plugin-externalincludes`:

```sh
npm install @morgan-stanley/eslint-plugin-externalincludes --save-dev
```

While `@morgan-stanley/eslint-plugin-externalincludes` installs @html-eslint/eslint-plugin and @html-eslint/parser as peerDependencies you can optionally install directly.

## Usage

### Flat config (ESLint 9+)

The simplest way to get started is the `recommended` config, which wires up `@html-eslint/parser`
for `**/*.html` files and enables both rules:

```js
import externalincludes from "@morgan-stanley/eslint-plugin-externalincludes";

export default [
  externalincludes.configs.recommended,
];
```

The preset registers this plugin under the `externalincludes` key, so if you want to override a rule's
severity or options, reference it as `externalincludes/<rule>` (not the npm package name):

```js
export default [
  externalincludes.configs.recommended,
  {
    files: ["**/*.html"],
    rules: {
      "externalincludes/enforce-no-external-url": ["error", { ignoreDomains: [".example.com"] }],
    },
  },
];
```

### Legacy `.eslintrc`

Update your `.eslintrc` configuration file to add ESLint override for html files to specify the @html-eslint/parser and extend recommended rules if desired.
Add `@html-eslint` and  `externalincludes` to the plugins section.
You can omit the `eslint-plugin-` prefix:

```js
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
  plugins: [
    "@html-eslint",
    "@morgan-stanley/externalincludes"
  ],
```

Then configure the rules you want to use under the rules section:

```json
{
    "rules": {
        "@morgan-stanley/externalincludes/enforce-no-external-url": "error",
        "@morgan-stanley/externalincludes/require-script-integrity": "error",
    }
}
```

Alternatively, `configs.recommendedLegacy` provides the same rule set in this `.eslintrc`-compatible shape
(`{ plugins: [...], rules: {...} }`) if you'd rather spread it in than list the rules manually. Note it
still only covers the `plugins`/`rules` portion - you still need the `overrides` block above (or equivalent)
to wire up `@html-eslint/parser` for `*.html` files, since legacy `.eslintrc` config objects have no `files`
scoping primitive of their own.

If you are using the VS Code ESLint extension, update settings.json to include validation of html:

```json
{
    "eslint.enable": true,
    "eslint.validate": ["javascript", "html"]
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                               | Description                                      |
| :----------------------------------------------------------------- | :----------------------------------------------- |
| [enforce-no-external-url](docs/rules/enforce-no-external-url.md)   | Disallow external includes.                      |
| [require-script-integrity](docs/rules/require-script-integrity.md) | Require `integrity` attribute at `<script>` tag. |

<!-- end auto-generated rules list -->


