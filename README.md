# jambonbeurre

*JambonBeurre* is a tasty progressively enhanced off-canvas (hamburger) menu designed to be compatible with old and modern browsers/devices. 

It is easy to use and implement and with no JavaScript requirement. 

However, if you so choose, it is also implemented with JS as AMD style library that allows for heavly customized and super-smooth responsive menus.

## Features

- 


## Options




### scroll

_default: true_

Allow you to enable iScroll on the menu and give you access to all its options (refer to: https://github.com/cubiq/iscroll for more information).

```
new JambonBeurre({
	scroll: true
});
```

### scrollcontainer 
_default: .jb-scroll-container_

Selector for the wrapper around menu content where scroll will be applied to.


### gesture
_default: true_

Allow you to enable HammerJS and give you access to all its options (refer to: http://hammerjs.github.io/ for more information).

```
new JambonBeurre({
	gesture: true
});
```

### gestureevent
_default: swipe_
_value: swipe, press, doubletap, tap, pan_

When `gesture` is set as `true`, the menu will open the menu on defined gesture.

### menu
_default: .jb-menu_

Selector for the menu.

### stickyheader
_default: .jb-sticky-header_

Selector for sticky header.

### triggers
_default: [".jb-trigger",".jb-shield"]_

List of selector for triggers elements. When the user is pressing a trigger element, it will open or close the menu.

### content
_default: .jb-content_

Selector for content area.

### keys
_default: [32, 33, 34, 35, 36, 37, 38, 39, 40]_

List of keyboards key disabled when menu is open (to avoid main content to scroll).