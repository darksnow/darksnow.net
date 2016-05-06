---
layout: post
title:  "CSS3 Transitions"
date:   2011-07-27 20:55
tags: CSS CSS3 Animation JavaScript
image:  css3.svg
---
Recently I've been messing with the cool new features of CSS3 for a client project and I was inspired to see what sort of interface features could be done with it.

The nice things, like drop shadows, gradient background and curved corners, make things look great without having to reach to the image editor, but are hardly revolutionary. Any design that is well planned could already make use of these things and they've been around on the web for ages, though CSS3 certainly makes them far easier to implement.

What really got my attention were transitions.

For those that don't know, CSS3 transitions allow a browser to animate between two CSS states. So, instead of the usual jump to a different colour on hover, there can be a smooth transition. 

I'll put in an example below, but bear in mind that you'll need a recent version of the good browsers to get this to work. This means no IE at all and Chrome 12, Safari 5, Firefox 5 or Opera 10. More on this later.

The first button below is a simple anchor tag, anchored to nothing so no need to click on it. It has styles applied to it as follows:

<style>
.test_button {
  background: #aaa;
  color: #000;
  padding: 5px;
  display: block;
  float: left;
  margin-right: 1em;
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  transition: none;
}
.test_button:hover {
  background: #333;
  color: #fff;
  -webkit-box-shadow: 0 0 20px #0f0;
  -moz-box-shadow: 0 0 20px #0f0;
  -o-box-shadow: 0 0 20px #0f0;
  box-shadow: 0 0 20px #0f0;
}
.trans {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
</style>

{% highlight css %}
.test_button {
  background: #aaa;
  color: #000;
}
.test_button:hover {
  background: #333;
  color: #fff;
  box-shadow: 0 0 20px #0f0;
}
{% endhighlight %}

<a href="#" class="test_button">Hover over me</a>

So far so obvious. The new CSS3 rules need to be repeated for all the supporting browsers. It's a pain, but we've seen it before with border-radius, so fair enough. The standard hasn't been ratified officially yet. The button, predictably, changes colour when you roll over it, and even has a nice green drop shadow to show a little bit of CSS3 charm.

But now for the fun part. Transitions can allow the browser to animate those changes. And the best bit is, rather than having to fall back to something like jQuery to do all the fancy animated effects, it's a one liner, right in the style sheet!

This next button has the same style applied, but I've added another class to it which contains the following code:

{% highlight css %}
.trans {
  transition: all 0.5s ease;
}
{% endhighlight %}

<a href="#" class="test_button trans">Hover over me NOW!</a>

OK, so if you look at the CSS that's perhaps a little more than one line of code, but when the browser support this properly we'll only need the line shown (and a ton of JavaScript to let IE do it) so give me a break. If your browser is new enough and good enough you should be seeing the amazing effect. It's the same roll over, but rather than a sudden jump between the two states, you get a transition over a half second.

Now, all this may leave you feeling a little underwhelmed. While this is cool, means we don't have to write and maintain as much JavaScript to get things looking dynamic, and gives us mere coders an easy way to create amazing graphics, it's hardly essential.

But consider this. Any CSS property is handled the same. ANY CSS PROPERTY.

This means, if I have an absolutely positioned block element, and change it's left property, instead of the sudden, jumpy move, it transitions over the time specified. Now, animated elements are within reach of a single line of code!

Better yet, the transitions still work, even if you don't use the CSS hover modifier or it's siblings. It works if you use JavaScript to go in and explicitly change a CSS rule. No hover, reacting to the usual page events, I can now have an element smoothly get out of the way simply by changing it's position. It gets even better though. You are not limited to animating one thing at a time, as I showed above with <code>color</code>, <code>background</code>, and <code>box-shadow</code> so what's stopping you just changing a load of things by just changing the class of the element?

Nothing!

The simplest way to achieve these amazing effects is the way people have been making dynamic formatting changes for ages. Or at least I have. By changing the CSS class on an element, everything that has changed is animated by the transition.


<a href="/demo/transitions.html" class="test_button trans">View Demo</a>

To see a simple application of this, I've put together a [Demo Page](/demo/transitions.html) which shows how an image gallery could be put together, or a corporate employees list for your website. All the content there is static but could just as easily come from an AJAX call. I'd encourage you to have a look at the source and see that where I should have a load of jQuery calls to do complicated animation with timings, there are just the usual class and style changes, the transitions are handling all the animation automatically!

I love these new transition effects, but there is an obvious problem and that is browser support. As I said above, you need a new version of the good browsers. This excludes IE straight away, but that's nothing new. If you're planning on creating some amazing web app, these transitions could save you a load of time, but not yet. Browser support is not yet there, and if Microsoft are having a hard time getting rid of IE6, you can imagine how long we'll need to cater for a majority browser that doesn't support any of the new features of the modern web.

So, the web could be, thanks to these new CSS3 features, a rich and vibrant place, but Microsoft will make sure we have to cater to the lowest common denominator for years to come and they will continue to hold have the pace of development of modern web technologies.

Remember kids, have fun out there, but watch out for IE.
