/**
* Javascript Utility Library
* A collection of functions that should be useful to,
* and included in, most JavaScript Projects
*/

/**
* Gets the document element with the specified id.
* If name is already an object it just gets returned, if it's a string
* a browser independant lookup is done to find the element.
*/
function getObj(id) {
	var ret = null;
	switch (typeof(id)) {
	case "object":
		ret = id;
		break;
	case "string":
		if (document.getElementById) {
			ret = document.getElementById(id);
		} else if (document.all) {
			ret = document.all[id];
		} else if (document.layers) {
			ret = document.layers[id];
		}
		break;
	}
	if (ret !== null) { ret = __dsExtendElement(ret); }
	return ret;
}

/**
* Get an element, or array of named elements, by ID
*/
function $() {
	var elements = [];
	if (arguments.length === 1) {
		return getObj(arguments[0]);
	}
	for (var i = 0; i < arguments.length; i++) {
		elements[elements.length] = getObj(arguments[i]);
	}
	return elements;
}

/**
* Write a string to firebug debug console
*/
function debug(str) {
	if (typeof(console) !== 'undefined') { console.debug(str); }
}

/**
* Determine if a value is empty
*/
function empty(x) {
	return x === null || x === '' || x === 0 || typeof(x) === 'undefined';
}

/**
 * Determine if a value is a number
 */
function isNumeric(x) {
	return (!isNaN(parseFloat(x)) && isFinite(x));
}

/**
 * Return the first argument that is not empty
 */
function pick() {
	for (var i = 0; i < arguments.length; i++) {
		if (!empty(arguments[i])) {
			return arguments[i];
		}
	}
	return null;
}

/**
* Determine if needle is in haystack
*/
function in_array(needle, haystack) {
	for (var i = haystack.length - 1; i >= 0; i--) {
		if (haystack[i] === needle) { return true; }
	}
	return false;
}

/**
* Stop event propogation
*/
function killEvents(e) {
	e = e || window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) { e.stopPropagation(); }
}

/**
* Platform independant way to get mouse coords from events
*/
function getCoOrds(ev) {
	ev = ev || window.event; /* IE makes event global */
	if (ev.pageX || ev.pageY) { return {x:ev.pageX, y:ev.pageY}; }
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

/**
* Browser independant way to get what should just be window.innerHeight
*/
window.getViewPortHeight = function() {
	var h = 0;
	if (!window.innerHeight) {
		if (document.documentElement.clientHeight === 0) {
			h = document.body.clientHeight;
		} else {
			h = document.documentElement.clientHeight;
		}
	} else {
		h = window.innerHeight;
	}
	return h;
};

/**
 * Finds all the checkboxes under parent and adds the checked values
 */
function getMask(parent) {
	var chks = $(parent).childNodes;
	var mask = 0;
	if (parent.nodeType === 1 && parent.tagName === 'INPUT' && parent.checked) {
		mask = parent.value * 1;
	}
	for (var i = chks.length - 1; i >= 0; i--) {
		if (chks[i].nodeType == 1) {
			mask += getMask(chks[i]);
		}
	}
	return mask;
}

/**
 * Checks all checkboxes under parent based on mask
 */
function setMask(parent, mask) {
	var chks = $(parent).childNodes;
	if (parent.nodeType === 1 && parent.tagName === 'INPUT') {
		parent.checked = parent.value & mask;
	}
	for (var i = chks.length - 1; i >= 0; i--) {
		if (chks[i].nodeType === 1) {
			setMask(chks[i], mask);
		}
	}
}

/**
* Get the checked radio button, very handy for forms
*/
function getChecked(rad) {
	for (var i = rad.length - 1; i >= 0; i--) {
		if (rad[i].checked) { return rad[i]; }
	}
	return null;
}

/**
* Create a link from a path. 'A' elements have a lot
* of URI parsing properties built in.
*/
function getLocation(href) {
	if (typeof(href) === 'undefined') {
		href = document.location.href;
	}
	var l = document.createElement('a');
	l.href = href;
	return l;
}


/**************************
 **************************

* Add some methods to DOM elements, each method will be documented seperately.
* It's better to use Element.prototype to do this, but IE doesn't support it,
* as such these methods will only be available under IE if the element was
* retrieved using this framework's $() or getElementsByClassName() functions.
*/
function __dsExtendElement(el) {

if (el.dsExtended) { return el; }
el.dsExtended = true;

/**
* Return true if element has the CSS class
*/
el.hasClass = function(cssClass) {
	return this.className && this.className.indexOf(cssClass) >= 0;
};

/**
* Add CSS class if not already defined
*/
el.addClass = function(cssClass) {
	if (!this.hasClass(cssClass)) {
		this.className += ' ' + cssClass;
	}
};

/**
* Remove CSS class if present
*/
el.removeClass = function(cssClass) {
	var cNm = this.className;
	var idx = cNm.indexOf(cssClass);
	if (idx >= 0) {
		this.className = cNm.substr(0, idx) + cNm.substr(idx + cssClass.length);
	}
};

/**
* Add (or remove if already set) a CSS class.
*/
el.toggleClass = function(cls) {
	if (this.hasClass(cls)) {
		this.removeClass(cls);
	} else { this.addClass(cls); }
};

/**
* Find an element in the parent tree by class name
*/
el.getParentByTag = function(tag) {
	var p = null;
	if (this.tagName === tag) {
		return this;
	} else if (!empty(this.parentNode)) {
		return $(this.parentNode).getParentByTag(tag);
	} else {
		return null;
	}
};

/**
* Find an element in the parent tree by class name
*/
el.getParentByClass = function(cls) {
	if (this.hasClass(cls)) {
		return this;
	} else if (!empty(this.parentNode)) {
		return $(this.parentNode).getParentByClass(cls);
	} else {
		return null;
	}
};

/**
* Find next sibling with tag name
*/
el.nextSiblingByTag = function(tag) {
	if (this.nextSibling) {
		if (this.nextSibling.tagName == tag) {
			return this.nextSibling;
		} else {
			return $(this.nextSibling).nextSiblingByTag(tag);
		}
	}
	return null;
};

/**
* Find previous sibling with tag name
*/
el.previousSiblingByTag = function(tag) {
	if (this.previousSibling) {
		if (this.previousSibling.tagName == tag) {
			return this.previousSibling;
		} else {
			return $(this.previousSibling).previousSiblingByTag(tag);
		}
	}
	return null;
};

/**
* Remove object from it's parent
*/
el.removeElement = function() {
	if (this.parentNode) {
		return this.parentNode.removeChild(this);
	} else { return null; }
};

/**
* Insert the DOM element newNode after referenceNode
*/
el.insertAfter = function(newNode, referenceNode) {
	this.insertBefore(newNode, empty(referenceNode) ? null : referenceNode.nextSibling);
};

/**
 * Add an event listener to this element, using W3C model if
 * possible, but falls back to original model on older browsers
 */
el.addEvent = function(ev, func) {
	if (typeof(this.addEventListener) === 'undefined') {
		this['on' + ev] = func;
	} else { this.addEventListener(ev, func, false); }
};

/**
 * Remove an event listener from this element, using W3C model if
 * possible, but falls back to original model on older browsers
 */
el.removeEvent = function(ev, func) {
	if (typeof(this.removeEventListener) === 'undefined') {
		this['on' + ev] = null;
	} else { this.removeEventListener(ev, func, false); }
};

/**
 * Return the coordinates of the top left of the element
 * relative to the document body
 */
el.getAbsoluteTopLeft = function() {
	var ret = { x: 0, y: 0 };
	if (this.offsetParent && this.offsetParent.tagName !== 'BODY') {
		ret = $(this.offsetParent).getAbsoluteTopLeft();
	}
	ret.x += this.offsetLeft - this.scrollLeft;
	ret.y += this.offsetTop  - this.scrollTop;
	return ret;
};

/**
* Get an array of elements matching passed CSS class
* From here: http://www.dustindiaz.com/top-ten-javascript/
*/
el.getElementsByClassName = function(searchClass, tag) {
	var classElements = [];
	if (tag === null) { tag = '*'; }
	var els = this.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = __dsExtendElement(els[i]);
			j++;
		}
	}
	return classElements;
};


  return el;
} // End __extendElement()

/**************************
 **************************/


/**
* Extend prototype on browsers that support it (not IE)
*/
if (typeof(Element) !== 'undefined') { __dsExtendElement(Element.prototype); }

/**
* The bind function allows us to return a reference to a function
* that will run in the context of the object passed in.
* See: http://www.digital-web.com/articles/scope_in_javascript/
*/
Function.prototype.bind = function(obj) {
	var other = this, func = function() {
		return other.apply(obj, arguments);
	};
	return func;
};

/** Trim chars from the left of the string */
String.prototype.ltrim = function(chars) {
	chars = chars || "\\s";
	return this.replace(new RegExp("^[" + chars + "]+", "g"), '');
};

/** Trim chars from the right of the string */
String.prototype.rtrim = function(chars) {
	chars = chars || "\\s";
	return this.replace(new RegExp("[" + chars + "]+$", "g"), '');
};

/** Trim chars from the the string */
String.prototype.trim = function(chars) {
	return this.ltrim(this.rtrim(chars), chars);
};


/**
* Include another JavaScript file in the page at run time
*/
function include(filename) {
	var head = document.getElementsByTagName('head')[0];

	var script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';

	head.appendChild(script);
}
/**
* Include another JavaScript file if object is null
*/
function includeDef(filename, ob) {
	if (typeof(ob) == 'undefined') { include(filename); }
}
/**
* Include another JavaScript file if it's not already included
*/
function includeOnce(filename) {
	var scripts = document.getElementsByTagName('script');
	var filepath = getLocation(filename).href;
	for (var i in scripts) {
		if (scripts[i].src && scripts[i].src == filepath) { return; }
	}
	include(filename);
}

/**
* Return the contents of the named cookie or def if nothing found
*/
function getCookie( name, def ) {
	var start = document.cookie.indexOf( name + "=" );
    var len = start + name.length + 1;
	var end = document.cookie.indexOf( ';', len );
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return def || null;
	}
	if ( start == -1 ) { return def || null; }
	if ( end == -1 ) { end = document.cookie.length; }
	return unescape( document.cookie.substring( len, end ) );
}

/**
* Set a page cookie with the given name and value.
* Expires time is given in days.
* If no expiry date is given it will expire after one year.
*/
function setCookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	} else { // Default expires after one year
		expires = 365 * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+'='+escape( value ) +
		( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
		( ( path ) ? ';path=' + path : '' ) +
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
}

/**
* Expire a cookie immediately so the browser will delete it
*/
function deleteCookie( name, path, domain ) {
	if (getCookie(name)) {
		document.cookie = name + '=' +
			(path ? ';path=' + path : '') +
			(domain ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
}

/**
 * Get a GET parameter from the browser URL, if no matches are
 * found return NULL or the optional def value.
 * Based on http://www.netlobo.com/url_query_string_javascript.html
 */
function getParam(name, def) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
	var results = regex.exec(window.location.href);
	if (results === null || results.length < 2) {
		return (typeof(def) == 'undefined') ? null : def;
	} else {
		return results[1];
	}
}
