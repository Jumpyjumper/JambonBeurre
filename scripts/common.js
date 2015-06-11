requirejs.config({
	"baseUrl": "",
	"paths":{
		"jquery": "http://code.jquery.com/jquery-1.11.3.min",
		"iscroll": "https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.1.1/iscroll-min",
		"hammerjs": "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.4/hammer.min",
		"bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min",
		"jambonbeurre": "https://raw.githubusercontent.com/Jumpyjumper/JambonBeurre/master/dist/scripts/jambonbeurre.js"
	}
});

requirejs(["scripts/main"]);
