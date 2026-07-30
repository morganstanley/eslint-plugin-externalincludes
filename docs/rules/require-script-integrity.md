# Require `integrity` attribute at `<script>` tag (`@morgan-stanley/externalincludes/require-script-integrity`)

<!-- end auto-generated rule header -->

⚠️ This rule _warns_ in the ✅ `recommended` config.

#### Valid

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

#### Invalid
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

The `integrity` value must match the [Subresource Integrity](https://www.w3.org/TR/SRI/#the-integrity-attribute)
format: `sha256-`, `sha384-`, or `sha512-` followed by a base64-encoded digest (optionally as a
whitespace-separated list of hashes). Values that don't match this format - including weaker
algorithms like `sha1` - are treated the same as a missing `integrity` attribute.

#### Options

##### `ignoredDomains`

You can provide an array of allowed domains that are ignored.

```
  rules: {
    "externalincludes/require-script-integrity": [
      "error",
      { ignoreDomains: ["cdnjs.cloudflare.com"] }
    ],
  }
```
