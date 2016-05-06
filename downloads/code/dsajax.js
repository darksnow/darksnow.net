/**
 * dsAjax.js - Dark Snow AJAX object
 *
 * This allows us to create and fire an asynchronous request
 * to a server from javascript.

Constructor(action)
	Calling new dsAjax() will create an instance of this object.
	If the optional argument is a string it will be used as the
	request target url, if it's a funcion, set onSucess, if it's
	an object it will be assumed to be a settings object and
	will be evaluated with settings()


url
	The url that will be called to fulfill the request, by default
	it is the url of the current page.
spinner
	If set this element will be made have it's css display set to
	block when the request starts and none when it ends.
	Good for use as a status indicator.
target
	If set this element will be the second argument to the onSuccess
	and onFail callbacks. Additionally, if updateTarget is set it
	will have it's innerHTML set to the returned content.
updateTarget
	See 'target' for details. Default to true.
onSuccess(response, target)
	If set this JavaScript function will be called when the request
	returns successfully.
onFail(response, target)
	If set this JavaScript function will be called if the request fails
useAbort
	If true when another request comes in, abort any existing request.
	If false the second request is not executed. Default to true.
avoidCache
	Set to true to append random string to request strings in order to
	avoid the browser cache. False by default.
cacheArg
	The argument name used for the string appended for cache avoidance
	as above. Default is 'cache'. If you are using that as an argument
	in your applicaton, this MUST be changed.


settings(obj)
	Set any of the above settings values from the object supplied. For
	example, if the obj contains a property named 'onSuccess', it's
	value will be used for the onSuccess property of this object.
addParameter(name, value)
	Adds a name value pair to the parameters list. These parameters
	will be added to the request URL when the request is started.
removeParameters()
	Clear all parameters already set.
start(request)
	Start an asynchronous request to the url given. This URL should have
	arguments encoded in standard url format: ?x=val&y=val2
startPost(page, params)
	Do the same as post but send using http POST. The same format url
	encoding should be used for the parameters, but in the second
	argument rather than encoded in the request. page should be the url
	without any arguments.
sendForm(frm)
	Send a form by AJAX. This traverses the form's DOM tree looking for
	any input element with a name and adds it's name and value as a
	parameter. Request is send using form's 'action' and 'method'.
stop()
	Stop any request that is progress
checkBusy()
	Return true if we are already running a request
startSpinner()
	If set the spinner will have it's display style set to block
stopSpinner()
	If set the spinner will have it's display style set to none
*/
function DsAjax(act) { // Object definition
	// Define class variables
	this.spinner = $('spinner');
	this.target = null;
	this.onSuccess = null;
	this.onFail = null;
	this.useAbort = true;
	this.avoidCache = false;
	this.cacheArg = 'cache';
	this.updateTarget = true;
	this.url = document.location.href;

	// Define accessors
	this.setSpinner = function(ob) {
		this.spinner = $(ob);
		this.stopSpinner();
	};
	this.setTarget  = function(ob) {
		this.target = $(ob);
	};
	this.setSuccess = function(f) {
		if (typeof(f) == 'function') { this.onSuccess = f; }
	};
	this.setFail = function(f) {
		if (typeof(f) == 'function') { this.onFail = f; }
	};

	this.__xmlDoc = null;
	this.__params = {};

	/**
	* Check if we are already running something
	*/
	this.checkBusy = function() {
		if (this.__xmlDoc === null || this.__xmlDoc.readyState === 0) {
			return false;
		} else if (this.useAbort) {
			this.__xmlDoc.abort();
			this.__cleanXmlDoc();
			return false;
		}
		return true;
	};

	/**
	* Create an AJAX object
	*/
	this.__createXmlDoc = function() {
		if (typeof(window.ActiveXObject) != 'undefined') {
			this.__xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (typeof(window.XMLHttpRequest) != 'undefined') {
			this.__xmlDoc = new XMLHttpRequest();
		} else {
			return null;
		}
		this.__xmlDoc.onreadystatechange = this.__process.bind(this);
	};

	/**
	* Remove the AJAX object and clean up to prevent memory leaks
	*/
	this.__cleanXmlDoc = function() {
		if (this.__xmlDoc) {
			delete this.__xmlDoc.onreadystatechange;
			this.__xmlDoc = null;
		}
	};

	/**
	* Stop any request that is in progress
	*/
	this.stop = function() {
		if (this.__xmlDoc) {
			if (this.checkBusy) {
				this.__xmlDoc.abort();
				this.__cleanXmlDoc();
			}
		}
	};

	/**
	* Append the time to the args string (avoid browser cache)
	*/
	this.__appendCacheAvoidance = function(req) {
		if (this.avoidCache) {
			return req + ((req.indexOf('?') < 0) ? '?' : '&') +
				 encodeURIComponent(this.cacheArg) + '=' +
				 encodeURIComponent((new Date()).valueOf());
		}
		return req;
	};

	/**
	* Build the request string from the stored paramater values
	*/
	this.__buildRequestParams = function() {
		var ret = '';
		var fst = true;
		for (var i in this.__params) {
            if (!empty(this.__params[i])) {
                if (fst) {
                    fst = false;
                } else { ret += '&'; }
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(this.__params[i]);
            }
		}
		return this.__appendCacheAvoidance(ret);
	};

	/**
	* Start the spinning animation
	*/
	this.startSpinner = function() {
		if (this.spinner) {
			this.spinner.style.display = 'block';
		}
	};
	/**
	* Stop the spinning animation
	*/
	this.stopSpinner = function() {
		if (this.spinner) {
			this.spinner.style.display = 'none';
		}
	};

	/**
	* Add a parameter to the list
	*/
	this.addParameter = function(name, value) {
		if (empty(value)) {
			delete this.__params[name];
		} else {
			this.__params[name] = value;
		}
	};

	/**
	* Remove all stored parameters
	*/
	this.removeParameters = function() {
		this.__params = {};
	};

	/**
	* Send request using GET (prefered)
	*/
	this.start = function(req) {
		if (this.checkBusy()) { return; }
		switch (typeof(req)) {
			case 'string': this.url = req; break;
			case 'object': this.settings(req); break;
		}
		this.startSpinner();
		this.__createXmlDoc();
		req = this.url +
			((this.url.indexOf('?') < 0) ? '?' : '&') +
			this.__buildRequestParams();

		this.__xmlDoc.open("GET", req, true);
		this.__xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		this.__xmlDoc.send(null);
	};

	/**
	* Send arguments as a post request
	*/
	this.startPost = function(req) {
		if (this.checkBusy()) { return; }
		switch (typeof(req)) {
			case 'string': this.url = req; break;
			case 'object': this.settings(req); break;
		}
		this.startSpinner();
		this.__createXmlDoc();
		var params = this.__buildRequestParams();
		this.__xmlDoc.open('POST', this.url, true);
		this.__xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.__xmlDoc.setRequestHeader("Content-length", params.length);
		this.__xmlDoc.setRequestHeader("Connection", "close");
		this.__xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		this.__xmlDoc.send(params);
	};

	/** 
	* Recursively get all named inputs from a form and
	* add them to this object as parameters
	*/
	this.__traverseFormParameters = function(el) {
		if (el.nodeType != 1) { return; }// Bail if this isn't a tag
		switch (el.tagName) {
		case 'INPUT': case 'SELECT': case 'TEXTAREA':
			if (!empty(el.name)) {
				this.addParameter(el.name, el.value);
			}
			break;
		}
		for (var i = el.childNodes.length - 1; i >= 0; i--) {
			this.__traverseFormParameters(el.childNodes[i]);
		}
	};

	/**
	* Send the contents of a form
	*/
	this.sendForm = function(frm) {
		frm = $(frm);
		var ac = empty(frm.action) ? null : frm.action;
		this.__traverseFormParameters(frm);

		if (frm.method == 'post') {
			this.startPost(ac);		// Send POST request
		} else { this.start(ac); }	// Use GET by default

		return false; // False so it cancels any form submission
	};

	/**
	* This gets called when the ajax call returns  
	*/
	this.__process = function() {
		if (this.__xmlDoc.readyState == 4) {
			var resp = this.__xmlDoc.responseText;
			var json = this.__xmlDoc.getResponseHeader("X-JSON");
			try {
				if (json === true) {
					resp = eval('(' + resp + ')');
				} else if (!empty(json)) {
					resp = eval('(' + json + ')');
				}
			} catch(err) {
				if (typeof(console) !== 'undefined') {
                    console.debug(err.message);
                }
			}
			if (this.onSuccess) { this.onSuccess(resp, this.target); }
			if (this.target && this.updateTarget) {
				this.target.innerHTML = this.__xmlDoc.responseText;
			}
			this.__cleanXmlDoc();
			this.stopSpinner();
		}
	};

	/**
	* Parse an object containing settings named for each of the
	* settings this object can take, assigning any values found,
	* any properties not recognised will be assumed to be url
	* parameters.
	*/
	this.settings = function(ob) {
		for (var i in ob) {
			if (typeof(this[i]) == 'undefined') {
				this.addParameter(i, ob[i]);
			} else {
				var val = ob[i];
				if (i == 'target' || i == 'spinner') {
					val = $(val);
				} else {
					switch(i.substring(0, 2)) {
					case 'on':
						if (typeof(val) != 'function') { continue; }
						break;
					case '__': continue;
					}
				}
				this[i] = val;
			}
		}
	};

	/**
	* Run code from here to create object (Constructor)
	*/
	switch(typeof(act)) {
		case "string"  : this.url = act;      break;
		case "object"  : this.settings(act);  break;
		case "function": this.setSuccess(act);break;
	}

	return this;
} // DSAjax object

/** Fires an immediate get request */
DsAjax.get = function(set) { new DsAjax().start(set); };

/** Fires an immediate post request */
DsAjax.post = function(set) { new DsAjax().startPost(set); };

/** Send a form */
DsAjax.sendForm = function(frm, args) { new DsAjax(args).sendForm(frm); };

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Utility Functions that help with Javascript page manipulation *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/

/**
 * Get the value of an XML child of node with the given index
 * The index can be either a numeric index into the childNodes array
 * or the name of the node.
 */
function getXmlVal(node, index) {
	if (typeof(index) == 'number') {
		if (node.childNodes.length > index) {
			if (node.childNodes[index].childNodes.length > 0) {
				return node.childNodes[index].firstChild.nodeValue;
			}
		}
	} else {
		for (var i = node.childNodes.length - 1; i >= 0; i--) {
			if (node.childNodes[i].nodeName == index) {
				return getXmlVal(node, i);
			}
		}
	}
	return null;
}
