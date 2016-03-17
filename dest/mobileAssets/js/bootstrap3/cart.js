var maxchars = 200;
var maxLength = 80;
$(document).ready(function(){
	

      /*START: PA, Site-Redesign Change for gift wrap*/

	$(".heading-gift").click(function(){ 
		var chkInputsetvalue = $(this).find(".is-gift");
		var chkInputs = $(this).find(".is-gift").val();
		
		if (chkInputs == "false") { 
			chkInputsetvalue.val('true').prop('checked', false);
			}
		 else { 
			chkInputsetvalue.val('false').prop('checked', true);
		 }
		});
		
		$('textarea').keyup(function() {
		var idChar = $(this).attr("chars-name");
		var sChar = "#" + idChar;
		console.log(sChar);
		// var idChars = $(this).find("span");
		var length = $(this).val().length;
		var length = maxLength - length;
		//$(sChar).text(length);
	});
	$('.gift-size').each(function( index ) {
	if($(this).find('.is-gift').val() == 'true'){
	$(this).find('.is-gift').addClass("is-gifts");
	$(".is-gifts").parents(".gift-panel").find(".panel-collapse").addClass("in");
	}
  
});
	// if($(".is-gift").val() == 'true'){
			// $(".is-gift").parents(".gift-panel").find(".panel-collapse").addClass("in");
		// }
 /*END: PA, Site-Redesign Change for gift wrap*/
	
	//Function for checkbox clicked
	$(".checkbox").click(function() {
		// alert("click");
		var inputs = $(this).find("input");
		console.log(inputs);
		var chk = $(this).attr("aria-expanded");
		// alert(chk);
		if (chk == "true") {
			inputs.prop('checked', false);
		} else {
			inputs.prop('checked', true);
		}

	});
	

	window.onpageshow = function(event) {
		if (event.persisted) {
		window.location.reload();
		}
		};
	$("#checkout-login input[mandatory='true']").attr("required","true");
	$("#login input[mandatory='true']").attr("required","true");
	$('#login').validator();
	//defect:7228  fix start 
	//reloadCart();
	//defect:7228  fix end
	
	$('.uname, .mob-uname').on('click', function(e) {
		$(this).parents('.logged-in').find('ul.loggedin-menu').slideToggle();
		$(this).toggleClass('acitve');
		});
	
	
lpobjcart = {	
	ajaxGetContent: function(URL, Type) {
return $.ajax(
{
type: "GET",
url: URL,
datatype: Type
});
}
	
	}
	
	
	
	
	$('.search-icon, .mobile-search-icon').on('click', function(e) {	
	
$('#search-container').modal('show');
$('#busca').val('');
var data = lpobjcart.ajaxGetContent('/tienda/m/common/frag/searchBox.jsp', "html");
data.success(function(data) {
	$(".iphone").html(data);
	endeca_autoSearchSuggest();
	});
	});



$('.chk-login-tab2').on('click', function() {
	$('.chk-login-tab2').addClass('active');
	$('.chk-login-tab1').removeClass('active');
	$('.firsttab').hide();
	$('.create-account-tab').show();
	});
    
    $('#search-icon-contain').on('click', function() {
	   $("#myModal_search").modal();
	});
    
    $('.cerrar-modal-search').click(function(){
        $('#myModal_search').modal('toggle');
    });


$('.chk-login-tab1').on('click', function() {
	$('.chk-login-tab1').addClass('active');
	$('.chk-login-tab2').removeClass('active');
	$('.create-account-tab').hide();
	$('.firsttab').show();
	});

$('#checkout-login').validator();


$('textarea').keyup(function () {
	 countChar(this);
});

var textareaelm = $('textarea');
$.each(textareaelm,function(index,value){
	//PA, Site-Redesign changes 
	//countChar(this);
	});
 /*START: PA, Site-Redesign Change for gift wrap*/
	$('.panel-body .list-group-item .chout1').each(function( index ) {
		if($(this).find('.giftWrapTypeforid').val() == 'true'){
				$(this).find('.giftWrapTypeforid').next().click();
			}
	});
	
	  $(".mono_color_container").click(function(){
			$(this).each(function(){
				 $(this).find(".giftRibbonColors").removeAttr("checked");
				 $(this).find(".giftRibbonColors").attr("checked","true");
				 $(this).parents(".list-group-item").find(".giftRibbonColorforid").val("false");
				 $(this).find(".giftRibbonColorforid").val("true");
			})
	  });
	  
	  $('.giftRibbonColorforid').each(function( index ) {
		if($(this).val() == 'true'){ 
				$(this).parent(".mono_color_container").parents(".activeclass").addClass("active");
			}
	});  
 /*END: PA, Site-Redesign Change for gift wrap*/



	//$(".addmore_container a > strong").text("Agregar dirección");

	if(window.location.href.indexOf("shipping") > -1 ) {

		renderShippingMessage("shipping");

	}else if (window.location.href.indexOf("cart") > -1) {
		renderShippingMessage("cart");

	};
});




	
function countChar(val) {
    var len = val.value.length;
    var val_ids = val.id;
    var replacestr = val_ids.replace("_mes", "_chars");
    console.log(replacestr);
    if (len >= maxchars) {
      val.value = val.value.substring(0, maxchars);
    } else {
      $('#'+replacestr).html(maxchars - len);
    }
  }

function reloadCart(){
	$.ajax({
		type : 'POST',
		url: '/tienda/m/common/frag/headerLinks.jsp',
		async: false,
		beforeSend: function(){
			var $loading = $('#sc-page-spinner').hide();
			$loading.show();
		},
		    success: function (data) {	
			console.log('seccess update ');			
		    $('#testHeaderCartContent').html(data);
		    var pcart_val = $(".headerrightmenu .shopping-bag a .badge").text();
		    $(".badge-position .img-size-icon-bag .badge").text(pcart_val);
		    $(".col-xs-7 .img-size-icon-bag .badge").text(pcart_val);
		    var $loading = $('#sc-page-spinner').hide();
			$loading.hide(); 
		    
		  
		},
		error : function(error) {
			console.log('error in add to cart');
		}
	});
}

function submitUpdate(formId){
	var $loading = $('#sc-page-spinner');
    $loading.show();
    /* PA, Start:SR changes for cart update qty WAP*/
    var id_update=$('#'+formId+"final").val();
    if(id_update){	
    $('input#'+formId).val(id_update);
    }
    /* PA, End:SR changes for cart update qty WAP*/
    setTimeout(function(){ 
    	$('#'+formId).ajaxSubmit({
                  cache: true,
                  beforeSend: function(){
                        },
                success: function(data){
                	console.log("success");
                
                	$('#main').html(data);
        			reloadCart();
        			
                   var $loading = $('#sc-page-spinner');
                        $loading.hide();
                }
           });
    }, 3000);
}

function defaultImageonCart(e,noImageUrl) {
	e.src = noImageUrl;
	e.onerror = "";
	return true
	}

function redirectAfterAddItem() {

	var flag = false;
var cdlerror = $("#cdlerror").val();
if(cdlerror == "true")
{
$('#compare-error').modal('show');
return false;
}
else
{
var contextPath = $("#contextroot").val();
var array = $("textarea");
var tmpData = new Array();
var contextPath = $("#contextroot").val();
var array = $("textarea");
var tmpData = new Array();
var str='';
var name=document.getElementsByName('name');
var email=document.getElementsByName('email');
var confirmEmail=document.getElementsByName('confirmEmail');
var recpName = '';
var recEmail='';
var recConfirmEmail='';
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$.each(name,function(index,value){
recpName+=$(value).attr("id")+$(value).val()+'_name';
});
$.each(email,function(index,value){
recEmail+=$(value).attr("id")+$(value).val()+'_email';

});
$.each(confirmEmail,function(index,value){
recConfirmEmail+=$(value).attr("id")+$(value).val()+'_confirmEmail';
});

$.each(array,function(index,value){
if($(value).attr("id")+$(value).val() !== 'undefined')
str+=$(value).attr("id")+$(value).val()+'_mes';
});
 /*START: PA, Site-Redesign Change for gift wrap*/
modifiedString=escape(str);
var giftWrapType = document.getElementsByName('giftWrapType');
var giftRibbonColor = document.getElementsByName('giftRibbonColor');
var isWrapNeeded = document.getElementsByName('isWrapNeeded');
//alert("sabdeeo");
var giftwrapType = '';
var giftwrapColor = '';
var giftwrapMessage = '';
var giftwrapNeeded = '';
var checkvalue = '';
$.each(giftWrapType, function(index, value) {
	
	if($(this).is(":checked")){
	giftwrapType += $(this).parent(".chout1").find(".giftWrapTypeforid").attr("id") + $(this).val() + '_giftWrapType';
	}
});
$.each(giftRibbonColor, function(index, value) {
if($(this).parent(".mono_color_container").find(".giftRibbonColorforid").val() == "true"){
//if($(this).is(":checked")){
giftwrapColor+=$(this).parent(".mono_color_container").find(".giftRibbonColorforid").attr("id")+$(value).val()+'_giftRibbonColor';
}
});

$.each(isWrapNeeded, function(index, value) {
checkvalue = $(this).val();

giftwrapNeeded += $(value).attr("id") + checkvalue + '_isWrapNeeded';

if (checkvalue) {
console.log($(this).parent("panel-body").next().find("textarea").attr("id"));

giftwrapMessage += $(this).parents(".gift-panel").find(".message textarea").attr("id") + $(this).parents(".gift-panel").find(".message textarea").val() + '_gWmes';
}
});


$.ajax({
type : 'POST',
url: contextPath+'/checkout/includes/sendGiftMessageToDroplet.jsp?&giftMessages='
+ modifiedString + '&recpName=' + recpName + '&recEmail='
+ recEmail + '&recConfirmEmail=' + recConfirmEmail +
'&giftwrapMessage=' + giftwrapMessage + '&giftwrapType=' + giftwrapType + '&giftwrapNeeded='
+ giftwrapNeeded + '&giftwrapColor=' + giftwrapColor,
async: false,
success: function (data) {
val = data;
$('#loading').hide();
console.log("call: sendGiftMessageToDroplet.jsp - success");
},
error : function(error) {
var err = error;
console.log("call: sendGiftMessageToDroplet.jsp - Failure");
console.log(err);
}
});

 /*END: PA, Site-Redesign Change for gift wrap*/
if($('#catrchecking').find('.panel-group-for-giftmessage').length>0)
{
	
	 $('.selector').each(function(){
		/* console.log(this);
		 console.log($(this).valid());*/
		 	if(!$(this).valid())
				 {
				 	flag = true;
				 	console.log(this);
				 }
		});
	if(!flag) {
		$('#accordion .in').collapse('hide');
		if($("#setGiftMessages").val()==="1"){
			console.log("redirecting to billing.");
			window.location = contextPath + "/checkout/billing.jsp"
			}else if($("#setGiftMessages").val()==="2"){
				
			console.log("redirecting to shipping.");
			window.location = contextPath + "/checkout/shipping.jsp"
			}
			
	}
	
}
else {
			if($("#setGiftMessages").val()==="1"){
			console.log("redirecting to billing.");
			window.location = contextPath + "/checkout/billing.jsp"
			}else if($("#setGiftMessages").val()==="2"){
				
			console.log("redirecting to shipping.");
			window.location = contextPath + "/checkout/shipping.jsp"
			} 
}












}
}

function warnEbooks(){
$('#warningForEbook').attr("style","display:block;");
$('#divWarningForEbook').attr("style","display:block;");
$('#divWarningForEbook').children("div").show();
}




function checkoutLoginPopup() {
	
	var contextPath = $("#mobilePage_contextPath").val();
	var tmpData = new Array();
	var str='';
	
	var recpName = '';
	var recEmail='';
	var recConfirmEmail='';
	var i=0;
	var isError=false;
	var modifiedString='';
	$(".ebookFormError").html("");
	var emailArr=[];
	var array = $("textarea");
	var k=1; var formselector = $(".selector"); 
	var flag = false;
	var chkevalidation = false;
	
	var name=document.getElementsByName('name');
	var email=document.getElementsByName('email');
	var confirmEmail=document.getElementsByName('confirmEmail');
	
	$.each(name,function(index,value){
	recpName+=$(value).attr("id")+$(value).val()+'_name';
	console.log(recpName);
	});
	$.each(email,function(index,value){
	recEmail+=$(value).attr("id")+$(value).val()+'_email';

	});
	$.each(confirmEmail,function(index,value){
	recConfirmEmail+=$(value).attr("id")+$(value).val()+'_confirmEmail';
	});

	$.each(array,function(index,value){
	if($(value).attr("id")+$(value).val() !== 'undefined')
	str+=$(value).attr("id")+$(value).val()+'_mes';
	});
	modifiedString=escape(str);

	
 /*START: PA, Site-Redesign Change for gift wrap*/

	var giftWrapType = document.getElementsByName('giftWrapType');
	var giftRibbonColor = document.getElementsByName('giftRibbonColor');
	var isWrapNeeded = document.getElementsByName('isWrapNeeded');
	//alert("sabdeeo");
	var giftwrapType = '';
	var giftwrapColor = '';
	var giftwrapMessage = '';
	var giftwrapNeeded = '';
	var checkvalue = '';
	$.each(giftWrapType, function(index, value) {
		
		if($(this).is(":checked")){
		giftwrapType += $(this).parent(".chout1").find(".giftWrapTypeforid").attr("id") + $(this).val() + '_giftWrapType';
		}
	});
	$.each(giftRibbonColor, function(index, value) {
	if($(this).parent(".mono_color_container").find(".giftRibbonColorforid").val() == "true"){
	//if($(this).is(":checked")){
	giftwrapColor+=$(this).parent(".mono_color_container").find(".giftRibbonColorforid").attr("id")+$(value).val()+'_giftRibbonColor';
	}
	});
	
	$.each(isWrapNeeded, function(index, value) {
	checkvalue = $(this).val();
	
	giftwrapNeeded += $(value).attr("id") + checkvalue + '_isWrapNeeded';
	
	if (checkvalue) {
	console.log($(this).parent("panel-body").next().find("textarea").attr("id"));
	
	giftwrapMessage += $(this).parents(".gift-panel").find(".message textarea").attr("id") + $(this).parents(".gift-panel").find(".message textarea").val() + '_gWmes';
	}
	});

	console.log(giftwrapType + "***" + giftwrapMessage + "**" + giftwrapNeeded
	+ "***" + giftwrapColor + "***" + "");
	
	$.ajax({
	type : 'POST',
	url: contextPath+'/checkout/includes/sendGiftMessageToDroplet.jsp?&giftMessages='
	+ modifiedString + '&recpName=' + recpName + '&recEmail='
	+ recEmail + '&recConfirmEmail=' + recConfirmEmail +
	'&giftwrapMessage=' + giftwrapMessage + '&giftwrapType=' + giftwrapType + '&giftwrapNeeded='
	+ giftwrapNeeded + '&giftwrapColor=' + giftwrapColor,
	async:false,
	success: function (data) {
	val = data;
	$('#loading').hide();
	},
	error : function(error) {
	var err = error;
	console.log(err);
	}
	});
	
 /*END: PA, Site-Redesign Change for gift wrap*/
	/*$('.checkbox').each(function(){
		 $(this).slideToggle();
			 
	});
	*/
	
	
	
	 
	 
	if($('#catrchecking').find('.panel-group-for-giftmessage').length>0)
	{
		
		 $('.selector').each(function(){
			 console.log(this);
			 console.log($(this).valid());
			 	if(!$(this).valid())
					 {
					 	flag = true;
					 	console.log(this);
					 }
			});
		if(!flag) {
			$('#accordion .in').collapse('hide');
			$('#checkoutmyLogginAlert').modal(); 
				
		}
		
	}
	else { $('#checkoutmyLogginAlert').modal(); }

	

	}

function showErrorPopup(msg){
	$('#error-alert-popup-text').html(msg);
	$('#myModalAlertError').modal();
}

function warnEbooks1(){
	$('#warningForEbook').attr("style","display:block;");
	$('#divWarningForEbook1').attr("style","display:block;");
	$('#divWarningForEbook1').children("div").show();
}
 /*START: PA, Site-Redesign Change for Coupon functionality*/

$(document).ready(function(){ 
	$(document).on("click touchstart","#cuppon_button",function(){ 
	if((document.getElementById('couponId').value == '') || (document.getElementById('couponId').value.length < 12))  
	{ $('#promo-code-result').html('');
	    var errorCoupon=$('#couponErrorMsg').val();
	    $('#promo-code-result1').html('<span class="cuppon_validation_message invalid" id="error">'+errorCoupon+'</span>').show();return false;}
	else 
	{
	$('#promo-code-result1').remove();
	$('#promo-code-result').remove();
	
	couponSubmit();
	}
		});
});

function couponSubmit() {

var contextPath = $("#contextJSPPath").val();

var couponCode = document.getElementById('couponId').value;

/*if (couponCode.toString().length < 12) {
return false;
} else {*/
	
$("#couponId").blur();
$.ajax({
type : 'POST',
url : '/tienda/m/cart/frag/couponCodeSubmit.jsp?couponCode='+ couponCode,
/*beforeSend: function() {
	$( ".gift-size" ).accordion( "disable" );
},*/
success : function(data) {
 $('#main').load("/tienda/m/"+"/cart/submitCart.jsp", function(){

var errorlen = $(data).filter('#lp_couponcode').html().length;
var successlen = $(data).filter('#lp_couponsuccesscode').html().length;

console.log("success message - "+ $(data).filter('#lp_couponsuccesscode').html());
console.log("error message - "+ $(data).filter("#lp_couponcode").html());
$('#promo-code-result1').empty();
$('#promo-code-result').empty();
$('#promo-code-result').html('<span class="cuppon_validation_message success">'
			+$(data).filter('#lp_couponsuccesscode').html()+'</span>').show();
	
$('#promo-code-result1').html('<span class="cuppon_validation_message invalid" id="error">'
		+$(data).filter('#lp_couponcode').html()+'</span>').show();

});

},
error : function() {
console.log('inside error');
}
});

}


function isNumberKeys(evt){
  if($(".plus-qty").val().length > 2) {
    return false;
  }
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
       return false;
   return true;
}



function renderShippingMessage(parameter){

var strVar="";
strVar += "<img class=\"img-responsive\" src=\"http:\/\/www.liverpool.com.mx\/assets\/images\/tiempos_entrega_390px.jpg\" alt=\"image\">";
strVar += "";

	if(parameter == "shipping"){
			$('#accordion').after(strVar);

	}else if(parameter == "cart"){
			$('.label-confident').after(strVar);
	}

	//$('.label-confident').after(strVar);


}
	function showTiemposEntrega(){
		$('#exampleModal').modal();
	}



/*END: PA, Site-Redesign Change for Coupon functionality*/
