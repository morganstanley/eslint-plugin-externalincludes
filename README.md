# eslint-plugin-externalincludes

Suite of @html-eslint ESLint rules for working with external references such as script src and link hrefs.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-externalincludes`:

```sh
npm install eslint-plugin-externalincludes --save-dev
```

While `eslint-plugin-externalincludes` installs @html-eslint/eslint-plugin and @html-eslint/parser as peerDependencies you can optionally install directly.

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
    "externalincludes"
  ],
```

Then configure the rules you want to use under the rules section:

```json
{
    "rules": {
        "externalincludes/enforce-no-external-url": "error",
        "externalincludes/require-script-integrity": "error",
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

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.

| Name                                                               | Description                                      | 💼 | ⚠️ |
| :----------------------------------------------------------------- | :----------------------------------------------- | :- | :- |
| [enforce-no-external-url](docs/rules/enforce-no-external-url.md)   | Disallow external includes.                      | ✅  |    |
| [require-script-integrity](docs/rules/require-script-integrity.md) | Require `integrity` attribute at `<script>` tag. |    | ✅  |

<!-- end auto-generated rules list -->


