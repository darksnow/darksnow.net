---
layout: post
title:  Drupal Done Quick
tags:
 - Drupal
 - command line
 - drush
image:  droplet.jpg

published: true
---
How fast can we put together a complete, feature rich website?

What if I told you that I could put together, from an empty directory on a web server, a complete Drupal installation in less time than it will take me to write this post?

Now, a quick and dirty blank website is nothing to spectacular so let&rsquo;s up the stakes. My site will have a live Google map of some imagined content type, and let&rsquo;s say fifty sample data points on that map.

This is all possible thanks to the multitude of modules contributed by the Drupal community. The modules allows you to build a huge range of website types with little or no coding at all. The speed is all down to the Drupal Shell, or &lsquo;[drush](https://github.com/drush-ops/drush)&rsquo;

## Drush - An introduction

The Drupal shell, or just drush is a command line tool to make a lot of common Drupal tasks quicker and easier than going though the web based GUI.

> Drush is a command-line shell and scripting interface for Drupal, a veritable Swiss Army knife designed to make life easier for those who spend their working hours hacking away at the command prompt.
> &mdash; <cite>Drush GitHub Page</cite>

This post should serve to convince you of the power of `drush` once we get started but first we need to install it.

If you are lucky enough to be running Linux on your development machine then drush should be available from your software repository. Most repos are up to date enough for most needs. Unlike some other development components and libraries you don&rsquo;t necessarily need the latest version of Drush and your repo version should be fine.

{% highlight bash %}
$ apt-get install drush
OR
$ yum -y install php-drush-drush
OR
$ yaourt -S drush
{% endhighlight %}

Drush is also available through composer and can be installed globally or per project as required. [Details of this](http://docs.drush.org/en/master/install/) are available in the drush docs. You can also install it directly from the GitHub repository if you&rsquo;re on OSX or Windows, there&rsquo;s even a [Windows installer](http://docs.drush.org/en/master/install/#windows-zip-package) available so getting drush working shouldn&rsquo;t be too hard.

## Let us begin

Before the actual Drupal build we need a working Apache installation, access to the document root and or course, drush as detailed above. With all that in place most of the hard work is already done.

What happens next is a series of drush commands, plus a brief GUI interlude, which will allow us quickly complete the following step.

  1. Install the latest stable release of Drupal
  2. Boot our new Drupal install and get it running
  3. Download and enable any modules we may need
  4. Create a content type to show on the map
  5. Create a lot of test data to make the map interesting
  6. Marvel at our genius
 
Sound easy enough so let&rsquo;s get started.

Assuming we have Apache pointing to `/var/www/` as our document root, you&rsquo;ll need to change to the directory one level down then have drush create the real directory, complete with the newest version of Drupal. A lot is about to happen, so I would suggest you enter the following commands one line at a time so you can follow what&rsquo;s happening.

{% highlight bash %}
$ cd /var
$ drush dl drupal --drupal-project-rename=www
$ cd www
$ drush -y site-install standard --site-name="Drupal Quick" --db-url='sqlite://.ht-sqlite' --account-pass=password
$ drush -y dl devel location gmap
$ drush -y en location_generate location_node gmap_location
$ drush genc 50 0 --types=article
{% endhighlight %}

We should now be able to browse to your new homepage and see the fifty articles listed. Since we enabled the `gmap_location` module there will be a map available at `http://example.com/map/node` and what will we see?

That&rsquo;s right, a map with none of our hundred nodes on it!

## drush isn&rsquo;t perfect

This shows a problem with `drush`. It requires the explicit support of the module writers. The `location` module does interact with the `devel_generate` module to allow that module to create random locations. The `devel_generate` module has good support for `drush` but because `location_generate` isn&rsquo;t aware of `drush` the content is generated without locations.

How do we fix this?

This is where we leave `drush` for a little bit. Visit `http://example.com/admin/structure/types/manage/article` and login as admin when prompted using the password you set using the `site-install` command above. On the right hand menu at the bottom of the page click on `Locative information` and change the minimum number of locations to 1 and press `Save content type` right at the bottom of the page. This will make a location compulsory for all articles.

Then we need to go to `http://example.com/admin/config/development/generate/content` and check the box in the list at the top to create articles. Just below there, check the box to delete all the invalid content we&rsquo;ve already created then right at the bottom of page check the box that will add locations to our new articles. Finally, press `Generate`.

Now, back on the homepage we have a new list of generated content, so far so good. Click on the `Node locations` link and you should see an amazing map with the sample data spread all over the world. You might need to zoom out to see them all.

![Quick Drupal Map](/img/code/drupal-quick.jpeg "Drupal Quick Map")

## Conclusion

You can see above that the instructions for a command line tool are far more concise and clear than the verbose instructions required to navigate the web UI just to check a few boxes and press a button.

It can&rsquo;t be denied that `drush` is a powerful command and should be in the toolkit of anyone interested in developing, building or deploying Drupal sites.

Having said that, like any tool, it&rsquo;s not perfect and needs to be handled with care and understanding. Once you get to know the way Drupal operates and the names of the common modules `drush` can save countless hours just installing those modules. I&rsquo;ve not even touched on `drush make` for building a site from a template make file, or `drush up` to upgrade Drupal and your modules. Or the command you&rsquo;ll use most often, `drush cc all`.

In short, you can build a complete feature rich site in less time than it took to read this post if you embrace the power of `drush`.

Go [get it](http://docs.drush.org/en/master/install/) now!
