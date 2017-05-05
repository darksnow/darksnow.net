---
layout: post
title:  Canvas Logo Generator
date:   2010-02-12 11:54
tags: Canvas JavaScript
image:  code.png
---
A while ago I discovered the canvas tag and thought I would have a play around with it. This page is the first result of that exploration and has been used to quickly create bitmaps of the site logo.

The canvas tag, and libraries built on it, could become a real contender on the web. The ability to script and dynamically manipulate resolution independent vector graphics on a web page makes this potentially a viable alternative to Flash, even if the tools are not yet there.

But, as usual, a certain popular browser have done their own thing and don't support it. Maybe some day, when this is more widely supported, we'll see it everywhere as a light weight replacement for anything requiring a browser plugin.

<script type="text/javascript">

function DegToRad(deg) {
  return (Math.PI / 180.0) * deg;
}

function PaintLogo(d, lX, lY, lSize) {
  d.save();
  var lBezel = lSize / 6;
  var lInner = lSize - (lBezel * 1.3);
  d.lineWidth = lBezel * 0.6;
  var lLength = lInner - (d.lineWidth * 0.2);
  var lShortLen = lLength / 3;

  var colGrey  = '#aaa';
  var colBlack = '#000';

  d.translate(lX, lY);
  gr = d.createRadialGradient(0,0,lInner,0,0,lSize);
  gr.addColorStop(0, colGrey);
  gr.addColorStop(1, colBlack);
  d.fillStyle = gr;
  d.beginPath();
  d.arc(0, 0, lSize, 0, Math.PI*2, false);
  d.fill();
  d.beginPath();
  d.fillStyle = colBlack;
  d.arc(0, 0, lInner, 0, Math.PI*2, false);
  d.fill();
  d.strokeStyle = colGrey;
  for (i = 0; i < 6; i++) {
    d.beginPath();
    d.moveTo(0, 0);
    d.lineTo(0, lLength);
    d.stroke();
    d.save();
    d.translate(0, lLength - lShortLen);
    d.beginPath();
    d.moveTo(0,0);
    d.rotate(DegToRad(30));
    d.lineTo(lShortLen, 0);
    d.moveTo(0,0);
    d.rotate(DegToRad(120));
    d.lineTo(lShortLen, 0);
    d.stroke();
    d.restore();
    d.rotate(DegToRad(60));
  }
  d.restore();
}

function MakeLogo(where) {
  var LogoSize = 300;
  var canvas = document.getElementById(where);
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.scale(canvas.clientWidth / (LogoSize * 2),
	canvas.clientHeight / (LogoSize * 2));
    PaintLogo(ctx, LogoSize, LogoSize, LogoSize);
  }
}

function doResize() {
  c = document.getElementById('pLogo');
  c.style.height = document.getElementById('tSize').value;
  c.style.width = c.style.height;
  MakeLogo('pLogo');
  return false;
}
</script>
<canvas id="pLogo" height="300" style="margin: 0px 1em; float: left; width: 300px; height: 300px;">Canvas Not Supported</canvas>

The canvas tag should be a square at this point, otherwise the circle will be distorted. It can be sized using css though, as long as the actual height and width are set to the the same value as each other in the tag itself (defaults to 150 x 300) then css can be used to give it any other square size.

Since this is drawn by JavaScript it is resolution independent and screen grabs can be used to create images of this logo in any size required.

<form action="#" onsubmit="return doResize()"><fieldset>

<input type="text" id="tSize" value="300px" />&nbsp;
<input type="submit" value="Resize" /></fieldset></form>

Use the form above to dynamically resize the logo. The text box must contain a valid css size string, including the units (px or em)

This will not work with Internet Explorer due to lack of Canvas support. If you are in the unfortunate position of using IE rather than a more modern browser I would suggest you upgrade to something better. [Opera](http://www.opera.com) or [Firefox](http://www.getfirefox.com) will do the job nicely.

<script type="text/javascript">MakeLogo('pLogo');</script>

