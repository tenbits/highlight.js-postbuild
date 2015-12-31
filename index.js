(function(){

  var message = 'The package was not built. Add highlight settings to your `package.json`. Example:'
  message += '\n{'
  message += '\n  "name": "myPackage"'
  message += '\n  "settings": {'
  message += '\n    "highlight": {'
  message += '\n      "langs": ["javascript", "css"]'
  message += '\n    }'
  message += '\n  }'
  message += '\n}'

  message += '\n\nAnd run `$ npm run postinstall`'


  throw Error(message);

}());
