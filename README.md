yui-clumper
===========

Generate NPM-ready packages by specifying YUI modules you'd like to split out.

```
Usage: clumper <modules>... [options]

modules     YUI modules to package together

Options:
   -f FILTER, --filter=FILTER         YUI file versions to include
   -n NAME, --name=NAME               Name to write into package.json  [it-is-a-mystery]
   -o DIR, --output=DIR               Directory to write clumped package to  [.]
   -t TEMPLATE, --template=TEMPLATE   Package.json template file  [./templates/package.json]
```

You can pass multiple `-f`/`--filter=` values. `-min.js` versions of modules are always copied.

By default the generated `package.json` will use the same `version` as the YUI version from NPM. There isn't a way to override this behavior currently.
