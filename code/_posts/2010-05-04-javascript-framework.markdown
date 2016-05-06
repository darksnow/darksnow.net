---
layout: post
title:  A JavaScript Framework
date:   2010-05-04 16:01
tags: JavaScript Library
image:  scaffold.jpg
attachments:  dsutils.js
---
When I decided to learn JavaScript I found, quite quickly, that while it is a powerful language, which came as a surprise since I always thought of it as a simple automation lauguage for browsers, there are numerous holes.

These holes were filled by numerous framework libraries for doing all sorts of things. Be it filling in some small missing functions like `addAfter` to compliment `addBefore`, or extra trim functions for strings as you would find in PHP, there were, and still are, numerous choices.

Over the years I have flirted with Prototype, script.aculo.us, ExtJS, Dojo and numerous small snippets found all over the web but I never stuck with them.

Perhaps it was, at the time, my desire to write things from scratch to learn the language, or perhaps it's my still present need for control over what I'm doing, but I've more often than not fallen back to writing and using my own libraries.

Initially, as is always the case, I noticed I was always using the same functions, or doing the same things over and over again so I added them to a little file that I included in all the small projects I was using the teach myself. As I added more and more functions to this small file I realised I had the makings of a little library so I cleaned it up over the years.

Taking in no small part from the ideas, though not the code, in prototype and augmented by ideas and snippets I've found as I've gone along I have put together a small, well smaller than prototype, library that I now use for all my projects.

The DarkSnow Utility library, dsUtils, contains all those little things that JavaScript should probably have in it. It uses the Function, String and Element prototype to extend those definitions and it's getElementById function ($()) will extend any element it gets so that other browsers can use the extensions too.

So, what does it do?

Below I've put together a list of all the functions in this little library. I've also attached the file to this post so you can download and use the library if you think it'll be handy. This is a brief overview of what it does and I may write more about any particular section when I'm thinking about it, or cleaning up sections.

  * `$(id)` and `getObj(id)`: My implementation of what prototype does. `$` calls getObj for a single element, or array of elements, and calls `__extendElement` on anything that passes through it. Perhaps `getObj` is redundant in these days of universal support for `getElementById` but it provides a browser independent method for getting elements with IDs and was the function that started this library.

  * `__extendElement(el)`: Extends the Element prototype to add all the methods listed below. It is called on the `Element.prototype` when the library loads and marks any element it has extended so it doesn't do it again. It's also called from `$` and it's own `getElementsByClassName` so the extentions can be used in browsers that don't allow extensions of `Element.prototype`.

  * `Element.prototype.hasClass(cssClass)`, `Element.prototype.addClass(cssClass)`, `Element.prototype.removeClass(cssClass)`, `Element.prototype.toggleClass(cls)`: A lot of the work I do in JavaScript hinges on CSS definitions so I've found it very useful to be able to easily manipulate what CSS classes are applied to an element. So why not let the element object manage it's class itself. These function names should be self explanatory expect toggle which adds or removes a CSS class depending if it's there already.

  * `Element.prototype.getParentByTag(tag)`, `Element.prototype.getParentByClass(cls)`: Searches up the DOM tree until it finds a match.

  * `Element.prototype.nextSiblingByTag(tag)`, `Element.prototype.previousSiblingByTag(tag)`: The built in sibling functions are not much use when you have to account for DOM nodes created by white space, so I added these, more useful, extensions

  * `Element.prototype.removeElement()`: Allows this element to remove itself from the DOM tree

  * `Element.prototype.insertAfter(newNode, referenceNode)`: The logical compliment to insertBefore, and so simple to implement I'm surprised I had to write it at all.

  * `Element.prototype.addEvent(ev, func)`, `Element.prototype.removeEvent(ev, func)`: This pair attempt to use the DOM add and remove event listener methods but if not present fall back to the DOM0 method of managing events.

  * `Element.prototype.getAbsoluteTopLeft()`: Gets the top left corner of an element relative to the document body. It returns an object with x and y properties representing the offset left and top of the element.

  * `Element.prototype.getElementsByClassName(searchClass, tag)`: Does what `getElementById` does but with CSS class names. It will return an array of elements under the current element, that match the specified class name.

  * `Function.prototype.bind(obj)`: Allows a function to hold scope. Essentially the passed in obj becomes `this` in the function body. Increadibly useful for AJAX and Timer event handler.

  * `String.prototype.ltrim(chars)`, `String.prototype.rtrim(chars)`, `String.prototype.trim(chars)`: Implementation of the PHP string trim functions.

  * `window.getViewPortHeight()`: This functions tells us what should just be `window.innerHeight`.

  * `function getMask(parent)`, `function setMask(parent, mask)`: Allows you to easily manage a set of check boxes as a single value bitmask.

  * `function getChecked(rad)`: Returns the last checked control in the array passed in. If used with a childNodes array it can quickly find a selection from a collection of radio buttons.

  * `function getLocation(href)`: Essentially quickly makes an anchor tag. The A tag has numerous URL parsing capabilities built in.

  * `function include(filename)`, `function includeDef(filename, ob)`, `function includeOnce(filename)`: Allows us to include an external file. `includeDef` will only include if the second argument is undefined and `includeOnce` searches the page header for the passed URL.

  * `function debug(str)`: Write a string to the Firebug debug console if it's available.

  * `function empty(x)`: Determines if a values is empty.

  * `function isNumeric(x)`: Determines if the passed value is actually a number.

  * `function pick()`: Returns the first entry in the passed array that is not empty

  * `function in_array(needle, haystack)`: Implementation of the PHP function [in_array](http://php.net/manual/en/function.in-array.php) which returns true if the needle is on the haystack.

  * `function killEvents(e)`: Stop event propogation

  * `function getCoOrds(ev)`: Platform independant way to get mouse coords from the event object

  * `function getCookie( name, def )`, `function setCookie( name, value, expires, path, domain, secure )`, `function deleteCookie( name, path, domain )`: Client side cookie handling.

  * `function getParam(name, def)`: Decodes any GET parameters passed into the current page.

I hope someone will find this useful, I know I do.
