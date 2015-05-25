requirejs.config({
	"baseUrl": "",
	"paths":{
		"jquery": "jquery/dist/jquery",
		"iscroll": "iscroll/build/iscroll",
		"hammerjs": "hammerjs/hammer"
	}
});

requirejs(["scripts/main"]);