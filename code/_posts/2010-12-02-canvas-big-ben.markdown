---
layout: post
title:  "Canvas Big Ben"
date:   2010-02-12 12:09
tags: Canvas JavaScript
image:  ben.png
---
My latest exploration of the canvas tag was a sort of extension of the [canvas clocks](/code/canvas-clocks) I already made but the scope was far greater.

<script type="text/javascript" src="/js/utils.js"></script>
<script type="text/javascript" src="/js/canvastext.js"></script>
<script type="text/javascript" src="/js/dsClock.js"></script>
<script type="text/javascript">
function BigBenBezel() {
  edge = 5;
  smlArc = Math.PI/7.45;
  subR = 20.6; // Circle with the square in
  smlR = 10.2; // Arcs touching circle above
  innR = 10.6; // Smal half circles inside subR
  this.c.strokeStyle = this.c.fillStyle = this.colGold;
  this.c.lineWidth = 3;
  this.c.beginPath();
  this.c.arc(0, 0, this.clkSize, 0, this.fullCircle, false);
  this.c.moveTo(this.clkSize * -1, this.clkSize * -1);
  this.c.lineTo(this.clkSize * -1, this.clkSize);
  this.c.lineTo(this.clkSize, this.clkSize);
  this.c.lineTo(this.clkSize, this.clkSize * -1);
  this.c.closePath();
  this.c.stroke();
  this.c.lineWidth = 1;
  for (i = 0; i < 360; i += 90) {
    this.c.beginPath();
    this.c.moveTo(55, this.clkSize - edge);
    this.c.lineTo(this.clkSize - edge, this.clkSize - edge);
    this.c.lineTo(this.clkSize - edge, 55);
    this.c.stroke();
    this.c.beginPath();
    this.c.arc(0, 0, this.clkSize + edge,
               (Math.PI/4) + smlArc, (Math.PI/4) - smlArc, true);
    this.c.stroke();
    this.c.beginPath();
    this.c.arc(this.clkSize - edge - subR, this.clkSize - subR - edge,
	subR, 0, this.fullCircle, true);
    this.c.stroke();
    this.c.beginPath();
    this.c.arc(this.clkSize - edge - smlR,
	this.clkSize - smlR - edge - (subR * 1.9),
	smlR, Math.PI * 1.2, 0, true);
    this.c.stroke();
    this.c.beginPath();
    this.c.arc(this.clkSize - edge - smlR - (subR * 1.9),
	this.clkSize - smlR - edge,
	smlR, Math.PI * 1.3, Math.PI/2, false);
    this.c.stroke();
    this.c.save();
    this.c.translate(this.clkSize - subR - edge, this.clkSize - subR - edge);
    for (circ = 0; circ < 4; circ++) {
      this.c.beginPath();
      this.c.arc(subR-innR, 0, innR, Math.PI/2, Math.PI * 1.5, true);
      this.c.stroke();
      this.c.beginPath();
      this.c.arc(subR-innR, 0, 2, 0, this.fullCircle, true);
      this.c.fill();
      this.c.rotate(Math.PI/2);
    }
    this.c.restore();
    this.c.beginPath();
    this.c.moveTo(this.clkSize-subR-edge - (subR-innR),
                  this.clkSize-subR-edge - (subR-innR));
    this.c.lineTo(this.clkSize-subR-edge + (subR-innR),
                  this.clkSize-subR-edge - (subR-innR));
    this.c.lineTo(this.clkSize-subR-edge + (subR-innR),
                  this.clkSize-subR-edge + (subR-innR));
    this.c.lineTo(this.clkSize-subR-edge - (subR-innR),
                  this.clkSize-subR-edge + (subR-innR));
    this.c.closePath();
    this.c.fill();
    this.c.rotate(this.DegToRad(90));
  }
}

var numeralWidth = 1;
function DrawNumeralI(x) {
  var i = this.numIn * -1;
  var o = (this.numOut-1)* -1;
  this.c.beginPath();
  this.c.moveTo(x - numeralWidth, o);
  this.c.lineTo(x - (numeralWidth * 2.5), o + (numeralWidth * 2));
  this.c.lineTo(x - (numeralWidth * 1.5), o + (numeralWidth * 3));
  this.c.lineTo(x - (numeralWidth * 1.5), i - (numeralWidth * 3));
  this.c.lineTo(x - (numeralWidth * 2.5), i - (numeralWidth * 2));
  this.c.lineTo(x - (numeralWidth * 0.5), i);
  this.c.lineTo(x + (numeralWidth * 0.5), i);
  this.c.lineTo(x + (numeralWidth * 2.5), i - (numeralWidth * 2));
  this.c.lineTo(x + (numeralWidth * 1.5), i - (numeralWidth * 3));
  this.c.lineTo(x + (numeralWidth * 1.5), o + (numeralWidth * 3));
  this.c.lineTo(x + (numeralWidth * 2.5), o + (numeralWidth * 2));
  this.c.lineTo(x + numeralWidth, o);
  this.c.closePath();
  this.c.fill();
}
function DrawNumeralV(x) {
  var i = this.numIn * -1;
  var o = (this.numOut-1)* -1;
  var n = numeralWidth;
  this.c.beginPath();
  this.c.moveTo(x-(n*2), o);
  this.c.lineTo(x-(n*4), o+(n*2));
  this.c.lineTo(x-(n*3), o+(n*3));
  this.c.lineTo(x-(n*3), i-(n*3));
  this.c.lineTo(x-n, i);
  this.c.lineTo(x+(n*4), i-(n*4));
  this.c.lineTo(x+(n*4), o+(n*2));
  this.c.lineTo(x+(n*2), o);
  this.c.lineTo(x, o+(n*2));
  this.c.lineTo(x+n, o+(n*3));
  this.c.lineTo(x+n, i-(n*3));
  this.c.lineTo(x, i-(n*5));
  this.c.lineTo(x, o+(n*2));
  this.c.lineTo(x-n, o);
  this.c.closePath();
  this.c.fill();
}
function DrawNumeralX(x) {
  var i = this.numIn * -1;
  var o = (this.numOut-1)* -1;
  var n = numeralWidth;
  var m = (((this.numOut + i) /2) + this.numIn) * -1;

  this.c.beginPath();
  this.c.moveTo(x, o);
  this.c.lineTo(x+(n*2), o+(n*2));
  this.c.lineTo(x+(n*4), o);
  this.c.lineTo(x+(n*6), o+(n*2));
  this.c.lineTo(x+(n*4), o+(n*4));
  this.c.lineTo(x+(n*2), o+(n*2));
  this.c.lineTo(x+(n*2), m-(n*2));
  this.c.lineTo(x+(n*6), m-(n*2));
  this.c.lineTo(x+(n*5), m+n);
  this.c.lineTo(x+(n*2), m+n);
  this.c.lineTo(x+(n*2), i-(n*5));
  this.c.lineTo(x+(n*5), i-(n*2));
  this.c.lineTo(x+(n*6), i-(n*2));
  this.c.lineTo(x+(n*3), i);
  this.c.lineTo(x+n, i-(n*2));
  this.c.lineTo(x-(n), i);
  this.c.lineTo(x-(n*5), i-(n*2));
  this.c.lineTo(x-(n*3), i-(n*2));
  this.c.lineTo(x-n, i-(n*4));
  this.c.lineTo(x-n, m+n);
  this.c.lineTo(x-(n*5), m+n);
  this.c.lineTo(x-(n*3), m-(n*3));
  this.c.lineTo(x-n, m-(n*2));
  this.c.lineTo(x-n, o+(n*3));
  this.c.lineTo(x-(n*3),o+(n*3));
  this.c.closePath();
  this.c.fill();
  this.c.save();
  this.c.lineWidth = 0.5;
  this.c.beginPath();
  this.c.moveTo(x+(n*5)-0.5, m+n);
  this.c.lineTo(x+(n*5)-1, m+(n*6));
  this.c.lineTo(x+(n*5)-0.5, m+(n*6));
  this.c.lineTo(x+(n*5)-0.5, m+(n*5));
  this.c.stroke();
  this.c.restore();
}
function DrawNumeral(n) {
  this.c.save();
  this.c.strokeStyle = this.colBlack;
  this.c.fillStyle = this.colBlack;
  this.c.lineWidth = 2;
  switch(n) {
  case '1':
    this.DrawNumeralI(0);
    break;
  case '2':
    this.DrawNumeralI(numeralWidth * -2);
    this.DrawNumeralI(numeralWidth * 2);
    break;
  case '3':
    this.DrawNumeralI(numeralWidth * -4);
    this.DrawNumeralI(0);
    this.DrawNumeralI(numeralWidth * 4);
    break;
  case '4':
    this.DrawNumeralI(numeralWidth * -4);
    this.DrawNumeralV(numeralWidth * 2);
    break;
  case '5':
    this.DrawNumeralV(0);
    break;
  case '6':
    this.DrawNumeralV(numeralWidth * -2.5);
    this.DrawNumeralI(numeralWidth * 4);
    break;
  case '7':
    this.DrawNumeralV(numeralWidth * -4.5);
    this.DrawNumeralI(numeralWidth * 2);
    this.DrawNumeralI(numeralWidth * 6);
    break;
  case '8':
    this.DrawNumeralV(numeralWidth * -7);
    this.DrawNumeralI(numeralWidth * -0.5);
    this.DrawNumeralI(numeralWidth * 3.5);
    this.DrawNumeralI(numeralWidth * 7.5);
    break;
  case '9':
    this.DrawNumeralI(numeralWidth * -5);
    this.DrawNumeralX(numeralWidth * 2);
    break;    
  case '10':
    this.DrawNumeralX(0);
    break;
  case '11':
    this.DrawNumeralX(numeralWidth * -3);
    this.DrawNumeralI(numeralWidth * 5);
    break;
  case '12':
    this.DrawNumeralX(numeralWidth * -5);
    this.DrawNumeralI(numeralWidth * 3);
    this.DrawNumeralI(numeralWidth * 7);
    break;
  }
  this.c.restore();
}

function DrawGoldLeaf() {
  /* Gold leaf in middle of dial */
  gInnRad = 3.5;
  gMidLine = this.clkMid-40;
  this.c.lineWidth = 1;
  this.c.strokeStyle = this.colGold;
  for (i = 0; i < 24; i++) {
    this.c.beginPath();
    this.c.moveTo(-12, this.clkMid-25);
    this.c.lineTo(0, this.clkMid-2);
    this.c.lineTo( 12, this.clkMid-25);
    this.c.stroke();
    if (i % 2 == 0) {
      this.c.beginPath();
      this.c.moveTo(0, gMidLine);
      this.c.lineTo(0, this.clkMid-23);
      this.c.moveTo(0, gMidLine);
      this.c.bezierCurveTo(0, gMidLine+8,-12, this.clkMid-32,
             -12, this.clkMid-25);
      this.c.moveTo(0, gMidLine);
      this.c.bezierCurveTo(0, gMidLine+8, 12, this.clkMid-32,
              12, this.clkMid-25);
      this.c.stroke();
    } else {
      this.c.beginPath();
      this.c.arc(0, gInnRad * 3.8, gInnRad, 0, this.fullCircle, true);
      this.c.stroke();
      this.c.beginPath();
      this.c.moveTo(gInnRad * 2.3, gMidLine-1);
      this.c.bezierCurveTo(gInnRad * 1.1, gMidLine,
             0, gInnRad * 6, 0, gInnRad * 4.8);
      this.c.moveTo(gInnRad *-2.3, gMidLine-1);
      this.c.bezierCurveTo(gInnRad *-1.1, gMidLine,
             0, gInnRad * 6, 0, gInnRad * 4.8);
      this.c.stroke();
    }
    this.c.rotate(this.DegToRad(15));
  }
}

function DrawGreyBars() {
  /* Outer Grey bars */
  this.c.save();
  this.c.strokeStyle = this.colGrey;
  this.c.lineWidth = 1;
  for (i = 0; i < 36; i++) {
    if (i % 3 != 0) {
      this.c.beginPath();
      this.c.moveTo(0, this.clkInner);
      this.c.lineTo(0, this.clkInner-this.railSpace);
      this.c.moveTo(0, this.numOut + this.railSpace);
      this.c.lineTo(0, this.numOut);
      this.c.stroke();
    }
    this.c.rotate(this.DegToRad(10));
  }
  /* Inner grey bars under numerals */
  for (iNum = 0; iNum < 48; iNum++) {
    if (iNum % 4 == 0) {
      number = iNum/4;
      if (number == 0) number = 12;
      this.DrawNumeral(number + '');
    } else {
      this.c.beginPath();
      this.c.moveTo(0, this.numOut);
      this.c.lineTo(0, this.numIn);
      this.c.stroke();
    }
    if (iNum % 4 == 2) {
      this.c.save();
      this.c.beginPath();
      this.c.strokeStyle = this.colBlack;
      this.c.moveTo(0, this.clkMid);
      this.c.lineTo(0, this.numIn);
      this.c.stroke();
      this.c.restore();
    }
    this.c.rotate(this.DegToRad(7.5));
  }
  this.c.restore();
}
function BigBenBackground() {
  this.c.fillStyle = this.colWhite;
  this.c.beginPath();// Clear background to white
  this.c.arc(0, 0, this.clkInner, 0, this.fullCircle, false);
  this.c.fill();

  this.DrawGreyBars();
  this.DrawGoldLeaf();

  this.c.lineWidth = 1;
  this.c.strokeStyle = this.colBlack;
  this.c.fillStyle = this.colBlack;

  this.c.beginPath();// inner circle around numerals
  this.c.arc(0, 0, this.numIn, 0, this.fullCircle, false);
  this.c.stroke();

  this.c.lineWidth = 3;
  this.c.beginPath();// Outer circle around numerals
  this.c.arc(0, 0, this.numOut, 0, this.fullCircle, false);
  this.c.stroke();

  this.c.beginPath();// Circle around gold leaf
  this.c.arc(0, 0, this.clkMid, 0, this.fullCircle, false);
  this.c.stroke();

  this.DrawRailDetails();

  this.c.beginPath();// Central circle over hands
  this.c.arc(0, 0, 10, 0, this.fullCircle, true);
  this.c.fill();
}
function DrawRailDetails() {
  this.c.save();
  this.c.lineWidth = 2;
  this.c.beginPath();  // Both Rails
  this.c.arc(0, 0, this.clkInner-this.railSpace, 0, this.fullCircle, false);
  this.c.arc(0, 0, this.numOut + this.railSpace, 0, this.fullCircle, false);
  this.c.stroke();
  midRail = this.clkInner - ((this.clkInner-this.numOut)/2);
  for (i = 0; i < 60; i++) {
    this.c.beginPath();
    this.c.moveTo(0, this.clkInner - this.railSpace);
    if (i % 5 == 0) { // Big lines at number positions over rails
      this.c.beginPath();
      this.c.lineWidth = 4;
      this.c.moveTo(0, this.clkInner);
      this.c.lineTo(0, this.numOut);
      this.c.moveTo(0, this.numIn);
      this.c.lineTo(0, this.clkMid);
      this.c.stroke();
      this.c.beginPath();
      this.c.arc(0, this.clkInner - (this.railSpace/2),
                 this.railSpace/2, 0, this.fullCircle, true);
      this.c.fill();
      this.c.beginPath();
      this.c.arc(0, this.numOut + (this.railSpace/2),
                 this.railSpace/2, 0, this.fullCircle, true);
      this.c.fill();
      this.c.beginPath();
      this.c.lineWidth = 2;
      this.c.arc(0, 0, midRail, 0-(Math.PI/45), Math.PI/45, false);
      this.c.stroke();
      this.c.save();
      this.c.rotate(0-(Math.PI/45));
      this.c.beginPath();
      this.c.arc(0, midRail, 2, 0, this.fullCircle, true);
      this.c.fill();
      this.c.restore();
      this.c.save();
      this.c.rotate(Math.PI/45);
      this.c.beginPath();
      this.c.arc(0, midRail, 2, 0, this.fullCircle, true);
      this.c.fill();
      this.c.restore();
    } else { // Little lines joining rails
      this.c.arc(0, this.clkInner - this.railSpace,
                 2, Math.PI/2, Math.PI*2.5, false);
      this.c.arc(0, this.numOut + this.railSpace,
	         2, Math.PI/2, Math.PI*2.5, false);
      this.c.fill();
      this.c.beginPath();
      this.c.lineWidth = 2;
      this.c.moveTo(0, this.clkInner-this.railSpace);
      this.c.lineTo(0, this.numOut + this.railSpace);
      this.c.stroke();
    }
    this.c.rotate(this.DegToRad(6));
  }
  this.c.restore();
}

function BigBenMinutes() {
  end = (this.clkMid/2) * -1;
  this.c.strokeStyle = this.colBlack;
  this.c.beginPath();
  this.c.moveTo(2, this.clkInner);
  this.c.lineTo(4, -5);
  this.c.bezierCurveTo(7, end+25, 2, end+12, 9.5, end+7);
  this.c.lineTo(10, end+5);
  this.c.bezierCurveTo(0, end+2, 0, end, 0, end);
  this.c.bezierCurveTo(0, end, 0, end+2, -10, end+5);
  this.c.lineTo(-9.5, end+7);
  this.c.bezierCurveTo(-2, end+12, -7, end+25, -4,-5);
  this.c.lineTo(-2, this.clkInner);
  this.c.closePath();
  this.c.fill();
  this.c.beginPath();
  this.c.fillStyle = '#333';
  this.c.arc(0, 0, 2, 0, this.fullCircle, true);
  this.c.fill();
}
function BigBenHours() {
  this.c.save();
  var m = this.clkMid
  var srtX = 0;
  var srtY = m-2;
  var arCurves = [
  [ 2.5,  m-4.5,srtX,srtY,2.5,  m-4.5],
  [-2,  m-9, 12, m-17, 12, m-22],
  [  12, m-28,  8, m-28,  4, m-28],
  [   4,   17,  4,   20,  9,   17],// Big bump
  [   4,   14,  4,   10,  4,   -5],// Tail
  [   4,  -17,  7,  -16,  7,  -21],
  [   7,  -26,  3,  -26,  0,  -28],
  ];
  this.c.fillStyle = this.colBlack;
  this.c.beginPath();
  this.c.moveTo(srtX, srtY);
  cnt = 0;
  for (b in arCurves) {
    c = arCurves[b];
    this.c.bezierCurveTo(c[0], c[1], c[2], c[3], c[4], c[5]);
    cnt++;
  }
  while (cnt > 0) {
    var x, y;
    cnt--;
    c = arCurves[cnt];
    d = arCurves[cnt-1];
    if (cnt == 0) {
      x = srtX;
      y = srtY;
    } else {
      x = d[4];
      y = d[5];
    }
    this.c.bezierCurveTo(c[2] * -1, c[3],
                         c[0] * -1, c[1],
                            x * -1, y  );
  }
  this.c.closePath();
  this.c.fill();
  this.c.restore();

  this.c.beginPath(); // Little bump on hour hand
  this.c.moveTo(4,27);
  this.c.arc( 3.5, 27, 1.5, 0, this.fullCircle, true);
  this.c.moveTo(-4, 27);
  this.c.arc(-3.5, 27, 1.5, 0, this.fullCircle, true);
  this.c.fill();

  var arLines = [ [10.2,51],  [6.5,55],  [3,59] ];
  var yLen = 2;
  this.c.lineWidth = 1.5;
  for (s in arLines) {
    p = arLines[s];
    this.c.beginPath()
    this.c.moveTo(p[0], p[1]);
    this.c.lineTo(p[0], p[1] + yLen);
    this.c.moveTo(p[0] * -1, p[1]);
    this.c.lineTo(p[0] * -1, p[1] + yLen);
    this.c.stroke();
  }
}
function BigBenInit(clk) {
  clk.colGold = '#C90';
  clk.colGrey = '#aaa';
  clk.colBg = clk.colWhite
  clk.clkBezel = 10;
  clk.clkInner = clk.clkSize - clk.clkBezel;
  clk.clkMid = clk.clkInner / 2;
  clk.numIn  = clk.clkMid + 5;
  clk.numOut = clk.clkInner * 0.8;
  clk.railSpace = 7;
  clk.DrawBezel = BigBenBezel;
  clk.DrawBackground = BigBenBackground;
  clk.DrawMinutes = BigBenMinutes;
  clk.DrawHours = BigBenHours;
  clk.DrawSeconds = clk.DrawDay = clk.DrawDate = null;
  clk.DrawGoldLeaf = DrawGoldLeaf;
  clk.DrawRailDetails = DrawRailDetails;
  clk.DrawGreyBars = DrawGreyBars;
  clk.DrawNumeral = DrawNumeral;
  clk.DrawNumeralI = DrawNumeralI;
  clk.DrawNumeralV = DrawNumeralV;
  clk.DrawNumeralX = DrawNumeralX;
  clk.Frequency = 60;
  clk.DrawBackground();
  clk.Start();
}

function init() {
  BigBenInit(new dsClock(getObj('clock')));
}

function doResize() {
  var ns = getObj('txtSize').value + "px";
  var s = getObj('clock').style;
  s.width = ns;
  s.height = ns;
  BigBenInit(new dsClock(getObj('clock')));
  return false;
}

</script>

<canvas id="clock" height="300" style="margin: 0px 1em; float: right; width: 400px; height: 400px;">Canvas Not Supported</canvas>

An approximation of Big Ben drawn using JavaScript on a canvas tag.

This will not work with Internet Explorer due to lack of Canvas support. If you are in the unfortunate position of using IE rather than a more modern browser I would suggest you upgrade to something better. [Opera](http://www.opera.com) or [Firefox](http://www.getfirefox.com) will do the job nicely.

Since this version of the clock is written using vectors in JavaScript it is scalable and resolution independent so can be used at any size.

The images included in the page are for comparison with pictures of the real thing. You will notice that my version is very much an approximation, especially in the surround, but while I may make tweeks to it from time to time, I'm pretty pleased with the result.

<form target="./" onsubmit="return doResize();" style="width: 300px; max-width: 100%">
<input type="text" id="txtSize" value="500" />&nbsp;
<input type="submit" value="Resize" />
</form>

<script type="text/javascript">init();</script>

<img src="http://farm1.static.flickr.com/6/7409602_810da3ef24.jpg" alt="Big Ben" />
<img src="http://upload.wikimedia.org/wikipedia/commons/a/aa/Big.ben.scaled.arp.750pix.jpg" />

