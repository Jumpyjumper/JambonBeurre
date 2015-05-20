requirejs.config({
	"baseUrl": "scripts/vendor",
    "paths": {
        "app": "../app"
    },
    "shim": {
        "vendor/jquery": ["jquery"],
        "vendor/iscroll": ["iscroll"]
    }
});

requirejs(["app/main"]);