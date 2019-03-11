## [Highlight.js](https://highlightjs.org/) post-build package for `npm` and `bower`.


The `highlight.js` package will be created on postinstall with languages you specify in your application `package.json` or `bower.json`, e.g.:

```json
{
    "name": "MyPackage",
    "settings": {
        "highlight": {
            "langs": [ "xml", "css", "javascript" ]
        }
    }
}
```

---

> :exclamation: For **`bower`** installation
> 
> Bower does not support automatic `postinstall` scripts, so you should add to your applications `.bowerrc` the build script
> ```json
{
    "scripts": {
        "postinstall": "node bower_components/highlight.js-postbuild/tools/customize"
    }
}
> ```

## Licenses

1. The underlying library (`highlight.js`) is statically linked into the library and the full text of the license can be found [here](./LICENSE). Any furher usage and distribution of this package should be done with respect to the underlying library license. 


2. The build script is licensed under the [CC0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt) license.
