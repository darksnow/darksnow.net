/**
 * Once page has loaded, find all images and change .svg to .png
 */
$(function() {
  $('img').each(function(i, el) {
    el.src = el.src.replace('.svg', '.png');
  });
});
