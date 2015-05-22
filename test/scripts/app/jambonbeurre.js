define(['jquery', 'iscroll'], function ($) {
    var jambonBeurre = function (options) {
        this.opts = {
            menu_scroll: null,
            menu: ".jb-menu",
            menu_sticky_header: ".jb-sticky-header",
            menu_scroll_container: ".jb-scroll-container",
            menu_triggers: [".jb-menu-trigger",".jb-shield"],            
            content_wrapper: ".jb-mobile-wrapper",
            keys: [37, 38, 39, 40]             
        };

        this.init = function(){
            var self = this, 
                opts = $.extend({}, this.opts, options),
                menu = $(opts.menu);
            
            $(document).ready(function(){
                self.setMenu(opts);
            });

            $(opts.menu_triggers.join()).on('click.jb-menu', function(e) {
                e.preventDefault();
                if($("body").attr('data-jb-state') == 'open') {
                    self.hideMenu(opts);
                } else {
                    self.showMenu(opts);
                }
            });
        }; 

        this.setMenu = function(opts){
            var menu = $(opts.menu);
            $("body").attr('data-jb-state', 'closed');
            if (typeof(IScroll) != 'undefined' && $(opts.menu + ">" + opts.menu_scroll_container).length > 0) {                
                opts.menu_scroll = new IScroll(".jb-menu", { 
                    click: true,
                    scrollbars: true,
                    scrollbarClass: 'jb-scrollbar'
                });
            }       
        };

        this.hideMenu = function(){
            self = this;
            $("body")
                .attr("data-jb-state", "closed")
                .addClass("is-nav-animate");

            $(self.opts.menu_sticky_header).css({ 
                position: 'fixed',
                top: 0
            });

            self.stopAnimation();
            this.enable_scroll();            
        };

        this.showMenu = function(){
            self = this;
            $("body")
                .attr("data-jb-state", "open")
                .addClass("is-nav-animate");

            $(self.opts.menu_sticky_header).css({ 
                position: 'absolute',
                top: $('body').scrollTop()
            });

            self.stopAnimation();
            this.disable_scroll(); 
        };

        this.preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;
        };

        this.keydown = function(e) {
            for (var i = self.opts.keys.length; i--;) {
                if (e.keyCode === self.opts.keys[i]) {
                    self.preventDefault(e);
                    return;
                }
            }
        };

        this.wheel = function(e) { 
            self.preventDefault(e);
        };

        this.disable_scroll = function() {
            if (window.addEventListener) { 
                window.addEventListener('DOMMouseScroll', self.wheel, false);
            }

            window.onmousewheel = document.onmousewheel = self.wheel;            
            document.onkeydown = self.keydown;
            document.ontouchmove = function (e) { 
                self.preventDefault(e);
            };
        };

        this.enable_scroll = function() {
            if (window.removeEventListener) { 
                window.removeEventListener('DOMMouseScroll', self.wheel, false); 
            }

            window.onmousewheel = document.onmousewheel = document.onkeydown = null;
            document.ontouchmove = function (e) { 
                return true;
            };
        };

        this.stopAnimation =  function() {
            setTimeout(function() { 
                $('body').removeClass('is-nav-animate');
            }, 751); 
        };

        this.init();
    };

    return jambonBeurre;
 
});

