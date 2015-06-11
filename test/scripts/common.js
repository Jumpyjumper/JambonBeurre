requirejs.config({
	"baseUrl": "",
	"paths":{
		"jquery": "jquery/jquery",
		"iscroll": "iscroll/build/iscroll",
		"hammerjs": "hammerjs/hammer"
	}
});

requirejs(["scripts/main"]);