# eslint-plugin-externalincludes

![Lifecycle Active](https://badgen.net/badge/Lifecycle/Active/green)
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


