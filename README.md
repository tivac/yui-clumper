yui-clumper
===========

Generate NPM-ready packages by specifying YUI modules you'd like to split out.


## Usage ##

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

Most modules will have no NPM dependencies, the exceptions are `get` and anything that requires `io-base`. Packages generated containing these modules will have a dependency on [request](https://www.npmjs.org/package/request).

### Example ###

`clumper template -o output -n yui-template -f raw`

creates the following

```
/output
│   index.js
│   package.json
│   template.js
│
├─── /escape
│       escape-min.js
│       escape.js
│
├─── /features
│       features-min.js
│       features.js
│
├─── /get
│       get-min.js
│       get.js
│
├─── /loader-base
│       loader-base-min.js
│       loader-base.js
│
├─── /loader-rollup
│       loader-rollup-min.js
│       loader-rollup.js
│
├─── /loader-yui3
│       loader-yui3-min.js
│       loader-yui3.js
│
├─── /template-base
│       template-base-min.js
│       template-base.js
│
├─── /template-micro
│       template-micro-min.js
│       template-micro.js
│
└─── /yui-base
        yui-base-min.js
        yui-base.js

```
