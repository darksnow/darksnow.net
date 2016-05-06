function dsClock(canvas) {
this.c = null;
this.clkSize = 150;
this.clkBezel = 20;
this.clkInner = this.clkSize - (this.clkBezel * 1.3);
this.clkDate = this.clkInner;
this.Frequency = 1; /* Tick frequency in seconds */

this.colGrey  = '#ccc';
this.colBlack = '#000';
this.colWhite = '#fff';
this.colRed   = '#f00';
this.colGreen = '#0f0';
this.colBg = this.colGrey;

this.days = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'];
this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
this.numerals = ['XII','I',  'II',  'III', 'IV', 'V',
	         'VI', 'VII','VIII','IX',  'X',  'XI', 'XII'];
this.numbers = ['zero','one', 'two',   'three', 'four',
                'five','six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve'];
this.fullCircle = Math.PI * 2;

this.DegToRad = function(deg) {
  return (Math.PI / 180.0) * deg;
}

this.GetDigitSuffix = function(digit) {
  switch (digit) {
  case 1: return 'st'; break;
  case 2: return 'nd'; break;
  case 3: return 'rd'; break;
  default: return 'th';break;
  }
}
this.SuffixNumber = function(num) {
  num *= 1; // Convert to number
  if (num < 21) {
    return num + this.GetDigitSuffix(num);
  } else {
    num = ''+num; // Convert to string
    return num + this.GetDigitSuffix(num.charAt(num.length-1)*1);
  }
}

this.DrawBezel = function() {
  this.c.save();
  this.c.beginPath();
  gr = this.c.createRadialGradient(0,0,this.clkInner,0,0,this.clkSize);
  gr.addColorStop(0, this.colBg);
  gr.addColorStop(1, this.colBlack);
  this.c.fillStyle = gr;
  this.c.arc(0, 0, this.clkSize, 0, this.fullCircle, false);
  this.c.fill();
  for (i = 0; i < 60; i++) {
    this.c.beginPath();
    this.c.moveTo(0, this.clkSize);
    if (i % 5 == 0) {
      this.c.lineWidth = 5;
      this.c.lineTo(0, this.clkInner);
      this.c.stroke();
    } else {
      this.c.lineWidth = 1;
      this.c.lineTo(0, this.clkSize - this.clkBezel);
      this.c.stroke();
    }
    this.c.rotate(this.DegToRad(6));
  }
  this.c.restore();
}

this.DrawHours = function() {
  this.c.lineWidth = 12;
  this.c.lineCap = 'round';
  this.c.strokeStyle = this.colBlack;
  this.c.beginPath();
  this.c.moveTo(0, 0);
  this.c.lineTo(0, this.clkInner / 2);
  this.c.stroke();
}  

this.DrawMinutes = function() {
  this.c.lineWidth = 2;
  this.c.lineJoin = 'round';
  this.c.beginPath();
  this.c.moveTo(0, this.clkBezel * -1);
  this.c.lineTo(6, 0);
  this.c.lineTo(0, this.clkInner - (this.clkBezel/2));
  this.c.lineTo(-6,0);
  this.c.closePath();	
  this.c.stroke();
  this.c.lineWidth = 1;
}

this.DrawSeconds = function() {
  this.c.lineWidth = 1;
  this.c.strokeStyle = this.colRed;
  this.c.beginPath();
  this.c.moveTo(0, this.clkBezel * -1);
  this.c.lineTo(0, this.clkInner);
  this.c.stroke();
}

this.DrawDay = function(day) {
  this.c.drawTextCenter(null, 20, 0, this.clkDate + (this.clkInner * 0.4), this.days[day]);
}
this.DrawDate = function(day, month) {
  this.c.drawTextCenter(null, 20, 0, this.clkDate + (this.clkInner * 0.65),
     this.SuffixNumber(day) + ' ' + this.months[month]);
}
this.DrawBackground = function() {
    this.c.beginPath();
    this.c.fillStyle = this.colBg;
    this.c.arc(0, 0, this.clkInner, 0, this.fullCircle, false);
    this.c.fill();
}

this.Tick = function() {
  if (this.c) {
    var dte = new Date();
    var h = dte.getHours() % 12;
    var m = dte.getMinutes();
    var s = dte.getSeconds();
    if (this.DrawBackground) {
      this.c.save();
      this.DrawBackground();
      this.c.restore();
    }
    if (h > 2 && h < 9) this.clkDate = this.clkInner * -1;
    else this.clkDate = 0;
    if (this.DrawHours) {
      this.c.save();
      this.c.rotate(this.DegToRad((30*h) + (m/2) + 180));
      this.DrawHours();
      this.c.restore();
    }
    if (this.DrawDay || this.DrawDate) {
      this.c.save();
      if (this.DrawDay) this.DrawDay(dte.getDay());
      if (this.DrawDate) this.DrawDate(dte.getDate(), dte.getMonth());
      this.c.restore();
    }
    if (this.DrawMinutes) {
      rot = (6*m) + 180;
      if (this.DrawSeconds != null) rot += (s/10);
      this.c.save();
      this.c.rotate(this.DegToRad(rot));
      this.DrawMinutes();
      this.c.restore();
    }
    if (this.DrawSeconds) {
      this.c.save();
      this.c.rotate(this.DegToRad((6*s) + 180));
      this.DrawSeconds();
      this.c.restore();
    }
    window.setTimeout( function() { thisClock.Tick() }, this.Frequency);
  }
}

this.Start = function() {
  this.c.save();
  this.DrawBezel(this.c);
  this.c.restore();
  this.Tick();
}

var thisClock = this;

if (canvas.getContext){
  this.c = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  this.c.scale(canvas.clientWidth / (this.clkSize * 2),
      canvas.clientHeight / (this.clkSize * 2));
  this.c.translate(this.clkSize, this.clkSize);
  CanvasTextFunctions.enable(this.c);
}

}