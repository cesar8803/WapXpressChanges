var lpobj = {};
$(document).ready(function(){

var noimageminicartItem = $(".noimageminicartItem");


Getonerrrimage(noimageminicartItem,'sm');

lpobj.wishlist_errormsg();
lpobj.zeroproduct();
});
function Getonerrrimage(classname,size)
{

$.each( classname, function( optionkey, optionkeyvalue) {
getlandAkamaiImage(this.id,size);
});

}
/* mycode starts*/





lpobj = {

wishlist_errormsg: function() {
var errorval=$('#wishlist_errormsg').html();
if(errorval){
$.fancybox({
type:'inline',
content:errorval,
fitToView: false,
maxHeight: 200,
afterLoad: function(){
var phoneWidth = $(window).width();
this.width = $(this.element).data("width");
this.height = $(this.element).data("height");
$('.fancybox-wrap').addClass('fansywishlist_errormsg');
$('.fancybox-inner').addClass('fansyfancybox-inner');
if(phoneWidth >= 560)
{
$('.fancybox-wrap').attr('style', 'Width:450px!important');
$('.fancybox-inner').attr('style', 'Width:400px!important');
}

}
});
}},


zeroproduct: function() {
var phoneWidth = $(window).width();
var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
var x=$('#product_detcount').val();
var y=$('#product_detPrice').val();
if(x==0 || y==0){

var w_hbwidth = 330;
if(isiPad=='-1')
{
w_hbwidth = phoneWidth/2;

}



/*$('.w_h .w_hb').hide();*/
$('#detform').attr('href','javascript:void(0)');
$('.w_hb').css({'opacity':'0.5','width':w_hbwidth+'px'});

/* $(' #addItemToCartForm1').attr('action','#'); */
$('.redirect_link').show();
}

}

}






$('body').click(function(){
$.fancybox.close();
});

/* mycode starts ends*/


$(window).on("orientationchange", function() {
var phoneWidth = $(window).width();
//alert(phoneWidth);
if(phoneWidth >= 568 && phoneWidth >= 321 && phoneWidth <= 760)
{
$('.fansywishlist_errormsg').attr('style', 'Width:450px!important');
$('.fansyfancybox-inner').attr('style', 'Width:450px!important');

}
else
{
$('.fansywishlist_errormsg').attr('style', 'Width:'+phoneWidth-200+'px!important');
$('.fansyfancybox-inner').attr('style', 'Width:'+phoneWidth-200+'px!important');
}




lpobj.zeroproduct();
});









$(function() {



/*$('.que_as').hover(function(){
$('.wrapper_as').append('<span class="li_as"><label>Tu ID de carta es el numero que aparece en el correo electr&oacute;nico que te llego con la carta.</label></span>');
},function(){
$('.wrapper_as').find('.li_as').remove();
});*/


$.fn.exists = function() {
return $(this).length > 0;
}


if($('.o_p').exists()){
if($('.p_a').length==0) { $('.w_h').css({"bottom":"155px"}); }

}



if($('#various2').exists()){

$("#various2").fancybox({
afterLoad: function(){
var phoneWidth = $(window).width();
if(phoneWidth >= 320)
{
var ht = $('.form_a_as').height();
}
else { var ht = $('.w_b').height(); }
$('.fancybox-wrap').attr('style', 'top:'+ht+ '!important');

}

});
}

if($('.f_link_as').exists()){

$('.f_link_as').fancybox({
'transitionIn' : 'none',
'transitionOut' : 'none',
'autoScale' : false,
'type' : 'iframe',
'width' : '75%',
'height' : '75%',
afterLoad: function(){
$('.fancybox-wrap').addClass('fansywishlist_registrars');
$('.fancybox-inner').addClass('registrarsfancybox-inner');
//this.width = $(this.element).data("width");
this.height = 1000;
}

});
}

$('.cover').each(function(a,b){

$(this).wrap(function (a){
return "<div class='mm_li'></div>"
})
$(this).after("<span class='fer'>"+$(this).attr('title')+"</span>");
})
$('.p_lp').on('click',function(){
/* var phoneWidth = $(window).width();
if(phoneWidth <= 320)
{
if($('.apper').css('display') == 'none') { $('.isdes').attr('style','left:48px !important'); }
else { $('.isdes').attr('style',''); }
} */

$(this).parent().find('.apper').fadeToggle('fast');
})



if($('.cover').exists()){
if ($.fn.reflect) {
$('#preview-coverflow .cover').reflect(); // only possible in very specific situations
}

$('#preview-coverflow').coverflow({
index: 3,
density: 2,
innerOffset: 50,
innerScale: .7,
animateStep: function(event, cover, offset, isVisible, isMiddle, sin, cos) {
if (isVisible) {
if (isMiddle) {
$(cover).css({
'filter': 'none',
'-webkit-filter': 'none'
});
} else {
var brightness = 1 + Math.abs(sin),
contrast = 1 - Math.abs(sin),
filter = 'contrast('+contrast+') brightness('+brightness+')';
$(cover).css({
'filter': filter,
'-webkit-filter': filter
});
}
}
}
});

}
if($('a.ww_hb').exists()){
$("a.ww_hb").fancybox({
type:'inline',
content:'<p>Debido a la gran demanda que existe, estos productos, se ecuentran agotados.</p><p>Te invitamos a regresar otro dia para finalizar tu compra</p>',
fitToView: false,
maxHeight: 200,
afterLoad: function(){
this.width = $(this.element).data("width");
this.height = $(this.element).data("height");
}
}); // fancybox


}

/*$('.idCarta_').fancybox({
type:'inline',
content:'<p>No se encontro ning�n ID asociado. </p><p>Por favor revisa que el ID que ingresaste sea correcto.</p>',
fitToView: false,
maxHeight: 200,
afterLoad: function(){
this.width = $(this.element).data("width");
this.height = $(this.element).data("height");
}
});// fancybox

*/





});
//add to cart functionality
function submitAddToCart(formId) {
//alert(formId);
if(document.getElementById("viewType") != null)
{
formId.persistViewType.value = document.getElementById("viewType").value;
}
formId.submit();
}

function getlandAkamaiImage(sku, size) {
var skuslipt = sku.split("_");
var skuid = 0;
var replacesrc = '';
if(skuslipt[1] != undefined)
{ skuid = skuslipt[1]; replacesrc=sku; } else { skuid = skuslipt[0]; replacesrc=skuslipt[0]; }
var skuImageUrl = create_url(size, skuid);
var ImageObject = new Image();
ImageObject.src = skuImageUrl;
ImageObject.onload = function() {
$("#"+replacesrc).attr('src',skuImageUrl);
}
ImageObject.onerror = function() {
$("#"+replacesrc).attr('src','/mobileAssets/images/fillers/filler_REC.gif');
}

}
/*$(function(){
var x=$('#product_detcount').val();
var y=$('#product_detPrice').val();
if(x==0 || y==0){
$('.w_h .w_hb').hide();
$('#detform').attr('href','javascript:void(0)');
$('.w_hb').css('opacity','0.5');

$(' #addItemToCartForm1').attr('action','#');
$('.redirect_link').show();
}
});*/