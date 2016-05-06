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
<img src="../icon/arrow.gif" alt="Arrow" title="Arrow" />
<img src="../icon/biggrin.gif" alt="Very Happy" title="Very Happy" />
<img src="../icon/confused.gif" alt="Confused" title="Confused" />
<img src="../icon/cool.gif" alt="Cool" title="Cool" />
<img src="../icon/cry.gif" alt="Crying or Very Sad" title="Crying or Very Sad" />
<img src="../icon/eek.gif" alt="Shocked" title="Shocked" />
<img src="../icon/evil.gif" alt="Evil or Very Mad" title="Evil or Very Mad" />
<img src="../icon/exclaim.gif" alt="Exclamation" title="Exclamation" />
<img src="../icon/geek.gif" alt="Geek" title="Geek" />
<img src="../icon/idea.gif" alt="Idea" title="Idea" />
<img src="../icon/lol.gif" alt="Laughing" title="Laughing" />
<img src="../icon/mad.gif" alt="Mad" title="Mad" />
<img src="../icon/mrgreen.gif" alt="Mr. Green" title="Mr. Green" />
<img src="../icon/neutral.gif" alt="Neutral" title="Neutral" />
<img src="../icon/question.gif" alt="Question" title="Question" />
<img src="../icon/razz.gif" alt="Razz" title="Razz" />
<img src="../icon/redface.gif" alt="Embarrassed" title="Embarrassed" />
<img src="../icon/rolleyes.gif" alt="Rolling Eyes" title="Rolling Eyes" />
<img src="../icon/sad.gif" alt="Sad" title="Sad" />
<img src="../icon/smile.gif" alt="Smile" title="Smile" />
<img src="../icon/surprised.gif" alt="Surprised" title="Surprised" />
<img src="../icon/twisted.gif" alt="Twisted Evil" title="Twisted Evil" />
<img src="../icon/ugeek.gif" alt="Uber Geek" title="Uber Geek" />
<img src="../icon/wink.gif" alt="Wink" title="Wink" />
<p>system</p>
<img src="http://www.darksnow.co.uk/images/smilies/icon_arrow.gif" alt="Arrow" title="Arrow" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_biggrin.gif" alt="Very Happy" title="Very Happy" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_confused.gif" alt="Confused" title="Confused" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_cool.gif" alt="Cool" title="Cool" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_cry.gif" alt="Crying or Very Sad" title="Crying or Very Sad" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_eek.gif" alt="Shocked" title="Shocked" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_evil.gif" alt="Evil or Very Mad" title="Evil or Very Mad" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_exclaim.gif" alt="Exclamation" title="Exclamation" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_geek.gif" alt="Geek" title="Geek" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_idea.gif" alt="Idea" title="Idea" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_lol.gif" alt="Laughing" title="Laughing" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_mad.gif" alt="Mad" title="Mad" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_mrgreen.gif" alt="Mr. Green" title="Mr. Green" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_neutral.gif" alt="Neutral" title="Neutral" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_question.gif" alt="Question" title="Question" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_razz.gif" alt="Razz" title="Razz" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_redface.gif" alt="Embarrassed" title="Embarrassed" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_rolleyes.gif" alt="Rolling Eyes" title="Rolling Eyes" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_sad.gif" alt="Sad" title="Sad" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_smile.gif" alt="Smile" title="Smile" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_surprised.gif" alt="Surprised" title="Surprised" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_twisted.gif" alt="Twisted Evil" title="Twisted Evil" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_ugeek.gif" alt="Uber Geek" title="Uber Geek" />
<img src="http://www.darksnow.co.uk/images/smilies/icon_e_wink.gif" alt="Wink" title="Wink" />
<p>fixed</p>
<img src="./arrow.gif" alt="Arrow" title="Arrow" />
<img src="./biggrin.gif" alt="Very Happy" title="Very Happy" />
<img src="./confused.gif" alt="Confused" title="Confused" />
<img src="./cool.gif" alt="Cool" title="Cool" />
<img src="./cry.gif" alt="Crying or Very Sad" title="Crying or Very Sad" />
<img src="./eek.gif" alt="Shocked" title="Shocked" />
<img src="./evil.gif" alt="Evil or Very Mad" title="Evil or Very Mad" />
<img src="./exclaim.gif" alt="Exclamation" title="Exclamation" />
<img src="./geek.gif" alt="Geek" title="Geek" />
<img src="./idea.gif" alt="Idea" title="Idea" />
<img src="./lol.gif" alt="Laughing" title="Laughing" />
<img src="./mad.gif" alt="Mad" title="Mad" />
<img src="./mrgreen.gif" alt="Mr. Green" title="Mr. Green" />
<img src="./neutral.gif" alt="Neutral" title="Neutral" />
<img src="./question.gif" alt="Question" title="Question" />
<img src="./razz.gif" alt="Razz" title="Razz" />
<img src="./redface.gif" alt="Embarrassed" title="Embarrassed" />
<img src="./rolleyes.gif" alt="Rolling Eyes" title="Rolling Eyes" />
<img src="./sad.gif" alt="Sad" title="Sad" />
<img src="./smile.gif" alt="Smile" title="Smile" />
<img src="./surprised.gif" alt="Surprised" title="Surprised" />
<img src="./twisted.gif" alt="Twisted Evil" title="Twisted Evil" />
<img src="./ugeek.gif" alt="Uber Geek" title="Uber Geek" />
<img src="./wink.gif" alt="Wink" title="Wink" />
</div>
<? addPageFooter(); ?>
