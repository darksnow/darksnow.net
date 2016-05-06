---
layout: portfolio
title: Windpole Turbine Map
link: http://windpoleventures.com/map/
highlight: Server side map clustering
skills:
 - HTML5
 - CSS3
 - JavaScript
 - Prototype
 - Online Maps
 - Google Maps
 - PHP
 - Cake PHP
 - MySQL
---
The initial brief for this project was for a fairly typical map, displaying the assets of this company. In this case wind turbines in North America. The biggest hurdle was that they wanted to display 12,000 points on the map and allow them to be searchable.

To aid in the creation of the UI I used [prototype](http://prototypejs.org/) and the [script.aculo.us](http://script.aculo.us/) JavaScript libraries. The back end code was written in [PHP](http://www.php.net) using the [CakePHP](http://cakephp.org) MVC framework. Since the biggest problem to tackle here was the number of map markers I also employed a server side clustering technique. Using CakePHP I create a clustering algorithm which gives a JSON feed to a custom written client side library based on an AJAX call containing the current map bounds and zoom level. I thought it worked quite well in the end.

I was supplied with a PSD mock up of the interface and details of the data. Building the custom UI as map overlays to allow for the full screen map was straight forward enough. I created a Google Maps UI library to create generic boxes, these boxes can be hidden as can be seen if you click on the Windpole logo at the top right.

I then, again client side, created the beginnings of a clustering library which makes an AJAX call to the server whenever the map bounds are changed. Using this event also implicitly handles a change of zoom level so any change to what the user is looking at is handled by this library. It was designed to take generic markers with a reference to a custom icon. On top of this it can also take a marker count for clustering icons, or a title and further details for normal markers. All of this meant I could send a JSON array containing everything that the user could see and quickly iterate over it passing each marker type to it's own display function. In effect, the marker types build themselves. The result of this can be seen on the map. Clusters have a count and the different types of markers have unique icons, titles and full details on the Google Maps info window.

The back end system was created in CakePHP and was set up to reflect the way the initial information was presented to me. A CSV import was the first step. The structure of this flat file dictated how the SQL database should be created and the structure of the back end system flowed logically from there.

The biggest issue I faced here was one of performance. It was quickly evident that due to the volume of data, preprocessing of the clusters was required. The system goes through all the data, clustering for a given client side zoom level. The zoom level determines how close markers would appear on the web page so the clustering is different for each level. By clustering all the markers on the map and recording the latitude and longitude and zoom level of each cluster, I can then selectively query them from the client side AJAX code. While the encoding process can be very time consuming, the result is a very responsive web site. The clusters only need to be manually regenerated when a new CSV import is done and at run time the client is requesting what is in effect static information from the server cluster cache.

In the end I would have liked the server side clustering to be quicker. It can take hours to cluster all the points for all applicable zoom levels, but this just an administration problem. The client was happy to deal with the time taken for generating clusters in exchange for the responsive user experience for visitors to their site.

