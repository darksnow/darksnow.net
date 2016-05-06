---
layout: portfolio
title: CSS3 Button Generator
link: http://www.cssdrive.com/css3button/
skills:
 - HTML5
 - CSS3
 - JavaScript
 - jQuery
---
With the increasing importance of the new features of CSS3 on websites I was tasked to create a tool to help show off some of the new features. This tool was to be a client side CSS3 only button generator written entirely in JavaScript.

This project required a deep knowledge of how the relevant CSS properties worked across browsers as well as how to apply them using jQuery. A key challenge here was how to show a good example of the more complex features, like transitions, while maintaining an easy to use interface for users who may not know anything about the new features and how to code them.

While CSS3 offers a lot of new features, aside from the complexity of the options available to just transitions, I needed to pick a selection of CSS tags to expose to the user.

The interface of this site was created using the jQuery UI library. This gave me the accordion effect for the various sections. I wrote a handler library which dealt with a lot of the repetitive interface handling, like removing CSS tags when a given option was changed or just disabled.

The core of this work was a generic system which allowed me to put the tag names in a attributes of the controls themselves. Change events were used to call functions which interrogated those attributes and generated the relevant CSS tags. Those tags were then added, in alphabetical order, to a DIV which contains the CSS needed to recreate the button effect. The changes to the CSS are also updated live to a real button on the page, created with an anchor tag.

This generic code took care of most of the tags, but where certain features may not work in all browsers, I was able to add multiple tag names and have the generic code create them all, assuming they all had the same syntax. A good example of this is the border-radius property. This has browser specific tags, but the same format for the value. So, to create a border with a 25 pixel radius, the following code is needed:<br />

        -moz-border-radius: 25px;
        -o-border-radius: 25px;
        -webkit-border-radius: 25px;
        border-radius: 25px;

At the time, Opera did support the correct tag, so the -o- property above was dropped for the live project.

The final thing I had to do was add a system for those exceptions where nothing but custom code would do. This was needed for transitions. In this case custom functions were added and a change to the generic code looked for that code and used it if it existed.

The initial creation of functions to solve the problem generically saved me a lot of time and effort. If I'd had to write custom functions to handle each tag I would have needed many very similar functions with just the tag name changed, and the code base would have been much larger than it was. Also, at a late stage when I was asked to add another simple CSS property, all I needed to do was add it to the inteface in the same way as the rest, and the generic functions took care of actually making it work.

Beautiful coding.

