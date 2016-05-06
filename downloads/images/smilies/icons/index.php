<?
$headTitle = 'Smilies';
include('../../../src/header.php');
addHeadScript('utils.js');
?>
<script type="text/javascript">
function doColChange() {
  getObj('smile').style.backgroundColor = getObj('colVal').value;
  return false;
}
function doSetCol(col) {
  getObj('colVal').value = col;
  doColChange();
}
</script>
<style type="text/css">
#colForm { background: #000; border: 1px solid #ccc; padding: 0px;
	position: fixed; top: 2px; right: 90px; }
#colForm fieldset { padding: 0px; }
#colForm span { padding: 0px 5px; font-size: 0.8em; }
#smile { padding: 10px; }
</style>
<? closeHead(); ?>
<body>
<? addPageHeader('<a href="../">Toys</a> :: '.$headTitle); ?>
<form id="colForm" onsubmit="return doColChange()">
<fieldset>
<caption>Colour</caption>
<input id="colVal" value="#000000" />
<input type="submit" value="Change" />
</fieldset>
<span onclick="doSetCol('#ffffff');">white</span>
<span onclick="doSetCol('#000000');">black</span>
<span onclick="doSetCol('#ff0000');">red</span>
<span onclick="doSetCol('#00ff00');">green</span>
<span onclick="doSetCol('#0000ff');">blue</span>
<span onclick="doSetCol('#FFA500');">orange</span>
</form>
<div id="smile">
<p>icon</p>
<img src="alert.gif" />
<img src="fire.gif" />
<img src="heart.gif" />
<img src="info.gif" />
<img src="mrgreen.gif" />
<img src="question.gif" />
<img src="radioactive.gif" />
<img src="redface.gif" />
<img src="star.gif" />
<img src="thinking.gif" />
</div>
<? addPageFooter(); ?>
