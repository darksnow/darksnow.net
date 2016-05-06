<?
$headTitle = 'Darksnow :: Downloads';
include('../../src/header.php');
addHeadScript('cycle.js');

/**
 * Present a size (in bytes) as a human-readable value
 *
 * @param int    $size        size (in bytes)
 * @param int    $precision    number of digits after the decimal point
 * @return string
 */
function bytestostring($size, $precision = 0) {
    $sizes = array('YB', 'ZB', 'EB', 'PB', 'TB', 'GB', 'MB', 'kB', 'B');
    $total = count($sizes);

    while($total-- && $size > 1024) $size /= 1024;
    return round($size, $precision).$sizes[$total];
}

?>
<style type="text/css">
table.list { margin: auto; width: 95%; }
</style>
<? closeHead(); ?>
<body onload="CycleInit()">
<? addPageHeader($headTitle, true); ?>
<table class="list">
<tr><th>File Name - Click on the file name to open the file</th>
<th>Modified</th><th class="r">Size</th><th class="r">Source</th></tr>
<?php
$odd = ' class="odd"';
$even= $odd;
$d = opendir('.');
while ($f = readdir($d)) {
  // if $file isn't this directory or its parent, 
  if ($f != '.' && $f != '..' && $f != 'index.php'
	&& substr($f, strlen($f)-1, 1) != '~') {
    $files[] = $f;
  }
}
sort($files);
foreach ($files as $f) {
    echo "<tr$even><td><a href=\"$f\">$f</a></td><td>";
    echo date('r', filemtime($f));
    echo '</td><td class="r">';
    echo bytestostring(filesize($f),2);
    echo "</td><td class=\"r\"><a href=\"showcode.php?f=$f\">Source</a></td></tr>\n";
    $even = ($even == '') ? $odd : '';
} //foreach
closedir($d);
?>
</table>
<? addPageFooter(true); ?>