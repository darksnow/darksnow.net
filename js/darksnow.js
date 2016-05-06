/**
 * Parallax background handling.
 */
(function($) {

  var offset = 150;
  var imageHeight = 702;

  window.ds = window.ds || {};
  window.ds.parallax = {
    offset: offset,
    imageHeight: imageHeight,
  
    sizes: {
      window: $(window).height(),
      offsetRange: offset * 2,
      maxY: $(window).height() - imageHeight,
    },

    scrollPos: 0,

    resize: function() {
      ds.parallax.sizes.window = $(window).height();
      ds.parallax.sizes.maxY = ds.parallax.sizes.window - ds.parallax.imageHeight;
      ds.parallax.setBackground();
    },
    scroll: function() {
      if (ds && ds.parallax) {
        ds.parallax.scrollPos = $(this).scrollTop();
        ds.parallax.setBackground();
      }
    },
    getTop: function(top) {
      var p = top / ($(document).height() - this.sizes.window);
      var offset = this.offset - (this.sizes.offsetRange * p);
      return (this.sizes.maxY - (this.sizes.maxY * p)) + offset;
    },
    setBackground: function() {
      var newVal = '-' + this.offset + 'px ' + this.getTop(ds.parallax.scrollPos) + 'px';
      $(document.body).css('background-position', newVal);
    }
  };
  
  /** Ugly work around for webkit SVG but in older browsers */
  window.ds.svg = {
    fixWebkitHeightBug: function() {
      var svgW = 622;
      var svgH = 883;
      var curSVGW = $('#heed > div').width();
      var newSVGH = heightInRatio(svgH,svgW,curSVGW);
      $('#heedicons').height(newSVGH);
      function heightInRatio(oH,oW,nW) {
        return (oH / oW * nW);
      }
    }
  };

  $(function() {
    ds.svg.fixWebkitHeightBug();
    $(window).resize(ds.svg.fixWebkitHeightBug);
    $(window).resize(ds.parallax.resize);
    $(document).scroll(ds.parallax.scroll);
  });

}(jQuery));


/**
 * Floating menu plugin.
 *
 * Simply allows the specified element to follow the scroll top
 * of the screen, leaving animation to CSS3 transitions.
 */
(function($) {
  $.fn.floatMenu = function(options) {
    $.extend($.fn.floatMenu.settings, options);
    this.each(function() {
      $(this).data('top', $(this).position().top);
    });
    
    return $.fn.floatMenu.elements = this;
  };

  $.fn.floatMenu.elements;
  $.fn.floatMenu.settings = {
    margin: 10,
    scrollSpeed: 800
  };
 
  $.fn.floatMenu.handleScroll = function(ev) {
    var newTop = $(document).scrollTop() + $.fn.floatMenu.settings.margin;
    $.fn.floatMenu.elements.each(function() {
      if ($(this).data('top') >= newTop) {
        $(this).css({'top': ''});
      } else {
        $(this).css({'top': newTop + 'px'});
      }
    });
  };

  /**
   * Smoothly scroll to the named element
   */
  $.fn.floatMenu.scrollTo = function(hash) {
    var name = hash.substr(1);
    var target = jQuery('a[name*=' + name + ']').offset();
    if (target) {
      $('html, body').animate({
        scrollTop: target.top
      }, $.fn.floatMenu.settings.scrollSpeed);
      location.hash = name;
    }
  };

  $(function() {
    $(document).scroll($.fn.floatMenu.handleScroll);

    // If the main menu points to an internal link, rename it
    $('nav a').each(function(i, el) {
      var ref = $(el).attr('href');
      try {
        if($('[name=' + ref + ']').length) {
          $(el).attr('href', '#' + ref);
        }
      } catch(er) {}
    });

    // Hook up smooth scrolling for all internal links
    $('[href^=#]').click(function(ev) {
      ev.stopPropagation();
      $.fn.floatMenu.scrollTo($(this).attr('href'));
      return false;
    });
  });
})(jQuery);


/**
 * Handle height adjustment for absolute overlapping children
 */
$(function($) {
  $.fn.equalheight = function() {
    $.fn.equalheight.elements = this;
  };
  $.fn.equalheight.elements = null;
  $.fn.equalheight.resize = function() {
    if ($.fn.equalheight.elements) {
      $.fn.equalheight.elements.each(function(i, el) {
        var maxHeight = 0;
        $(el).children().each(function(i, el) {
          var h = $(el).height();
          if (h > maxHeight) maxHeight = h;
        });
        $(el).height(maxHeight);
      });
    }
  };
  $(window).resize($.fn.equalheight.resize);
}(jQuery));

/**
 * Kick things off here, saves cluttering the main file
 */
$(function() {
  // Set up the float Menu using plugin above
  $('nav').floatMenu({margin: 2});
  
  // Set up slide handling
  $('.slides').equalheight();
  
  // Allow the mobile three bar menu button to toggle nav class
  $('header nav a.toggle').click(function(ev) {
    ev.stopPropagation();
    $('header nav').toggleClass('show');
    return false;
  });

  // Kick off window resize to initialise plugins that need it
  $(window).resize();
});
$(window).load(function() {
  // Window load fires after all images are in place, resize again.
  $(window).resize();
});

