var Fs = require('./helpers/Fs');
var Path = require('./helpers/Path');
var Settings;
(function(){
	Settings = {
		resolve (){
			var settings = {
				cwd: Path.CWD
			};			
			var paths = getPackages(settings.cwd);
			while (paths.length) {
				var path = paths.pop();
				if (Fs.exists(path)) {
					var text = Fs.read(path);
					try {
						var json = JSON.parse(text);
						var opts = json.settings && json.settings.highlight;						
						if (opts) {
							Object.setPrototypeOf(opts, settings);
							return opts;
						}
					}
					catch (error){}
				}
			}
			return null;
		}
	};
	function getPackages(directory) {
		var arr = [];
		while (1) {
			arr.push(directory + '/package.json');
			arr.push(directory + '/bower.json');
			var next = Path.cdUp(directory, '..');
			if (next === directory) 
				break;

			directory = next;
		}		
		return arr;
	}
}());

var Builder;
(function(){
	var CWD = '',
		SOURCE = 'src';

	Builder = {
		build (settings){
			CWD = settings.cwd;
			Fs.copyDir(`${CWD}/${SOURCE}/styles`, `${CWD}/styles`);
			
			var core = this.getCoreScript_();
			var langs = this.getLanguageScript_(settings);
			
			var PLACEHOLDER = "return hljs;";
			var script = core
				.replace(PLACEHOLDER, x => langs + '\n' + PLACEHOLDER);

			Fs.write(`${CWD}/index.js`, script);
		},
		getCoreScript_ () {
			return Fs.read(`${CWD}/${SOURCE}/highlight.js`);
		},
		getLanguageScript_ (settings) {
			return this
				.getLanguages_(settings.langs)
				.map(x => x.toSource())
				.join('\n');
		},

		getLanguages_ (langs) {
			var arr = [];
			langs.forEach(lang => arr.push(...this.getLangWithDeps_(lang)));
			var i = -1;
			while(++i < arr.length) {
				var current = arr[i];
				var j = i;
				while (++j < arr.length) {
					if (current.lang === arr[j].lang) {
						arr.splice(j, 1);
						j--;
					}
				}
			}
			return arr;
		},
		getLangWithDeps_ (lang) {
			var langs = [ new Lang(lang, this.getLangPath_(lang)) ];
			langs[0]
				.getDependencies()
				.map(dep => this.getLangWithDeps_(dep))
				.forEach(arr => langs.unshift(...arr))
				;
			return langs;
		},
		getLangPath_(lang) {
			return `${CWD}/${SOURCE}/languages/${lang}.js`;
		}
	};

	var Lang;
	(function(){
		Lang = function (lang, path) {
			lang = lang.toLowerCase();
			if (_cache[lang]) 
				return _cache[lang];

			this.lang = lang;
			this.path = path;
			if (Fs.exists(path) === false) {
				throw new Error(`Language "${lang}" not found in "${path}"`);
			}
			this.content = Fs.read(path);
			_cache[lang] = this;
			return this;
		};
		Lang.prototype = {
			getDependencies () {
				var arr = [];
				var comment = /^\s*\/\*((.|\s)*?)\*/.exec(this.content);
				if (comment == null)
					return arr;

				var match = /Requires: ([\w.]+([ \t]*,[ \t]*)?)+/.exec(comment);
				if (match == null) {
					return arr;
				}
				arr = match[0]
					.replace(/Requires:\s*/, '')
					.split(',')
					.map(x => x.trim())
					.map(x => x.replace(/\.\w+$/, ''));
				return arr;
			},
			toSource () {
				return this
					.content
					.replace(/function\(hljs\)/, x => `hljs.registerLanguage("${this.lang}", function(hljs)`)
					.replace(/\}[^\}]*$/, x => '});');
			}
		};
		var _cache = {};
	}());

	
}());

Builder.build(Settings.resolve());