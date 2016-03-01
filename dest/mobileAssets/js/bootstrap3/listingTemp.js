$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});



 

  $("#recomendations").owlCarousel({
    jsonPath : '/mobileAssets/ajax/json/customData.json',
    jsonSuccess : customDataSuccess,
    items : 7, //10 items above 1000px browser width
    itemsDesktop : [1000,5], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,3], // betweem 900px and 601px
    itemsTablet: [600,2], //2 items between 600 and 0
    itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
    lazyLoad : true,

  });



});


function customDataSuccess(data){
    var content = "";
    var strVar="";

    for(var i in data["items"]){
       
       var img = data["items"][i].img;
       var alt = data["items"][i].alt;
 
       content += "<img src=\"" +img+ "\" alt=\"" +alt+ "\">";

    strVar += "";
    strVar += "<div class=\"product item recomendations col-xs-12\">";
    strVar += "  <div class=\"first_item-module product_item recomendations\">";
    strVar += "    <div class=\"col-xs-12 item-image product-image\"><img  class=\"col-xs-12 item-image product-image lazyOwl\" data-src=\""+img+"\" border=\"0\" onerror=\"defaultImageonCart(this,'\/mobileAssets\/images\/fillers\/filler_REC.gif')\" class=\"chck-img\"\/><\/div>";
    strVar += "    <div class=\"col-xs-12 item-attributes\">";
    strVar += "      <div class=\"col-xs-12 col-md-7 item-descr-price-sku\">";
    strVar += "        <ul class=\"item-list-attributes\">";
    strVar += "          <li class=\"li_title\"><span class=\"product-title\"> ropas y mas ropas <\/span><\/li>";
    strVar += "          <li class=\"li_price\"><span class=\"precio-tachado-modulo\"> <\/span><span class=\"newprice\">$999,999<\/span><\/li>";
    strVar += "        <\/ul>";
    strVar += "      <\/div>";
    strVar += "    <\/div>";
    strVar += "  <\/div>";
    strVar += "<\/div>";



    }

    var owl = $("#recomendations");
 
  owl.owlCarousel({
      items : 7, //10 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  });
// TODO autoplay.

    $("#recomendations").html(strVar);
  }