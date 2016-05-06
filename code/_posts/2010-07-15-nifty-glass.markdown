---
layout: post
title:  Nifty Glass
date:   2010-07-15 11:34
tags: CSS Design
image:  nifty.png
---
I had decided to create the "glass" effect popularised by OSX and Vista and while following various guides and creating some graphics in the [GNU Image Manipulation Package](http://www.gimp.org) I spotted a pattern and decided to come up with a way to create the now popular glass effect in CSS, without using any graphics at all.

Using the gradient fill in GIMP and applying those colours to the CSS used to create the Nifty Corners effect, I managed to create some pure CSS Glass buttons. Hopefully I can explain how I did this below and show you how you can create the same effect for your own projects.

A while ago I was looking for a way to create a curved corner and came across [Nifty Corners](http://webdesign.html.it/articoli/leggi/528/more-nifty-corners/) by Alessandro Fulciniti. You can get the full details of how this works from the link above, but I'll quickly tell you the idea. While this is now a JavaScript solution that keeps the HTML code clean, the pure CSS way is to add some one pixel high block level elements and change their margins one pixel at a time to create the curve.

By taking the right colours from a curved gradient and applying them as the backgrounds of the existing block elements from the nifty corners, I could create a pure CSS glass effect. The HTML code to achieve this is the same as the nifty corners.

<style>
.ct1, .ct2, .ct3, .ct4, .ct5, .cb1, .cb2, .cb3, .cb4, .cb5 {
  border-color: #666666;
  border-style: solid;
  border-width: 0 1px;
  display: block;
  height: 1px;
}
.block .content {
  border-color: #666666;
  border-style: solid;
  border-width: 1px 1px 0;
  padding: 0 3px 2px;
}
.block .ct1, .block .cb1 { margin: 0 5px;}
.block .ct2, .block .cb2 { margin: 0 3px;}
.block .ct3, .block .cb3 { margin: 0 2px;}
.block .ct4, .block .cb4 { margin: 0 1px;}
.block .ct5, .block .cb5 { margin: 0 1px;}
.ct1 { background: none repeat scroll 0 0 #666666;}
.ct2 { background: none repeat scroll 0 0 #CCCCCC;}
.ct3 { background: none repeat scroll 0 0 #AAAAAA;}
.ct4 { background: none repeat scroll 0 0 #868686;}
.ct5 { background: none repeat scroll 0 0 #333333;}
.cb5 { background: none repeat scroll 0 0 #222222;}
.cb4 { background: none repeat scroll 0 0 #333333;}
.cb3 { background: none repeat scroll 0 0 #444444;}
.cb2 { background: none repeat scroll 0 0 #555555;}
.cb1 { background: none repeat scroll 0 0 #666666;}
</style>

{% highlight html %}
<div>
<b class="ct1"></b>
<b class="ct2"></b>
<b class="ct3"></b>
<b class="ct4"></b>
<b class="ct5"></b>
<div class="content">The contents of the block</div>
<b class="cb5"></b>
<b class="cb4"></b>
<b class="cb3"></b>
<b class="cb2"></b>
<b class="cb1"></b>
</div>
{% endhighlight %}

Which produces the following, assuming your browser likes it.

<pre><div style="width: 250px" class="sidebar"><div class="block"><b class="ct1"></b><b class="ct2"></b><b class="ct3"></b><b class="ct4"></b><b class="ct5"></b><div class="content" style="border-top: none; margin-bottom: 0">Contents</div><b class="cb5"></b><b class="cb4"></b><b class="cb3"></b><b class="cb2"></b><b class="cb1"></b></div></div></pre>

The only thing left to do is set appropriate background colours for the curved corner elements. Unlike the original nifty corners, which can use a two pixel high element, I need all five to maintain the gradient.

{% highlight css %}
.ct1 { background: #666666; }
.ct2 { background: #cccccc; }
.ct3 { background: #aaaaaa; }
.ct4 { background: #868686; }
.ct5 { background: #333333; }
.cb5 { background: #222222; }
.cb4 { background: #333333; }
.cb3 { background: #444444; }
.cb2 { background: #555555; }
.cb1 { background: #666666; }
{% endhighlight %}

The more eagle eyed amongst you might have noticed that this is exactly the effect I've used on this very site (ED: The old site, no longer used here). The colours presented here are all grey, to give the black glass I've used on this site, but it's easy enough to adapt to any colour scheme and I have a [demo file](/demo/glass.html) with some other colours that I worked out.

I also adapted this approach for use with unordered lists for menus, again as used here (ED: Or not). While I've used the same colours as the blocks, for design consistency, I did add a CSS hover declaration which just reverses the colours used, giving a nice roll over effect to the menu.

Using this technique on an unordered list did present a complication. In most browsers, you can create these blocks and they behave like block level elements. They are 100% wide unless you float them, in which case they take the size of their content. This works great for the menu, since it allows the menu buttons to expand.

But it doesn't work in IE.

The work around, and the reason I would not use this technique for client sites, is to set a fixed width for the menu buttons. I used an EM width here, so if the font size changes, so do the buttons, but it does mean I have to be careful to make sure my buttons use titles of about the same size. A serious limitation and one that means I wouldn't create a general Drupal theme using this technique, at least not for the menus.
