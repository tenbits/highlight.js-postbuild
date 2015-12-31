## [Highlight.js](https://highlightjs.org/) post-build package for `npm` and `bower`.


The `highlight.js` package will be created on postinstall with languages you specify in your application `package.json`, e.g.:

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