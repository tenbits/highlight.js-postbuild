var Fs = require('./helpers/Fs');
var Path = require('./helpers/Path');

var Prepublish;
(function(){

	Prepublish = {
		copySource () {
			var cwd = Path.CWD;
			var directories = [
				['highlight.js/src', 'src']
			];

			directories.forEach(arr => {
				var source = `${cwd}/${arr[0]}`;				
				Fs.copyDir(source, arr[1]);
			});

			console.log('Sources copied');
		}
	};

}());

Prepublish.copySource();