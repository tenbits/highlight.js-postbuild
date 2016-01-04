var fs = require('fs');
module.exports = {
	exists (path){
		try {
			fs.accessSync(path, fs.R_OK);
			return true;
		}
		catch(error) {
			return false;
		}
	},
	getStats (path) {
		try {
			return fs.lstatSync(path);
		}
		catch(error) {
			return null;
		}	
	},
	isFile (path) {
		var stat = this.getStats(path);
		return stat && stat.isFile();
	},
	isDirectory (path) {
		var stat = this.getStats(path);
		return stat && stat.isDirectory();
	},
	read (path){
		return fs.readFileSync(path, 'utf8');
	},
	write (path, content){
		fs.writeFileSync(path, content);
	},
	copyDir (path, target){
		if (this.exists(target) === false) {
			fs.mkdirSync(target);
		}
		var files = fs.readdirSync(path);
		files.forEach(name => {
			var xPath = `${path}/${name}`;
			var xTarget = `${target}/${name}`;
			if (this.isDirectory(xPath)) {
				this.copyDir(xPath, xTarget);
				return;
			}
			this.copyFile(xPath, xTarget);
		});
	},
	copyFile (path, target) {
		var reader = fs.createReadStream(path);
		var writer = fs.createWriteStream(target);
		reader.pipe(writer);
	}
};