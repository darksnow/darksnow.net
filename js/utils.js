
dsDebug = false;

function getObj(name) {
  if (document.getElementById) {
  	return document.getElementById(name);
  } else if (document.all) {
	return document.all[name];
  } else if (document.layers) {
   	return document.layers[name];
  }
}

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

/* Write string to #debugout */
function debugOut(str) {
  if (dsDebug && (d = getObj('debugout'))) {
    d.textContent += "\n" + str;
  } else {
    console.debug(str);
  }
}
/* Clear #debugout */
function debugClear() {
  if (d = getObj('debugout')) {
    d.textContent = null;
  }
}

function resetCaptcha(id) {
  if (typeof id == "undefined") id = 'captcha';
  d = new Date();
  getObj(id).src = '/src/captcha.php?' + d.getTime();
}

function showMessage(mess) {
  if (typeof(mess) == "undefined") mess = true;
  else getObj('message').innerHTML = mess;
  if (mess) mess = '';
  else mess = 'none';
  getObj('messbox').style.display = mess;
}

function removeMe(me) {
  if (me.parentNode) me.parentNode.removeChild(me);
}

function sizeWindow(winName, img) {
  window.open('about:blank', winName, 'width=100, height=200');
}