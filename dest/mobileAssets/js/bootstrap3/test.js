$(document).ready(function(){
  $('.bxslider').bxSlider({
  	minSlides: 3,
  	maxSlides: 1,
  	slideWidth: 0,
  	slideMargin: 0
  });
  $('.popover-show').popover({
        placement : 'bottom',
        html:true
        });
  var stage = document.getElementById('gesture');
  $stage = jQuery(stage);
  hammertime.on('pinch', function(ev) {
      console.log(ev);
  });
});





