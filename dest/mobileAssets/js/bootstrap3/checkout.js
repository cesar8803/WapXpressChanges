var loginPageURL = '/users/login.jsp';
/*START PA LP SITE REDESIGN : Fixed for Billing page*/
$(document).ready(function(){
		var t = $("ul.list_headlines_payment li");
		var v = $(".tab-pane");
		var paymentSelVal = $("#paymentSelected").val();
		if(paymentSelVal != "undefined"){
		t.removeClass("active");
		v.removeClass("active");
		if(paymentSelVal == "paypal"){
			t.eq('1').addClass("active");
			$("#pay_pal_payment_method").addClass("active");
		}
		if(paymentSelVal == "creditCard"){
			t.eq('0').addClass("active");
			$("#credit_card_payment_method").addClass("active");
		}
		if(paymentSelVal == "CIEBancomer"){
			t.eq('2').addClass("active");
			$("#cie_bancomer_payment_method").addClass("active");
		}
		if(paymentSelVal == ""){
			t.eq('0').addClass("active");
			$("#credit_card_payment_method").addClass("active");
		}	
		}
		/*Start  PA Support : 09th Oct 2015  Modified: hide date internal card */

		if ($('.extraheight').length > 0) {
		    onCardTypeChange();
		}
		
		/* End  PA Support : : 09th Oct 2015  Modified: hide date internal card*/
		$("#guest_form_checkout_express_pay_method > div:nth-child(8) > div").text("Datos de la tarjeta");
		$("#guest_form_checkout_express_pay_method > #adress_content > div.panel.panel-primary").text("Dirección de la tarjeta");
        
        $('.item-promotion').click(showModalPromotions);


        $('.listnoselected').click(onItemPromoClickListener);


        $('.cerrar-modal-login.cerrar-modal-checkout').click(onModalCloseButtonListener);

       // $("#main_grid > div:nth-child(4) > div.visible-xs.thumbnail > div > div > a > strong").text("Agregar dirección");



    //var containerButtonRecoger =  $("#container_adress1 > button.btn_send_store_address");
	//if(containerButtonRecoger != null){
        // $("button.btn_send_store_address").html("Recoger en esta tienda");
	//}

});
/*END PA LP SITE REDESIGN : Fixed for Billing page*/

//Gift message functions : moved to cart.js

$(function() {
	window.onpageshow = function(event) {
		if (event.persisted) {
		window.location.reload();
		}
		};
	
	$("[data-toggle=popover]").popover({
		placement : 'bottom',
        html:true
	});
	//var href = $("#btn_send_address");
	//href.attr('disabled',true);
	$("#main_grid input:radio[name='radioAdress']").click(function() {
		var radioButtons = $("#main_grid input:radio[name='radioAdress']");

		// this should contain the count of all your radio buttons
		var totalFound = radioButtons.length;

		// this should contain the checked one
		var checkedRadioButton = radioButtons.filter(':checked');

		// this should get the index of the found radio button based on the list of all
		var selectedIndex = radioButtons.index(checkedRadioButton);

		$(radioButtons).each(function() {
			//Cambios en la WAP
			var contenedor = $(this).parent().find(".container.buttons_section");
			contenedor.removeClass("container_buttons").addClass("container_buttons_off");

			var buttons = contenedor.find("a.btn");

			$(buttons).each(function() {
				$(this).attr('disabled', 'disabled');
			});

		});

		var containerCheked = $(checkedRadioButton).parent().find(".container.container_buttons_off");
		containerCheked.removeClass("container_buttons_off").addClass("container_buttons");
		var buttonsSelected = containerCheked.find("a.btn");
		$(buttonsSelected).each(function() {
			$(this).removeAttr('disabled');
		});

        
		//	alert(selectedIndex);
	});
	
	/* Logged-in user payment page submit */
	/*$('#form_checkout_express_pay_method').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log("payment form invalid");
		 } else {
			 console.log("payment form valid");
			 goToPromotionPage();
			 return false;
			
		  }
	});*/
	
	/* Guest user Credit payment page submit */
	/*$('#guest_form_checkout_express_pay_method').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log("Guest payment form invalid");
		 } else {
			 console.log("Guest payment form valid");
			 goToPromotionPageGuest();
			 return false;
			
		  }
	});
	
	 Guest user Bancomner payment page submit 
	$('#form_guest_bancomer_pay_method').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log("Guest payment form invalid");
		 } else {
			 console.log("Guest payment form valid");
			 goToPromotionPageGuest();
			 return false;
			
		  }
	});
	
	 Guest user Paypal payment page submit 
	$('#form_guest_paypal_method').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log("Guest payment form invalid");
		 } else {
			 console.log("Guest payment form valid");
			 goToPromotionPageGuest();
			 return false;
			
		  }
	});*/
	
	//Codigo para ocultar y aparecer los campos de la TDC, dependiendo del radio seleccionado

	$("#main_list_cards input:radio[name='creditCardNickName']").click(selectCreditCard);

	$("#submit_button_purchase1").click(checkIsLogged);

	$("#submit_button_purchase2").click(checkIsLogged);
	
	$(".btn_send_address").click(gotoPaymentPage);

	$(".btn_edit_address").click(gotoEditAddress);

	$(".submit_button_2_step3").click(goToPromotionPage);
	
	$(".btn_add_New_Credit_Card").click(storeValuesAtSessionForCheckout);
	
	$(".btn_edit_credit_card").click(gotoEditCreditCard);
	
	$(".submit_button_2_step4").click(gotoConfirmationPage);
	
	$(document).on('click','.submit_button_2_step6', function() {
		goToPromotionPageGuest();
	});
	
	
	
	

	$(".sprite-eliminar").click(deleteItem);

	$("#continue_shopping_purchase").click(function() {
		parent.history.back();
		return false;
	});
	
	
	$("#orderConfirmBtn").click(commitOrder);
	
	/* on enter key press event for confirmation page. */
	$("#checckout_capture").keyup(function(event){
		if(event.keyCode == 13){
			commitOrder();
		}
	});
	
	/*click and pick*/	
	if($('.alertas>.alerta').html() == undefined) {
		$("#listaEstados").modal('toggle');
	}
	$("#headingTwoInternal").click(function() {

		if ($('#collapseTwo').hasClass('in')) {
			$('#collapseTwo').removeClass('in');
			$('html,body').animate({
				scrollTop : $(".head_container").offset().top
			}, 'slow');

		} else {
			$('#collapseTwo').addClass('in');
			$('html,body').animate({
				scrollTop : $("#headingTwo").offset().top
			}, 'slow');

		}

	});
	
	
	$(".estados-lista").click(function() {			
		$("#selected-state-Id").val($(this).attr('name'));
		var stateName = $(this).html();
		var stateId = $(this).attr('name');
		//START: stores display by stateName
		stateName = $.trim(stateName);
		var encodedStateName = escape(stateName);
		$.ajax({
			url : "showStoreAddress.jsp?state="+encodedStateName
		}).done(function(data) {				
			$("#listaEstados").modal('toggle');				
			$("#contenedor-tiendas").html(data);
			$("#title-tiendas").html(stateName);
			$("#selected-state-Id").val(stateId);
			$("#selected-location-Id").val($("input[name='tienda-radio']:checked").val());
			$(".btn_send_store_address").click(gotoPaymentPageFromStoreShipping);
		    $("button.btn_send_store_address").html("Recoger en esta tienda");

		});
		//END: stores display by stateName
   });
	
	
	$("#hrefsubmit-form-adress-button").on('click', function(){
		compactRegistration();
	});
	
	$(document).on('click','.radio-liver', function() {

		var inputsRadio = $(this).find("input");
		var buttonsPink = $(this).find(".address_container > button");

		$("#tiendas_list_ajax").find(".address_container > button")
				.removeClass("active_btn");

		// console.log($(buttonsPink).is(':visible'));
		if ($(buttonsPink).is(':visible')) {

			$(buttonsPink).removeClass("active_btn");

		} else {

			$(buttonsPink).addClass("active_btn");

		}
		$("#selected-location-Id").val($("input[name='tienda-radio']:checked").val());
		// console.log(inputsRadio);
		// console.log(buttonsPink);

	});
	
/* click and pick */
});

function switchAvailablePayment(selectedPG, contextPath, isUserLoggedIn,isOnload) {
	console.log(selectedPG);
	console.log("########## switchAvailablePayment() Start ##########");
	var $loading = $('#sc-page-spinner');
	$loading.show();
	console.log("selectedPG->" + selectedPG);
	console.log("contextPath->" + contextPath);
	console.log("isUserLoggedIn->" + isUserLoggedIn);

	setTimeout(function(){ 
		$.post(contextPath + "/checkout/includes/checkAvailablePaymentOptios.jsp",
			{
				selectedPG : selectedPG
			}, function(data) {
				var res = data.trim();
		    	console.log("res : " + res);
				var sessionexp = chksessionexp(res);
				console.log("sessionexp : " + sessionexp);
				if(!sessionexp){
					console.log('User selected payment type - ' + selectedPG);
					$("#selectedPayMethod").val(selectedPG);
					$('#paymentSelected').val(selectedPG);
					if(!isOnload){
						$loading.hide();
					}
				} else {
					var isLoggedeIn = $("#jsp_isLoggedIn").val();
					if(isLoggedeIn == 'true'){
						window.location.href = $("#jsp_contextroot").val() + loginPageURL;
					} else {
						window.location.href = $("#jsp_contextroot").val();
					}
				}
			});
	}, 1000);
	console.log("########## switchAvailablePayment() End ##########");
}

function selectCreditCard(event)  {
	console.log("########## selectCreditCard() Start ##########");
	var $loading = $('#sc-page-spinner');
	$loading.show();
	$("label.error").hide();
	  $(".error").removeClass("error");
	var radioButtons = $("#main_list_cards input:radio[name='creditCardNickName']");

	// this should contain the count of all your radio buttons
	var totalFound = radioButtons.length;

	// this should contain the checked one
	var checkedRadioButton = radioButtons.filter(':checked');
	
	var selectedCreditCardNickName = $("#main_list_cards input:radio[name='creditCardNickName']:checked").val(); 

	// this should get the index of the found radio button based on the list of all
	var selectedIndex = radioButtons.index(checkedRadioButton);

	$(radioButtons).each(function() {
		//Cambios en la WAP
		var contenedor = $(this).parent().find(".container.buttons_section");
		contenedor.removeClass("container_card_fields").addClass("container_card_fields_off");
		$(this).parent().removeClass("active");

		var buttons = contenedor.find("a.btn");

		$(buttons).each(function() {
			$(this).attr('disabled', 'disabled');
		});

	});

	var containerCheked = $(checkedRadioButton).parent().find(".container.container_card_fields_off");
	containerCheked.removeClass("container_card_fields_off").addClass("container_card_fields");
	var buttonsSelected = containerCheked.find("a.btn");
	$(checkedRadioButton).parent().addClass("active");
	var selectedid= $(checkedRadioButton).parent().attr("id");
	$(buttonsSelected).each(function() {
		$(this).removeAttr('disabled');
	});
	
	selectCreditCardCall(selectedCreditCardNickName);
	console.log("########## selectCreditCard() End ##########");
}

function selectCreditCardCall(selectedCreditCardNickName){
	console.log("########## selectCreditCardCall() Start ##########");
	var isLoggedIn = $("#isLoggedInId").val();
	console.log("isLoggedIn:"+isLoggedIn);
	if(isLoggedIn == "true"){
		$("#selecttarjeta").val(selectedCreditCardNickName);
		setTimeout(function(){ 
			$('form#checkout_billing_credit_card_select_form').ajaxSubmit({
				 cache: true,
				 beforeSend: function(){
						
					 },
			     success: function(data){
			    	 var $loading = $('#sc-page-spinner');
			    	 $loading.hide(); 
					 var res = data.trim();
					 
					 var sessionexp = chksessionexp(res);
					 console.log("sessionexp : " + sessionexp);
					 if(!sessionexp){
				    	 if(res == "successmee"){
				    		 console.log("Selected credit card is : " + selectedCreditCardNickName);
			    		 } else {  
			    			 console.log("Submitting Credit card selection Error:"+data.trim());
			    		 }
				    	 console.log('seccess ajax');
					 } else {
						 var isLoggedeIn = $("#jsp_isLoggedIn").val();
							if(isLoggedeIn == 'true'){
								window.location.href = $("#jsp_contextroot").val() + loginPageURL;
							} else {
								window.location.href = $("#jsp_contextroot").val();
							}
					 }
			     }
			});
		}, 1000);
	} else{
		console.log("in else");
		var $loading = $('#sc-page-spinner').hide();
		$loading.hide();
	}
	console.log("########## selectCreditCardCall() End ##########");
}

function changediv(){
	var radioButtons = $("#main_list_cards input:radio[name='creditCardNickName']");

	// this should contain the checked one
	var checkedRadioButton = radioButtons.filter(':checked');
	var selectedid= $(checkedRadioButton).parent().attr("id");
	var replaceid = $("#"+selectedid).html();
	var replaceid = $("#"+selectedid).html();
	var firstid = $("#change1").html();
	$("#change1").html(replaceid);
	$("#"+selectedid).html(firstid);
}

function storeValuesAtSessionForCheckout(event) {
	event.preventDefault();
	
	var isAddCardError = $('#isProfileCreditCardError').val();
	if(isAddCardError == "true"){
		var errorMsg = $("#maxProfileCreditCardError").val();
		showErrorPopup(errorMsg);
		return false;
	}
	
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	var contextPath = $("#contextJSPPath").val();
	var url = contextPath + '/checkout/includes/sessionStorage.jsp?isCheckout='
			+ true;
	var addCreditCardURL = contextPath + '/checkout/newCreditCard.jsp';
	$.ajax({
		type : "POST",
		cache : false,
		url : url,
		success : function(data) {
			var res = data.trim();
			var sessionexp = chksessionexp(res);
			console.log("sessionexp : " + sessionexp);
			if(!sessionexp){
				window.location.href = addCreditCardURL;
			} else {
				var isLoggedeIn = $("#jsp_isLoggedIn").val();
				if(isLoggedeIn == 'true'){
					window.location.href = $("#jsp_contextroot").val() + loginPageURL;
				} else {
					window.location.href = $("#jsp_contextroot").val();
				}
			}
		},
		error : function(error) {
		}
	});
}

function gotoEditCreditCard(event) {
	event.preventDefault();
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	var nickName = $(this).attr("nickName");
	$("#editCreditCardNickName").val(nickName);
	$("#editCreditCardSubmit").click();
}

function gotoEditAddress(event) {
	event.preventDefault();
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	var nickName = $(this).attr("nickName");
	$("#selectedAddressForEdit").val(nickName);
	$("#editAddressForm").click();
}

function checkIsLogged() {
	
	var logged = $('input#logged').val()
	
	
	gotoCheckOut(logged);
	

}

/*function gotoCheckOut(islogged) {
	
	if(islogged=="true"){
		
		var $loading = $('#sc-page-spinner').hide();
		
		$loading.show();
	
		setTimeout(function() {
		$loading.hide();
		window.location.href = '/step1_checkout.html';
		}, 1000);

	}else{
		
		$('#myLogginAlert').modal();

	}
}*/

function gotoPaymentPage(event) {
	
	event.preventDefault();	
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	var nickName = $(this).attr("nickName");
	$("#shipToThisAddress").val(nickName);
	$("#shipToThisAddressSubmit").click();
	//setTimeout(function() {$loading.hide();	window.location.href = '/step2_paymentMethod.html';}, 1000);
}
var falg = 0;

function goToPromotionPage() {
	
	console.log("########## goToPromotionPage() Start ##########");
	if(!$('#collapseOne,#collapseTwo,#collapseThree').hasClass('in')){
		var noPaymentSelectedMsg = $("#noSelectPaymentOptionMsg").val();
		showErrorPopup(noPaymentSelectedMsg);
		return false;
	}
	var isLoggedInId = $('#isLoggedInId').val();
	
	if(isLoggedInId == 'true'){
		var flag = $('#form_checkout_express_pay_method').valid();

		console.log("flag valid_pay_method: " + flag);

		if (flag) {
			var $loading = $('#sc-page-spinner').hide();
			$loading.show();
			
			var paySelGrup = $('#paymentSelected').val();
			var contextPath = $("#contextJSPPath").val();
			var promotionPageURL = contextPath + '/checkout/promotions.jsp';
			var submitFormId="";
			if(paySelGrup == 'creditCard') {
				
				var creditCardNickName = $("#main_list_cards input:radio[name='creditCardNickName']:checked").val();
				var cvv = $('.container_card_fields .cvv1').val();
				var month = $('.container_card_fields .mes').val();
				var year = $('.container_card_fields .anio').val();
				
				$('#selecttarjetaId').val(creditCardNickName);
				$('#ccVerNoId').val(cvv);
				$('#monthId').val(month);
				$('#yearId').val(year);
				
				$('form#form_checkout_express_pay_method').ajaxSubmit({
					 cache: true,
					 beforeSend: function(){
						 $('#selecttarjetaId').val(creditCardNickName);
						 $('#ccVerNoId').val(cvv);
						 $('#monthId').val(month);
						 $('#yearId').val(year);
					 },
				     success: function(data){
				    	 var res = data.trim();
				    	 console.log("res : " + res);
				    	 var sessionexp = chksessionexp(res);
				    	 console.log("sessionexp : " + sessionexp);
				    	 if(!sessionexp){
				    		 if(res == 'SUCCESS') {
					    		 console.log("Success : Submiting payment page");
					    		 setCreditCardinfoToSessionBean(promotionPageURL);
					    	 } else {
					    		 console.log("error : occured while submiting payment page");
					    		 showErrorPopup(res);
					    		 $loading.hide();
					    	 } 
							 console.log('seccess ajax');
				    	 } else {
				    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
								if(isLoggedeIn == 'true'){
									window.location.href = $("#jsp_contextroot").val() + loginPageURL;
								} else {
									window.location.href = $("#jsp_contextroot").val();
								} 
				    	 }
				    	
				     }
				});
				
				//PA, START: modified for Site Redesign biiling functionality		
					
			} else if(paySelGrup == 'paypal') {
				submitFormId = "form_guest_paypal_method";
			} else if(paySelGrup == 'CIEBancomer') {
				submitFormId = "form_guest_bancomer_pay_method";
			}				
			if((paySelGrup == 'CIEBancomer') || (paySelGrup == 'paypal')){	
			setTimeout(function(){ 
					$('#'+submitFormId).ajaxSubmit({
						 cache: true,
						 beforeSend: function(){
								
							 },
					     success: function(data){
					    	 var res = data.trim();
					    	 console.log("Response : " + res);
					    	 
					    	 var sessionexp = chksessionexp(res);
					    	 console.log("sessionexp : " + sessionexp);
					    	 if(!sessionexp){
						    	 var contextPath = $("#contextJSPPath").val();
						    	 var promotionPageURL = contextPath + '/checkout/promotions.jsp';
						    	
						    	 if(res == 'SUCCESS'){
						    		 
						    		 console.log("Success : Submiting to promotion page -> " + promotionPageURL);
						    		 window.location.href = promotionPageURL;
						    	 } else   {
						    		 console.log("error : occured while submiting to promotion page");
						    		 // show error message
						    		 
						    		 showErrorPopup(res);
						    		 
						    		 var $loading = $('#sc-page-spinner');
									 $loading.hide();
						    	 }
								 console.log('seccess ajax');
					    	 } else {
					    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
									if(isLoggedeIn == 'true'){
										window.location.href = $("#jsp_contextroot").val() + loginPageURL;
									} else {
										window.location.href = $("#jsp_contextroot").val();
									}
				    		}
					     }
					});
				}, 1000);

			//PA, END : modified for Site Redesign biiling functionality	
			}
			//setTimeout(function() {$loading.hide();	window.location.href = '/step3_promotions.html';}, 1000);
		}
	} else{
		goToPromotionPageGuest();
	}
	console.log("########## goToPromotionPage() End ##########");
}

function setCreditCardinfoToSessionBean(promotionPageURL){
	console.log("########## setCreditCardinfoToSessionBean() Start ##########");
	var contextPath = $("#contextJSPPath").val();
	var radioButtons = $("#main_list_cards input:radio[name='creditCardNickName']");
	// this should contain the checked one
	var checkedRadioButton = radioButtons.filter(':checked');
	// this should get the index of the found radio button based on the list of all
	var creditCardNickName = $("#main_list_cards input:radio[name='creditCardNickName']:checked").val();
	var cvv = $('.container_card_fields .cvv1').val();
	var month = $('.container_card_fields .mes').val();
	var year = $('.container_card_fields .anio').val();
	
	var url = contextPath + '/checkout/includes/setCreditCardInfo.jsp';
	
	var requestData = {
			creditCardNickName : creditCardNickName,
			cvv : cvv,
			month : month, 
			year : year
		};
	
	
	$.ajax({
		url : url,
		type : "POST",
		data : requestData,
		cache : false,
		success : function(data) {
			var res = data.trim();
	    	console.log("res : " + res);
			var sessionexp = chksessionexp(res);
			console.log("sessionexp : " + sessionexp);
			if(!sessionexp){
				window.location.href = promotionPageURL;
			} else {
				var isLoggedeIn = $("#jsp_isLoggedIn").val();
				if(isLoggedeIn == 'true'){
					window.location.href = $("#jsp_contextroot").val() + loginPageURL;
				} else {
					window.location.href = $("#jsp_contextroot").val();
				}
			}
		},
		error : function(error) {
			console.log("Error Occured in goToPromotionPage method...");
			console.log(error);
		}
	});
	console.log("########## setCreditCardinfoToSessionBean() End ##########");
}

function gotoConfirmationPage() {
	console.log("########## gotoConfirmationPage() Start ##########");
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	setTimeout(function(){ 
		$('form#form_checkout_cart').ajaxSubmit({
			 cache: true,
			 beforeSend: function(){
					
				 },
		     success: function(data){
		    	 console.log("Response : " + res);
		    	 var res = data.trim();
		    	 
		    	 var sessionexp = chksessionexp(res);
		    	 console.log("sessionexp : " + sessionexp);
		    	 if(!sessionexp){
			    	 var contextRoot = $('#contextRoot_').val();
			    	 if(res == 'SUCCESS')  {
			    		 console.log("Success : Submiting promotion page");
			    		 window.location.href = contextRoot + '/checkout/orderSummary.jsp';
			    	 } else {
			    		 console.log("error : occured while submiting promotion page");
			    		 showErrorPopup(res);
			    	 }
					 console.log('seccess ajax');
		    	 } else {
		    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
						if(isLoggedeIn == 'true'){
							window.location.href = $("#jsp_contextroot").val() + loginPageURL;
						} else {
							window.location.href = $("#jsp_contextroot").val();
						}
		    	 }
		     }
		});
	}, 1000);
	console.log("########## gotoConfirmationPage() End ##########");
	//setTimeout(function() {$loading.hide();	window.location.href = '/step4_confirmation.html';}, 1000);
}


function deleteItem(event){
	var $loading = $('#sc-page-spinner');
	$loading.show();
	
	var commerceItemId = $(this).attr("commerceItemId");
	console.log(" Deleteing commerce item is " + commerceItemId);
	
	$('#removalCommerceIds_').val(commerceItemId);
	
	setTimeout(function(){ 
		$('form#removeItem_').ajaxSubmit({
			 cache: true,
			 beforeSend: function(){
					
				 },
		     success: function(data){
		    	 console.log("Item reomved Successfully");
		    	 var res = data.trim();
		    	 console.log("item remove response " + res);
		    	 var sessionexp = chksessionexp(res);
		    	 console.log("sessionexp : " + sessionexp);
		    	 if(!sessionexp){
			    	 if(res == 'empty'){
			    		 var contextRoot = $('#contextRoot_').val();
			    		 window.location.href = contextRoot + '/cart/cart.jsp';
			    	 } else {
			    		 $('#promotionCartItemContainer').html(res);
			    		 $(".sprite-eliminar").click(deleteItem);
			    		 $(".submit_button_2_step4").click(gotoConfirmationPage);
			    		 var $loading = $('#sc-page-spinner');
						 $loading.hide();
			    	 }
					 console.log('seccess ajax');
		    	 } else {
		    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
						if(isLoggedeIn == 'true'){
							window.location.href = $("#jsp_contextroot").val() + loginPageURL;
						} else {
							window.location.href = $("#jsp_contextroot").val();
						}
		    	 }
		     }
		});
	}, 1000);
}

function updateItemQuantity(commerceItemId){
	
	var $loading = $('#sc-page-spinner');
	$loading.show();
	console.log("Update Commerce item Quantity for "  +commerceItemId);
	var quantity = $( "#qty_"+commerceItemId+" option:selected" ).val();
	console.log("selected Quantity is " + quantity);
	var input = jQuery("<input name='"+commerceItemId+"' value='"+quantity+"' type='hidden' id='hiddenCommItemId'>");
	jQuery('#update_quantity2').append(input);
	 var id_update=$('#'+commerceItemId+"final").val();
	    if(id_update){	
	    $('input#'+commerceItemId).val(id_update);
	 }

	setTimeout(function(){
		//console.log($('#update_quantity2').ajaxForm());
		$('#update_quantity2').ajaxForm({
			 cache: true,
			 beforeSend: function(){
				 },
		     success: function(data){
		    	 console.log("Item Quantity updated Successfully");
		    	 var res = data.trim();
		    	 var sessionexp = chksessionexp(res);
		    	 console.log("sessionexp : " + sessionexp);
		    	 if(!sessionexp){
					 $('#promotionCartItemContainer').html(res);
			    	 console.log('seccess ajax');
			    	 $(".sprite-eliminar").click(deleteItem);
			    	 $(".submit_button_2_step4").click(gotoConfirmationPage);
			    	 var $loading = $('#sc-page-spinner');
					 $loading.hide();
		    	 } else {
		    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
						if(isLoggedeIn == 'true'){
							window.location.href = $("#jsp_contextroot").val() + loginPageURL;
						} else {
							window.location.href = $("#jsp_contextroot").val();
						}
		    	 }
		     }
		});
	}, 1000);
	setTimeout(function(){ 
    	$('#'+commerceItemId).ajaxSubmit({
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
    }, 1000);
}

function solonum (cosa)
{
return cosa.value.replace(/\D/gi,"");
}

//code for getting state and country

function unloadUI() {
   // $.unblockUI();
    return false;
}

function checkoutRemove(e) {
	e.submit();
}

function updatePromocodes(commerceItemId, promoCount) {
	var $loading = $('#sc-page-spinner');
	$loading.show();

	// var promoId = $( "#promoCode_"+commerceItemId+" option:selected" ).val();
	// console.log("selected Promotion Id is " +promoId);

	$('#form_checkout_cart select').each(
			function(index) {
				var input = $(this);
				var eleName = input.attr('name');
				if (eleName != undefined && eleName != 'noPromoCode'
						&& eleName.indexOf('promoCode_') != -1) {
					var eleValue = input.val();
					var inputEle = jQuery("<input name='" + eleName
							+ "' value='" + eleValue
							+ "' type='hidden' id='hiddenCommItemId" + index
							+ "'>");
					jQuery('#updateItemPromotion_').append(inputEle);
					console.log('Name: ' + input.attr('name') + '; Value: '
							+ input.val());
				}
			});

	// $('#updateCommerceItemId').val(commerceItemId);
	setTimeout(function() {
		$('form#updateItemPromotion_' + promoCount).ajaxSubmit(
				{
					cache : true,
					beforeSend : function() {
					},
					success : function(data) {
						console.log("Item promotion applied Successfully");
						var res = data.trim();
						var sessionexp = chksessionexp(res);
						console.log("sessionexp : " + sessionexp);
						if (!sessionexp) {
							$('#promotionCartItemContainer').html(res);
							console.log('seccess ajax');
							$(".sprite-eliminar").click(deleteItem);
							$(".submit_button_2_step4").click(
									gotoConfirmationPage);
							var $loading = $('#sc-page-spinner');
							$loading.hide();
						} else {
							var isLoggedeIn = $("#jsp_isLoggedIn").val();
							if (isLoggedeIn == 'true') {
								window.location.href = $("#jsp_contextroot")
										.val()
										+ loginPageURL;
							} else {
								window.location.href = $("#jsp_contextroot")
										.val();
							}
						}
					}
				});
	}, 1000);
}	

function commitOrder(){
	if($('#checckout_capture').val()==''){
		$('.captcha-input').addClass("has-error");
		$('#captchaerror').show();
	} else {
		$('.captcha-input').removeClass("has-error");
		$('#captchaerror').hide();
		$("#orderConfirmBtn").hide();
		$("#orderCommitBtn").trigger( "click" );
		var $loading = $('#sc-page-spinner').hide();
		$loading.show();
	}
	
}



function newdeliveryaddressadd(event) {
	//event.preventDefault();	
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	
	var nickName = $(this).attr("nickName");
	$("#shipToThisAddress").val(nickName);
	//$("#btn_send_address").click();
	setTimeout(function() {
		$('form#newdeliverydddress').ajaxSubmit({
			 cache: true,
			 beforeSend: function(){
					
				 },
		     success: function(data){
		       	 var res = data.trim();
		    	 console.log(res);
		    	 var sessionexp = chksessionexp(res);
		    	 console.log("sessionexp : " + sessionexp);
		    	 if(!sessionexp){
			    	 if(res == 'SUCCESS'){
			    		 var contextRoot = $('#contextPath').val();
			    		 window.location.href = contextRoot + '/checkout/billing.jsp';
			    	 } else {
			    		 // show error div
			    		 showErrorPopup(res);
			    		 var $loading = $('#sc-page-spinner');
						 $loading.hide();
			    	 }
					 console.log('seccess ajax');
		    	 } else {
		    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
						if(isLoggedeIn == 'true'){
							window.location.href = $("#jsp_contextroot").val() + loginPageURL;
						} else {
							window.location.href = $("#jsp_contextroot").val();
						}
	    		}
		     }
		});
	}, 1000);
}


function goToPromotionPageGuest(){
	console.log("########## goToPromotionPageGuest() Start ##########");
	var selectedPaymentOption = $('#paymentSelected').val();
	console.log("selectedPaymentOption:-"+selectedPaymentOption);
	var submitFormId = "guest_form_checkout_express_pay_method";
	
	if(selectedPaymentOption == "creditCard"){
		submitFormId = "guest_form_checkout_express_pay_method";
	} else if(selectedPaymentOption == "CIEBancomer") {
		submitFormId = "form_guest_bancomer_pay_method";
	} else if(selectedPaymentOption = "paypal"){
		submitFormId = "form_guest_paypal_method";
	}
	console.log("submitFormId:-"+submitFormId);
	
	if ($('#'+submitFormId).valid()){
		
		var $loading = $('#sc-page-spinner').hide();
		$loading.show();
		
		setTimeout(function(){ 
			$('form#'+submitFormId).ajaxSubmit({
				 cache: true,
				 beforeSend: function(){
						
					 },
			     success: function(data){
			    	 var res = data.trim();
			    	 console.log("Response : " + res);
			    	 
			    	 var sessionexp = chksessionexp(res);
			    	 console.log("sessionexp : " + sessionexp);
			    	 if(!sessionexp){
				    	 var contextPath = $("#contextJSPPath").val();
				    	 var promotionPageURL = contextPath + '/checkout/promotions.jsp';
				    		
				    	 if(res == 'SUCCESS'){
				    		 console.log("Success : Submiting to promotion page -> " + promotionPageURL);
				    		 window.location.href = promotionPageURL;
				    	 } else   {
				    		 console.log("error : occured while submiting to promotion page");
				    		 // show error message
				    		 
				    		 showErrorPopup(res);
				    		 
				    		 var $loading = $('#sc-page-spinner');
							 $loading.hide();
				    	 }
						 console.log('seccess ajax');
			    	 } else {
			    		 var isLoggedeIn = $("#jsp_isLoggedIn").val();
							if(isLoggedeIn == 'true'){
								window.location.href = $("#jsp_contextroot").val() + loginPageURL;
							} else {
								window.location.href = $("#jsp_contextroot").val();
							}
		    		}
			     }
			});
		}, 1000);
	//.css( "height", "30px");}			
	} //else { $('.extraheight').css( "height", "100px"); }
	console.log("########## goToPromotionPageGuest() End ##########");
}

function onCardTypeChange() {
	var cardType = document.getElementById("tipo_tarjeta").value;
	var expirationDateDiv = document.getElementById("month_year_div_id");

	if (cardType == "liverpool" || cardType == "galeriasFashionCard"
			|| cardType == "fabricasDeFrancia") {
		expirationDateDiv.style.display = "none";
	} else {
		expirationDateDiv.style.display = "block";
	}
}

function chksessionexp(responce){
	if(responce!= ''){
		if((responce.indexOf('<head>') != -1) || (responce.indexOf('<title>')!= -1) || (responce.indexOf('<!DOCTYPE html>')!= -1)){
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}



function compactRegistration()
{
	
	var submitFormId= 'compact-reg-form-id';
	
	if ($('#compact-reg-form-id').valid()){
	var psswd = $("#password").val();
	var ypsswd = $("#ypassword").val();
	if($.trim(psswd) != $.trim(ypsswd)){
		
		var msg = $("#errorMsg").val();
		showErrorPopupmsg(msg);
		var $loading = $('#sc-page-spinner');
		$loading.hide();
		return false;
	}
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	$("#compact-reg-form-id").submit();
	}
	
}

function showErrorPopupmsg(msg){
	$('#error-alert-popup-text').html(msg);
	/*$('#myModalAlertError').load(); */
	$('#myModalAlertError').modal();
}


function showModalPromotions(someObject){

	/*$('#myModalAlertError').load(); */
	$('#modalCheckOutPromos').modal();

}


function  onItemPromoClickListener(someObject){

	var listAllPromos =$('.listnoselected');

	if(listAllPromos!=null){
			 $('.listnoselected').removeClass("liselected");
	}

	$(this).addClass("liselected");

	$('#modalCheckOutPromos').modal('toggle');

//Dummy update code 
	updatePromocodes("promoCode_ci53073691149","4777718946");

}


function  onModalCloseButtonListener(someObject){
	$('#modalCheckOutPromos').modal('toggle');

}

$(document).ready(function(){
	var textNotNull = $("#main > div > div.col-sm-4.no-margin-nothing > div.row.text-center > div > span");

	if(textNotNull != null){
	$('#main > div > div.col-sm-4.no-margin-nothing > div.row.text-center > div > span:contains("Usted tiene 30 días posteriores a la fecha")').css("display","none");

	}


	var ua = navigator.userAgent.toLowerCase();

	if(ua!=null){
		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
		if(isAndroid) {
	
			$('.cvv1').each(function () {
			    var input = $(this);
			    input.attr({type:"number"});

			});
		}

    
	}
     
});













