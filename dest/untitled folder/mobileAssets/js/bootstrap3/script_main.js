/* Clean ALL facets */
$("#borrar_todo").click(function(){

$("ul.fyeah li a").css('background','url("assets/images/check_box.gif") no-repeat -15px 0px transparent');
$("li a.en-talla").removeClass("newClass");
});
$(function(){


//show checkbox selected if has class activec
if($("ul.fyeah li").find('a').hasClass("activec") || ($("#lilength li").length>1)){

$('#borrar_todo').show();
}

// add multiple select
$("ul.fyeah li").find('a').click(function () {

if($(this).hasClass('inactive')){
$(this).removeClass('inactive');
$(this).addClass('activec');
$(this).css('background','url("/assets/images/check_box.gif") no-repeat 0px -15px transparent');
}
if($(this).hasClass('activec')){
$(this).removeClass('activec');
$(this).addClass('inactive');
$(this).css('background','url("/assets/images/check_box.gif") no-repeat -15px 0px transparent');
}
});
});

$(document).ready(function(){

	/*Redirect to Store-Location*/
	$(".locallizecont").click(function(event){
    event.preventDefault();
    window.location.href = "http://www.liverpool.com.mx/tiendas/localizador.html";
	});
    
     $(".shops-home > a").attr("href","http://www.liverpool.com.mx/tiendas/localizador.html");

	


	$('.color_width_look select').on('change',function(){
	});

	$(document).on("mouseenter",".rating-str.mod-big", function(e){
		$(".metrics_ratings.rating-number").show();
		$(".metrics_ratings.rating-number a").show();
		$(".meter-value").each(function() {
			var e = $(this).attr("id").toString();
			var f = e.replace("ho", "");
			for (i = 0; i <= f; i++) {	
			$(this).css("width", i + "%")
			}
		});
		e.stopPropagation();
	});

	$(document).on("mouseleave",".rating-str.mod-big", function(e){
		if(!$(e.target).hasClass("rating-str")){
			$(".metrics_ratings.rating-number").hide();
		}
		e.stopPropagation();			
	});
	
	$(document).on("click",".anonymousRating", function(e){
		$(".rating-str.mod-big.click_notAllowed").show();
		e.preventDefault();
	});
		
});


$(document).ready(function(){
/****************Start: Added For CR_Payment ***********/
var paymentSelected=$("#paymentSelected").val();
var isLoggedIn = $("#isLoggedIn").val();
var contextPath=$("#contextpath").val();
var onPageLoad = 'true';
var message=jQuery("#noPaymentSelected").val();
/**************Start:Added for showing error msg for not selecting any payment method***********/
if(isLoggedIn=='true'){
jQuery("#selectPaymentMethod .btn_pagar_precheckout").live('click',function($) {
if(jQuery("input[type=radio]:checked").size()==0) {
showErrorMsg(message);
}
});
}
/**************End:Added for showing error msg for not selecting any payment method***********/
if(paymentSelected!=null && paymentSelected=="creditCard" || paymentSelected=="CIEBancomer"){
if(paymentSelected!=null && paymentSelected=="creditCard"){
$(".external_opt input").attr('checked', 'checked');
}else if(paymentSelected!=null && paymentSelected=="CIEBancomer"){
$(".bancomer_opt_d input").attr('checked', 'checked');
}
getAvailablePayment(paymentSelected,isLoggedIn,contextPath,onPageLoad);
}
$(".selecttarjeta_a").click(function(event){
onPageLoad='false';
if($('.selecttarjeta_a').is(':checked'))
{
var selectedPG=$(this).val();
getAvailablePayment(selectedPG,isLoggedIn,contextPath,onPageLoad);
}
});
/****************End: Added For CR_Payment ***********/

$('input.date_data').trigger('click');
$(".date_data").on('click',function(){
$(".date_data").datepicker({
dateFormat: 'dd/mm/yy'
});
});

$("#espacioRegresar").click(function(e){
window.location.href = document.referrer;
});

if($("#displayDeliveryAddress").val()==="1"){
$(".direccion_confirmacion").find(".ribbon-end").css("background","url('/assets/images/bg/endeca-sprite.png') no-repeat scroll -281px -410px #A8DCFF");
$(".forma_pago_confirmacion").find(".ribbon-end").css("background","url('/assets/images/bg/endeca-sprite.png') no-repeat scroll -282px -474px #A8DCFF");

}

$.fn.exists = function() {
return $(this).length > 0;
}


if($('.eb-download').exists()){
$(".eb-download").fancybox({
padding : 0,
//type : "iframe",
type : "ajax",
href : "/ebStatic/eb-dn-modal.html"
})
}

if($('#register_form').exists()){
$(this).find('#left_content_credit').load('/assets/pieces/benefits.html');
}
/** OTHER PRODUCTS HOME **/
if($('#home #slide').exists()){
$("#home #slide").awShowcase({
content_width: 987,
content_height: 670,
fit_to_parent: false,
auto: false,
interval: 1,
continuous: false,
loading: true,
tooltip_width: 200,
tooltip_icon_width: 32,
tooltip_icon_height: 32,
tooltip_offsetx: 18,
tooltip_offsety: 0,
arrows: true,
buttons: false,
btn_numbers: false,
keybord_keys: true,
mousetrace: false,
pauseonover: true,
stoponclick: true,
transition: "hslide",
transition_delay: 0,
transition_speed: 900,
show_caption: "onload",
thumbnails: false,
thumbnails_position: "outside-last",
thumbnails_direction: "vertical",
thumbnails_slidex: 1,
dynamic_height: false,
speed_change: true,
viewline: true,
custom_function: null
})
}


/**** tabs para credito ***/

function tabs_hack(){
if(document.getElementById('conPath') != undefined){
var conPath = document.getElementById('conPath').value;
$('#dilisa_tab').load(conPath +'/users/credit/includes/dilisaDetailPage.jsp');
$('#lpc_tab').load(conPath +'/users/credit/includes/lpcDetailPage.jsp');
$('#livertu_tab').load(conPath +'/users/credit/includes/livertuDetailPage.jsp');
$('#fashion_tab').load(conPath +'/users/credit/includes/fashionDetailPage.jsp');
$.getScript("/assets/js/jquery-ui.js").done(function() {
$( ".tabs_credit_info" ).tabs();
});
}
}

/*$(function() {
$( "#tabs_credit" ).tabs(tabs_hack());
});
*/

/**** RATINNGS ****/
$(".rating-stars a").on("mouseover", function(){
$(this).children(".review-summary").css({
top : $(this).height() + 30 + "px",
left : '-32px'
})
$(this).children(".review-summary").fadeIn("fast");
$(this).children(".review-summary").children(".rev-active").css({
position : "absolute",
height : "15px",
width : "100%",
left : "0px"
})
})
/*$(".rating-stars a").on("mouseleave", function(){
$(this).children(".review-summary").fadeOut("fast");
})*/

$("#rating-out").on("mouseover", function(){
$(this).children('.rating-stars').children(".review-summary").css({
top : $(this).height() + 10 + "px",
left : '0px',
width: '75%'
})
$(this).children('.rating-stars').children(".review-summary").fadeIn("fast");
$(this).children('.rating-stars').children(".review-summary").children(".rev-active").css({
position : "absolute",
height : "15px",
width : "100%",
left : "0px"
})
})
$("#rating-out").on("mouseleave", function(){
$(this).children('.rating-stars').children(".review-summary").fadeOut("fast");
})

$("#allow_click img").on("click",function(){
$(".anonymousRating").html('&nbsp;');
var rating = $(this).index()+1;
var productId = $("#productId").val()
$.ajax( {
type : "post",
url : contextPath+"/common/frag/updateProductRating.jsp",
data : "productId=" + productId +"&rating="+ rating,
success: function(data) {
}
});
$("#ratedMsg").css({
display:"block",
});
$("#noratemsg").css({
display:"none",
});
})
/**** RATINNGS ****/
$('#checkout_recommendations_fancy').css('display','none');
setTimeout(function(){
$('#checkout_recommendations_fancy').fadeIn('slow');
},2000);


/*if($('#banner-top').exists()){
$("body").css({background : " rgb(245, 245, 245) url(/assets/images/bg/bk-main.png) repeat-x 0px 0px"});
$("#master_header").css({'margin-top':'70px'});
}else{
$("body").css({background : " rgb(245, 245, 245) url(/assets/images/bg/bk-main1.png) repeat-x 0px 0px"});
$("#master_header").css({'margin-top':'35px'});
}*/
if ($(".st_horizontal").length != 0) {

$("#st_horizontal, #st_horizontal_detalle").slideTabs({
contentAnim: "slideH",
contentAnimTime: 600,
contentEasing: "easeInOutExpo",
tabsAnimTime: 300,
autoHeight: false
})
}

// FANCYBOX DE LAS FOTOS DE CADA PRODUCTO
$('.event_item_photo').click(function(evt) {
evt.preventDefault();
url_mesa_regalos=$(this).attr('href');
if(typeof console != 'undefined') {
console.log(url_mesa_regalos);
}
$('div#master_navigation').css('z-index','-5000000');
$.fancybox({
'padding' : 12,
'width' : 324,
'height' : 246,
'autoScale' : true,
'autoSize' : false,
'type' : 'image',
'scrolling' : 'no',
'overlayShow' : true,
'overlayOpacity' : .8,
'enableEscapeButton' : true,
'href' : url_mesa_regalos,
'beforeClose': function(){
$('div#master_navigation').css('z-index','5000000');
}
});
});

/* Gestiona la visibilidad de TOP BANNER en checkout */
var href = $(location).attr('href');
if (href.match(/checkoutExpress/) || href.match(/checkout/)) {
//alert('step1');
$("#banner-top").css("display","none");
$("body").css("background","rgb(250, 250, 250)");
$("a.cp_help").css("display","none");
}

if (href.match(/airtime_quick/)) {
$("#banner-top").css("display","block");
$("body").css("backgroundImage", "url(/assets/images/bg/bk-main.png)");
$("body").css("backgroundPosition", "0px 0px");
$("body").css("backgroundRepeat", "repeat no-repeat");
}

if (href.match(/new_creditc.jsp?param_new=true&checkout=true/)) {
//alert('checkout');
$("body").css({"background":"#FAFAFA", "margin-top":"30px"});
$("body").remove("#banner-top");
}


var xxxp = '/shopping/checkoutExpress/step1/paymentMethod.jsp';

if (href.match(xxxp)) {
//alert('checkout');
//$("body").css({"background":"#FAFAFA", "margin-top":"-30px"});
$("body").remove("#banner-top");
}

if (href.match(/ayuda/)) {
//alert('ayuda');
// $("body").css({"background":"#FAFAFA", "margin-top":"-30px"});
$("body").remove("#banner-top");
}


$("table#codigos_regreso_clases tr:odd").addClass("odd_code");

$('section#all_promos ul#promo_list div img').each(function(){
var alt_mo = $(this).height();
var lista_mo = $('section#all_promos ul#promo_list li');
$(lista_mo).height(alt_mo + 180);
});



$('#submenu-header').css('display','none');
$('#submenu-header').css('background','none');

/*HARDCODE PARA EL 11vo nivel reparar para hacerlo dinamico*/
$('.btncat670055').addClass('floatr');

//Para ENDECA
//commented for listing page multiple calls.
if ( $('img.lazy').exists() ) {
$("img.lazy").lazyload();
}
$("#typeahead").hide();


if ($('#banner-fade').exists()){
//funci�n para el nuevo slider
$('#banner-fade').bjqs({
height : 320,
width : 550,
responsive : false,
animspeed : 6000,
automatic : true
});
}

if ($('#home_credit').exists()){
//función para el nuevo slider
$('#credit_slider').bjqs({
height : 370,
width : 680,
responsive : false,
animspeed : 6000,
automatic : true
});
}
$(".b_eliminar a").on("click", function(){
var cardItemId = $(this).attr("id");
$('#cardItemId').val(cardItemId);
$(this).fancybox();
})
$(".btn-box-cancel").on("click", function(){
$.fancybox.close();
})

/*Detalle de optica tooltip de ayuda*/
$("a.power-tooltip").hover(
function () {
$(".tool-info-power").fadeToggle("slow", "linear");

}
);
$("a.cilindro-tooltip").hover(
function () {
$(".tool-info-cilindro").fadeToggle("slow", "linear");

}
);

/*Click a la bolsa llena o vacía*/
if ( $('div.shopping_bag_item').exists() ) {
$('div#my_bag_toggle a#open_shopping_bag').addClass('active_bg');
$('a#open_shopping_bag').on('click',function(){
$('a#open_shopping_bag').removeClass('active_bg');
$('a#open_shopping_bag').addClass('active_bg_white');
});
}





/*Ayuda para breadcrumbs*/
function breadcrumbs(){
var coco= 0;
$('div.masters_nav ul#breadcrum').find('li').each(function(){
coco++;
});
if(coco == 1)
{
$('div.masters_nav').css('display','none');
}
}
breadcrumbs();

if(('div#breadcrumb-reg').length<0){}
else{
$('div.masters_nav').css('display','block');
}

/*Agrega clase a Home Products para meterle padding*/
/*Add class para recommendations Home*/
if($('#gate_1').exists() ){
$('#product_carrousel').addClass('r-home');
$('#home nav').addClass('nav-home');
//$('#home nav').addClass('nav-home');

}

/* Cambiar background de cada caregoria acorde a la resolución */
function isIE () {
var myNav = navigator.userAgent.toLowerCase();
return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var viewPrt = $(window).width();


if (viewPrt <= 1280){
if (isIE () == 8) {
$("body").css({background: "#f7f7f7url(/assets/images/bg_navidad/backs_1280_topbar_deseos.jpg) no-repeat center 35px"});
}
else {
$("body").css({background: "#f7f7f7 url(/assets/images/bg/bk-main.png) repeat-x 0px 0px, url(/assets/images/bg_navidad/backs_1280_deseos.jpg) no-repeat fixed center 0px"});
}
}
if (viewPrt >= 1281 && viewPrt <= 1366){
if (isIE () == 8) {
$("body").css({background: "#f7f7f7 url(/assets/images/bg_navidad/backs_1366_topbar_deseos.jpg) no-repeat center 35px"});
}
else {
$("body").css({background: "#f7f7f7 url(/assets/images/bg/bk-main.png) repeat-x 0px 0px, url(/assets/images/bg_navidad/backs_1366_deseos.jpg) no-repeat fixed center 0px"});
}
}
if (viewPrt >= 1367 && viewPrt <= 1440){
if (isIE () == 8) {
$("body").css({background: "#f7f7f7 url(/assets/images/bg_navidad/backs_1440_topbar_deseos.jpg) no-repeat center 35px"});
}
else {
$("body").css({background: "#f7f7f7url(/assets/images/bg/bk-main.png) repeat-x 0px 0px, url(/assets/images/bg_navidad/backs_1440_deseos.jpg) no-repeat fixed center 0px"});
}
}
if (viewPrt >= 1441 && viewPrt <= 1920){
if (isIE () == 8) {
$("body").css({background: "#f7f7f7 url(/assets/images/bg_navidad/backs_topbar_deseos.jpg) no-repeat center 35px"});
}
else {
$("body").css({background: "#f7f7f7 url(/assets/images/bg/bk-main.png) repeat-x 0px 0px, url(/assets/images/bg_navidad/backs_1920_deseos.jpg) no-repeat fixed center 0px"});
}
}
if($("#main_wrapper .col_main:nth-child(2n)").exists() ){
$(".col_main:nth-child(2n)").addClass('col_main-segunda');

}

/*Eliminar clase conflictiva en seguimiento a pedido*/
if($('.ordfollowup > #contenido_columna > .linkaction').exists()){
$('.ordfollowup #contenido_columna div.linkaction').removeClass('linkaction').addClass('link-regresar-sp');
}

/*Eliminar clase conflictiva en seguimiento a pedido*/
if($('.ed_ccard .full-col > .linkaction').exists()){
$('.ed_ccard .full-col div.linkaction').removeClass('linkaction').addClass('link-regresar-tj');
}


if ( $('#buscador_festejado').exists() ) {
/*Mesa correccion de copies en el Home Page*/
$('.titulo_buscador_mesa').text('Encuentra el registro de pareja');
$('.nombre_dato_buscador_mesa span.titulo_buscador_mesa').text('Busca por evento');
$('.txt_buscador_mesa').text('');
}

/*-----------ALERTAS------------------*/
/*-------CONTAR Y MARCAR CHECKBOXES-------*/
/*Nuevas Alertas con Endeca*/
$('.btn-comprar-modulo').on('click',function(){
//$('#alertas').fadeIn(200);
});

//Estilo inicial del btn de comparar como desactivado
$('#comparar input').css('backgroundPosition', '0px -191px');
$('#comparar input').css('color', '#757575');

/*QUITAR ALERTAS Y AVISOS*/
$('#alertas, .alertas, #errors, .exito, .aviso, .error, .avisos, #messagesDiv').on('click', function() {
if($(this).is(':visible')){
$(this).fadeOut('slow');
} else {
$(this).fadeIn('slow');
}
});

$('#comparar input, p.comparacion-ckb').on('click',function(){
var checked = $("#contenidos input:checkbox:checked").length;
if(checked <= 1){
$('.avisos').fadeIn(200);
$('.aviso').fadeIn(200);
$('#comparar input').css('backgroundPosition', '0px -191px');
$('#comparar input').css('color', '#757575');
} else{
//Cambia el estilo del boton de comparar a Activo
$('#comparar input').css('backgroundPosition', '0px -215px');
$('#comparar input').css('color', '#000');
$('p.comparacion-ckb').css('color', '#000');

}
});

/*--------------------------------------*/


if ( $('#jq_fmslideshow_banners').exists() ) {
$('#jq_fmslideshow_banners').fmslideshow({
//BANNER CENTRO
//Nota: para modificar a pronfundidad ir a fmslideshow.js.

banner_width : 738,
banner_height : 267,

slideShow: true,
slideShow_delayTime : 5,

image_background : "",
image_topShadow : "",
image_bottomShadow : "",

background_fullScreen : true,
background_move : true,
background_moveDistance : 700,

buttons_type : 1,
buttons_autoHide : true,

button_nextPrevious_autoHide : false,
button_nextPrevious_type : 1,
button_next_align : "C",
button_next_spacing : "0,345",
button_previous_align : "C",
button_previous_spacing : "0,-345"

});
}


//Seccion
if ( $('.slideshow').exists() ) {


$('.slideshow img').css('width', '742');
$('.slideshow img').css('height', '343');

$('.slideshow').fadeIn('slow');

$('.slideshow')
.before('<div id="nav">')
.cycle({
fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
speed: 1000,
pager: '#nav',
fit: true,
height: 341,
width: 736,
pause: 1
});
}

if ( $("a.switch_thumb").exists() ) {
$("a.switch_thumb").toggle(function(){
$(this).addClass("swap");
$("ul.display").fadeOut("fast", function() {
$(this).fadeIn("fast").addClass("thumb_view");

$(".tools").css("display","block");
$(".quantity").css("display","block");
$(".clear").css("display","block");
$(".descripcion_larga").css("display","block");
$("a#switch_1.switch_thumb").css("background","url(assets/images/iconos/icono_vistas1.png)");

});

}, function () {
$(this).removeClass("swap");
$("ul.display").fadeOut("fast", function() {
$(this).fadeIn("fast").removeClass("thumb_view");

$(".tools").css("display","none");
$(".quantity").css("display","none");
$(".clear").css("display","none");
$(".descripcion_larga").css("display","none");
$("a#switch_1.switch_thumb").css("background","url(assets/images/iconos/icono_vistas2.png)");

});
});
}

if ( $(".callToolTip").exists() ) {
$(".callToolTip").hover(
function () {
//$(this).find(".tooltip").css("display", "block");
$(this).find(".tooltip").stop(true, true).fadeIn("slow");
},
function () {
//$(this).find(".tooltip").css("display", "none");
$(this).find(".tooltip").stop(true, true).fadeOut("slow");
}
);
}

//CallBacks Portada Seccion
if ( $('#jq_fmslideshow').exists() ) {
//BANNER
$('#jq_fmslideshow').fmslideshow({
//BUNDLES
//Nota: para modificar a pronfundidad ir a fmslideshow.js.

banner_width : 736,
banner_height : 341,

image_background : "bg.png",
image_topShadow : "top_border.png",
image_bottomShadow : "bottom_border.png",

background_fullScreen : true,
background_move : true,
background_moveDistance : 700,

buttons_type : 1,
buttons_autoHide : false,

button_nextPrevious_autoHide : false,
button_nextPrevious_type : 1,
button_next_align : "C",
button_next_spacing : "0,470",
button_previous_align : "C",
button_previous_spacing : "0,-470"
});

}

/****** Incrementar Decrementar producto******/
/* $(".inc_button").click(function() {
var $button = $("input.cantidad_txt").val();
var oldValue = $("input.cantidad_txt").val();

if ($button >= 1) {
var newVal = parseFloat(oldValue) + 1;

}
$("input.cantidad_txt").val(newVal);
});

$(".dec_button").click(function() {
var $button = $("input.cantidad_txt").val();
var oldValue = $("input.cantidad_txt").val();
if ($button == 1)
{
var newVal = 1;
}
else if ($button >= 1) {
var newVal = parseFloat(oldValue) - 1;

}
$("input.cantidad_txt").val(newVal);
});*/
/********************************************************************************************************/
//Oculta el menu de la portada
//$(".menu_portada").hide();
/********************************************************************************************************/
if ( $(".portada").exists() ) {
// ZOOM IN - ZOOM OUT de cada módulo de portada
$(".portada").hover(
function () {
$(this).find("img").animate({width: 179,height: 140,top: 50,left: 0}, 200);
$(this).find(".name_sec").animate({fontSize: '18px'}, 100);
//$(this).find(".num_prod_sec").animate({fontSize: '15px'}, 100);
},
function () {
$(this).find("img").animate({width: 169,height: 130,top: 50,left: 0}, 200);
$(this).find(".name_sec").animate({fontSize: '15px'}, 100);
//$(this).find(".num_prod_sec").animate({fontSize: '11px'}, 100);
});
}

if ( $(".cateagoria_list").exists() ) {
//Reordena las columnas en seccion
$('.cateagoria_list:eq(2)').before($("<br style='clear:both' />"));
}



if ( $(".cateagoria_list").exists() ) {
//Reordena las columnas en seccion
$('.cateagoria_list:eq(2)').before($("<br style='clear:both' />"));
}

/*Elimina el segundo #control-top*/

if ($('.producto-modulo:eq(0)').exists() ){
var me = 0;
$('#contenidos').find('#controls-top').each(function(){
me++;
if(me ==2){
$(this).hide();
}
});

}

/*** Script para corregir el contenido cortado de las portadas de secci�n ***/
/* En explorer no jala bien el script con �sto se soluciona */
var is_ie = navigator.userAgent.toLowerCase().indexOf('msie ') > -1;

if (is_ie){
if ( $('div#st_horizontal').exists() ) {
// Horizontal Sliding Tabs demo
$('div#st_horizontal').slideTabs({
// Options
contentAnim: 'slideH',
contentAnimTime: 600,
contentEasing: 'easeInOutExpo',
autoHeight: true,
tabsSlideLength: 0
});
}
}
else {
if ( $('div#st_horizontal').exists() ) {
// Horizontal Sliding Tabs demo
$("img.bordergreybold").load(function() {
var unoH = $("img.bordergreybold").height();
$("#banner_img").css("height", unoH);
$('div#st_horizontal').slideTabs({
// Options
contentAnim: 'slideH',
contentAnimTime: 600,
contentEasing: 'easeInOutExpo',
autoHeight: true,
tabsSlideLength: 0
});
});
}
}

if ( $('div#st_horizontal').exists() ) {
$('div#st_horizontal').slideTabs({
contentAnim: 'slideH',
contentAnimTime: 600,
contentEasing: 'easeInOutExpo',
autoHeight: true,
tabsSlideLength: 0
});
}

/*** fin **/

if ( $(".descripcion_heredada").exists() ) {
//ver mas button
var alto = $(".descripcion_heredada");
var altoNu = alto.innerHeight();
//alert(altoNu);
$('.ver_mas').toggle(function() {
$('.descripcion_larga').animate({height: altoNu}, 500);
$(this).addClass('ver_mas_active')


}, function () {
$('.descripcion_larga').animate({height: 167}, 500);
$(this).removeClass('ver_mas_active')
});
}

if ( $(".callToolTip").exists() ) {
$(".callToolTip").hover(
function () {
//$(this).find(".tooltip").css("display", "block");
$(this).find(".tooltip").fadeIn("slow");
},
function () {
//$(this).find(".tooltip").css("display", "none");
$(this).find(".tooltip").fadeOut("slow");
}
);
}
if ( $("div.talla_toggle").exists() ) {
$("div.talla_toggle").click(function(){
// remove previous class if there is any
$("div.talla_toggle").removeClass("talla_seleccionada");
// add class to the clicked link
$(this).addClass("talla_seleccionada");
// this prevents browser from following clicked link
return false;
});
}

//MAC
if($('.tooltip').exists() ) {
$('.tooltip').hover(
function () {
$(this).find(".tooltip").fadeIn("slow");
},
function () {
$(this).find(".tooltip").fadeOut("fast");
}
);
}

//Checkout
if ( $('#cross_sale').exists() ) {
//CROSS SALE
$('#cross_sale').fmslideshow({
//BUNDLES
//Nota: para modificar a pronfundidad ir a fmslideshow.js.

banner_width : 950,
banner_height : 240,

slideShow: true,
slideShow_delayTime : 5,

image_background : "bg.png",
image_topShadow : "top_border.png",
image_bottomShadow : "bottom_border.png",

background_fullScreen : true,
background_move : true,
background_moveDistance : 700,

buttons_type : 1,
buttons_autoHide : false,

button_nextPrevious_autoHide : false,
button_nextPrevious_type : 1,
button_next_align : "C",
button_next_spacing : "0,470",
button_previous_align : "C",
button_previous_spacing : "0,-470"

});



$.fn.equalHeights = function(px) {
$(this).each(function(){
var currentTallest = 0;
$(this).children().each(function(i){
if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
});
if (!px || !Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
// for ie6, set height since min-height isn't supported
if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': currentTallest}); }
$(this).children().css({'min-height': currentTallest});
});
return this;
};
}
if ( $('.mensaje_regalo a.add_data').exists() ) {

$('.mensaje_regalo a.add_data').click(function() {
$('.mensaje_regalo_tool').stop(true, true).slideToggle(400);
return false;
});

$('.mensaje_regalo_tool a.shopping').click(function() {
$('.mensaje_regalo_tool').stop(true, true).slideUp(400);
return false;
});

$('.mensaje_regalo_tool a.add_data').click(function() {
$('.mensaje_regalo_tool').stop(true, true).slideUp(400);
return false;
});

}

if ( $('.nav_cerrar a').exists() ) {
//EDITAR DIRECCIÓN
$('.nav_cerrar a').click(function() {
$('.direccion_edit_cont').animate({height: 0}, 500);
$('.editar_agregar_tarjeta').animate({height: 0}, 500);
});
}
if ( $('.edit_address').exists() ) {
$('.edit_address').toggle(function() {
$('.direccion_edit_cont').animate({height: 800}, 500);
$('a .edit_address').css('color','#333333');

}, function () {
$('.direccion_edit_cont').animate({height: 0}, 500);
});
}
if ( $('.choose_card a').exists() ) {
//EDITAR TARJETA
$('.choose_card a').toggle(function() {
$('.editar_agregar_tarjeta').animate({height: 900}, 500);
}, function () {
$('.editar_agregar_tarjeta').animate({height: 0}, 500);

});

}



//Eliminamos boorde derecho de ultima opcion de paginacion
var pags = $('.paginacion > a').length;
$(".paginacion > a:nth-child("+ pags+")").css('border-right','none');

// Eliminamos padding y bordes de primer y ultimo elemento de submenu
/*$("#extras_master_header li:first-child").css("padding-left","0px");
$("#extras_master_header li:last-child").css("padding-right","0px");
$("#extras_master_header li:last-child").css("border-right","none");*/



if ( $.browser.msie ) {
var ver =parseInt($.browser.version, 10);
if(ver ==7){
//solo para IE7
$(function() {
var zIndexNumber = 100;
$('div').each(function() {
$(this).css('zIndex', zIndexNumber);
zIndexNumber -=3;

$('.col_main').css('zIndex', (zIndexNumber + 30000));
$('.recomendations').css('zIndex', (zIndexNumber + 30000));
$('.modulo').css('zIndex', (zIndexNumber + 30000));
$('.seccion_datos').css('zIndex', (zIndexNumber + 30000));
$('.menu_portada').css('zIndex', (zIndexNumber + 30000));
$('.breadcrumb-move').css('zIndex', (zIndexNumber + 30000));

});

});
}

//solo para IE8
if(ver ==8){
/*var imageUrl = "/assets/images/bg/bg_wrapper_ie.gif";
$('#main_wrapper').css('background-image', 'url("' + imageUrl + '")');
$('#main_wrapper').css('width', '1034px');
$('#social').css('left', '-50');*/
}



}


// Iguala la altura de los modulos en las recomendaciones "Otros productos"
$.fn.equalHeights = function(minHeight, maxHeight) {
tallest = (minHeight) ? minHeight : 0;
this.each(function() {
if($(this).height() > tallest) {
tallest = $(this).height();
}
});
if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
return this.each(function() {
$(this).height(tallest).css("overflow","hidden");
});
}

$(".cols").equalHeights();
$("#main_content .recomendations:eq("+0+") div.modulo").equalHeights();
$("#main_content .recomendations:eq("+1+") div.modulo").equalHeights();
$(".listado_productos div.modulo").equalHeights();


// Hide $productCarrousel so it can be animated onload
/* var $productCarrousel = $('#product_carrousel');
$productCarrousel.css({'display':'none'});*/



/*****************************************************************************
ENDECA
******************************************************************************/
/* TYPEHEAD */
$(document).keyup(function(e) {
$('.field-search').keypress(function(){
	$('#typeahead').addClass("type-head");
})
});


/*LEYENDAS DE SORT BY & VIEW */
/* $('#layout-control').prepend('<div class=" sort-label">Cambiar vista:</div>');*/

if ( $('#controls-top #controls-pagination').exists() ) {
$('#controls-pagination:eq(0)').css('marginTop','17px')
}



/* Modifica modulo en multiplos de 4 */
//$(".producto-modulo:nth-child(4n)").css("border-right-width","0px");
//$(".producto-modulo:nth-child(4n)").css("padding-right","0px");
var contre= 0;
$(".producto-modulo").each(function(){
contre++;
if (contre == 5 || contre == 9 || contre == 13 || contre == 17) {
$(this).css('border-left','none');
};
});


if ( $('#filtros').exists() ) {
var h1 = $('#productos').innerHeight();
var h3 = $('#controls-top').innerHeight();
var h4 = $('#crumb-facets').innerHeight();
var ad = 43;
var nb = $('#controls-pagination').length;

if ( $('#controls-pagination:nth-child(2n)').exists() ) {
var h2 = $('#comparar').innerHeight()*2;

} else{
var h2 = $('#comparar').innerHeight();
}

var sum = h1+h3+h4+ad;

$('#filtros').innerHeight(sum);
}



/* Layout Change grid to Bigger Grid*
$('img.foto-modulo').css({
marginLeft: '-7px'
});*/

/* ==============================================================================================================
EBOOKS GRID AND ENDECA GRID SWITCH VIEW
==============================================================================================================*/

$('#grid').live('click', function() {
document.getElementById("viewType").value = "grid";
if ( $(this).hasClass("active") ) {
return false;
}else{
$('#list, #rows').removeClass("active")
$(this).addClass("active")

$('#productos').fadeOut('slow', function() {
$('.producto-modulo').removeClass('rowsview');
$('.producto-grid').attr('style','');
$('img.foto-modulo').attr('style','');
$('.comparacion-ckb').attr('style','');

$('.producto-modulo').removeClass('producto-list');
$('.foto-modulo').removeClass('foto-list');
$('.nombre-producto-modulo').removeClass('nombre-producto-list');
$('.col-banderas-precio-comprar').removeClass('col-list');

$('.btn-ver-promociones').css('position', 'absolute');
$('.btn-ver-promociones').css('top', 'inherit');
$('.btn-ver-promociones').css('left', 'inherit');

$('.producto-modulo').addClass('producto-grid');

$('.precio-tachado-modulo, .precio-modulo').css('position', 'static');
$('.mod-abstract').css({display : 'none'});
/*$('.producto-modulo a.btn-comprar-modulo').css({
bottom: '44px',
top: 'inherit',
right : '8px',
width: '175px'
});*/
/*$('.btn-regalar-modulo').css({
width: '156px',
top : '-35px',
right: 'inherit'
});*/
/*$('.btn-ver-promociones').css({
right: "9px",
bottom: "9px",
width: "163px"
})*/
$('#productos').fadeIn('slow');
});
}
return false;
});

$('#list').live('click', function() {
document.getElementById("viewType").value = "list";
if ( $(this).hasClass("active") ) {
return false;
$('producto-grid').css('padding-left','0px');
$('.descuento').css({
textAlign: 'left',
paddingLeft: '4px'
});

}else{
$('#grid').removeClass("active");
$(this).addClass("active");
$('#productos').addClass("lista");


$('#productos').fadeOut('slow', function() {

$('.producto-grid').css({
width:'350px',
height: '840px',
padding: '10px 5px 5px 32px'
});

$('.comparacion-ckb').css({
marginBottom: '0px'
});

$('.descuento').css({
textAlign: 'left',
paddingLeft: '29px'
});




$('.producto-grid:even').css({
borderRight:'none'
});



$('img.foto-modulo').css({
width:'378px',
height: '278px',
marginLeft: '-27px'

});


$('#productos').fadeIn('slow');


});
}
return false;
});
if($('body').hasClass("ebookbody"))
onloadrows();

$('#rows').live('click', function() {
document.getElementById("viewType").value = "rows";
if ( $(this).hasClass("active") ) {

return false;
$('producto-grid').css('padding-left','0px');
$('.descuento').css({
textAlign: 'left',
paddingLeft: '4px'
});

}else{

$('#grid').removeClass("active");
$(this).addClass("active");
$('#productos').addClass("rows");


$('#productos').fadeOut('slow', function() {
$('.producto-modulo').addClass('rowsview');
$('.producto-grid').css({
width:'743px',
height: 'auto',
padding: '10px 5px 5px 32px'
});

$('.comparacion-ckb').css({
marginBottom: '0px',
position: 'absolute'
});

$('.descuento').css({
textAlign: 'left',
paddingLeft: '29px'
});
$('.precio-tachado-modulo').css({
position: 'absolute',
right: '64px',
top: '31px'
});
$('.precio-modulo').css({
position: 'absolute',
right: '71px',
top: '51px'
});
$('.nombre-producto-modulo').css({
'margin-top': '15px'
});
/*$('.producto-modulo a.btn-comprar-modulo').css({
right: '14px',
top: '88px',
width: '155px'
});*/
/*$('.btn-regalar-modulo').css({
width: '137px',
top: '130px',
right: '13px'
});*/
$('.producto-grid:even').css({
borderRight:'none'
});
/*$('img.foto-modulo').css({
float: 'left',
'margin-top' : '21px',
'marginRight' : '20px'
});*/
$('.mod-abstract').css({
display : 'block',
float: 'left',
width: '414px'
});
$('#productos').fadeIn('slow');
/*$('.btn-ver-promociones').css({
right: "14px",
bottom: "95px",
width: "145px"
})*/

});
}
return false;
});
function onloadrows()
{
$('#rows').addClass("active");
$('#grid').removeClass("active");
$('#productos').fadeOut('slow', function() {
$('.producto-modulo').addClass('rowsview');
$('.producto-grid').css({
width:'743px',
height: 'auto',
padding: '10px 5px 5px 32px'
});

$('.comparacion-ckb').css({
marginBottom: '0px',
position: 'absolute'
});

$('.descuento').css({
textAlign: 'left',
paddingLeft: '29px'
});
$('.precio-tachado-modulo').css({
position: 'absolute',
right: '64px',
top: '31px'
});
$('.precio-modulo').css({
position: 'absolute',
right: '71px',
top: '51px'
});
$('.nombre-producto-modulo').css({
'margin-top': '15px'
});
/*$('.producto-modulo a.btn-comprar-modulo').css({
right: '14px',
top: '88px',
width: '155px'
});*/
/*$('.btn-regalar-modulo').css({
width: '137px',
top: '130px',
right: '13px'
});*/
$('.producto-grid:even').css({
borderRight:'none'
});
/*$('img.foto-modulo').css({
float: 'left',
'margin-top' : '21px',
'marginRight' : '20px'
});*/
$('.mod-abstract').css({
display : 'block',
float: 'left',
width: '414px'
});
$('#productos').fadeIn('slow');
/*$('.btn-ver-promociones').css({
right: "14px",
bottom: "95px",
width: "145px"
})*/

});
}
/* ==============================================================================================================
END
EBOOKS GRID AND ENDECA GRID SWITCH VIEW
==============================================================================================================*/
/* Scroll-up animated */
$(function() {

$(window).scroll(function() {
if($(this).scrollTop() != 0) {
$('#toTop').fadeIn();
} else {
$('#toTop').fadeOut();
}
});

$('#toTop').live('click', function() {
$('body,html').animate({scrollTop:0},800);
});
});

/* on/off talla */
$('ul.tallasf li a').click(function() {
//alert('entro');
$(this).toggleClass('newClass');
return false;
});

/************ FACETS CONTROL ***********************/
$(".fac-container #tabs").each(function(){
$(this).addClass('facTab');
});

var href = $(location).attr('href');
if (href.match(/content/)) {
//callback's to Facets Tabs
$.getScript("/assets/js/jquery-ui.js").done(function(script, textStatus) {
$( ".facTab" ).tabs();
//$( "#tabs, #tabs2" ).tabs();
}).fail(function(jqxhr, settings, exception) {
console.log(exception);
});
}
/************ END FACETS CONTROL ***********************/

/*Acordion*/
$(".fac-title").live('click', function() {
var i=1;
$(this).parent(".fac-wrapper").children(".fac-container").slideToggle('slow');
});

$(".fac-title").live('click', function() {
var i=1;
$(this).parent(".fac-wrapper").children(".fac-containerscroll").slideToggle('fast');
$(this).toggleClass("fac-title-menos");


});



/* Elimina columna de filtros y ajusta controles de header cuando solo hay un producto */
var num_productos_seccion = $(".producto-modulo").length;

if(num_productos_seccion == 0) {

$("#filtros").css("display","none");
$("#crumb-facets").css("float","none");
$("#crumb-facets").css("width","970px");
$("#controls-top").css("width","960px");
$("#productos-seccion").css("width","992px");

}


/*$("#add_this").remove();
$(".sku_detalle").append("<div id='add_this'></div>");*/

$("ul#new_user_register:contains('Inicia sesi')").css("display","block");
$("ul#new_user_register:contains('Salir')").css("display","block");
$("ul#new_user_register:contains('Salir')").parent().css({
"display" :"block",
"position" : "absolute",
"right" : "144px",
"text-align": "center",
"top" : "52px",
"width" : "140px",
"z-index" : "10000000"
});


$('.sd_overlay').click(function(){
$('#sd_container').remove();
$('#sd_overlay').remove();
});
/*
$("#master_header_info").css("display", "none");
$('#main_wrapper').mousemove(function(e){
var x1 = $('#mi_cuenta_account_nav').offset().left;
var y1 = $('#mi_cuenta_account_nav').offset().top;


var x2 = x1 + $('#mi_cuenta_account_nav').width();
var y2 = y1 + $('#mi_cuenta_account_nav').height() + $('#mi_cuenta_account_nav').height();
//alert('x: ' + x1 + ' y1: ' + y1);

if(e.pageY >=y1 && e.pageY<= y2 && e.pageX >=x1 && e.pageX<= x2){
$('#master_header_info').fadeIn('fast');
}else{
$('#master_header_info').fadeOut('fast');

}
});

$('#new_user_register a').click(function(){
$('#master_header_info').fadeOut('fast');
});

*/

});
//Function for credit system select box(Registered card drop down - Start)
function loadCard(){
var id= $('#creditCard_type').val();
var url=location.href.split("?",1);
location.href=url+'?refNo='+id;
}
//Function for credit system select box(Registered card drop down - End)

//Timeout validation after onload (for recomendations)

$(window).load(function() {
function hideRecs() {
var $productCarrousel = $('#product_carrousel');
var $recsProd = $("#product_carrousel .cs-rec");
var $recsOracle = $('#recs_oracle');
var $recomendations = $('#recomendations');
var $col_left = $('aside#col_promo');
var $main_content = $('#main_content');
var $mod =$('div.col_main div.recomendations');
var $modulo =$('div.col_main div.recomendations div.modulo');
var $modulo_img =$('div.col_main div.recomendations div.modulo img.image');
var $cs =$('div.col_main-segunda');
var altura_gate3 = $('#gate_3').outerHeight();
var $joder = $('div#main_content.col_main');

if ($recsProd.length == 8) {
if ($('#gate_3')[0]) $productCarrousel.css('margin-top',altura_gate3 + 60);
$recsOracle.stop().fadeIn(1750);
$recomendations.stop().fadeIn(1750);
$productCarrousel.stop().show('fast', function(){
$joder.css('margin-top','0px');
/* $main_content.css({marginTop:'4px'},0);*/
$mod.css({marginTop:'15px',
marginRight :'0',
marginBottom:'0',
marginLeft: '25px'}, 0);
$modulo.css({width:'224', height:'224'}, 0);
$modulo_img.css({width:'220', height:'160'}, 500);

});

}
};
window.setTimeout(hideRecs,1800);

});
$('.boton_detalle_bolsa').css('z-index','128 !important');

function etalage_load() {

//Gallery
$('#etalage').etalage({
thumb_image_width: 490,
thumb_image_height: 368,
source_image_width: 972,
source_image_height: 729,
zoom_area_width: 490,
zoom_area_height: 368,
magnifier_opacity: 0.9,
autoplay: false
});

}

function get_time_etalage() {
return 8000;
}
$(document).ready(function() {
//$(".fac-title").trigger("click");
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
var a = [],c= [],b = []; d = [];
$('div#menu_catalogos ul#menu.menu.sgray.fade').find('li.elemento').each(function(){
a.push($(this).outerWidth(true));
$(this).hoverIntent({
sensitivity: 5, // number = sensitivity threshold (must be 1 or higher)
interval: 100, // number = milliseconds for onMouseOver polling interval
over: makeTall, // function = onMouseOver callback (REQUIRED)
timeout: 200, // number = milliseconds delay before onMouseOut
out: makeShort // function = onMouseOut callback (REQUIRED)
});
var columnas = $(this).find('ul#master_menu_container').attr('class');
// validacion de elementos por 5 columnas
if (columnas.match(/columna_5/g) && columnas.match(/elemento_2/g) ) {
$('ul#master_menu_container.columna_5.elemento_2').css('left',-a[0]);
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_3/g) ) {
$('ul#master_menu_container.columna_5.elemento_3').css('left',-(a[0]+a[1]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_4/g) ) {
$('ul#master_menu_container.columna_5.elemento_4').css('left',-(a[0]+a[1]+a[2]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_5/g) ) {
$('ul#master_menu_container.columna_5.elemento_5').css('left',-(a[0]+a[1]+a[2]+a[3]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_6/g) ) {
$('ul#master_menu_container.columna_5.elemento_6').css('left',-(a[0]+a[1]+a[2]+a[3]+a[4]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_7/g) ) {
$('ul#master_menu_container.columna_5.elemento_7').css('left',-(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_8/g) ) {
$('ul#master_menu_container.columna_5.elemento_8').css('left',-(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_9/g) ) {
$('ul#master_menu_container.columna_5.elemento_9').css('left',-(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]));
}
if (columnas.match(/columna_5/g) && columnas.match(/elemento_10/g) ) {
$('ul#master_menu_container.columna_5.elemento_10').css('left',-(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]+a[8]));
}
// validacion de elementos por 4 columnas
if (columnas.match(/columna_4/g) && columnas.match(/elemento_4/g) ) {
$('ul#master_menu_container.columna_4.elemento_4').css('left',-(a[1]));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_5/g) ) {
$('ul#master_menu_container.columna_4.elemento_5').css('left',-(a[2]+a[3]-18));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_6/g) ) {
$('ul#master_menu_container.columna_4.elemento_6').css('left',-(a[2]+a[3]+a[4]-18));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_7/g) ) {
$('ul#master_menu_container.columna_4.elemento_7').css('left',-(a[2]+a[3]+a[4]+a[5]-18));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_8/g) ) {
$('ul#master_menu_container.columna_4.elemento_8').css('left',-(a[2]+a[3]+a[4]+a[5]+a[6]-18));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_9/g) ) {
$('ul#master_menu_container.columna_4.elemento_9').css('left',-(a[2]+a[3]+a[4]+a[5]+a[6]+a[7]-18));
}
if (columnas.match(/columna_4/g) && columnas.match(/elemento_10/g) ) {
$('ul#master_menu_container.columna_4.elemento_10').css('left',-(a[2]+a[3]+a[4]+a[5]+a[6]+a[7]+a[8]-18));
}
// validacion de elementos por 3 columnas
if (columnas.match(/columna_3/g) && columnas.match(/elemento_6/g) ) {
$('ul#master_menu_container.columna_3.elemento_6').css('left',-(a[4]));
}
if (columnas.match(/columna_3/g) && columnas.match(/elemento_7/g) ) {
$('ul#master_menu_container.columna_3.elemento_7').css('left',-(a[5]+a[4]));
}
if (columnas.match(/columna_3/g) && columnas.match(/elemento_8/g) ) {
$('ul#master_menu_container.columna_3.elemento_8').css('left',-(a[1]+a[1]+a[3]));
}
if (columnas.match(/columna_3/g) && columnas.match(/elemento_9/g) ) {
$('ul#master_menu_container.columna_3.elemento_9').css('left',-(c[1]));
}
if (columnas.match(/columna_3/g) && columnas.match(/elemento_10/g) ) {
$('ul#master_menu_container.columna_3.elemento_10').css('left',-(c[1]+a[0]+30));
}
// validacion de elementos por 2 columnas
if (columnas.match(/columna_2/g) && columnas.match(/elemento_8/g) ) {
$('ul#master_menu_container.columna_2.elemento_8').css('left',-(a[6]+10));
}
if (columnas.match(/columna_2/g) && columnas.match(/elemento_9/g) ) {
$('ul#master_menu_container.columna_2.elemento_9').css('left',-(a[7]+a[6]+10));
}
if (columnas.match(/columna_2/g) && columnas.match(/elemento_10/g) ) {
$('ul#master_menu_container.columna_2.elemento_10').css('left',-(a[8]+a[7]+a[6]+10));
}
// validacion de elementos por 1 columnas
if (columnas.match(/columna_1/g) && columnas.match(/elemento_9/g) ) {
$('ul#master_menu_container.columna_1.elemento_10').css('right','0px');
}
if (columnas.match(/columna_1/g) && columnas.match(/fotu/g) ) {
$('ul#master_menu_container.columna_1.fotu').css('right','0px');
}

function makeTall(){
$(this).find('ul#master_menu_container').fadeIn('slow');
};
function makeShort(){$(this).find('ul#master_menu_container').fadeOut('fast')};
});
b.push(a[0]); c.push(b[0]);
for (var i = 1; i <= (a.length -1) ; i++) {
b.push(a[i] + a[i - 1]) ;
};
for (var j = 1; j <= b.length; j++) {
c.push(b[j] + b[j + 1]);
};


$('.especial_elemento_10 a').attr('href','http://www.liverpool.com.mx/shopping/store/shop.jsp?catId=cat861126');
//alert('elementos menu\n'+ a +'\n elementos menu width\n'+ b +'\n c \n'+c);
});

jQuery(document).ready(function($) {


var marcas = ["Levi`s","Nautica","Aeropostale","GAP","Lacoste"];
$('#master_menu_container.btncat610036 ').find('li#columna_5 div a').each(function(){
var nombre = $(this).text();
if (nombre.match(marcas[0])){

$(this).append('<div id="img_levis"></div>');
$('#img_levis').css({
'display': 'block',
'height': '60px',
'background': 'url(/assets/images/logos/levis_.jpg)',
'width': '160px'
});
}
if (nombre.match(marcas[1])){

$(this).append('<div id="img_nautica"></div>');
$('#img_nautica').css({
'display': 'block',
'height': '60px',
'background': 'url(/assets/images/logos/nautica_.jpg)',
'width': '160px'
});
}
if (nombre.match(marcas[2])){

$(this).append('<div id="img_aeropostale"></div>');
$('#img_aeropostale').css({
'display': 'block',
'height': '60px',
'background': 'url(/assets/images/logos/aeropostale_.jpg)',
'width': '160px'
});
}
if (nombre.match(marcas[3])){

$(this).append('<div id="img_gap"></div>');
$('#img_gap').css({
'display': 'block',
'height': '60px',
'background': 'url(/assets/images/logos/gap_.jpg)',
'width': '160px'
});
}
if (nombre.match(marcas[4])){

$(this).append('<div id="img_lacoste"></div>');
$('#img_lacoste').css({
'display': 'block',
'height': '60px',
'background': 'url(/assets/images/logos/lacoste_.jpg)',
'width': '160px'
});
}

});

/** credit sections statment_download**/
$("input[id='previous_months']").change(function(){
$( "#prev_months" ).show("slow");
$("input[name='current_month']").removeAttr('checked');
});

$("input[id='current_month']").change(function(){
$( "#prev_months" ).hide("slow");
$("input[name='previous_months']").removeAttr('checked');
});
$("#downloading").click(function(){
var radioVal=$('input[name="month_download"]:checked').val();
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

/* Ajuste de botón Agregar dirección, en Checkoutexpress */

var href = $(location).attr('href');
if (href.match(/step2/)) {
if($( "a" ).hasClass( "btn_pagar_precheckout" ) == true){}
else{
$('a.super-gray.ctrl-data-checkout').css({ marginTop: 35, marginBottom: 25, marginLeft: -8, float: "left", width: 123, paddingTop:10, paddingBottom: 10});
}
}


$.fn.exists = function() {
return $(this).length > 0;
}

// Code using $ as usual goes here.
if ( $('.tallasf').exists() ) {
var cuantos = $('.tallasf li').length;
var alto = $('a.en-talla').outerHeight();

var linea = 2.8; //Divisor
var altura = cuantos*alto/linea;

$('ul.tallasf').innerHeight(altura);
}


$('.calcular_promo').live('click',function(){
$('.calculo_promos').slideToggle('slow');
});

// Caso default por si en los banners se ejecutan los fillers
var gx1 = "/web/images/filler_banner_lateral_a.jpg"
var y = $('aside#gate_1').find('img').attr('src');
if(y = gx1){
$('aside#gate_1').find('img').css({
'width': '190px',
'position': 'relative',
'top': '75px',
'left': '20px'
});
$('#gate_1').css({
'height':'320px',
'min-height': '320px',
});

}


var gx2 = "/web/images/filler_banner_lateral_b.jpg"
var x = $('aside#gate_2').find('img').attr('src');
if(x = gx2){
$('aside#gate_2').find('img').css({
'width': '190px',
'position': 'relative',
'top': '75px'
});
}

var pedido_detail = "/shopping/users/pedido_detail.jsp";
var href = $(location).attr('href');
if (href.match(pedido_detail)) {
$('.linkaction').css({
'position': 'relative',
'width': '120px',
'top': '-107px',
'left': '500px'
});
}



});
function fix_pseudoplaceholder(){
pseudoplaceholder($('#email'));
pseudoplaceholder($('#password'));
pseudoplaceholder($('#correo_electronico'));
}
function pseudoplaceholder(e){
if ($(e).exists()){
$(e).on('blur', function(){
if($(e).val()!=""){
$(e).css({
'background-image' : 'none'
})
}else{
$(e).css({
'background-image' : 'url("/assets/images/bg/pseudo-placeholder.jpg")'
})
}
});
}
}

/**************** THIS IS START OF THE SCRIPT THAT WILL BE IN THE script_main.js SO IT CAN FILTER EBOOKS ***********/
jQuery.expr[':'].Contains = function(a,i,m){
return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};
$("input.filterinput").live('keyup', function () {
var filter = $(this).val();
var inputId= $(this).attr('rel');
var ebooksf = $('#'+inputId);
if(filter) {
// this one finds all anchors within the lis,
// and shows them or hides them
$matches = $(ebooksf).find('a:Contains(' + filter + ')').parent();
$('li', ebooksf).not($matches).slideUp();
$matches.slideDown();
} else {
$(ebooksf).find("li").slideDown();
}
return false;
})

/**************** THIS IS END OF THE SCRIPT THAT WILL BE IN THE script_main.js SO IT CAN FILTER EBOOKS ***********/


/******************Credit System*****************************/


/******************Listing Page flag auto adjustment*****************************/
$(document).ready(function(){
$('#grid').live('click', function() {
$('.flagcontent').css('height','auto');
var itemsPerRow = 4,
items = $('.flagcontent'),
rows = items.length /itemsPerRow,r, min, max;
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeight(items.slice(min, max));
}
});
$('#list').live('click', function() {
$('.flagcontent').css('height','auto');
var itemsPerRow = 2,
items = $('.flagcontent'),
rows = items.length /itemsPerRow,r, min, max;
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeight(items.slice(min, max));
}
});
});
function normalizeHeight(items) {
var maxHeight = 0, itemHeight;
items.each(function() {
itemHeight = $(this).height();
if (itemHeight > maxHeight) {
maxHeight = itemHeight;
}
}).height(maxHeight+60+'px');
}
function normalizeHeightcompare(items){
var maxHeight = 0, itemHeight;
items.each(function() {
itemHeight = $(this).height();
if (itemHeight > maxHeight) {
maxHeight = itemHeight;
}
}).height(maxHeight+'px');
}
/************* flag height manage ************/
function flagnormalheight(size)
{
var itemsPerRow = size,
items = $('.heightarrange'),
rows = items.length /itemsPerRow,r, min, max;
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeightcompare(items.slice(min, max));
}
}

(function($) {
$(document).ready(function(){
var itemsPerRow = 4,
items = $('.flagcontent'),
rows = items.length /itemsPerRow,r, min, max;
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeight(items.slice(min, max));
}
if($("#content").find('.comparacion-view').hasClass("modulos-4"))
{
var itemsPerRow = 4,
items = $('.modulo-comparacion'),
rows = items.length /itemsPerRow,r, min, max;
flagnormalheight(4)
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeightcompare(items.slice(min, max));
}

}
if($("#content").find('.comparacion-view').hasClass("modulos-2"))
{
var itemsPerRow = 2,
items = $('.modulo-comparacion'),
rows = items.length /itemsPerRow,r, min, max;
flagnormalheight(2);
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeightcompare(items.slice(min, max));
}
}
else if($("#content").find('.comparacion-view').hasClass("modulos-3"))
{
var itemsPerRow = 3,
items = $('.modulo-comparacion'),
rows = items.length /itemsPerRow,r, min, max;
flagnormalheight(3)
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeightcompare(items.slice(min, max));
}
}else
{
var itemsPerRow = 4,
items = $('.modulo-comparacion'),
rows = items.length /itemsPerRow,r, min, max;
flagnormalheight(4);
if (rows < 1) rows = 1;
for(r = 0; r < rows; r++) {
min = itemsPerRow * r,
max = min + itemsPerRow;
normalizeHeightcompare(items.slice(min, max));
}
}

});

}(jQuery));

/**************** SCRIPT ADDED FOR CREDIT SYSTEM FOR TAKING FLOAT VALUES ONLY AND AVOIDING ALPHABETS ***********/
function isNumberKey(event)
{
var e = event || window.event;
var src = e.srcElement || e.target;
var charCode = e.which || e.keyCode || e.charCode;
if ((charCode > 31 && charCode != 36) && (charCode < 48 || charCode > 57) && charCode != 46){
return false;
} else if ( key == 8) {
return true;
}else {
var input = src.value;
var len = input.length;
var index = input.indexOf('.');

if (index > 0 && charCode == 46) return false;

if (index > 0 || index == 0) {
var CharAfterdot = (len + 1) - index;
if (CharAfterdot > 3) return false;
}

if (charCode == 46 && input.split('.').length > 1) {
return false;
}
}
return true;
}
function getAvailablePayment(selectedPG,isLoggedIn,contextPath,onPageLoad){
$.post(contextPath+"/checkout/includes/createNewPaymentGroup.jsp",
{
selectedPG: selectedPG
},
function(data){
var isCIEAvailable = $(data).filter("#cieNotAvailable").val();
var isCIENotAvailable = $(data).filter("#ciePaymentError").val();
if(selectedPG == 'CIEBancomer'){
$("#loading").show();
$.post(contextPath+ "/checkout/includes/addCIEPayment.jsp",{isCIEAvailable:isCIEAvailable,selectedPG:selectedPG},
function( data ) {
if(isCIEAvailable=='true'){
$('#search_jq_opt').html(data);
}else{
$("#search_jq_opt").hide();
$(".selecttarjeta_a").prop( "checked", false );
if(onPageLoad=='false'){
showErrorMsg(isCIENotAvailable);
}
}
$("#loading").hide();
});
}else{
if(isLoggedIn == 'false'){
$("#loading").show();
$.post(contextPath+ "/checkout/includes/addCards.jsp",{selectedPG:selectedPG},
function( data ) {
$('#search_jq_opt').html(data).show();
$("#loading").hide();
});
}else{
$("#loading").show();
$.post(contextPath+ "/checkout/includes/displayCards.jsp",{selectedPG:selectedPG},
function( data ) {
$('#search_jq_opt').html(data).show();
$("#loading").hide();
});
}
}
});
}
function showErrorMsg(message){
var errorHtml =
"<div id='alertas'>" +
"<div class='alertas'>" +
"<div class='alerta error'>" +

"<span class='icono_aviso'>" +
"<img src='/web/images/icono_error.gif' border='0' alt=''/>" +
"</span>" +
message +
"</div>" +
"</div>" +
"</div>";
jQuery("#alertas").html(errorHtml);
jQuery("#alertas").show();
return false;
}

//Start -- Script added for load tabs on selection in credit system

$(document).ready(function() {
var selectedCard = $('#card').val();

if(selectedCard != null)
{
setTimeout(function(){ document.getElementById(selectedCard).click()}, 30);

}
});
//End -- Script added for load tabs on selection in credit system

//Start -- Script added for avoiding special characters
function alpha(e) {
var k;
document.all ? k = e.keyCode : k = e.which;
return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
//End -- Script added for avoiding special characters

$(document).ready(function() {
$('.dilisa_promos').click(function(){
$('.block_promo_by_card a').removeClass('active');
$(this).addClass('active');
$('#premiumCards ,#universityCard ,#fashionCard').hide();
$('#dilsaCard').show();
});

$('.premium_promos').click(function(){
$('.block_promo_by_card a').removeClass('active');
$(this).addClass('active');
$('#dilsaCard ,#universityCard ,#fashionCard').hide();
$('#premiumCards').show();
});
$('.university_promos').click(function(){
$('.block_promo_by_card a').removeClass('active');
$(this).addClass('active');
$('#dilsaCard ,#premiumCards ,#fashionCard').hide();
$('#universityCard').show();
});
$('.fashion_promos').click(function(){
$('.block_promo_by_card a').removeClass('active');
$(this).addClass('active');
$('#dilsaCard ,#premiumCards ,#universityCard').hide();
$('#fashionCard').show();
});
});


$( document ).ready(function() {
$( "#coasdntent a" ).click (function(){
$(".showOnclick").fadeIn('fast');
});
});
/*To search with pasted string from the total string with out '*' */
function text_diff(first, second) {
    var start = 0;
    while (start < first.length && first[start] == second[start]) {
        ++start;
    }
    var end = 0;
    while (first.length - end > start && first[first.length - end - 1] == second[second.length - end - 1]) {
        ++end;
    }
    end = second.length - end;
    return second.substr(start, end - start);
}
/*Restrict copy and paste of '*' in searchBox page*/
$('#buscador').live('paste', function() {
    var self = $(this);
    var orig = self.val();
    setTimeout(function() {
        var pasted = text_diff(orig, $(self).val());
        while(pasted.indexOf('*')!=-1){
        	var res = pasted.replace('*','');
        	pasted = res;
        }
        $('#buscador').val(orig+pasted);
        
    });
});
/*Restrict copy and paste of '*' in NoSearchResults page*/
$('#busc').live('paste', function() {
    var self = $(this);
    var orig = self.val();
    setTimeout(function() {
        var pasted = text_diff(orig, $(self).val());
        while(pasted.indexOf('*')!=-1){
        	var res = pasted.replace('*','');
        	pasted = res;
        }
        $('#busc').val(orig+pasted);
        
    });
});


$( document ).ready(function() {
	//Allow only alphanumerics no special chars
$("input[name='s']").keypress(function (key) {
	 {	
		//restring character set inbetween start and end of special character codes
		if(key.charCode >= 33 && key.charCode <= 126) {
			// check for special chars
			if(key.charCode == 42)
			{	
				return false;	
			}
		}
	}
});

 var bannerContainer = $('body > div.wrapper > div.category-container > div.cat-banner-container > div > div');
if(bannerContainer != null){

 if(window.location.href.indexOf("juguetes/cat1080656") > -1) {

//Se hace uso del recurso marcascontent.html cargado de forma asincrona para pintar las marcas destacadas
		$.get( "/mobileAssets/ajax/fragment_banner_jugueteria.html", function( data ) {
				  	bannerContainer.prepend(data);
		});
    }

//Funciones para areglar el tema de la tarjeta de regalo...
    $("#giftrg-no").attr('maxlength','9');
    
    if($("#reporteMesaForm").find("input[name='tarjevento']")!=null){
    
    	$("#reporteMesaForm").find("input[name='tarjevento']").attr('name', 'tarjeta');
    }
    
    
    // Texto inicia Session... se detecta para redireccionar a credito cuando se esta loggeado.
    
	var textoInicia = $('body > div.wrapper > header > div > div > div.visableinphone > div.mobile-menu-cont.lp-mble-cont > div > div.login-home.myaccount-icon > span')

	if(textoInicia!= null && textoInicia.text().indexOf("Iniciar")==-1){
  		$('#megamenu_headerlink > ul > li:nth-child(1) > a').attr("href", "/tienda/m/users/credit/myCards.jsp");
  		$('body > div.wrapper > footer > div.footer-bottom > div.row-fluid.footerbtcontent > div > div:nth-child(4) > div > div > p:nth-child(1) > a').attr("href", "/tienda/m/home.jsp?showLoginPopup=true");
 
	}

	 // Hide facturación en el menu lateral.
	if(textoInicia!= null && textoInicia.text().indexOf("Iniciar")!=-1){
  		$('body > div.wrapper > footer > div.footer-bottom > div.row-fluid.footerbtcontent > div > div:nth-child(4) > div > div > p:nth-child(1) > a').attr("href", "/tienda/m/home.jsp?showLoginPopup=true");

	}
	//$('body > div.wrapper > div.myaccount-container > div > div.span4.accleft-nav > div.row-fluid.visible-phone > div > ul > li:nth-child(7)').hide();
	

	
}


});
$(function(){
	$('#click_notAllowed').on('click',function(event){
				$('.metrics_ratings').slideDown();
				event.stopPropagation();
				$("body").find("a.rat-empty.start_item,span.rating-number,p.rate_no ").css({
					display:"block",
				});
	});
	$('#allow_click').on('click',function(event){
		$('.metrics_ratings').slideDown();
		event.stopPropagation();
		$("body").find("a.rat-empty.start_item,span.rating-number,p.rate_no ").css({
			display:"block",
		});
	});

	$('body').on('click',function(event) {
		$('.metrics_ratings').slideUp();
		});
	});
/**************** THIS IS END OF THE SCRIPT THAT WILL BE IN THE script_main.js SO IT CAN ADJUST FLAGS on Listing page ***********/


