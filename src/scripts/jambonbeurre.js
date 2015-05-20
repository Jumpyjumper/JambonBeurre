define(['jquery', 'iscroll'], function ($) {
    var jambonBeurre = function (options) {
        this.opts = {
            scroll: null,
            ww: $(window).width(),
            menu: '.primary-menu',
            menu_trigger: '.nav-trigger',
            content: '#mobile-wrapper',
            viewports: [768, 991],
            keys: [37, 38, 39, 40]             
        }

        this.init = function(){
            var self = this, 
                opts = $.extend({}, this.opts, options),
                menu = $(opts.menu);
            
            //Set up menu.
            self.setMenu(opts);

            //Binding button to trigger mobile menu
            $(opts.menu_trigger).on('click.mobileOpen', function(e) {
                e.preventDefault();

                if(menu.attr('data-state') == 'open') {
                    self.hideMenu(opts);
                } else {
                    self.showMenu(opts);
                }
            });
        }

        this.setMenu = function(opts){
            var menu = $(opts.menu);
            menu.attr('data-state', 'closed');
            $('body').addClass('mobile-menu-closed');

            if (typeof(IScroll) != 'undefined' && $('.nav-container').length > 0) {
                var mobile_menu_scroll = new IScroll('.nav-container', { click: true, scrollbars: true, scrollbarClass: 'mobile-menu-scrollbar' });
            }       
        }

        this.hideMenu = function(){
            self = this;
            var menu = $(self.opts.menu),
                isMenu = menu.length > 0,
                isOpen = menu.attr('data-state') == 'open';
            
            if(isMenu && isOpen) {
                menu.attr('data-state', 'closed');
                $('body').removeClass('is-nav-open').addClass('mobile-menu-closed is-nav-animate');
                self.stopAnimation();
                this.enable_scroll();
            } else {
                return;
            }
        }

        this.showMenu = function(){
            self = this;
            var menu = $(self.opts.menu),
                isMenu = menu.length > 0,
                isClosed = menu.attr('data-state') == 'closed';
            
            if(isMenu && isClosed) {
                menu.attr('data-state', 'open');
                $('body').removeClass('mobile-menu-closed').addClass('is-nav-open is-nav-animate');
                self.stopAnimation();
                self.disable_scroll();
            } else {
                return;
            }
        }

        this.preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;
        }

        this.keydown = function(e) {
            for (var i = self.opts.keys.length; i--;) {
                if (e.keyCode === self.opts.keys[i]) {
                    self.preventDefault(e);
                    return;
                }
            }
        }

        this.wheel = function(e) { 
            self.preventDefault(e);
        }

        this.disable_scroll = function() {
            if (window.addEventListener) { window.addEventListener('DOMMouseScroll', self.wheel, false); }
            window.onmousewheel = document.onmousewheel = self.wheel;
            document.onkeydown = self.keydown;
            document.ontouchmove = function (e) { 
                self.preventDefault(e);
            };
        }

        this.enable_scroll = function() {
            if (window.removeEventListener) { 
                window.removeEventListener('DOMMouseScroll', self.wheel, false); 
            }
            window.onmousewheel = document.onmousewheel = document.onkeydown = null;
            document.ontouchmove = function (e) { 
                return true;
            };
        }

        this.stopAnimation =  function() {
            setTimeout( function() { $('body').removeClass('is-nav-animate'); }, 751); 
        }

        this.init();
    };
    return jambonBeurre;
 
});

