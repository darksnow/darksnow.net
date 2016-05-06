---
layout: portfolio
title: Freeman&rsquo;s, Lyon & Turnbull
link: http://freemansauction.com/
client: Hookson
client_url: http://hookson.co.uk
highlight: Apache SOLR Search
image: lyon-turnbull-freemans.png
skills:
 - Drupal
 - Apache SOLR
 - 3rd Party API
---
When [Hookson](http://hookson.co.uk) were pitching for a redesign of a pair of auction sites they quickly realised that they&rsquo;d need to manage a lot of data. With the choice of [Drupal](https://drupal.org) they got me on board. We won the pitch and had to then rebuild twin sites for transatlantic auction houses [Freeman&rsquo;s](http://freemansauction.com/), based in Philadelphia, and [Lyon &amp; Turnbull](http://www.lyonandturnbull.com/) in Edinburgh.

Both auction houses manage a lot of antiques auctions in multiple cities. For us, this amounted to a lot of information about the auctions themselves, and the lots in each auction. They already had an online auction system in place, which they didn&rsquo;t want to replace, so the main crux of our job was to create a searchable listing of these lots. With hundreds of thousands of lots in the auction system already, this proved to be a large scale data management project for us.

## The design

Hookson supplied me a design of some key pages and I set about building the page templates. The pages were not all consistent in layout so a few templates were created to facilitate an attractive corporate site. The set up of the content types and any other information needed was left to me so given the design requirements I created a system which made sense to the users who had to manage the site.

The carousel images used across the site, for example, are taken from a content type of their own. This contains a select list of carousel locations, so the same content type can be used for different regions on the homepage, a selection of pages, or a specific page. If a carousel slide is limited to a specific page then another field needs to be populated with an entity reference to an existing site page. With carousel slides defined I then created a number of views blocks to display the associated images in the correct place. Each of these blocks is filtered to the selected region but essentially they all display the same thing in the same way so a single view with a display per block was used and rendered using [Display Suite](https://www.drupal.org/project/ds) for consistency. At the various different display sizes, some changes had to me made to the carousel slides. For this to work we needed some artistic control over the carousel images for the various sizes we used, just scaling and cropping the image to fit was not going to cut it. For this we used the [Manual Crop](https://www.drupal.org/project/manualcrop) module with a set of image styles managed by the [Media](https://www.drupal.org/project/media) module. This allowed us a great deal of flexibility in the responsive carousel slides.

One of the more complicated layouts on the site was the list of locations each auction house operates. The markup for this page deviated from the other page templates quite a lot so a custom [Display Suite](https://www.drupal.org/project/ds) layout was created with regions for all the data from a picture of the location to the contact card for key members of staff. The [Location](https://www.drupal.org/project/location) and [Google Maps](https://www.drupal.org/project/gmap) modules were used here to provide an embedded map to the location in question.

## Lots of lots

The main body of work for this build revolved around getting, searching and displaying the hundreds of thousands of auction lots available. Since these lots were going to be managed by a third party the first problem was getting that information into Drupal. We investigated the idea of accessing the other site on demand using some form of API but in the end opted to copy the data we needed into Drupal so we could manipulate it as needed. For this I created a couple of importers using the [Feeds](https://www.drupal.org/project/feeds) module.

Once we had the data we needed, it was a simple process to build a view to show the data we needed, where we needed it. I created a Display Suite view mode for search results so the newly imported Lots and Auctions could be consistently included in any search pages. In order to use this search index to convert sales, the feed included auction and lot ID fields. These were used in Display Suite to create links back to the originating auctions site, so a full API integration was not needed.

A similar approach was taken for purchases of auction catalogues from the site. Rather than looking at a full [Drupal Commerce](https://www.drupal.org/project/commerce) integration I built a system which takes a unique identifier from Pay Pal, stored against each catalogue entity, and generates a _&ldquo;Buy Now&rdquo;_ link giving the user the ability to buy a catalogue with a familiar checkout process.

## Fast Searching

![Apache SOLR](/img/skills/apache-solr.svg){:.thumbnail}While Drupal is more than capable of managing the amount of data we had, search performance using the SQL database was not all it could have been and this was a real concern for the client. To solve this I opted to use a technology I hadn&rsquo;t had reason to use before, [Apache SOLR](https://www.drupal.org/project/apachesolr).

SOLR is essentially a fast lookup index and is designed for very fast searches. For Drupal it creates an index of node IDs with any fields you would want to search on and allows for very fast free text searches on those fields. For our purposes it was perfect and in practice allowed us to search through the hundreds of thousands of nodes much quicker than the equivalent SQL query generated by Views. To do this, SOLR doesn&rsquo;t use an SQL query but implements [Lucene filters](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html). These filters are just another way to describe the data you are looking for and were quite easy to pick up and apply.

Since SOLR just returns the node IDs of anything that matches the Lucene filter, rendering and processing of those results is left to Drupal, allowing me to use Display Suite as normal in the search results.

## Two sites

Initially both the sites we built were functionaly identical but as the build progressed a number of changes were requested and the sites deviated from each other. While caused some maintenance problems as the custom code was changed the team at Hookson and I have managed each change effectively and we launched two large scale sites in tandem without a hitch.
