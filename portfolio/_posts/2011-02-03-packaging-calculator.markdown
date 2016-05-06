---
layout: portfolio
title: Packaging Calculator
link: http://packagingcalculator.com/
skills:
 - HTML5
 - CSS3
 - W3C Standards
 - JavaScript
 - Prototype
 - PHP
---
Initially this site was a simple proof of concept which provided some specific calculations to the packaging industry.

The brief was to make it as responsive as possible, which meant client side JavaScript for the calculations, but there was also a requirement to protect some proprietary calculations. What I came up with was a library that could use client side JavaScript, or an AJAX call to server side calculations, which both returned the result in a consistent manner, allowing JavaScript to update the interface consistently.

The final touch to this initial work was a fade transition created using the [script.aculo.us](http://script.aculo.us/) effects library. Using this, each selected calculation would fade into the foreground for use. As such, there is no page load between requests since everything is on one page.

Following the success of this site, a design was commissioned and supplied to me for implementation. The result is the site as it is now. The framework I've created allows for more calculations to be added as needed with relative ease.

*Additional Work completed August 2011*

I've been asked to add a substantial new piece of work to this project. It allows the calculation of an optimum palette layout given the dimensions of the palette and the containers on the palette.

I was pleased to find that even though this required integration of popup windows in the client, and a whole new PHP library on the back end, the original code I wrote for this was generic enough that all the AJAX and UI functionality worked without modification. All in all a good result for additional work that was far more complex that the original system was designed to handle.

