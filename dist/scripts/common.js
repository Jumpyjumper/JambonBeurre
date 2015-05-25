/*
* name:Jambonbeurre
* version: 0.1.0 (May-24, 2015)

* dependencies:
  - jquery->=1.9
  - iscroll-~5.1.3
  - requirejs-~2.1.17

* description: Hamburger menu for mobile and desktop
*/


requirejs.config({
	"baseUrl": "scripts/",
	"paths":{
		"jquery": "vendor/jquery/jquery",
		"iscroll": "vendor/iscroll/build/iscroll"
	}
});

requirejs(["main"]);