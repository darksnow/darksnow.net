---
layout: post
title:  Canvas Clocks
date:   2010-02-12 12:04
tags: Canvas JavaScript
image:  clock.png
---
Following on from my initial work with the canvas tag to create the [canvas site logo generator](canvas-logo-generator), I worked on the dynamic aspects of the canvas tag, to prove to myself it could be used to create the sort of animations Flash and Silverlight are designed for.

This example is obviously relatively trivial but does go to show what can be achieved.

<script type="text/javascript" src="/js/utils.js"></script>
<script type="text/javascript" src="/js/canvastext.js"></script>
<script type="text/javascript" src="/js/dsClock.js"></script>

<script type="text/javascript">
function ClockContBezel() {
  this.c.beginPath();
  this.c.fillStyle = this.colWhite;
  this.c.arc(0, 0, this.clkSize, 0, this.fullCircle, false);
  this.c.fill();
  this.c.beginPath();
  this.c.fillStyle = this.colBlack;
  this.c.arc(0, 0, this.clkSize - 2, 0, this.fullCircle, false);
  this.c.fill();
}
function ClockContBackground() {
  this.OldDrawBackground();
  this.c.strokeStyle = this.colBlack;
  this.c.fillStyle = this.colBlack;
      this.c.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    this.c.beginPath();
    this.c.moveTo(0, this.clkInner - 5);
    if (i == 30) {
      this.c.moveTo(-4, this.clkInner - 5);
      this.c.lineTo(-4, this.clkInner - this.clkBezel + 5);
      this.c.moveTo( 4, this.clkInner - 5);
      this.c.lineTo( 4, this.clkInner - this.clkBezel + 5);
      this.c.stroke();
    } else if (i % 5 == 0) {
      this.c.lineTo(0, this.clkInner - this.clkBezel + 5);
      this.c.stroke();
    } else {
      this.c.arc(0, this.clkInner - 10, 2, 0, this.fullCircle, false);
      this.c.fill();
    }
    this.c.rotate(this.DegToRad(6));
  }
}

function ClockContSeconds() {
  this.c.lineWidth = 1;
  this.c.strokeStyle = this.colRed;
  this.c.beginPath();
  this.c.moveTo(0, this.clkBezel * -1);
  this.c.arc(0, this.clkInner - 20, 5, Math.PI*1.5, Math.PI*3.5, false);
  this.c.moveTo(0, this.clkInner - 15);
  this.c.lineTo(0, this.clkInner - 5 );
  this.c.stroke();
}
function ClockContMinutes() {
  this.c.lineWidth = 3;
  this.c.strokeStyle = this.colBlack;
  this.c.beginPath();
  this.c.moveTo(0, this.clkBezel * -0.5);
  this.c.lineTo(0, this.clkInner - (this.clkBezel/2) );
  this.c.stroke();
}
function ClockContInit(clk) {
  clk.colBg = clk.colWhite
  clk.DrawBezel = ClockContBezel;
  clk.OldDrawBackground = clk.DrawBackground;
  clk.DrawBackground = ClockContBackground;
  clk.DrawMinutes = ClockContMinutes;
  clk.DrawSeconds = ClockContSeconds;
  clk.Start();
}

var myClock;

function init() {
  myClock = new dsClock(getObj('clock'));
  ClockContInit(myClock);
  new dsClock(getObj('old')).Start();
}
function doResize() {
  var ns = getObj('txtSize').value + "px";
  var s = getObj('clock').style;
  s.width = ns;
  s.height = ns;
  myClock = new dsClock(getObj('clock'));
  ClockContInit(myClock);
  return false;
}
</script>

<canvas id="clock" height="300" style="margin: 0px 1em; float: left; width: 300px; height: 300px;">Canvas Not Supported</canvas>
<canvas id="old" width="150"></canvas>

This will not work with Internet Explorer due to lack of Canvas support. If you are in the unfortunate position of using IE rather than a more modern browser I would suggest you upgrade to something better. [Opera](http://www.opera.com) or [Firefox](http://www.getfirefox.com/) will do the job nicely.

Since this version of the clock is written using vectors in JavaScript it is scalable and resolution independent so can be used at any size.

<form target="./" onsubmit="return doResize();">
<input type="text" id="txtSize" value="500" />&nbsp;
<input type="submit" value="Resize" />
</form>

<script type="text/javascript">init();</script>
