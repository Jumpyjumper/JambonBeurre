define(['jquery', 'iscroll'], function ($, Hammer) {
    var jambonBeurre = function (options) {
        this.opts = {
            scroll: true,
            scrollcontainer: ".jb-scroll-container",
            menu: ".jb-menu",
            stickyheader: ".jb-sticky-header",
            triggers: [".jb-menu-trigger",".jb-shield"],            
            content: ".jb-content-wrapper",
            keys: [37, 38, 39, 40]             
        };

        this.init = function(){
            var self = this, 
                opts = $.extend({}, this.opts, options),
                menu = $(opts.menu);

            $(opts.content).append("<div class=\"jb-shield\"></div>");
            
            $(document).ready(function(){
                self.setMenu(opts);
            });

            $(opts.triggers.join()).on('click.jb-menu', function(e) {
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
            if (typeof(IScroll) != 'undefined' && $(opts.menu + ">" + opts.scrollcontainer).length > 0 && opts.scroll){                
                opts.menu_scroll = new IScroll(".jb-menu", { 
                    click: true,
                    scrollbars: true,
                    scrollbarClass: 'jb-scrollbar',
                    mouseWheel:true
                });
            }       
        };

        this.hideMenu = function(){
            self = this;
            $("body")
                .attr("data-jb-state", "closed")
                .addClass("is-nav-animate");

            $(self.opts.stickyheader).css({ 
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

            $(self.opts.stickyheader).css({ 
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

