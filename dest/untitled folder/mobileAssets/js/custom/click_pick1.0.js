//Added for Click N Pick CR
$(document).ready(function() {
	$(".btn_send_store_address").click(gotoPaymentPageFromStoreShipping);
});

function gotoPaymentPageFromStoreShipping(event) {	
	event.preventDefault();	
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();		
	$("#selected-location-Id").val($("input[name='tienda-radio']:checked").val());
	if($.trim($("#selected-location-Id").val()) != ""){
		$("#shipToThisAddressSubmit").click();
	} else {
		showErrorPopup("Por favor captura tu Estado");		
	}
	$loading.hide();
	//setTimeout(function() {$loading.hide();	window.location.href = '/step2_paymentMethod.html';}, 1000);
}
$("input[name='tienda-radio']").on('change',function()
{	
	$("#selected-location-Id").val($(this).val());
});
function onRecogeClick() {		
	var fN=$('input[name="nombre"]').val();
	var lN=$('input[name="a_paterno"]').val();
	var mN=$('input[name="maternalName"]').val();
	var em=$('input[name="email"]').val();
	var pN=$('input[name="phoneNumber"]').val();
	var pnL=$('input[name="lada"]').val();
	if($.trim(fN) != "" && $.trim(lN) != "" && $.trim(em) != "" && $.trim(pN) != "" && $.trim(pnL) != "") {
		location.href='shippingStoreAddress.jsp?fN='+fN+'&lN='+lN+'&mN='+mN+'&em='+em+'&pN='+pN+'&pnL='+pnL;
	} else {
		$('#collapseTwo').removeClass('in');
		$("#newDelvryAdd").click();
	}
}
