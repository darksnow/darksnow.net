---
layout: post
title:  Ajax Library
date:   2010-02-19 11:54:17
tags: Ajax JavaScript Library Web
image:  code.png
attachments: dsajax.js
---
Like everyone else, when I started dabbling in AJAX code I found myself repeatedly creating the same code to do the same things. There was always code to make sure I could create the XMLHttpRequest if it was there, or the Microsoft equivalent for the awkward browser. There was always event code to process, sometimes repeatedly, the response codes until I got a 4. There was usually code to present some visual indication to the user that there was a call in progress.

Now, like other programmers, if I find myself doing the same thing over and over again, it's time to write a library.

So, here is is. The Dark Snow AJAX library.

The file attached to this should be well enough commented and should explain everything you need to know to use it, if you so desire, but let's go through the headlines so you know what this library does for you.

Once set up this object will store it's target base URL and a call to the start, or startPost, functions will send an asynchronous request to that URL. It hides all the setup of the XMLHttpRequest object, it hides the ready states and it handles the return values in a couple of nice ways.

## Results ##

You can specify a callback function, only one each, done with DOM0 unfortunately, for success and failure, both of which get the response text from the request and any specified target element. In these callback functions, in true Object Oriented style, the `this` object refers to the AJAX object that initiated the call, allowing you, in the callbacks, to access any properties you may have set on that instance of this object. This allows multiple `DsAjax` objects to co-exist on the same page, for use as needed.

A lot of the time I found that I needed to simply drop the response text into a given page element. Perhaps I was creating a table or the content of some other area of the screen. Well, if a target, as mentioned earlier, has been specified, and the `updateTarget` flag is set, the `innerHTML` of the taget element is set to the successful response text. There's no need to assign a callback function and do this yourself.

## JavaScript Object Notation ##

The other thing I often found I was doing with the response text was using `eval` to evaluate any JSON, so I thought I'd do something clever. If the page contents is going to be JavaScript Object Notation then, server side, you simply set the `X-JSON` header to true and this library will automatically evaluate the JSON and the callback functions will get this object, as an object not a string, as their argument.

But it gets even better. If you set the `X-JSON` header to a JSON string, that gets evaluated and returned, as above, leaving the body text for anything else. So you could set a target DOM element to receive the response text of the request and send a separate JSON object to your callback function, effectively getting two independent sources of information from a single AJAX call.

Talking of headers, there's a little helpful header sent with all AJAX requests so the server can easily identify the request without having to parse arguments and assume. This library sets, in the outgoing request, the `X-Requested-With` header to `XMLHttpRequest` so the server side scripts can be simplified.

## Spinner ##

I know it's considered good practice, and good UI design, to inform the user when something is happening, so rather than having to explicitly show some spinner graphic before starting the AJAX call, then hiding it again in the call backs, I put that functionality into the library too.

When a request is about to start, the display property of the spinners style object is set to block, and when the request is finished, successfully or not, it's display is set to none. Now, this spinner DOM element can be set from a call to the setSpinner method, but by default it finds a DOM element with an id of `spinner`, so all you need to do to get the good UI behavior of a spinning graphic for AJAX calls is create a page element called spinner, which will automatically be hidden and shown as appropriate.

## Target URL ##

By default, the target URL will be taken from the current page. So, if the server side script that created the current page has been written to recognise the AJAX flag in the header there is no need to set a target URL at all. In addition to this, you can call the `addParameter` function and pass it a name and value. These values will be appended to the base URL on any call so you don't have to change the URL to pass arguments in your request. As a shortcut to this, any unrecognised properties in the object literal used for settings are assumed to be URL arguments and are remembered as such. Since the settings object can be passed to the start methods as well as the constructor, you can specify any request parameters in the one line you use to initiate your request.

I've also found that a lot of what happens with AJAX replicates what used to be the sole preserve of the `FORM` element. Well, this library can also be used to submit a form. It will take the `method` and `action` fields from the form, then traverse the form looking for all the fields that should be submitted and creates the appropriate request arguments for them all, saving you the hassle of doing all that yourself.

Finally, and to extend the idea of the settings object literal, I added what amount to static methods.

If you don't have a need for repeated requests, or simply don't want to have to worry about or maintain an object for your ajax requests, you can call one of three methods which create a throw away DsAjax object and immediately initiate a `GET`, `POST`, or form submission request. All the configuration of these object must be done in the object literal passed to the function call as you will not get any object reference back.

