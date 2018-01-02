---
layout: post
title: Off-canvas menu without JavaScript
tags:
 - Layout
 - CSS
 - no-js
image: geometry.jpg

---
I really like working with JavaScript, especially when I can keep things clean in the browser. While things like jQuery really helped clear up cross browser issues, they can be overkill for a lot of smaller tasks. In fact, sometimes JavaScript is simply not needed for a lot functionality. Here I'd like to create a simple off canvas menu without a single line of JavaScript

<p data-height="265" data-theme-id="dark" data-slug-hash="rzbram" data-default-tab="result" data-user="darksnow" data-embed-version="2" data-pen-title="Off canvas menu without JavaScript" class="codepen">See the Pen <a href="https://codepen.io/darksnow/pen/rzbram/">Off canvas menu without JavaScript</a> by Martin Fraser (<a href="https://codepen.io/darksnow">@darksnow</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

The quick demo above demonstrates an off canvas menu. When the menu button is clicked the whole page slides sideways to reveal a menu. Clicking the menu button again, or the close button, causes the main content to slide back.

A JavaScript solution for a menu like this would require us to maintain, and change, the state of the menu. Typically this would be done with a class name on the body element or something similar. We'd then write our CSS to alter the layout when that class, the state, has changed. Let's see if we can do something better.

## The secret sauce

There are two important parts to getting this to work. One is a feature of HTML and the other is in CSS.

Here is a simplified version of the HTML code showing the structure of the top level of the markup only. This is to give you an idea of the structure which makes this work.

{% highlight html %}
<input hidden aria-hidden="true" type="checkbox" name="toggle-nav" id="toggle-id"/>
<aside>
  <header role="banner">
    <nav>
      <label for="toggle-id">Menu</label>
    </nav>
  </header>
</aside>
<main>
  <header role="banner">
    <nav>
      <label for="toggle-id">Close Menu</label>
    </nav>
  </header>
</main>
{% endhighlight %}

We have a hidden checkbox element. It's position in the hierarchy is very important, but we'll get to that later. You can see that it has the HTML5 `hidden` attribute as well as an aria role. To get rid of an element in an accessible way requires more than just `display: none`, these attributes do that.

## The `for` attribute

There are multiple labels with a `for` attribute. This attribute tells the browser that this label is associated with the input element with the named ID. This is not the `name` of the `input` element but specifically the `id`. While these are sometimes the same value, they are distinct and separate attributes.

For a text box this association means that when the label is clicked, the text box gains the focus. In our case, for a checkbox, it activates the checkbox. This is very handy to increase click target areas since a label is far easier to style than a checkbox itself.

The fact that there are two labels for the same checkbox doesn't cause any problems and means we can change the checkbox from anywhere we might need it.

Since a checkbox remembers it's state, we have part of the solution for this problem. Leveraging the inherent state tracking of the normal HTML checkbox element.

## The sibling selector

The other part is how to change the style of the menu to show it when that state changes.

There are two parts to this but it's quite simple really. All it takes is a little CSS.

{% highlight CSS %}

html, body, main {
  height: 100%;
}

aside {
  position: fixed;
  height: 100%;
  z-index: 1;
  width: 200px;
}

main {
  z-index: 2;
  position: fixed;
  transition: transform 1s;
  overflow-y: auto;
}

input[hidden]:checked ~ main {
  transform: translateX(200px);
}
{% endhighlight %}

The first part is the overall structure of the off canvas menu I've created. It places the `<main>` element over the `<aside>` element so that it is hidden. They are both fixed so stay where they are even when the browser window is scrolled. The scroll bars are then added to the `<main>` so the page acts almost normally. There's a lot more styling than shown here, feel free to have a look at the pen. There are better ways to approach this but the style of off canvas menu you create isn't important for this example.

There is a transition added to the main element, which adds the animation, but the important part is the last CSS rule.

```input[hidden]:checked ~ main { ```

This references the hidden input element. The selector up to the colon is just a normal selector, an ID could just as easily be used and might be required if there are multiple states to track. The magic comes after than.

First we have the `:checked` pseudo selector. This does as the name suggests. For any element that can be selected, a checkbox or radio box, this rule will match when it is in it's checked state. This is how we react to the change of state that is tracked by our hidden element.

The other important part of the selector is the `~` character, or the _general sibling selector_ to give it it's full name. What this says is target the right hand element that is on the same level in the HTML hierarchy as the left hand element. I could also have used the `+` character or the _adjacent sibling selector_ and put the checkbox immediately before the `<main>` element. The adjacent selector is the same as the general selector in that finds elements on the same level in the hierarchy, but the right hand element must immediately follow the left hand element for this to match.

So, what our fancy selector actually says is match the `<main>` that is a sibling of the hidden input when it is checked.

In there we just translate the main element by the width of the off canvas menu, allowing the transition to animate everything, and we have a working off canvas menu.

## No JavaScript included

Sometimes you don't need any JavaScript at all. We've seen how to track state using just the inherent properties of a good old fashioned HTML form element, and how to get CSS to react to that state change using a relatively underused CSS selector.

I hope this sparks the imagination and comes in handy for somebody. These simple rules can be used to create all sorts of things that we usually rely on JS for, but maybe I'll write about that another day.

