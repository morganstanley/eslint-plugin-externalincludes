# Disallow external includes (`externalincludes/enforce-no-external-url`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

#### Valid

```
<script src="jquery-3.7.0.min.js"></script>
```

#### Invalid
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

#### Options

##### `ignoredDomains`

You can provide an array of allowed domains that are ignored.

```
  rules: {
    "externalincludes/enforce-no-external-url": [
      "error",
      { ignoreDomains: [".test.com"] }
    ],
  }
```

##### `attributes`

You can provide an array of tag.attribute in which to apply the rule.  The default is [ "script.src", "link.href" ].  These values should be all lower case as they will be compared to lower cased tag/attributes of the target.

```
  rules: {
    "externalincludes/enforce-no-external-url": [
      "error",
      { attributes: ["script.src", "link.href", "img.src"] }
    ],
  }
```
