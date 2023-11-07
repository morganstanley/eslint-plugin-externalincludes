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
