---
layout: portfolio
title: Watch The Birdie
link: http://www.watchthebirdie.co.uk/
highlight: Custom coded CSS3 Animations
skills:
 - Jekyll
 - HTML5
 - CSS3
 - SVG
published: yes
---
While working closely with Geoff Baxter, the owner of [Watch the Birdie](http://www.watchthebirdie.co.uk), during the [MV Festival]({% post_url portfolio/2011-11-11-mv-festival %}) we got chatting and eventually the conversation turned to his website. At the time the existing site was getting old and in a creative industry such as wedding videography Geoff felt that the impression it gave was losing him business. All he really wanted was the same information but with a fresh approach, so he gave me free reign to recreate his site from scratch.

## Requirements

I had a good long discussion with Geoff about this project and followed up with emails after checking the content of the existing site. His previous developer had always done any updates so there was no need for a CMS. The nature of Geoff's business meant that there would likely be a lot of video content that could be showcased and he already had a good selection of his work online at Vimeo. All he really wanted was a more modern look and of course for it to work on mobile so he could show it off when meeting potential clients. So the core requirement and constraints were:

 * Fresh, clean design
 * Need to appeal to a bride since they make most buying decisions
 * *"Not pink"* as a departure from the industry norm
 * Responsive design for mobile
 * No need for a CMS
 * Maintain existing content
 * Showcase of various video work from Vimeo
 * One specific video front and centre

Taking all this into consideration, and given the content that I already had from the existing site, I started on some information architecture. The existing content was quite dry and to the point. While it did have some personality in the tone there was very little in the way of personal detail that might allow a prospective bride to make the personal connection that might lead to work. I suggested that we rewrite some of the existing copy as a short intro before the main showcase video and add a section with portraits and details of the people that may be attending the client's wedding. I also suggested that we add a timeline to show what a typical day could look like so people would have a clearer understanding of what they were getting for their money.

On top of this, I broke up the pricing structure to show the core pricing and added a separate *extras* section. Along with a showcase of some wedding videos this gave us six sections, the even number I needed for the layout idea I had.

## Design

I'm a developer but over the years I've been learning a lot about design so it's fun to play around, especially when a paying client gives me a free hand. ![Watch the Birdie bird](/img/code/birdie-logo.jpg){:.r}Geoff and I initially looked at a bird logo from which I created a SVG for use in the middle of the header. I decided to have this logo overlap the first section of the site so it added interest and looked prominant without expanding the overall header too much. This was fitted around the company name in a suitably flowing cursive font. The six sections of the main menu were them placed around it, three on each site for balance. Since social media engagement is important here, Facebook and Vimeo showcase links are prominiant at the top of the screen.

After the initial work was done to get the header to scale properly Geoff found a more suitable font so I changed over to the *"Love and Passion"* typeface. This required some alterations to the balance of the header but didn't cause too much trouble for me. ![Watch the Birdie Lettermark](/img/code/birdie.svg){:.l} In fact we both liked this font so much that the bird was dropped as a logo to be replaced by a simpler letter mark. This simplified header allows the users attention to be drawn to the highlights video instead of the bright bird logo. Much cleaner.

With all that in place I looked at the size of the logo at various sizes and using the content as a guide started putting breakpoints in and making changes to the header as the content ran out of breathing room. Given the limited number of menu items I opted not to use a hamburger menu here. Instead I grouped the menu items and allowed them to stack neatly as space allowed. In the same vein of simplicity I also added a fixed button at the bottom right of the page which links back to the header menu. While this button is a large touch target I felt it was less intrusive than a more typical fixed header.

The first think Geoff wanted people to see was his showcase video so that was placed front and center, just under the header and main navigation, without any preamble or adornment. It remains full width across all sizes to grab attention.

For the rest of the content I wanted to tell a story. The site briefly introduces Watch the Birdie before giving the prospective client an overview of what would happen on a typical day followed by example videos and ideas for any extras offered. All this gives the visitor an idea of what they are actually buying before being shown the pricing section, undoubtably one of the more important and informative parts of the page. Once suitably impressed with the services on offer I then finish up with a section about the people and the contact details, leading the client through the whole journey of deciding to hire Geoff and his team.

## Animation

While all the above was done with a suitable clean white theme, this is a site about video so this is where I allowed myself to play and have fun.

While the embedded videos do give some motion I felt that more was needed to engage the visitor as they scroll through the story. I hand crafted some CSS3 animations and wrote a small JS library to link the animation frame to the scroll position. As you scroll down the page, regrdless of breakpoint, the timeline folds in from each side of the screen and the example videos fold down in a similar fashion but from the top for variety.

A section heading image is used to break up each part of the story and these are fixed at larger breakpoints so the page appears to scroll over them adding to the dynamic nature of the site. Finally, since I'd opted for a single page, I also created a small script to scroll the browser to the relevant section when the main navigation is used. The fixed link back to the navigation also smoothly scrolls the page back to the top when needed.

## The code

As Geoff didn't need to edit the site himself I was free to build the site as I saw fit. I chose Jekyll for this so the site can be served on relatively simple static hosting and would not need regular maintenace unless the content needed changed. I used Jekyll collections to better organise the individual sections of the site and the example videos. Other parts of the site, like the URL to the showcase and the social media link URLs were all added to the main configuration file and used in the page templates. This reduces the amount of time I'd need to make quick changes to site as required. Since most sections are bespoke there was little scope for generic templating so the sections collection is pulled together in the index page to create the final single page site. Overall it's a flexible and logical structure that aids future maintenance.

## Did it work?

As of the start of May the new site has not been up for very long so it's a little early to guage whether it's resulted in increased interest of conversions for Geoff. What I can say is that he's pleased with it and thinks it's a far cry from what was there before.

I know I'm pleased with it. I'd like to thank Geoff for giving me a free hand to have some fun playing with this while offering the guidance I needed when he needed to make content decisions.

I think it turned out nice.
