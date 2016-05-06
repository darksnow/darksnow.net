---
layout: portfolio
title: MV Festival
link: http://mvfestival.com
skills:
 - Drupal
 - E-Commerce
 - Responsive Design
 - Google Maps
 - PHP
 - Linux Hosting
 - Apache
 - Email Provision
---
When the idea of a new music, comedy and snow sports festival manifested from a fun filled weekend in Aviemore a lot of ideas started flying. Of course, they needed a website and I offered to help. Over a long iterative process a number of requirements were thrashed out.

First and foremost this site was going to be the main sales channel for tickets to the festival, so some form of payment gateway and eCommerce system had to be included.

There was going to be a page for each of the acts present at the festival. This changed frequently as new acts were signed so these pages needed to be managed by the event organiser so changes could be made quickly without having to go to the web master, me.

We also had to make sure the charities we were supporting, and the sponsors, were given prominence on the page.

In the current version of the site some changes were made in line with lessons learned from the first festival.

* The colour scheme was changed in line with the clothing and other branding.
* Analytics showed a good percentage of users accessing the site with mobile browsers.

##Let's get started

![Drupal](/img/skills/drupal.svg){:.thumbnail}Armed with a decent idea of what was needed, but with a free hand to design as I saw fit, I decided on a [Drupal](http://drupal.org) based site.

[Drupal Commerce](http://www.drupalcommerce.org/) was used to facilitiate the ticket sales. Using [PayPal](htp://paypal.com) as the gateway service keeps things simple and cheap for us running the site and presents a familiar and trusted interface to the ticket buying public.

Drupal Commerce itself uses the core functionality of Drupal leaving me the flexibility of [Views](http://drupal.org/project/views) to create the ticket sales pages, and [Rules](http://drupal.org/project/rules) to allow time limited offers or discount codes. The sales manager of the festival has directed me to create some complex discount rules and the Drupal Rules system has given me the flexibility and confidence to tell him no matter how complex the rules get, it can be done.

The festival organiser, after some tuition, has had very little trouble adding pages as acts sign up, and editing any part of the site. I though I would have to try and explain the difference between blocks and nodes but as long as when logged in, the user sees the edit icon when hovering over an area, he doesn't care and just gets the job done.

The typical Drupal layout afforded by the blocks system, in conjunction with the flexibility of views, meant I could use a sidebar to prominently display the charities on the page, followed by the main sponsors. The remaining sponsors and supporting local businesses are then left to a block at the bottom of every page and appear in random order to prevent any claims of favouritism.

Finally, I decided to create a responsive theme using [Adaptive](http://drupal.org/project/adaptivetheme) as a base.

Adaptive gave me a fluid layout and plenty of control to create multiple break points where the content, not a given device, require it. For example, the menu bar breaks when there's no room for it and collapses down to a single button, which reveals a vertical menu system. This menu system still allows the user to expand and use the full scope of the menu.

The blocks are in order of importance, so the content the user sees is above the charity and headline sponsor images, which in turn are above the remaining sponsors logos.

During the first festival we were complimented by local businesses on the bright and obvious colours used on the staff clothing so it was important to maintain that. It does make for a striking colour scheme, but I should mention that the pink wasn't my idea.

