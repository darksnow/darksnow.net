---
layout: portfolio
title: Syncopant
link: http://www.syncopant.co.uk
skills:
 - HTML5
 - CSS3
 - W3C Standards
 - JavaScript
 - jQuery
 - Linux Hosting
 - Apache
 - Email Provision
---
This is a site I fully designed and created, in conjunction with the client, for a freelance sound engineer.

It uses a smooth sliding menu system to access each section of the single page site. This one page incorporates a slideshow using a fade effect, an AJAX contact form, an embedded video and a google calendar.

The page also uses a rudimentary CMS system. Essentially an online file manager to allow the client to upload and edit files in place. This allows the client to change the content, including the images in the slide show, without having to get back to me.

I also manage the hosting and email for this domain.

Instead of the normal menu bar taking you to a different page, it causes the page to smoothly slide down to the desired section. Obviously, this would mean the menu bar is no longer visible, so I added code which would make a second, smaller, menu bar appear, fixed to the top of the page. This allows the sliding navigation system to be used from any of the sections.

The slideshow is generated from a directory of images on the server. A simple list of the files required for the slideshow is parsed by PHP to generate the list of images used by the jQuery transition effect. This list, which the client can edit, also determines the order the images are displayed in.

The contact form incorporates a simple CAPTCHA system and a honeypot to fool spam bots and allows users to post a message to the site owner without exposing the email address and without refreshing the page. The request is sent via AJAX, and if it validates on the server, it is sent. If not, a helpful error message is returned telling the user which required fields they have not filled in.

The Embedded video uses the f4player flash library to play the embedded video file and the google maps integration is a simple iFrame.

