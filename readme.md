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

