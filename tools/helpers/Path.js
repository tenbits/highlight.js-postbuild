module.exports = {
	get CWD () {
		return this.cdUp(__dirname, '../..');
	},

	cdUp(path, nav) {
		var count = nav.split('..').length - 1;		
		while(--count > -1) {			
			path = path.replace(rgx_cdUp, '');
		}
		return path;
	}
};

var rgx_cdUp = /[\/\\][^\/\\]+$/; 