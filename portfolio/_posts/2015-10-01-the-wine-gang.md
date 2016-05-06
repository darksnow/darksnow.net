---
layout: portfolio
title: The Wine Gang
link: http://thewinegang.com
client: Hookson
client_url: http://hookson.co.uk
highlight: Subscription management using Drupal Commerce
skills:
 - Drupal
 - E Commerce
 - MySQL
 - 3rd Party API
---
Together with [Hookson](http://hookson.co.uk) we were asked to rebuild the site for a well established brand run by some of the leading lights of the UK wine tasting world. Since this was a high profile site with thousands of subscribers we had to do a good job. We didn&rsquo;t disappoint.

This was a large site with lots of new content being added for each monthly edition of the site, which meant a huge amount of data to migrate from an existing proprietary system and the need to make the transition to the new site as seamless as possible. In conjunction with the client and with a complete copy of the exiting site we began a detailed analysis of what was required. We quickly identified the key functionality that we needed [Drupal](http://drupal.org) to replicate for this build.

 * Site structured around a monthly release
 * Wine tasting notes as well as a blog and editorial
 * Access to most site content restricted to subscribers
 * Migration of existing content into new structure
 * Migration of thousands of users
 * Ability for new and existing users to pay for a subscription
 * The ability to sign up for recurring billing
 * Make adding new content as easy as possible for the authors

## Migration

With access to the existing system, and it&rsquo;s database, the site structure was easy to replicate so the first major task to tackle was getting the old data into the newly created Drupal install. For this I reached for my old friend [Migrate](https://www.drupal.org/project/migrate), the only real choice for this sort of job.

Using Migrate means mapping the old SQL database to Drupal entities so this phase was done first to make sure the structure we had decided on was complete and sensible. We decided to use taxonomies extensively in the categorisation of the wines themselves, so each of the individual content types had numerous relationships. I developed independent imports of all the taxonomies used, from country and region to wine producer, before adding more migrations for each of the core content types. All in all around twenty migrations were needed to copy across all the related data.

Once the core of the data was in place I then moved onto the users. We really wanted to allow the users to carry on as they had before. The URL structure needed to be changed to make it friendlier, but there were clear redirects in place to facilitate a nice transition. Unfortunately, I found that the existing user passwords were not MD5, which Drupal could have handled, or the salted SHA512 Drupal uses. With no access to the original developers we had to concede this one and settle for a mass mailing of all existing users with details on how to change their passwords. One thing I hadn&rsquo;t counted on was needing to build the complete subscriptions system before migrating the users. Without knowing the full details of how subscription management was going to work I didn&rsquo;t know where to put things like the expiry date of a given user.

## Enter Commerce

After exploring my options I had decided to go with [Commerce License](https://www.drupal.org/project/commerce_license) along with [Commerce License Billing](https://www.drupal.org/project/commerce_license_billing) and [Card On File](https://www.drupal.org/project/commerce_cardonfile) to issue a license for a user role and grant access to the restricted content that way. That was until I discovered the state of the payment provider module we needed to use.

The client was using [World Pay](http://www.worldpay.com) and following the length approval process they were reluctant to change. This meant no Card on File support and no facility for recurring payments. A look through the World Pay documentation showed me a way for them to do recurring payments, which they call Future Pay, and notify my site using a callback. Of course, there was no support for this in the [World Pay module](https://www.drupal.org/project/commerce_worldpay) so a large amount of custom coding was needed to get this to work. Initial code was added to activate a Future Pay transaction so I could confirm that the idea was going to work. With this in place I was able to complete the migration of our users.

During this process I also stream lined the [Drupal Commerce](https://www.drupal.org/project/commerce) checkout process to copy the existing simple mechanism as best I could. There was no real need for any sort of shopping cart functionality so the first thing I did was add a rule to remove everything when a product is added. Since we were only selling subscriptions, there was no need for more then one. I then used [Commerce Checkout Login](https://www.drupal.org/project/commerce_checkout_login) and [Commerce User Profile Pane](https://www.drupal.org/project/commerce_user_profile_pane) to make registering or logging in during the checkout process as seamless as possible. I got the entire registration and purchase process down to just four pages, the initial subscription selection, registration or login details, a redirect to World Pay&rsquo;s payment page and a simple confirmation page.

Extensive work went into making an extension to the World Pay module to allow for Future Pay transactions. Using the [Pay Pal module](https://www.drupal.org/project/commerce_paypal) as a basis I added a check box to every product to indicate to the system that recurring payments were valid. If all products in the cart are valid, then a check box is added at to the checkout process to indicate a Future Pay agreement is about to be set up. The client wanted to encourage Future Pay sign ups so this options was selected by default but allowed the user to opt out and make a single payment. The first transaction, to be paid immediately, can be discounted without changing the recurring amount to be paid. Once a Future Pay agreement is in place, the system looks for the callback and recreates the existing order which, in my case, buys a new license for a renewal.

I think my approach is generic enough for inclusion in the existing World Pay module so I am currently in the process of testing this code in isolation so it can be submitted as a patch.

## Security

A big part of the site was restricting access to most of the site content. In order to achieve this I set up a complex access control mechanism around the idea of user roles. Some limited functionality is allowed for anonymous users with further access being granted for users on a time limited free trial, and a full membership. This was complicated by so called *&ldquo;Trade Members&rdquo;* who are able to create and manage their own sub users. Luckily, there&rsquo;s a [module for that](https://www.drupal.org/project/subuser).

I broke up the restricted content into separate content types and using [Node View Permissions](https://www.drupal.org/project/node_view_permissions) I was able to restrict access. I also found that [Views](https://www.drupal.org/project/views) is able to bypass those restrictions, allowing me to show teaser blocks of restricted content to all users. Once the data was secure I then added a JavaScript based pop up pay wall to the site, which presents a login or registration form when restricted content is clicked on. This funnels users to the subscription pages effectively.

## Supporting the authors

With a lot of content being added every month, the oft overlooked Drupal back end needed some serious work. All too often people leave the administration of sites alone. With Drupal being as good as it is, this is often a good strategy. If the content types and structure of the site make sense, then adding and managing content can be simple enough. In this case though, things needed to change.

The biggest conceptual change was allowing content to be published in one batch as an edition of the site. I&rsquo;ve used modules like [Scheduler](https://www.drupal.org/project/scheduler) before to allow users to set a future date to publish content but relying on the authors to first know, and then enter the correct date for the next publication just wasn&rsquo;t enough. For this I created a date field to store the month and year of the edition that a piece of content relates to. This field is used to categorise content all across the site and is the foundation of everything the user sees, right down to the URL structure. With most of the content assigned to it&rsquo;s own monthly edition it was a simple matter to create a View using [Bulk Operations](https://www.drupal.org/project/views_bulk_operations) to allow the administrator to publish the entire edition in one go. But there was a complication. Just like in print, a monthly edition doesn&rsquo;t necessarily correspond to a calendar month. This meant that to display the _current_ edition, I couldn&rsquo;t rely on the date. I got round this with a collection of custom code to access a stored system variable. First I needed to hook into the VBO based publish button and set the current edition to the published month, then I needed to filter various views of the data to that month. While conceptually complicated to build, this system proved very easy for the administrator and elegant for the site builder, in this case me, to use.

The final big hurdle was streamlining the addition of new content. With so many wines being added to the system each month they needed a quick and easy way to firstly filter down the various taxonomy lists to find what they needed, and secondly, to add new terms. I found two modules to do exactly what I needed. [Select or Other](https://www.drupal.org/project/select_or_other) allows the user to choose _&ldquo;Other&rdquo;_ from a select list, and it presents a text box allowing a term to be added seamlessly while [Hierarchical Select](https://www.drupal.org/project/hierarchical_select) allows one select list to limit another based on a shared taxonomy field. The problem was, these modules didn&rsquo;t play well together. I have made extensive changes to Hierarchical Select to make it aware of the _&ldquo;Other&rdquo;_ option, and to populate the shared field. As this site has just recently been completed I&rsquo;m still in the process of testing these changes in isolation so they can be submitted as a patch.

## Going live

This was a complicated build start to finish. From an extensive migration to complicated back end requirements, with a whole new payment provider and commerce set up in between, there was a lot to do, and a lot to be proud off. In the end the client had a lot of say in how things progressed as they progressed, which helps us all to stay on the right track. This build was not without it&rsquo;s challenges. It allowed to me to write a lot of generally applicable code and as soon as my patches are submitted will be the one client site that has allowed me to contribute the most back to the Drupal community so far.

On launch day the wine gang had overwhelmingly positive feedback from their existing users, which led to a happy client for us. It&rsquo;s always good to know my work is appreciated.
