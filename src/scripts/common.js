requirejs.config({
	"baseUrl": "scripts/",
	"paths":{
		"jquery": "vendor/jquery/jquery",
		"iscroll": "vendor/iscroll/build/iscroll"
	}
});

requirejs(["main"]);