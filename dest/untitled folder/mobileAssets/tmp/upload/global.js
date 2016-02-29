/** liverpool Scripts*/
var lpobj = {};
var phoneWidth = $(window).width();
var winHeight = $(window).height();
var eventOverType = {'nonWeb': 'touchstart'};
var eventOutType = {'nonWeb': 'mouseleave'};
var eventMouseEnterType = {'nonWeb': 'touchstart'};
var eventMouseLeaveType = {'nonWeb': 'mouseleave'};
var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android");
var contextPath = $("#plpPage_contextPath").val();
$(window).scrollTop($('html').offset().top);
var cmpArray = 0;
(function($) {
$(function() {

/********Autocomplete Function**************************************/
var data = [
{label: "Levis", category: ""},
{label: "Pantalon", category: ""},
{label: "Levis shirts", category: ""},
{label: "caballero", category: ""},
{label: "Tenis", category: ""},
{label: "Levis", category: ""},
{label: "pantallas", category: ""},
{label: "Levis jeans", category: ""},
{label: "caballero", category: ""}

];
/***********************************************************/

var deviceType = "web";
if (isiPhone > -1 || isiPad > -1 || isiPod > -1 || isAndroid > -1) {
deviceType = "nonWeb";
$('a.touchEvent').attr('href', 'javascript:void(0)');
}
// Hiding loader
$(window).on('load', function() {
$('#box-overlay-first').hide();
$('#page-loading').hide();
});
//end
//header promo
$('.close_promo, .close-banner').live('click', function() {
$(this).parents('.header-promo').fadeOut(300).slideUp(200);
});
//end
//login popup
$(".userLoginButton, .myaccount-icon").on("click", function(event) {
lpobj.showLoginPopup();
});
//end
//home-banner right section
if (phoneWidth > 650) {
lpobj.homeBannerRightSection();
lpobj.homeTabletBannerRightSection();

}

$(window).on("orientationchange", function() {
if($('.prod-info').exists()){
if(!$('.ebookpdpdp').exists()){
if (phoneWidth >= 768) 
{lpobj.setdynamicheight('moreheight',1,'moreheight');}
else {lpobj.setdynamicheight('prod-info',1,'moreheight'); }
}
}
	
	
$('.scrollpane1').jScrollPane({showArrows: false, autoReinitialise: false});
if (phoneWidth > 650) {
lpobj.homeBannerRightSection();
lpobj.homeTabletBannerRightSection();

}
});
if(phoneWidth==1024){

$('#giftgist_buscarbtn').css('float','right');
//$('#giftgist_buscarbtn').css("width", "180px !important");
}
//end
//search icon functionality
$('.search-icon, .mobile-search-icon').on('click', function(e) {
$('#search-container').modal('show');
$('#busca').val('');
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
$(".modal-scrollable").addClass("ipad-modal-scroll-locked");
lpobj.scrollModalOnTop();
}
$('<div class="search-bg"></div>').insertBefore("#search-container");
lpobj.getFocus();
$.widget("custom.catcomplete", $.ui.autocomplete, {
_renderMenu: function(ul, items) {
var self = this,
currentCategory = "";
// items.push({label :"<div class='close_button'>Close</div>", category : ""});
$.each(items, function(index, item) {
if (item.category != currentCategory) {
ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
currentCategory = item.category;
}
self._renderItem(ul, item);
});
}
});
$("#field-search").catcomplete({
delay: 0,
source: data,
minLength: 1,
open: function(event, ui) {
$(".ui-autocomplete").addClass('custom_autocomplte');
}
});
});
$(".close-search").live("click", function() {
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
lpobj.animateBodyHeightAfterSearchClose();
}
else {
$('#search-container').modal("hide");
$("#field-search").val("");
}
});
$(".ipad-modal-scroll-locked").live("click", function(e) {
if ($(e.target).hasClass("modal-scrollable")) {
lpobj.animateBodyHeightAfterSearchClose();
}

});
$("#field-search").live("click", function() {
if (navigator.userAgent.match(/iPad/i) && phoneWidth > 768) {
setTimeout(function() {
// alert($(window).height());
$(".ipad-modal-scroll-locked").css({"top": "-17px", "height": $(window).height()})
}, 50);

}
});
$("#field-search").live("focusout", function() {
if (navigator.userAgent.match(/iPad/i) && phoneWidth > 768) {
setTimeout(function() {
// alert($(".ipad-modal-scroll-locked").css("top"));
$(".ipad-modal-scroll-locked").css("top", "0px")
}, 100);

}
});
//end


//product listing large view small view on click
$(".view-selection a").click(function() {
$('.view-selection a').removeClass('active');
$(this).addClass('active');
var obj = $(this);
lpobj.showview(obj);
})
//end
//filters enbaling in product list
$(".filter-btn").on('click', function() {

$("#minPrice").val('');
$("#maxPrice").val('');

if (phoneWidth > 650) {
lpobj.showFilterSection();
lpobj.setFilterSectionHt();
}
if (phoneWidth < 650 && phoneWidth > 320) {
lpobj.showFilterSectionMobile();
lpobj.setFilterSectionMobileHtLan();
}
if (phoneWidth < 321) {
lpobj.showFilterSectionMobile();
lpobj.setFilterSectionMobileHtPot();
}
if (parseInt($('.filter-container').css('right')) == 0) {
lpobj.hideOverlayFilter();
$(".product-list-banner").show();
$(".footer").show();

}
});
//filter close in mobile
$(".filter-close").on("click", function() {
$(".filter-container").animate({right: -$(".filter-container").outerWidth()});
lpobj.hideOverlayFilter();
$(".filter-btn").removeClass('active');
//$(".filter-btn").css({ 'display': 'inline'});
});
$(window).on("orientationchange", function() {
if (phoneWidth > 767) {
if (!$('.filter-btn').hasClass('active')) {
$(".filter-container").css('right', -$(".filter-container").outerWidth());
}
else {
lpobj.setFilterSectionHt();
}
}
else if (phoneWidth < 650 && phoneWidth > 320) {
if (($('.filter-btn').length > 0) && ($('.filter-btn').hasClass('active'))) {
lpobj.setFilterSectionMobileHtLan();
}
}
else if (phoneWidth < 321) {
if (($('.filter-btn').length > 0) && ($('.filter-btn').hasClass('active'))) {
lpobj.setFilterSectionMobileHtPot();
}
if (!$('.filter-btn').hasClass('active')) {
$(".filter-container").css('right', -$(".filter-container").outerWidth());
}
}
});
$(".page-overlay").on('click', function(e) {
$(".filter-container").animate({right: -$(".filter-container").outerWidth()});
$(".filter-btn").removeClass('active');
$(".product-list-banner").show();
$('.footer').show();
lpobj.hideOverlayFilter();
});
$('#clearAll').on('click', function() {
$('.filter-tabs-container').find('.filter-tabs.selected').remove();
lpobj.removecheck('', 'clearall');
$(this).hide();
lpobj.refreshcontent();
});
$('.refine-label').on('click', function() {
var refinetext = $.trim($(this).text());
if ($(this).parent('.span6').hasClass('active')) {
$(this).parent('.span6').removeClass('active');
lpobj.removelabel(refinetext);
}
else {
$(this).parent('.span6').addClass('active');
lpobj.addlabel(refinetext);
}
});
$('.filter-tabs.selected').live('click', function() {
var label_text = $.trim($(this).text());
lpobj.removelabel(label_text);
lpobj.refreshcontent();
});
//end
//product listing list border in mobile
if (phoneWidth < 750) {
$('.pdt-list-detail .border').remove();
}
//end
//compare check enable
$(".compare-check input[type=checkbox]").live("click", function() {
if($(this).is(':checked')) {
var checkedsize = $('.compare-check input[type="checkbox"]:checked').size();

if($('.prodcount span').text()==''){
$('.prodcount span').html('0');
}
else{
$('.prodcount span').html(parseInt($('.prodcount span').text())+1);
}

}
else
{
var checkedsize = $('.compare-check input[type="checkbox"]:checked').size();
$('.prodcount span').html(parseInt($('.prodcount span').text())-1);
}
var obj = $(this);
lpobj.countChecked(obj);
});
// var n = $('.compare-check input[type="checkbox"]:checked').size();

var n = $('#prodcount').text();
if((phoneWidth < 767) || (phoneWidth > 767)){

if (n == 1) {
$(".compare-row").addClass('show').removeClass('active');
}
else if (n > 1) {
$(".compare-row").addClass('active show');
}
else if (n == 0) {
$(".compare-row").removeClass('show');
}
}
$('.compare-btn').live('click', function() {

var obj = $(".compare-check input[type=checkbox]");
lpobj.countChecked(obj);

var phoneWidth = $(window).width();

// var n = $(".compare-check input:checked").length;
// Start : changes done for 'Casa Del Libro'
if(contextPath == undefined)
{
contextPath = $("#mobilePage_contextPath").val();
}
// End : changes done for 'Casa Del Libro'
var n = $('#prodcount').text();
if (n == 1) {
$(".compare-row").addClass('show').removeClass('active');
}
else if (n > 1 && (phoneWidth > 767)) {
$(".compare-row").addClass('active');
if (n > 4) {
lpobj.showCompareError(obj);
}
else{

window.location.href = contextPath+"/browse/productComparision.jsp";
}
}
else if (n > 1 && (phoneWidth < 767)){
if (n > 2) {

lpobj.showMobileCompareError(obj);
}
else{

window.location.href =contextPath+"/browse/productComparision.jsp";
}

}
else if (n == 0) {
$(".compare-row").removeClass('show');
}

});




$('.compare-remove').live('click', function(e) {
e.preventDefault();
var compareindex = $(this).parents('.remove-compare-product').find('.check-index').val();
var rdirecturl = $('#rdirecturl').val();
// $(this).parents('td.span3').remove();
var rowlength = $('.products-compare').find('td.span3').length;
//alert(rowlength);
//var cmpArray = parseInt($('td.span3.removed').length);
if(rowlength >2){
$(this).parents('td.span3').remove();
//window.history.back();
}
else {location.href=rdirecturl }

});
//end
//view-promo-popup
$(".veiw-promo-popup-link").live('click', function() {
$.ajax({
type: "GET",
url: "frags/view-promo-popup.jsp",
dataType: "html",
success: function(data) {
$('#view-promo-modal').html(data);
$('#view-promo-modal').modal('show');
}
});
});
$('.close-btn, .cancel-btn, .modal-close-btn').live('click', function() {
$('.view-promo-modal').modal('hide');
if($('#loginerrorpage').exists()){
$('#loginerrorpage').hide(500);
}
});
//end
//footer accordian in moblie
if (phoneWidth <= 650)
{
$('.sub-section h3').live('click', function() {
if (phoneWidth < 650) {
if ($(this).hasClass('active')) {
$(this).parent('div').find('.phone-hide').slideUp(200);
$(this).removeClass('active');
}
else {
$('.sub-section .phone-hide').slideUp(200);
$('.sub-section h3').removeClass('active');
$(this).parent('div').find('.phone-hide').slideDown(200);
$(this).addClass('active');
}
}
});
}
//end
for (var i = 0; i < $('.globalslider').size(); i++)
{
lpobj.initializesliders(i);
}

$(window).resize(function() {
if (!($.browser.msie && $.browser.version == 8)) {
if ($('html').hasClass('no-touch'))
{
for (var i = 0; i < $('.globalslider').size(); i++)
{
lpobj.initializesliders(i);
}
}
}

});
//Home, category and PDP page slider intialization
var pp = $(".homelslider, .cat-banner-slider");
lpobj.homeslideInit(pp);
lpobj.tableslideInit();

$(window).on('load', function() {
if (!($.browser.msie && $.browser.version == 8)) {
if (parseInt(pp.css('height')) != pp.children().first().height())
{
lpobj.homeslideInit(pp);
//banner tablet function
lpobj.tableslideInit();

}
for (var i = 0; i < $('.globalslider').size(); i++)
{
if (parseInt($('.globalslider').eq(i).css('height')) != $('.globalslider').eq(i).children().first().height())
{
lpobj.initializesliders(i);
}
}
}
});
//end
$('.menu-close-icon').on('click', function(event) {
lpobj.hideMegamenu();
});
$(".header .mega-menu-cont").animate({
left: parseInt(-$(document).width())
}).hide();
$(".filter-container").animate({
right: parseInt(-$(document).width())
}).hide();

$(window).on("orientationchange", function() {
if ((phoneWidth > 756) && parseInt($('.mega-menu-cont').css('left')) == 0) {
lpobj.megamenuSetHt();
}
});
$(".header-navigation-left").on('click', function() {
if (phoneWidth > 756) {
var obj = this;
if (!$(this).is('.touched')) {
$('*').removeClass('touched');
setTimeout(function() {
$(obj).addClass('touched');
lpobj.showMegamenu();
lpobj.megamenuSetHt();
}, 100);
}
else {
lpobj.hideMegamenu();
}
}
else {

if ($(this).hasClass('active')) {
lpobj.hideMegamenuMobile();
$(".menu-right-cont").hide();
}
else {
lpobj.showMegamenuMobile();
$(this).addClass('active');
$('body').addClass('menu-active');
}
}
});

$(".page-overlay").on("click", function() {
if ((phoneWidth < 756) && $(".header-navigation-left").hasClass('active')) {
lpobj.hideMegamenuMobile();
}

});
//mobile megamenu
if (phoneWidth < 756) {
var mobmenuContent = $('.mega-menu-cont-main').html();
$('body').addClass('mobmenu').prepend("<div class='mobmenuContent'/>");
$(".mobmenuContent").html(mobmenuContent).find('.mega-menu-cont').removeClass('hidden-phone');
$(".mega-left").height(winHeight);
$(".menu-right-cont").height(winHeight);
$('.right-menu h3').live("click", function() {
if ($(this).hasClass('showMinusIcon')) {
$(this).parent().find("ul").slideToggle(500);
$(this).removeClass('showMinusIcon');
}
else {
$('.right-menu ul').slideUp(500);
$('.right-menu h3').removeClass('showMinusIcon');
$(this).parent().find("ul").slideToggle(500);
$(this).addClass('showMinusIcon');
}

});

//Efecto cerrar con efecto slide para menu
//cambio de tiempo
$(".mobile-back").click(function() {
$(this).parent().hide("slide", { direction: "left" }, 500);
});
}
//end
//megamenu right section
$(".header_shopcat_container .row-fluid").each(function() {
$(this).find('.span4:first').css('margin-left', 0);
});

$('.mega-leftul li a').live('click', function(e) {
e.preventDefault();
var menusrc=$(this).find('img').attr('src');
if (!$(this).hasClass('active')) {
$('.mega-leftul li a img').each(function( i ) {
var eachmenusrc=$(this).attr('src');
if(eachmenusrc.indexOf("_mo") != '-1')
{
var url_src = eachmenusrc.substring(0,eachmenusrc.substring(0).indexOf("mo.png")-1);
var eachnewsrc=url_src+=".png";
$(this).attr('src',eachnewsrc);
}

});
}

$('.mega-leftul li a').removeClass('active');
$(this).addClass('active');

/*if ($(this).hasClass('active')) {
var url_src = menusrc.substring(0,menusrc.substring(0).indexOf("mo.png")-1);
var new_src=url_src+=".png";
if(menusrc.indexOf("_mo") == '-1')
{
var url = menusrc.substring(0,menusrc.substring(0).indexOf("png")-1);
newsrc=url+="_mo.png";
$(this).find('img').attr('src',newsrc);

}
}*/
var contentId = $(this).attr('rel');
var newId = "#" + contentId;
//cambio de tiempo
$(".menu-right-cont").show("slide", { direction: "left" }, 500);


$(".header_shopcat_container").find('div.row-fluid').hide();
$(newId).css('display', 'block');
});
//end
//PDP functionalities Start
$('.prod-desc h4').live('click', function() {
$(this).parents('.prod-desc').find('.option-section').fadeToggle(300);
$(this).parents('.prod-desc').toggleClass('expand');
});
//pdp tab navigation
lpobj.pdpTabnavigation();
if ($('body').find('.scrollpane').length > 0) {
if (phoneWidth > 767) {
lpobj.scrollpaneInit();
}
}
//end
//share container in pdp hiding when clicked outside
$(".page-overlay").on('click', function(e) {
var containerN = $('.share-container');
if (!containerN.is(e.target) // if the target of the click isn't the container...
&& containerN.has(e.target).length === 0) { // ... nor a descendant of the container
containerN.animate({bottom: 0}, 500);
$(".share-container li").removeClass('active');
lpobj.hideOverlay();
}
});
//end
//pdp calular pago arrow
$('.calculate .down-withoutvarientsarrow, .calcular_cont a').on('click', function() {
$('.payment-block').slideToggle(300);
$('.payment-block').toggleClass('expand');
if ($('.payment-block').hasClass('expand')) {
$('.calculate span').removeClass('down-withoutvarientsarrow');
$('.up-arrow').css('display', 'block');
$('.calculate span').addClass('up-arrow');
}
else {
$('.calculate span').removeClass('up-arrow');
$('.down-withoutvarientsarrow').css('display', 'block');
$('.calculate span').addClass('down-arrow');
}
});
//end
$('.thumbnail-container li').click(function() {
$('.thumbnail-container li').removeClass('active');
$(this).addClass('active');
});
// Gift Registry Pages Mobile Nav
$(".selected-menu").on('click', function(e) {
e.preventDefault();
$(".gift-bodas-menu").slideToggle();
$(".gift-bodas-menu li").on('click', function() {
var myMenu = $(this).text();
var myLink = $(this).attr('href');
$('.select-nav').text(myMenu);
$(".gift-bodas-menu").slideUp();
});
});

// Gift Event Details Page Functionality
$(".selected-range").on('click', function(e) {
e.preventDefault();
$(".price-dropdown").slideToggle();
$(".price-dropdown li").on('click', function() {
var myVal = $(this).text();
var link = $(this).attr('href');
$(this).parents('.price-range').find('.select-order').text(myVal);
$(".price-dropdown").slideUp();
});

});
// Gift Registry page Form Fields Validation
if ($('body').find('.giftregistry-right').length > 0) {
var frmlgth = $('.giftregistry-right form').length;
for (i = 0; i <= frmlgth - 1; i++) {
var formObj = $('.giftregistry-right').find('form').eq(i);
if (formObj.hasClass('giftform')) {
formObj.validate({
meta: "validate",
groups: {
Location: "gift-number gift-fname gift-mname giftrg-no giftrg-date giftrg-month giftrg-year taregeta ",
},
errorPlacement: function(error, element) {
if (element.attr("name") == "gift-number" || element.attr("name") == "gift-fname" || element.attr("name") == "gift-mname") {
error.insertAfter(".gift-reg-subcol2");
}
else if (element.attr("name") == "giftrg-no" || element.attr("name") == "giftrg-date" || element.attr("name") == "giftrg-month" || element.attr("name") == "giftrg-year") {
error.appendTo(".error-container");
}
else if (element.attr("name") == "taregeta") {
error.insertAfter("#err-container");
}
else
{
error.insertAfter(element);
}
}
});
}
}
}
// Gift Image Pop Up
$(".gift-view-popup").on('click', function(e) {
e.preventDefault();
var skuId= $(this).attr('data-collection');
var URL = "/tienda/m/common/frag/gift-image-popup.jsp?skuid="+skuId
var data = lpobj.ajaxGetContent(URL, "html");


data.success(function(data) {
if ($.trim(data) != "") {
$('#gift-view-modal').html(data);
$('#gift-view-modal').modal('show');
}
});
});
// Mac Collection Page Product Image Popup
$(".zoom-image").on('click', function(e) {
e.preventDefault();
var zoomimageurl = $("#zoomskuImageUrl_"+this.id).val();
var URL = "/tienda/m/common/frag/zoomimage-popup.jsp"
var data = lpobj.ajaxGetContent(URL+'?imageUrl='+zoomimageurl+'&tet=eee', "html");

data.success(function(data) {
if ($.trim(data) != "") {
$('#zoomview-modal').html(data);
$('#zoomview-modal').modal('show');
}
});
});
// Mac Product Listing Page Compare
$(".compare-check input[type=checkbox]").live("click", function() {
lpobj.countChecked();
});
// Mac Sub Category Page Show more and less
$(".showmore").live('click', function(e) {
e.preventDefault();
$(this).hide();
$(this).parents('p').find('#showmore').show();
$(this).parents('p').find('.showless').show();
});
$(".showless").live('click', function(e) {
e.preventDefault();
$(this).hide();
$(this).parents('p').find('.showmore').show();
$(this).parents('p').find('#showmore').hide();
});
// Mac Pages More Details Nav
$('a.mac-more').on('click', function(e) {
e.preventDefault();
lpobj.showMacMoreSection();
lpobj.setMacMoreSectionHt();
});
$('a.cancel-more, .page-overlay, #more-filters').on('click', function(e) {
e.preventDefault();
lpobj.hideMacMoreSection();
});
$(window).on("orientationchange", function() {
if ($('.cancel-more').css('display') == "block") {
lpobj.setMacMoreSectionHt();
}
});
// Mac Pages More Details Sub Nav
$('.mac-more-nav a.more-arrow').on('click', function(e) {
e.preventDefault();
if ($(this).hasClass('active')) {
$(this).parent('li').find('.subcat-block').slideUp(200);
$(this).removeClass('active');
}
else {
$('.subcat-block').slideUp(200);
$('a.more-arrow').removeClass('active');
$(this).parent('li').find('.subcat-block').slideDown(200);
$(this).addClass('active');
}
});
$('.mac-more-nav a.more-subarrow').on('click', function(e) {
e.preventDefault();
if ($(this).hasClass('active')) {
$(this).parent('li').find('.subcat-subblock').slideUp(200);
$(this).removeClass('active');
}
else {
$('.subcat-subblock').slideUp(200);
$('a.more-subarrow').removeClass('active');
$(this).parent('li').find('.subcat-subblock').slideDown(200);
$(this).addClass('active');
}
});
// MAC Product Listing Page Sort by Brand
$(".ordenar-marca").on('click', function() {
$(".compare-row").removeClass('show');
lpobj.macRefreshContent();
});
// MAC Product Listing Page Money Order
$(".ordenar-precio").on('click', function() {
$(".compare-row").removeClass('show');
lpobj.macRefreshContent();
});

/*Checkout login functionality */
$("#cart-submit, .cart-btn .btn-pink").click(function() {
var cdlerror = $("#cdlerror").val();
if(cdlerror == "true")
{
var divErrors = document.getElementById('errors');
divErrors.innerHTML = '';
var errors = '';
errors = errors + '<div class="alerta error"><p style="color:#FF0505; padding-left: 10px;"><span></span> Weight Exceeds Maximum Limit</p></div>';
divErrors.style.display = 'block';
divErrors.style.background = 'rgba(255, 255, 255, 0.6)';
divErrors.innerHTML = errors;
return false;
}
else
{
var contextroot = $("#checkout_contextroot").val();
var URL = contextroot + "/cart/frag/checkoutpopup.jsp";
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
lpobj.initTabNavigation();
setTimeout(function() {
$("#checkout-login-popup form").validate({
meta: "validate"
});
}, 100);
$("#checkout-login-popup").html(data);
$("#checkout-login-popup").modal('show');
});
}

});
/*Checkout login functionality ends here */
/* Checkout Billing Functionality */
$('.cards-container .billing-radio').each(function() {
if ($(this).is(":checked")) {
$(this).parents('.cards-container').find('.card-expiry').addClass('active');
}
});
$('.billing-container input[type=radio]').on('click', function() {
if ($(this).is(":checked")) {
$('.cards-container').find('.card-expiry').removeClass('active');
$(this).parents('.cards-container').find('.card-expiry').addClass('active');
}
});

/* Checkout Billing Functionality */
/* Checkout Order Confirmation Expanding Details */
$('.compra-details').on('click', function(e) {
e.preventDefault();
$(this).toggleClass('active');
$('.order-confirmation-container').slideToggle(300);
if (($('.checkout-details-main').find('.captcha-content').length == 0) && !($(this).hasClass('active'))) {
$(this).addClass('mb150');
}
else {
$(this).removeClass('mb150');
}
});
/* Checkout Order Confirmation Expanding Details */

/* Checkout Order Success Tracking Details Expand */
$('.track-down-arrow').each(function() {
if ($(this).hasClass('active')) {
$('.track-user-detials').css('display', 'block');
}
});

$('.track-down-arrow').on('click', function(e) {
e.preventDefault();
$(this).toggleClass('active');
$('.track-user-detials').slideToggle(400);
});
/* Checkout Order Success Tracking Details Expand */

/* Mobile Store Locator Buscar Details Expand */

$('.store-expand').on('click', function(e) {
e.preventDefault();
$(this).toggleClass('active');
$('.estado-container').slideToggle(400);
});
/* Checkout Order Success Tracking Details Expand */

//share container orientaion in mobile
$(window).on("orientationchange", function() {
if ((phoneWidth < 767) && (parseInt($('.share-container').css('bottom')) == 320)) {
$('body').animate({scrollTop: $(document).height()}, 500);
$('.share-container').animate({bottom: 120}, 500);
}
else if ((phoneWidth < 767) && (parseInt($('.share-container').css('bottom')) == 120)) {
$('.share-container').animate({bottom: 320}, 500);
}
});
// Start PDP zoom
if ((phoneWidth > 767) && ($('#zoom-target').length > 0)) {
lpobj.initzoom();
}
if ((phoneWidth < 767) && ($('#zoom-target').length > 0)) {
$('.smallImg').on('click', function() {
var ImgSrc = $(this).attr('src');
$(this).parents('.pdp-image-container').find('.bigImage').attr('src', ImgSrc);
$('.pdp-image-carousel li a').removeClass('active');
$(this).parent('a').addClass('active');
});
}
//Product-listing-loadmore-Start

//Product-listing-loadmore-End
//Product-listing-loadmore-Start
$(".filter-by select").on('change', function() {
lpobj.refreshcontent();
});
/* On hover Changes for Ipad and Iphone */
$('body').on('click', '.hoverItem', function() {
var obj = this;
$(obj).addClass('hover_effect');
setTimeout(function() {
$(obj).removeClass('hover_effect');
}, 300);
});
//Product-listing-loadmore-End
//Global Tab Navigation
lpobj.initTabNavigation();
//end
/* PDP Collection Page Functionality */
// Custom Drop down Initialization
var customddowncontainer = $(".custom-ddown-container");
if ($(".custom-ddown-container").length > 0) {
k=0;
$.each(customddowncontainer, function( index, value ) {
k++;
$("#machtmlselect"+k).html($("#demo-htmlselect"+k).html());
$("#demo-htmlselect"+k).ddslick();
});

}
$('.filter-list').live('click', function() {
$("#minPrice").val('');
$("#maxPrice").val('');
$(this).toggleClass('active');
$(this).parents('.filter-section').find('.filter-lables').fadeToggle(350);
});
$("#pdp-landing-count").focusout(function() {
if (navigator.userAgent.match(/iPad/i)) {
lpobj.calculateBodyScrollHeight();
var newHeight = $("body").data("scrolltop") - 2;
setTimeout(function() {
$(document).scrollTop(newHeight);
}, 100);
}

});
//popup
$(".cart-popup-link").live('click', function() {
var URL = "frags/shopping-cart-popup.jsp";
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
$('#popUp-modal').html(data);
$('#popUp-modal').modal('show');
$('#popUp-modal').on('shown', function() {
$('#popUp-modal').find('.globalslider').each(function() {
setTimeout(function() {
lpobj.initializesliders($(this).index());
}, 500)

});

});

});
});

$('.cart-close-btn').live('click', function() {
$('.popUp-modal').modal('hide');
});
//end
//srart: cart item remove
$(".cart-close").live('click', function(e) {
e.preventDefault();
var delcount = $(this).parents('.cart-table-content, .checkout-table-content').children('.cart-row').size();
if (delcount >= 1) {
var URL = "frags/cart-delete-product.jsp";
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#cart-delete-modal').html(data);
$('#cart-delete-modal').modal('show');
}
});
$(this).addClass('active');
$('.del-btn').live('click', function() {
$('.cart-close.active').closest('.cart-row').remove();
$('.delview-modal').modal('hide');
});
$('.no-btn').live('click', function() {
$('.cart-close.active').removeClass('active');
});
$('.modal-backdrop').live('click', function() {
$('.cart-close.active').removeClass('active');
});
}
if (delcount == 1) {
$('.del-btn').live('click', function() {
$('.cart-heading-container, .cart-table-container, .cart-footer, .cart-btn').remove();
$('.delview-modal').modal('hide');
$('.cart-noproduct-container').fadeIn(100);
});
$('.no-btn').live('click', function() {
$('.cart-close.active').removeClass('active');
});
$('.modal-backdrop').live('click', function() {
$('.cart-close.active').removeClass('active');
});
}

});

//end
if ($('.cart-table-content, .checkout-table-content').find('.qty-value').length > 0) {
$('.qty-value').each(function() {
var qtyVal = parseInt($(this).val());
if (qtyVal <= 1) {
$(this).parents('.product-qty').find('.qty-minus').attr('disabled', 'disabled');
} else {
$(this).parents('.product-qty').find('.qty-minus').removeAttr('disabled');
}
});
}

/****** Incrementar Decrementar producto******/

/* $('.qty-plus').live('click', function() {
var qtyVal = parseInt($(this).parents('.product-qty').find('.qty-value').val());
qtyVal += 1;
$(this).parents('.product-qty').find('.qty-value').val(qtyVal);
if (qtyVal > 1) {
$(this).parents('.product-qty').find('.qty-minus').removeAttr('disabled');
}
});
$('.qty-minus').live('click', function() {
var qtyVal = parseInt($(this).parents('.product-qty').find('.qty-value').val());
qtyVal -= 1;
$(this).parents('.product-qty').find('.qty-value').val(qtyVal);
if (qtyVal <= 1) {
$(this).attr('disabled', 'disabled');
}
});*/

/****** Incrementar Decrementar producto******/

/**************PDP LENS Page Funtionality*********/
$('.lente_cont input').on('click', function(e) {
if($(this).prop('checked') == true){
$(this).parents('.lente_cont').find('.lente_inner').slideToggle();
}else{
$(this).parents('.lente_cont').find('.lente_inner').slideToggle();
}
});
$(".power").live('change',function(){
if($(this).val() == "Selecciona"){
$(this).closest(".lente_inner").find(".initially-disabled").attr("disabled","disabled");
}
else{
$(this).closest(".lente_inner").find(".cylinder").removeAttr("disabled").removeClass("disabled-option-cylinder").val("Selecciona");
$(this).closest(".lente_inner").find(".eje").attr("disabled","disabled").addClass("disabled-option-cylinder").val("Selecciona");
}
});
$(".cylinder").live('change',function(){
if($(this).val() == "Selecciona"){
$(this).closest(".lente_inner").find(".eje").attr("disabled","disabled");
}
else{
$(this).closest(".lente_inner").find(".eje").removeAttr("disabled").removeClass("disabled-option-cylinder").val("Selecciona");
}
});
/**************PDP LENS Page Funtionality*********/
/**************Header loggedinfunctionality*********/
$('.uname, .mob-uname').on('click', function(e) {
$(this).parents('.logged-in').find('ul.loggedin-menu').slideToggle();
$(this).toggleClass('acitve');
});
$('.credit-left-nav h1').on('click', function(e) {
$(this).parents('.credit-left-nav').find('nav').slideToggle();
$(this).parents('.credit-left-nav').toggleClass('active');
});
$('.agre-button').on('click', function(e) {
window.location.href = 'credit-add-card.jsp';
});
/**************Header loggedinfunctionality*********/

$('.qty-value').bind('keypress touchend', function(e) {
if (window.event) {
if ((e.keyCode < 48 || e.keyCode > 57) & e.keyCode != 8) {
event.returnValue = false;
return false;
}
} else {
if ((e.which < 48 || e.which > 57) & e.which != 8) {
e.preventDefault();
return false;
}
}
});
//mini cart
$('html').on('touchstart', function(event) {
var target = $(event.target);
if ($('.shopping-bag').has(target).length == 0) {
lpobj.minicartclose();
$('.shopping-bag').find('a.touchEvent').removeClass('touched1');
}
});
if (deviceType == "web") {
$('.shopping-bag').live('mouseenter', function() {
setTimeout(function() {
lpobj.minicartopen();
}, 100)
});
$('.shopping-bag').live('mouseleave', function() {
lpobj.minicartclose();
});

} else {
$('.cart-link.touchEvent').live(eventMouseEnterType[deviceType], function() {
var obj = this;
if (phoneWidth < 768) {
var refPage = $(obj).attr('rel');
window.location.href = refPage;
} else {
if (!($(this).parents('.shopping-bag').hasClass('active'))) {
setTimeout(function() {
lpobj.minicartopen();
}, 100);
} else {
lpobj.minicartclose();
}
}
});
}
//end
//load more in promotions
$('.promo-load-btn').live('click', function() {
var URL = 'frags/site-level-promotion-content.jsp';
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#promotion-external-content').append(data);
}
});
});
//end
//video popup in compare
$('.show-video').live('click', function() {
var URL = 'frags/show-video.jsp';
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#compare-video-feature').modal('show');
setTimeout(function() {
$('#compare-video-feature').html(data);
});
}
});
});
//end
//airtime continuar button enable
$(".phone-details .checkbox").live("click", function() {
if($(this).attr('checked')=="checked"){
$(this).parent().find('select').prop('disabled',false);
}
else{
$(this).parent().find('select').prop('disabled',true);
}
var obj = $(this);
lpobj.enableAirtimeContinuarBtn(obj);
});
//end
//airtime-checkout form submision
$(".continuar-btn.active").live("click", function() {
if($('.airtime-checkout-form').valid()){
$(".airtime-checkout-form").submit();
$(".continuar-btn.active").hide();
}
});
//end
//airtime phone details delete
$(".edit-phone-detail a.delete-phone-details").on("click", function() {
var obj = $(this);
$(this).closest('.phone-details').addClass('selected-phone-details');
lpobj.showPhoneDetailClearMsg(obj);
});
//end
//srart: cart item remove
$(".delete-address").live('click', function(e) {
e.preventDefault();

});
//end
//select credit card for airtime
$(".select-card").on('change', function() {
lpobj.showHideAirtimeExpiary();
});
//end
//select credit card for guest checkout
$(".guest-checkout-details-main #select-credit-card").on('change', function() {
if ($('#select-credit-card option:selected').val() == "Liverpool") {
$('.expiary-detail').hide();
}
else {
$('.expiary-detail').show();
}

});
//end
//tooltip in guest-checkout-billing
$('a.bancomer,a.seven,a.super_farmacia,a.spei').tooltip();
$(window).on("orientationchange", function() {
$('a.bancomer,a.seven,a.super_farmacia,a.spei').tooltip('hide')
});

//end
$('.signin-btn').live('click', function() {
$('.chk-login-tab2').addClass('active');
$('.chk-login-tab1').removeClass('active');
$(this).parents('.tab-content').hide();
$('.create-account-tab').show();
});
//customer-support accordian plus minus icon
$(".accordion-group").each(function() {
if ($('.accordion-body').hasClass('in')) {
$('.in').parent().find('.accordion-heading').addClass('active');
}
});
$(".accordion-heading").live("click", function() {
$(this).closest('.accordion').find('.accordion-heading').removeClass('active');
if ($('.accordion-body').hasClass('in')) {
$('.in').parent().find('.accordion-heading').addClass('active');
}

});
$('.customer-support-tab').find('.span1').each(function() {
$(this).live('click', function() {
var tabVal = $(this).text();
$('.breadcrumb li').find('span').text(tabVal);
});
});

//end
//customer-support tab mobile
$('.support-tab-mobile .btn-navbar,.support-tab-mobile .leftnavbar a').live('click', function() {
if ($(this).parent('.leftnavbar').hasClass('active-nav')) {
$('.support-tab-links-mobile').slideUp(500);
$(this).parent().removeClass('active-nav');
}
else {
$(".leftnavbar").addClass('active-nav');
$('.support-tab-links-mobile').slideDown(500);
}
});
$('.support-tab-links-mobile .tablink').live('click', function() {
var linkText = $(this).find('p').text();
$('.leftnavbar').find('a').text(linkText);
$('.support-tab-links-mobile').slideUp(500);
$(".leftnavbar").removeClass('active-nav');
$(".leftnavbar").removeClass('active');

});
//myaccount shippinginvoice mail
$('#another-account').on('click', function() {
$('#connect-another-account').show();
});
$('#view-pdf, #deliver-to-mail').on('click', function() {
$('#connect-another-account').hide();
});
//end
//video popup in compare
$('.show-video').live('click', function() {
var URL = 'frags/show-video.jsp';
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#support-video').modal('show');
setTimeout(function() {
$('#support-video').html(data);
});
}
});
});
//end
if (navigator.userAgent.match(/iPad/i)) {
$("input[type='text'], input[type='number', input[type='submit'], input[type='tel']").on('click', function() {
$(".header-navigation").removeClass("affix").addClass("input-focus");
lpobj.bindScrollevent();
});
$("input[type='text'], input[type='number'], input[type='tel']").on('focusout', function() {
$(".header-navigation").removeClass("input-focus");
if (!$(".header-navigation").hasClass("affix-top")) {
$(".header-navigation").addClass("affix").removeClass("input-focus");
}
});
}
//Ajax call for the search in the help-store-locator starts here
$("#gmap-form-id").on("submit", function(event) {
event.preventDefault();
var searchText = $("#location-txt").val();
if (searchText) {
var getData = $("#gmap-form-id").serialize();
var URL = "frags/g-maps.jsp?" + getData;
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if (phoneWidth < 650) {
var gmapOffsetTop = $(".g-maps-container").offset().top - 50;
$(document).scrollTop(gmapOffsetTop);
}
});
}
});
//end
//card detail nav



$('.card-nav li a.card-nav-sub').click(function(e) {
e.preventDefault();
if($(this).parent().hasClass('active')){
$(this).parent().toggleClass('active');
}else {
$('.card-nav li').removeClass('active');
$(this).parent().addClass('active');
}
});
$('.credit-menu').click(function() {
$('.card-nav').slideToggle();
});


//end
$('.gift-table').find('.cart-row').each(function() {
var rowLen = $('.gift-table').find('.cart-row').length;
$('.gift-table').find('.cart-row').css('border-bottom', 'none');
if (rowLen > 1 && phoneWidth > 768) {
$('.gift-table').find('.cart-row').css('border-bottom', '1px solid #E1E1E1');
}
});
$('.order-table-content').find('.cart-row').each(function() {
var rowLen2 = $('.order-table-content').find('.cart-row').length;
$('.order-table-content').find('.cart-row').css('border-bottom', 'none');
if (rowLen2 > 1 && phoneWidth > 768) {
$('.order-table-content').find('.cart-row').css('border-bottom', '1px solid #E1E1E1');
}
});
$(".selected-li").click(function(){
lpobj.manipulateMyCardOptions(this);
});
$(".custom-select-options li").click(function(){
//alert("test");
var selectedText = $(this).find(".option-text").text();
var selectList = $(this).closest(".custom-select-options").attr("id");
var selectLink = $(this).find(".selectId").val();
var actualContent = selectLink - 1;
$(this).closest(".custom-select-list").find(".selected-text").text("").text(selectedText);
lpobj.manipulateMyCardOptions(this);
$("."+selectList+" .cards-content").hide();
$("."+selectList+" .cards-content").eq(actualContent).fadeIn(500);
});

$( ".custom-select-options li" ).click(function() {
var id = $(this).find(".selectId").val();
var url=location.href.split("?",1);
location.href=url+'?refNo='+id+'&selectedCard='+$(this).text();
});

$(".wrapper").click(function(e) {
if (!$(e.target).closest("ul").hasClass("custom-select-list")) {
$(".custom-select-options").hide();
$(".selected-li").removeClass("active");
}
if(!$(e.target).hasClass("uname") || !$(e.target).closest(".loggedin-menu a")){
if($('.uname').hasClass('acitve')){
$('.uname').click();
}
}
if(!$(e.target).hasClass("mob-uname") || !$(e.target).closest(".loggedin-menu a")){
if($('.mob-uname').hasClass('acitve')){
$('.mob-uname').click();
}
}
if (!$(e.target).closest("ul").hasClass("card-nav")) {
$(".card-nav li").removeClass("active")
}
});
/* js for the card-detail.jsp for the custom select ends here */
$('.capatcha-txt, .captcha-input').live('blur',function(){
if($(this).val() == ''){

var URL = 'frags/captcha-error.jsp';
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#captcha-error-popup').modal('show');
setTimeout(function() {
$('#captcha-error-popup').html(data);
});
}
});
}
});
//datepicker
//$('input.date_data').trigger('click');
$(".date_data").live('keydown focus',function(){
$(".date_data").datepicker({
dateFormat: 'dd/mm/yy'
});
});
//end
//lens popup
$(".lens_popuplink a").on('click', function(e) {
e.preventDefault();
var URL = contextPath+"/common/frag/lens-image-popup.jsp"
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#lens-image-popup').html(data);
$('#lens-image-popup').modal('show');
}
});
});
//end
//srart: cart item remove
$(".card-close").live('click', function(e) {
e.preventDefault();
var delcount = $(this).closest('.cards-content').children('.mycards-row').size();
var contextPath = $("#mobilePage_contextPath").val();
var cardId = $(this).attr( "id" );
if (delcount >= 1) {
var URL = contextPath + "/users/credit/includes/credit-card-delete.jsp?cardId=" + cardId;

var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('#card-delete-modal').html(data);
$('#card-delete-modal').modal('show');
}
});
$(this).addClass('active');
$('.acc-btn').live('click', function() {
$('.card-close.active').closest('.mycards-row').remove();
$('.delview-modal').modal('hide');
});
$('.can-btn').live('click', function() {
$('.card-close.active').removeClass('active');
});
$('.modal-backdrop').live('click', function() {
$('.card-close.active').removeClass('active');
});
}
if (delcount == 1) {
$('.acc-btn').live('click', function() {
$('.card-close.active').closest('.mycards-row').remove();
$(".cards-content").remove();
$('.delview-modal').modal('hide');
});
$('.can-btn').live('click', function() {
$('.card-close.active').removeClass('active');
});
$('.modal-backdrop').live('click', function() {
$('.card-close.active').removeClass('active');
});
}

});
//end


// code to submit form for Credt card statement download --START
$("#downloadingStatement").click(function(){
var radioVal=$('input[name="download"]:checked').val();
if(radioVal=='current_month'){
$('#current_month_downloading').submit();
}
else if(radioVal=='previous_months'){
var selectVal=$('#previous_months_select option:selected').val();
$('#idURL').val(selectVal);
if(selectVal!=null&&selectVal!=''){
$('#previous_months_downloading').submit();
}
}
});
// code to submit form for Credt card statement download --END
$(".credit-radio-download").click(function(){
$(".descargar-btn").removeClass("disabled");
if($(this).hasClass("download-prev-month")){
$(".previous-months").show();
if($(".previous-months").val()=="mes-anterior"){
$(".descargar-btn").addClass("disabled");
}
}
else{
$(".previous-months").hide();

}
});
$(".previous-months").live('change',function(){
$(this).find("option[value='mes-anterior']").remove();
$(".descargar-btn").removeClass("disabled");
});
$(".filter-container .veiw-more").live('click',function(){
$(this).closest(".filter-section").find(".load-on-veiw-more").removeClass("hide");
$(this).addClass("hide");
$(this).siblings(".veiw-less").removeClass("hide");
});
$(".filter-container .veiw-less").live('click',function(){
$(this).closest(".filter-section").find(".load-on-veiw-more").addClass("hide");
$(this).addClass("hide");
$(this).siblings(".veiw-more").removeClass("hide");
});
$(".marca-sub-tab").live('click',function(){
var showContent = $(this).attr("id")+"-content";
$(".marca-sub-tab").removeClass("selected");
$(this).addClass("selected");
$(".macro-tab-content").addClass("hide");
$("."+showContent).removeClass("hide");
});
});


lpobj = {
showMegamenu: function() {
var $lefty = $(".mega-menu-cont");
$lefty.animate({
left: parseInt($lefty.css('left'), 10) == 0 ?
-$lefty.outerWidth() : 0
});
$('.header-navigation-left .btn-navbar').addClass('active-btn');
$(".mega-menu-cont").show();
},
megamenuSetHt: function() {
var winheight = $(window).height();
lpobj.calculateBodyScrollHeight();
if (parseInt($("body").data("scrolltop")) != 0) {
$(".header-promo").hide();
}
var headerHeight = $('.header').height();
if ($('.header-navigation').hasClass('affix')) {
var headerHeight = $('.header').height();
}
var actualHeight = winheight - headerHeight - 20;
var actualHeightN = winheight - headerHeight;
$('.menu-right-cont').css('height', actualHeightN);
$(".header_shopcat_container").css({'overflow-y': 'scroll', 'height': actualHeight});
$(".mega-left").css({'overflow-y': 'scroll', 'height': actualHeight});
$("body").css({'overflow': 'hidden', 'height': winheight, 'position': 'fixed'});
if (navigator.userAgent.match(/iPad/i) && $(window).width() > 768 && $(".header-navigation").css("position") == "relative") {
$(".header .navbar .btn-navbar").css("-webkit-text-stroke", "0.4px");
}
},
hideMegamenu: function() {
$('.header-navigation-left').removeClass('touched');
$('.header-navigation-left .btn-navbar').removeClass('active-btn');
$(".mega-menu-cont").animate({
left: parseInt(-$(document).width())
}, 500, function() {
$(".mega-menu-cont").hide();
});
$("body").css({'overflow-y': 'auto', 'height': '100%', 'position': 'static'});
lpobj.setBodyHeightToOrginal();
if (parseInt($("body").data("scrolltop")) != 0) {
$(".header-promo").show();
}
if (navigator.userAgent.match(/iPad/i) && $(window).width() > 768) {
$(".header .navbar .btn-navbar").css("-webkit-text-stroke", "0.3px");
}
},
showMegamenuMobile: function() {
var winHt = $(window).height();
$(".mega-left li a").removeClass('active');
$(".mobmenuContent").animate({"width": "85%"})
$(".wrapper").height(winHt);
//$(".page-overlay").show().css('left', '85%');
},
hideMegamenuMobile: function() {
$('.header-navigation-left').removeClass('active');
$(".mobmenuContent").animate({"width": "0"});
$(".wrapper").height("100%");
$("body").removeClass("menu-active");
//$(".page-overlay").hide();

},
showFilterSection: function() {
$(".filter-btn").toggleClass('active');
var $lefty = $(".filter-container");
$lefty.animate({
right: parseInt($lefty.css('right'), 10) == 0 ?
-$lefty.outerWidth() : 0
}).show();
$('.page-overlay').show();
$('.filter-btn-main').css('z-index', 9999);
$(".wrapper").css({'height': winHeight, 'overflow': 'hidden'});
},
hideOverlayFilter: function() {
$('.page-overlay').hide();
$('.filter-btn-main').css('z-index', 1);
$(".wrapper").css({'height': '100%', 'overflow-y': 'visible'});
},
setFilterSectionHt: function() {
var winHt = $(window).height();
var headerHeight = $('.header').height();
var actualHeight = winHt - headerHeight - 140;
var productlistbanner = $('.product-list-banner').height();
$('.product-list-banner').hide();
$('.footer').hide();
/* var dynatop = productlistbanner + 102;
alert($('.filter-container').height());*/
$(".filter-container").css({'height': actualHeight, 'overflow-y': 'scroll'});
$(".wrapper").css({'height': winHt, 'overflow': 'hidden'});
},
showFilterSectionMobile: function() {
$(".filter-btn").addClass('active');
var winHt = $(window).height();
var $lefty = $(".filter-container");
$lefty.animate({
right: parseInt($lefty.css('right'), 10) == 0 ?
-$lefty.outerWidth() : 0
}).show();
$('.page-overlay').show();
$('.filter-container').css('z-index', 9999);
},
setFilterSectionMobileHtPot: function() {
var winHt = $(window).height();
$(".filter-container").css({'height': winHt - 20, 'overflow-y': 'scroll'});
$(".wrapper").css({'height': winHt, 'overflow': 'hidden'});
$(".filter-btn").removeClass('active');
//$(".filter-btn").css({ 'display': 'none'});

},
setFilterSectionMobileHtLan: function() {
var winHt = $(window).height();
$(".filter-container").css({'height': winHt - 30, 'overflow-y': 'scroll'});
$(".wrapper").css({'height': winHt, 'overflow': 'hidden'});
},
homeTabletBannerRightSection: function() {

var leftSectionHt = $('.banner-container .span12  .tabletslider li').height();

$('.banner-container .span3').height(leftSectionHt).css('position', 'relative');
var marginBottom = leftSectionHt - (2 * $('.banner-container-rtp').height());
$(".banner-container-rtp").css('margin-bottom', marginBottom);

},
homeBannerRightSection: function() {
var leftSectionHt = $('.banner-container .span12 .homelslider li').height();
$('.banner-container .span3').height(leftSectionHt).css('position', 'relative');
var marginBottom = leftSectionHt - (2 * $('.banner-container-rtp').height());
$(".banner-container-rtp").css('margin-bottom', marginBottom);
},
getFocus: function() {
setTimeout(function() {
$('.field-search').focus()
}, 1000);
},
showOverlay: function() {
$('.page-overlay').show();
},
hideOverlay: function() {
$('.page-overlay').hide();
},
initzoom: function() {
$('#zoom-target').elevateZoom({
zoomType: "inner",
galleryActiveClass: "active",
gallery: 'pdp-gallery',
cursor: "crosshair",
zoomWindowFadeIn: 500,
zoomWindowFadeOut: 75
});
},
swipebannersliders: function(obj) {
var phoneWidth = $(window).width();
if (phoneWidth >= 570 && phoneWidth <= 1024) {
obj.touchwipe({
wipeLeft: function(e) {
obj.trigger('next', 1);
e.preventDefault();
},
wipeRight: function(e) {
obj.trigger('prev', 1);
e.preventDefault();
},
min_move_x: 25,
preventDefaultEvents: false
});
}
if (phoneWidth < 570)
{
obj.find('li').touchwipe({
wipeLeft: function(e) {
obj.trigger('next', 1);
e.preventDefault();
},
wipeRight: function(e) {
obj.trigger('prev', 1);
e.preventDefault();
},
min_move_x: 25,
preventDefaultEvents: false
});

}
},
homeslideInit: function(pp) {
pp.carouFredSel({
circular: true,
infinite: true,
scroll: {
fx: "crossfade"
},
responsive: true,
auto: {
play: true,
pauseOnHover: true
},
pagination: ".lvpool-caroufredsel-pag",
swipe: {
onTouch: false,
onMouse: false
},
onCreate: function() {
$(window).on('resize', function() {
	if(pp.children().first().height()==0){
       if(phoneWidth <=768 ){
          pp.parent().add(pp).css('height', pp.children().first().height()+"270"+ 'px');
       }else{
       	  pp.parent().add(pp).css('height', pp.children().first().height()+"350"+ 'px');
       }

	}else{
pp.parent().add(pp).css('height', pp.children().first().height()-20 + 'px');


	}
}).trigger('resize');
lpobj.swipebannersliders(pp);
}


});
},
tableslideInit: function() {
$('.tabletslider').carouFredSel({
circular: true,
infinite: true,
scroll: {
fx: "crossfade"
},
responsive: true,
auto: {
play: true,
pauseOnHover: true
},
pagination: ".lvpool-caroufredsel-pag-tab",
swipe: {
onTouch: false,
onMouse: false
},
onCreate: function() {
$(window).on('resize', function() {
	if($('.tabletslider').children().first().height()==0){
       if(phoneWidth <=768 ){
          $('.tabletslider').parent().add($('.tabletslider')).css('height', $('.tabletslider').children().first().height()+"270"+ 'px');
       }else{
       	  $('.tabletslider').parent().add($('.tabletslider')).css('height', $('.tabletslider').children().first().height()+"350"+ 'px');
       }

	}else{
$('.tabletslider').parent().add($('.tabletslider')).css('height', $('.tabletslider').children().first().height() + 'px');


	}
}).trigger('resize');
lpobj.swipebannersliders($('.tabletslider'));
}


});
},
mslide: function(i, itemc, finin, autof, abc, bca, direcn) {
var phoneWidth = $(window).width();
var scrollSet = '';
if (phoneWidth < 650) {
scrollSet = 2;
}
else {
if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('catlevelbanner'))
{
scrollSet = 2;
}
else
{
scrollSet = itemc;
}
}
if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('pdp-image-carousel')) {
$('.globalslider').eq(i).carouFredSel({
items: itemc,
scroll: scrollSet,
prev: abc,
next: bca,
auto: autof,
direction: direcn,
circular: finin,
infinite: finin,
swipe: {
onMouse: false,
onTouch: false
}
});
}
else if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('breadcrumb-slider') || $('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('mobilemenu-slider')) {
$('.globalslider').eq(i).carouFredSel({
items: itemc,
scroll: {
items: 1,
easing: "cubic",
duration: 9,
fx: "scroll"
},
width: '100%',
responsive: true,
prev: abc,
next: bca,
auto: autof,
direction: direcn,
circular: finin,
infinite: finin,
swipe: {
onMouse: false,
onTouch: false
}
});
}
else
{
$('.globalslider').eq(i).carouFredSel({
items: itemc,
scroll: scrollSet,
width: '100%',
responsive: true,
prev: abc,
next: bca,
auto: autof,
direction: direcn,
circular: finin,
infinite: finin,
swipe: {
onMouse: false,
onTouch: false
}
});
}
if (phoneWidth >= 570 && phoneWidth <= 1024) {
$('.globalslider').eq(i).find('li').touchwipe({
wipeLeft: function(e) {
$('.globalslider').eq(i).trigger('next', itemc);
e.preventDefault();
},
wipeRight: function(e) {
$('.globalslider').eq(i).trigger('prev', itemc);
e.preventDefault();
},
min_move_x: 20,
preventDefaultEvents: false

});
}
if (phoneWidth < 570)
{
$('.globalslider').eq(i).find('li').touchwipe({
wipeLeft: function(e) {
$('.globalslider').eq(i).trigger('next', itemc);
e.preventDefault();
},
wipeRight: function(e) {
$('.globalslider').eq(i).trigger('prev', itemc);
e.preventDefault();
},
min_move_x: 25,
preventDefaultEvents: false
});

}
},
initializesliders: function(i) {
for (i = 0; i <= 10; i++) {
var phoneWidth = $(window).width();
var abc = $('.globalslider').eq(i).parents('.globalslidercontainer').find('.prev');
var bca = $('.globalslider').eq(i).parents('.globalslidercontainer').find('.next');
var autof = eval($('.globalslider').eq(i).attr('title'));
if (autof == "" || autof == undefined) {
autof = true;
// To make slider automatic this value should be true
}
var finin = eval($('.globalslider').eq(i).attr('alt'));
if (finin == "false") {
finin = false;
}
var direcn = $('.globalslider').eq(i).attr('hreflang');
if (direcn == "" || direcn == undefined) {
direcn = 'left';
// For Horizental slider

}
var itemc = '';

if (phoneWidth < 570 || (phoneWidth < 650 && $(window).height() < 370))
{
itemc = parseInt($('.globalslider').eq(i).parents('.globalslidercontainer').find('.itemCount').attr('hreflang'));

}
else
{
itemc = parseInt($('.globalslider').eq(i).parents('.globalslidercontainer').find('.itemCount').val());

}
if (isNaN(parseInt(itemc))) {
itemc = 1; // For Slider item count
}
lpobj.mslide(i, itemc, finin, autof, abc, bca, direcn);
}
},
refreshcontent: function() {
var phoneWidth = $(window).width();
var URL = $(".filter-by input").attr('src');
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('.product-list-section').hide();
$('.product-list-section').html(data);
$('.product-list-section').fadeIn(300);
var currentObj = $('.view-selection').find('a.active');
if ($(currentObj).hasClass('large-veiw')) {
$('.product-list-section').addClass('large-view-active');
}
else {
$('.product-list-section').removeClass('large-view-active');
}
}
if (phoneWidth < 767) {
$('.pdt-list-detail .border').remove();
}

});

},
macRefreshContent: function() {
var URL = "frags/mac-product-list.jsp";
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
if ($.trim(data) != "") {
$('.product-list-section').hide();
$('.product-list-section').html(data);
$('.product-list-section').fadeIn(300);
}
});
},
showview: function(obj) {
if ($(obj).hasClass('large-veiw')) {
$('.product-list-section').addClass('large-view-active');
$('#changevalue').val('large-veiw');
}
else {
$('.product-list-section').removeClass('large-view-active');
$('#changevalue').val('small-veiw');
}
},
ajaxGetContent: function(URL, Type) {
return $.ajax(
{
type: "GET",
url: URL,
datatype: Type
});
},
addlabel: function(label) {
if (label != "") {
var label_count = $('.filter-tabs-container').find('.filter-tabs').length;
var filter_label = '<li class="filter-tabs selected">' + label + '</li>';
$('.filter-tabs-container').find('.filter-tabs-right').append(filter_label).fadeIn(500);
lpobj.refreshcontent();
lpobj.hideFacetFilter();
lpobj.hideOverlayFilter();

}
var filtersAvaiable1 = $('.filter-tabs-container').find('.filter-tabs.selected').length;
if (filtersAvaiable1 > 0) {
$('#clearAll').show();
}
},
removelabel: function(label) {
var label_count = $('.filter-tabs-container').find('.filter-tabs').length;
if (label != "") {
for (i = 0; i < label_count; i++) {
var key_label = $.trim($('.filter-tabs-container').find('.filter-tabs').eq(i).text());
if (key_label == label)
{
$('.filter-tabs-container').find('.filter-tabs').eq(i).remove();
}
}
}
var filtersAvaiable = $('.filter-tabs-container').find('.filter-tabs.selected').length;
if (filtersAvaiable == 0) {
$('#clearAll').hide();
}
lpobj.removecheck(label, 'one');
},
removecheck: function(label, status) {
var count = $('.filter-container').find('.filter-section').find('.span6.active').length;
var label = label;
if (status == 'one') {
for (c = 0; c < count; c++) {
var labeltext = $.trim($('.filter-container').find('.filter-section').find('.span6.active').eq(c).find('.refine-label').text());
var labeltext1 = labeltext.split(' ');
if (labeltext == label) {
$('.filter-section').find('.span6.active').eq(c).removeClass('active');
}
}
}
else if (status == 'clearall') {
$('.filter-section').find('.span6.active').removeClass('active');
}
},
hideFacetFilter: function() {
$(".filter-container").animate({
right: parseInt(-$(document).width())
}).hide();
if ($('.filter-btn').hasClass('active')) {
$('.filter-btn').removeClass('active');
}
},
countChecked: function(obj) {

var phoneWidth = $(window).width();

var n = $('.compare-check input[type="checkbox"]:checked').size();

// var n = $(".compare-check input:checked").length;
if (n == 1) {
$(".compare-row").addClass('show').removeClass('active');
}
else if (n > 1) {
$(".compare-row").addClass('active');
if ((n > 2) && phoneWidth < 767) {
//lpobj.showCompareError(obj);
}
if (n > 4) {
// lpobj.showCompareError(obj);
}

}
else if (n == 0) {
$(".compare-row").removeClass('show');
}
},
showCompareError: function(obj) {

//$(obj).attr('checked', true);
$('#compare-error').modal('show');

},
showMobileCompareError: function(obj) {

//$(obj).attr('checked', true);
$('#compare-error-mobile').modal('show');

},
initTabNavigation: function() {
$('.tabnavigationcontainer .tabs a.tablink').live('click', function() {

if (!($(this).parent('li').hasClass('active')))
{

var tabLinkVal = $(this).find('.tabID').val();


if(tabLinkVal == "2"){ // user selects bancomer tab
// check for bancomer payment type available or not,
// if not show error message and retain in the credit card tab
if($('.alertas').exists()){
$('.alertas').hide(500);
}
var isCieAvailable = $("#cieNotAvailable").val();
if(isCieAvailable == "false"){
/*console.log('CIE Bancomer is not available...!');*/
$('#bancomerErrorId').show();
return false;
}
}
var actualContent = tabLinkVal - 1;
$(this).parents('.tabs').find('li').removeClass('active');
$(this).parent('li').addClass('active');
$(this).parents('.tabnavigationcontainer').find('.tab-content').hide();
$(this).parents('.tabnavigationcontainer').find('.tab-content').eq(actualContent).fadeIn(300);
if ($(this).parents('.tabnavigationcontainer').find('.tab-content').find('.globalslidercontainer').hasClass('mclass'))
{
lpobj.initializesliders();

}

}
});

},
pdpTabnavigation: function() {
$('.tabnavigationcontainer .tabs a.pdpTab').live('click', function() {
var phoneWidth = $(window).width();
if (!($(this).parent('li').hasClass('active')))
{
var tabLinkVal = $(this).find('.tabID').val();
var actualContent = tabLinkVal - 1;
$(this).parents('.tabs').find('li').removeClass('active');
$(this).parent('li').addClass('active');
$(this).parents('.tabnavigationcontainer').find('.tab-content').hide();
$(this).parents('.tabnavigationcontainer').find('.tab-content').eq(actualContent).fadeIn(300);

if ((phoneWidth > 400) && (phoneWidth < 767)) {
$('.share-container').animate({bottom: 120}, 500);
$('.scrollpane1').jScrollPane({showArrows: false, autoReinitialise: false});
}
else {
$('.share-container').animate({bottom: 320}, 500);
$('.scrollpane1').jScrollPane({showArrows: false, autoReinitialise: false});
}
lpobj.showOverlay();
} else {
$(this).parent('li').removeClass('active');
$('.share-container').animate({bottom: 0}, 500);
lpobj.hideOverlay();
}
});
},
scrollpaneInit: function() {
var isScroll = $('.scrollpane').length;
if (isScroll > 0) {
$('.scrollpane').jScrollPane({showArrows: false, autoReinitialise: true});
}
},
showScroll: function(scroll, requiredArrow, reinitialise) {
var api = $(scroll).jScrollPane({showArrows: requiredArrow, autoReinitialise: reinitialise}).data().jsp;
api.reinitialise();
},
removeScroll: function(scroll, requiredArrow, reinitialise) {
var api = $(scroll).jScrollPane({showArrows: requiredArrow, autoReinitialise: reinitialise}).data().jsp;
api.destroy();
},
calculateBodyScrollHeight: function() {
var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
$("body").data("scrolltop", scrollTop);
},
scrollModalOnTop: function() {
lpobj.calculateBodyScrollHeight();
$(".modal")
.css({
position: 'absolute',
marginTop: $(window).scrollTop() + 'px',
bottom: 'auto'
});
var winheight = $(window).height();
$('body').css('height', winheight);
},
setBodyHeightToOrginal: function() {
$(document).scrollTop($("body").data("scrolltop"));
},
animateBodyHeightAfterSearchClose: function() {
setTimeout(function() {
$("body").css({'height': '100%'});
if (navigator.userAgent.match(/iPhone/i)) {
$('#search-container').modal("hide");
$("#field-search").val("");
lpobj.setBodyHeightToOrginal();
$(".modal-scrollable").removeClass("ipad-modal-scroll-locked");
}
else {
$("html, body").animate({scrollTop: $("body").data("scrolltop") + "px"}, 30, function() {
$('#search-container').modal("hide");
$(".modal-scrollable").removeClass("ipad-modal-scroll-locked");
$("#field-search").val("");
});
}
}, 150);
},
minicartopen: function() {
var phoneWidth = $(window).width();
$('.mini-cart-container').slideDown(300);
$('.shopping-bag').addClass('active');
lpobj.scrollpaneInit();
},
minicartclose: function() {
$('.mini-cart-container').slideUp(200);
$('.shopping-bag').removeClass('active');
},
showMacMoreSection: function() {
var winHeight = $(window).height();
$('a.mac-more').css('display', 'none');
$('a.cancel-more').css('display', 'block');
$('.mac-more-nav').slideDown(100);
$('.page-overlay').fadeIn(300);
$(".wrapper").css({'height': winHeight, 'overflow': 'hidden'});
},
hideMacMoreSection: function() {
$('a.mac-more').css('display', 'block');
$('a.cancel-more').css('display', 'none');
$('.mac-more-nav').slideUp(300);
$('.page-overlay').fadeOut(300);
$(".wrapper").css({'height': '100%', 'overflow-y': 'visible'});
},
setMacMoreSectionHt: function() {
var winHt = $(window).height();
var headerHeight = $('.header').height();
var actualHeight = winHt - headerHeight - 40;
setTimeout(function() {
$(".mac-more-nav").css({'height': actualHeight, 'overflow-y': 'scroll'});
}, 300);
$(".wrapper").css({'height': winHt, 'overflow': 'hidden'});
},
enableAirtimeContinuarBtn: function(obj) {
var phoneWidth = $(window).width();
var n = $(".phone-details input:checked").length;

if (n > 0) {
$(".continuar-btn").addClass('active');
$(".airtime-checkout-form").attr('action', 'airtime-checkout-payment.jsp');
if (phoneWidth < 767) {
$('.continuar-btn-main').addClass('pos-fixed');
}
}
else {
$(".continuar-btn").removeClass('active');
$(".airtime-checkout-form").attr('action', '');
if (phoneWidth < 767) {
$('.continuar-btn-main').removeClass('pos-fixed');
}
}
},
showPhoneDetailClearMsg: function(obj) {
$('#phone-detail-clear-msg').modal('show');

$('.del-btn').live('click', function() {
$(".selected-phone-details").remove();
$('#phone-detail-clear-msg').modal('hide');
lpobj.enableAirtimeContinuarBtn(obj);
// submit selected phone form to remove phone details from profile
$( '#'+$(obj).attr('selectedForm') ).submit();
});
$('.no-btn').live('click', function() {
$(".phone-details").removeClass('selected-phone-details');
});

},
showLoginPopup: function(source) {
var contextPath = $("#mobilePage_contextPath").val();
var URL = contextPath + "/users/frag/loginPopup.jsp";
if(source == 'airtime') {
URL += '?airTimeCheckout=true';
}
if(source == 'upateProfile') {
URL += '?from=upateProfile';
}
if(source == 'changePassword') {
URL += '?from=changePassword';
}
var data = lpobj.ajaxGetContent(URL, "html");
data.success(function(data) {
lpobj.initTabNavigation();
setTimeout(function() {
$("#userLoginPopUp form").validate({
meta: "validate"
});
}, 100);
$("#userLoginPopUp").html(data);
$("#userLoginPopUp").modal('show');
});
},
showHideAirtimeExpiary: function () {
var selectedValue = $('.select-card option:selected').val();
var selected = document.getElementById(selectedValue);
if(selected!=null && selected.value == 'LPC'){
$('.expiary-detail').show();
} else {
$('.expiary-detail').hide();
}
},
bindScrollevent: function() {
$(window).bind("scroll", function() {
if ($(".header-navigation").hasClass("input-focus")) {
$(".header-navigation").removeClass("affix");
}
});
},
manipulateMyCardOptions: function(selectObj){
if($(selectObj).hasClass("active")){
$(selectObj).closest(".custom-select-list").find(".custom-select-options").hide();
$(selectObj).closest(".custom-select-list").find(".selected-li").removeClass("active");
}
else{
$(selectObj).closest(".custom-select-list").find(".selected-li").addClass("active");
$(selectObj).closest(".custom-select-list").find(".custom-select-options").show();
}
},
addclasstoultabsinpdp:function(){
var tabnavigationcontainer =  $('.tabnavigationcontainer ul.tabs li').length;
if(tabnavigationcontainer>3)
{
$('div.desc-cont').addClass('desc-conttabs');
$('div.share-this,div.pdp-buy-btn').addClass('desc-conttabs');
				 	
}
			
},

setdynamicheight:function(classname,extrasize,selectheight){
var highest = null;
var hi = 0;
var i = 0;
$("."+classname).each(function(){
$("."+selectheight).attr('style','');	  
//alert($(this).height());
var h = $(this).height();
if(h > hi){
hi = h;
highest = $(this).height()+extrasize;
}
});
$("."+selectheight).attr('style','height:'+highest+'px!important');
}

            


		
}
$('.mega-left ul li a:first').addClass('active');

$('.updateprofilelink').live('click', function() {
lpobj.showLoginPopup($(this).attr( "title" ));
});

$('.nospc_nosp').bind('keypress', function (event) {
//alert(event.charCode);
var regex = new RegExp("^[a-zA-Z0-9\b]+$");
var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
if (event.charCode == 32) {
event.preventDefault();
return false;
}
});


if($(".myaccount-container").attr("id"))
{
var ids = $(".myaccount-container").attr("id");
$("."+ids).addClass( "active" );
}

//replacespace('.card-number','str');
//replacespace('.checkout-card-number','str');

function replacespace(tagclass, replacesting)
{
var replacesting = $(tagclass).html();
if(replacesting != null)
{
var replaced = replacesting.replace(/.{4}/g, function (value, index) {
return value + (index % 40 == 36 ? '\n' : ' ');
});

}
$(tagclass).html(replaced);
}




//console.log($(".myaccount-container").attr("id"));
})(jQuery);

function refreshsorturl(x)
{
var changevalue = $("#changevalue").val();
var changelocation = '';
if(changevalue!='')
{
changelocation = '&view='+changevalue;
}
else {
changelocation = '';
}
window.location.href = x+changelocation;
}

$(function() {

$.fn.exists = function() {
return $(this).length > 0;
}

/*if($('.mega-leftul li a').hasClass('active'))
{
var onloadmenusrc = $('.mega-leftul li a img:first').attr('src');
var onloadurl_src = onloadmenusrc.substring(0,onloadmenusrc.substring(0).indexOf("png")-1);
var onloadnew_src=onloadurl_src+="_mo.png";
$('.mega-leftul li a img:first').attr('src',onloadnew_src);
}*/


var itemindex = 0;
$("ul.pdt-list-detail li.span3").each(function() {
$(this).attr('id','pdt-list-detail_'+itemindex);
itemindex++;
});
if($('#mediaBanner').exists()){
if(phoneWidth > 320)
{
$("#pdt-list-detail_1").after("<li class='border'></li>");

}
}

$('.txt-add-normalmessage').live('click', function() {
$(this).next(".ui-layer-normalmessage").slideToggle( "slow" );
//lpobj.showLoginPopup($(this).attr( "title" ));
});
$('.txt-add-ebookmessage').live('click', function() {
$(this).next(".ui-layer-ebookmessage").slideToggle( "slow" );
//lpobj.showLoginPopup($(this).attr( "title" ));
});


// plp product height allignment

var heightcontent=$('.precios_producto').find('.precio-promocion-modulo');
if(heightcontent){
//$('.precio-modulo').addClass('moreheight');
if($('.prod-info').exists()){
if(!$('.ebookpdpdp').exists()){
if (phoneWidth >= 768) 
{lpobj.setdynamicheight('moreheight',1,'moreheight');}
else {lpobj.setdynamicheight('prod-info',1,'moreheight'); }
}
}
}

lpobj.addclasstoultabsinpdp();
/*console.log($('.compare-desc-text_log').html());*/
});


$(function(){
$('.prod-info').append("<span class='arrowplp'></span>");
})


$(function(){

$('.large-veiw').on('click',function(){

        $('.pdt-list li.span3').css({
           'width': '50% ',
            'height': '580px',
            'max-height': '520px',
            'margin': '0',
            'padding': '0px'

       });
    
    $('.arrowplp').css({
           'display': 'none'

       });
     $('.foto-list').css({
           'display': '100% ',
         'width':'100%',
         'height':'auto'

       });
   
    })


$('.small-veiw').on('click',function(){

        $('.pdt-list li.span3').css({
           'width': '25% ',
            'height': '380px',
            'max-height': '520px',
            'margin': '0',
            'padding': '0px'

       });
    
    $('.arrowplp').css({
           'display': 'none'

       });
     $('.foto-list').css({
           'display': '100% ',
         'width':'100%',
         'height':'auto'

       });
   
    })

});


$(function(){
	var reg = /^\d+$/;
	    $('.row-val').each(function(a,b){
	      var oyoyoy = $(this).text();
	if (oyoyoy.match(reg)){
	    $(this).addClass('event_reg_');
	}
	        else{}
	    });
	});

$(function(){
	
	$('.load-more').text('Mostrar mas productos');
	
})

$( document ).ready(function() {
   $(function(){
	   
	   var count= $('.tabs li').length;
	      		
	   if ( count > 3 ) {
				$('.tabs li:nth-child(4)').remove();
		}
})
});


//para big ticket
$(function(){
		var lsku = $('body').find('input');
		$(lsku).each(function(a,b){
			var t02 = $(this).attr('value');
			
			if(t02 == "Big Ticket"){
				//console.log('hola ka ase');
			$('.share-container .span3').css({
				'width':'40%'
			});
			
			
			$('.share-container .span6').css("cssText", "width: 30% !important;");
			
			
			$('#addTocartButton').css({
			'background':'none',
			'background-size': '13%'
			});
			
			}
		});
});

//esconde informacion para la direccion de entrega
$(".accright-section div").each(function(index, element) {
if(index>=22){element.remove();}
});



//Cambio para insertar el menu de marcas en WAP
$(function(){
	
	//Una validación temporal para detectar si es un ipad, debido a que no esta implementado para este dispositivo
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	
	if(!isiPad){
			var htmlFirstLevel = '<li><a href="/tienda/m" title="Marcas" rel="catmarcas" class="Marcas" calss="active">  Marcas</a></li>';		

			$('#megaMenu_images').prepend(htmlFirstLevel);

			//Se hace uso del recurso marcascontent.html cargado de forma asincrona para pintar las marcas destacadas
			$.get( "/mobileAssets/ajax/marcascontent.html", function( data ) {
			  	$(".header_shopcat_container.subcat0").prepend(data);
			  	//alert(data);

			  				$('span.visible-phone.marcas').click(function() {
								//Buscamos el elemento padre del item de la lista y obtenemos el link del elemento ancla para hacer una redirección.
								var link2Landing= $(this).parent().find("a").attr("href");
								 window.location = link2Landing;

			 				 });
			});
	}
});


 $(".banner-container .span12  .banner-container-lt .caroufredsel_wrapper").css({"margin":"0px 0px 0px 0px","width":"100%"});


$(function(){
/**
 * jQuery Bar Rating Plugin v1.0.5
 *
 * http://github.com/antennaio/jquery-bar-rating
 *
 * Copyright (c) 2012-2014 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    var BarRating, root;

    root = typeof window !== "undefined" && window !== null ? window : global;

    root.BarRating = BarRating = (function () {

        function BarRating() {
            this.show = function () {
                var $this = $(this.elem),
                    $widget,
                    $all,
                    userOptions = this.options,
                    nextAllorPreviousAll,
                    initialOption;

                // run only once
                if (!$this.data('barrating')) {

                    if (userOptions.initialRating) {
                        initialOption = $('option[value="' + userOptions.initialRating  + '"]', $this);
                    } else {
                        initialOption = $('option:selected', $this);
                    }

                    $this.data('barrating', {

                        // initial rating based on the OPTION value
                        currentRatingValue:initialOption.val(),
                        currentRatingText:initialOption.text(),

                        // rating will be restored by calling destroy method
                        originalRatingValue:initialOption.val(),
                        originalRatingText:initialOption.text()

                    });

                    $widget = $('<div />', { 'class':'br-widget' }).insertAfter($this);

                    // create A elements that will replace OPTIONs
                    $this.find('option').each(function () {
                        var val, text, $a, $span;

                        val = $(this).val();

                        // create ratings - but only if val is defined
                        if (val) {
                            text = $(this).text();
                            $a = $('<a />', { href:'#', 'data-rating-value':val, 'data-rating-text':text });
                            $span = $('<span />', { text:(userOptions.showValues) ? text : '' });

                            $widget.append($a.append($span));
                        }

                    });

                    // append .br-current-rating div to the widget
                    if (userOptions.showSelectedRating) {
                        $widget.append($('<div />', { text:'', 'class':'br-current-rating' }));
                    }

                    // first OPTION empty - allow deselecting of ratings
                    $this.data('barrating').deselectable = (!$this.find('option:first').val()) ? true : false;

                    // use different jQuery function depending on the 'reverse' setting
                    if (userOptions.reverse) {
                        nextAllorPreviousAll = 'nextAll';
                    } else {
                        nextAllorPreviousAll = 'prevAll';
                    }

                    // additional classes for the widget
                    if (userOptions.reverse) {
                        $widget.addClass('br-reverse');
                    }

                    if (userOptions.readonly) {
                        $widget.addClass('br-readonly');
                    }

                    // rating change event
                    $widget.on('ratingchange',
                        function (event, value, text) {

                            // value or text undefined?
                            value = value ? value : $this.data('barrating').currentRatingValue;
                            text = text ? text : $this.data('barrating').currentRatingText;

                            // change selected OPTION in the select box (now hidden)
                            $this.find('option[value="' + value + '"]').prop('selected', true);

                            // update .br-current-rating div
                            if (userOptions.showSelectedRating) {
                                $(this).find('.br-current-rating').text(text);
                            }

                        }).trigger('ratingchange');

                    // update rating event
                    $widget.on('updaterating',
                        function (event) {

                            // add classes
                            $(this).find('a[data-rating-value="' + $this.data('barrating').currentRatingValue + '"]')
                                .addClass('br-selected br-current')[nextAllorPreviousAll]()
                                .addClass('br-selected');

                        }).trigger('updaterating');

                    $all = $widget.find('a');

                    // fast clicks
                    $all.on('touchstart', function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        $(this).click();
                    });

                    // do not react to click events if rating is read-only
                    if (userOptions.readonly) {
                        $all.on('click', function (event) {
                            event.preventDefault();
                        });
                    }

                    // add interactions
                    if (!userOptions.readonly) {

                        $all.on('click', function (event) {
                            var $a = $(this),
                                value,
                                text;

                            event.preventDefault();

                            $all.removeClass('br-active br-selected');
                            $a.addClass('br-selected')[nextAllorPreviousAll]()
                                .addClass('br-selected');

                            value = $a.attr('data-rating-value');
                            text = $a.attr('data-rating-text');

                            // is current and deselectable?
                            if ($a.hasClass('br-current') && $this.data('barrating').deselectable) {
                                $a.removeClass('br-selected br-current')[nextAllorPreviousAll]()
                                    .removeClass('br-selected br-current');
                                value = '', text = '';
                            } else {
                                $all.removeClass('br-current');
                                $a.addClass('br-current')
                            }

                            // remember selected rating
                            $this.data('barrating').currentRatingValue = value;
                            $this.data('barrating').currentRatingText = text;

                            $widget.trigger('ratingchange');

                            // onSelect callback
                            userOptions.onSelect.call(
                                this,
                                $this.data('barrating').currentRatingValue,
                                $this.data('barrating').currentRatingText
                            );

                            return false;

                        });

                        // attach mouseenter/mouseleave event handlers
                        $all.on({
                            mouseenter:function () {
                                var $a = $(this);

                                $all.removeClass('br-active').removeClass('br-selected');
                                $a.addClass('br-active')[nextAllorPreviousAll]()
                                    .addClass('br-active');

                                $widget.trigger('ratingchange',
                                    [$a.attr('data-rating-value'), $a.attr('data-rating-text')]
                                );
                            }
                        });

                        $widget.on({
                            mouseleave:function () {
                                $all.removeClass('br-active');
                                $widget
                                    .trigger('ratingchange')
                                    .trigger('updaterating');
                            }
                        });

                    }

                    // hide the select box
                    $this.hide();
                }
            }
            this.clear = function () {
                var $this = $(this.elem);
                var $widget = $this.next('.br-widget');

                // attempt to clear the rating
                if ($widget && $this.data('barrating')) {

                    $widget.find('a').removeClass('br-selected br-current');

                    // restore original data
                    $this.data('barrating').currentRatingValue = $this.data('barrating').originalRatingValue;
                    $this.data('barrating').currentRatingText = $this.data('barrating').originalRatingText;

                    $widget
                        .trigger('ratingchange')
                        .trigger('updaterating');

                    // onClear callback
                    this.options.onClear.call(
                        this,
                        $this.data('barrating').currentRatingValue,
                        $this.data('barrating').currentRatingText
                    );
                }
            }
            this.destroy = function () {
                var $this = $(this.elem);
                var $widget = $this.next('.br-widget');

                // attempt to destroy the widget
                if ($widget && $this.data('barrating')) {
                    var value = $this.data('barrating').currentRatingValue;
                    var text = $this.data('barrating').currentRatingText;

                    $this.removeData('barrating');

                    $widget.off().remove();

                    // show the select box
                    $this.show();

                    // onDestroy callback
                    this.options.onDestroy.call(
                        this,
                        value,
                        text
                    );
                }
            }
        }

        BarRating.prototype.init = function (options, elem) {
            var self;
            self = this;
            self.elem = elem;

            return self.options = $.extend({}, $.fn.barrating.defaults, options);
        };

        return BarRating;

    })();

    $.fn.barrating = function (method, options) {
        return this.each(function () {
            var plugin = new BarRating();

            // plugin works with select fields
            if (!$(this).is('select')) {
                $.error('Sorry, this plugin only works with select fields.');
            }

            // method supplied
            if (plugin.hasOwnProperty(method)) {
                plugin.init(options, this);
                return plugin[method]();

            // no method supplied or only options supplied
            } else if (typeof method === 'object' || !method) {
                options = method;
                plugin.init(options, this);
                return plugin.show();

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.barrating');
            }

        });
    };
    return $.fn.barrating.defaults = {
        initialRating:null, // initial rating
        showValues:false, // display rating values on the bars?
        showSelectedRating:true, // append a div with a rating to the widget?
        reverse:false, // reverse the rating?
        readonly:false, // make the rating ready-only?
        onSelect:function (value, text) {
        }, // callback fired when a rating is selected
        onClear:function (value, text) {
        }, // callback fired when a rating is cleared
        onDestroy:function (value, text) {
        } // callback fired when a widget is destroyed
    };
})(jQuery);

    $("#example-f").barrating({
        showSelectedRating: false
    });
    
        
	        
	       /* 
	        	$('#coasdntent').hoverIntent({
						sensitivity: 5, // number = sensitivity threshold (must be 1 or higher)    
						interval: 100, // number = milliseconds for onMouseOver polling interval    
						over: makeTall, // function = onMouseOver callback (REQUIRED)    
						timeout: 200, // number = milliseconds delay before onMouseOut    
						out: makeShort // function = onMouseOut callback (REQUIRED)
		            });
		
			function makeTall(){
						$("body").find(".rating-stars").css({
	          display:"block",
	            width: "160px",
	            position: "absolute",
	            top: "130%",
	            height: "186px",
	            right: "0",
	            padding: "10px",
	            border: "1px solid #DBDBDB",
	            "z-index": " 99999"
	        });
	       $("body").find("a.rat-empty.start_item,span.rating-number,p.rate_no ").css({
	         display:"block",
	        
	        });

	        
	        
	        $("body").find("rating-number").fadeIn('slow');
	         var c = false;
	        if (!c) {
	            c = true;
	            var b = 0;
	            var a = null;

	            function d() {
	                $(".meter-value").each(function() {
	                    var e = $(this).attr("id").toString();
	                    var f = e.replace("ho", "");
	                    for (i = 0; i <= f; i++) {
	                        $(this).css("width", i + "%")
	                    }
	                })
	            }
	            a = setInterval(d, 20)
	        }
				};
				function makeShort(){
	        
	        $("body").find(".rating-stars,a.rat-empty.start_item, span.rating-number,p.rate_no").fadeOut('fast');
	        
	        };
	 */
	        

	$('.br-widget a').on('click',function(event){
			$('.metrics_ratings').slideDown();
		});

		$('body').on('click',function(event) {
				$('.metrics_ratings').slideUp();
			});


	})



