var showerror=false;
var cupponstate="notvalid";// could be : valid, notvalid, used
var currentSpanActive;
var currentSpanBoxContainer;
var currentDivInputPlusContainer;




$(function() {

	$(".btn-back-head").click(function() {
		 history.back(1);
	});
	
	$("[data-toggle=popover]").popover({
		placement : 'bottom',
        html:true
	});
	//Gift message functions
	var maxLength = 200;
	/*START: PA, Site-Redesign Change for PDP login error changes Defect:221*/
	var maxLen = 80;
	if($(".gift-text-msg").length > 0){
        var msgLength = $(".gift-text-msg").val().length;
        var totalLength = maxLen-msgLength;
        $("#chars").text(totalLength);
        }

  //Function for counting chars 
	$('textarea').keyup(function() {
		if($(this).hasClass("gift-text-msg")){
			var idChar = $(this).attr("chars-name");
			var sChar = "#" + idChar;
			console.log(sChar);
			var length = $(this).val().length;
			var length = maxLen - length;
			$(sChar).text(length);
		}
		/*START: PA, Site-Redesign Change for PDP login error changes Defect:221*/
		else{
			var idChar = $(this).attr("chars-name");
			var sChar = "#" + idChar;
			console.log(sChar);
			// var idChars = $(this).find("span");
			var length = $(this).val().length;
			var length = maxLength - length;
			$(sChar).text(length);
		}
	});

	$(".collapsed").click(function() {
		// alert("click");
		var inputs = $(this).find("input");

		var images = $(this).find("img");
		
		var chk = $(this).attr("aria-expanded");
		console.log(chk);
		// alert(chk);
		if (chk == "true") {
			inputs.prop('checked', false);
			images.attr("src", "/mobileAssets/images/icons/arrow-rigth_p.png")
			
		} else {
			inputs.prop('checked', true);
			images.attr("src", "/mobileAssets/images/icons/arrow-down_p.png")
		}

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

	//Codigo para ocultar y aparecer los campos de la TDC, dependiendo del radio seleccionado

	$("#main_list_cards input:radio[name='radioCreditCard']").click(function() {
		var radioButtons = $("#main_list_cards input:radio[name='radioCreditCard']");

		// this should contain the count of all your radio buttons
		var totalFound = radioButtons.length;

		// this should contain the checked one
		var checkedRadioButton = radioButtons.filter(':checked');

		// this should get the index of the found radio button based on the list of all
		var selectedIndex = radioButtons.index(checkedRadioButton);

		$(radioButtons).each(function() {
			//Cambios en la WAP
			var contenedor = $(this).parent().find(".container.buttons_section");
			contenedor.removeClass("container_card_fields").addClass("container_card_fields_off");

			var buttons = contenedor.find("a.btn");

			$(buttons).each(function() {
				$(this).attr('disabled', 'disabled');
			});

		});

		var containerCheked = $(checkedRadioButton).parent().find(".container.container_card_fields_off");
		containerCheked.removeClass("container_card_fields_off").addClass("container_card_fields");
		var buttonsSelected = containerCheked.find("a.btn");
		$(buttonsSelected).each(function() {
			$(this).removeAttr('disabled');
		});

		//	alert(selectedIndex);
	});
	
	
//Cantidad currentSpanActive  For ul quantity
	/*$('ul.a-list-link li').click(function(e) {		
		var index=  $(this).index();  
		updateQuantity(index);
	});*/
	//for cart page:siteRedesign
	$(document).on("click","ul.a-list-link li", function(e) {		
		var index=  $(this).index();  
		updateQuantity(index);
	});
	
	$("#submit_button_purchase1").click(checkIsLogged);

	$("#submit_button_purchase2").click(checkIsLogged);
	
	$(".btn_send_address").click(submitFormAddress);
	//for cart page:siteRedesign
	/*
	$("#cuppon_button").click(processCuppon);
    */
	
	/*$(".btn_send_store_address").click(gotoStep1SelectingStore);*/

	/*$(".submit_button_2_step3").click(gotoStep2);*/
	
/*	$(".submit_button_2_step4").click(gotoConfirmStep);*/

	$(".delete_button").click(deleteItem);
	
	$(".btn_pay_tdc").click(gotoStep3);

	//PA, START: modified for continue shopping in cart page
	/*$("#continue_shopping_purchase").click(function() {
		parent.history.back();
		return false;
	});*/
	
	//PA, End: modified for continue shopping in cart page	
	
	/*Quantity click handler */
	$(document).on("click",".quantity_container", onClickQuantity);

	$('#myModalQuantitySelect').on('hidden.bs.modal', function () {
	    // When the modal hide it enables the scroll…
		
	 	 
	 	$('body').css('overflow','hidden');
//	 	$('body').css('overflow-y','scroll');
//		$('body').css('position','relative');
	})
	
	
/*click and pick*/
	

               	

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
					
					//Load Tiendas
	$(".estados-lista").click(function() {

		var estado = $(this).html();


		$.ajax({
			url : "tiendas.html"
		}).done(function(data) {
			$("#listaEstados").modal('toggle');
			$("#contenedor-tiendas").html(data);
			$("#title-tiendas").html(estado);

			$(".btn_send_store_address").click(gotoStep1SelectingStore);
			
			
			  var MySpans = $("#label-choose-state");
			  if(MySpans!=null){
			        MySpans.addClass("down");

			  }

		});
   });
	
	
	// change in the input 
	//$('#quantity-active-1').bind('input propertychange', function() {
	    	
			
		
	//});			
	//				


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

				// console.log(inputsRadio);
				// console.log(buttonsPink);

			});


/* click and pick */
			


});



function checkIsLogged() {
	
	var logged = $('input#logged').val();
	
	
	gotoCheckOut(logged);
	

}

function gotoCheckOut(islogged) {

		//WAP Enhancements modal change
		$('#modalLogin').modal();
	    $('.cerrar-modal-login').click(function(){
        $("#modalLogin").modal('hide');
    });
}
function submitFormAddress(event){
	$( "#guess_fields_first_step_form" ).submit();
}

/*function gotoStep1(event) {
	
	event.preventDefault();	
	
	
	var $loading = $('#sc-page-spinner').hide();
	$loading.show();
	setTimeout(function() {$loading.hide();	window.location.href = './step2_paymentMethod.html';}, 3000);
}*/


/*function gotoStep1SelectingStore(event) {
	
	event.preventDefault();	
	
	elem = $("#tiendas_list_ajax");
	
	if(elem.length == 0){
		  //it doesn't exist
			showError();
	}else{
		var $loading = $('#sc-page-spinner').hide();
		$loading.show();
		setTimeout(function() {$loading.hide();	window.location.href = './step2_paymentMethod.html';}, 3000);
	}
	
	
}*/



function onClickQuantity(event) {
	event.preventDefault();
	var textIndex;	
	currentSpanActive=$(this).find('.a-dropdown-prompt'); 

	currentSpanBoxContainer=$(this).find('.a-button-span12');   
	currentDivInputPlusContainer =$(this).parent().parent().parent().find('.input-10-plus');  
	//alert($(this).parent().parent().parent().html());
	
	if(currentSpanActive!=null){
		textIndex= currentSpanActive.text();		
		$('.a-active').removeClass('a-active');
		
		 var liindex =$('ul.a-list-link li a').eq(parseInt(textIndex-1));
		 if(liindex!=null){ 
			 liindex.addClass('a-active');
		 }


	}
	
	
	//('.a-dropdown-prompt');

	/*LP PA SITE Redesign : Fix for quantity update for 2nd time regression testing 09092015*/
 	$('body').css('overflow','hidden');
// 	$('body').css('overflow-y','scroll');
//	$('body').css('position','relative');
	
	
  	$("#myModalQuantitySelect").modal('toggle');

  	$("#content_numbers").scrollTop(0);
  	


}


function gotoStep3() {
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();	window.location.href = './step3_promotions.html';}, 3000);
}

function gotoStep2() {
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	/*setTimeout(function() {$loading.hide();	window.location.href = './step3_promotions.html';}, 3000); */
}

function gotoConfirmStep() {
	
	if(showerror){
		purchase();
	}else{
		var $loading = $('#sc-page-spinner').hide();
		
		$loading.show();
		
		setTimeout(function() {$loading.hide();	window.location.href = './step4_confirmation.html';}, 3000);

	}
	
	}


function purchase() {
		showError();
}


function processCuppon(event) {
	event.preventDefault();

	
	if(cupponstate=="valid"){

		displayAjaxProgressCuppon("success");
		
	}else if (cupponstate=="notvalid"){

		displayAjaxProgressCuppon("invalid");

	}else if (cupponstate=="used"){

		displayAjaxProgressCuppon("used");


	}
			
}

function displayCuppon(validationClass) {
	$('.cuppon_result_validation').show();
	$('.cuppon_result_validation').addClass(validationClass);
}






function updateQuantity( index){
 	 $("#myModalQuantitySelect").modal('toggle');
 	if(currentSpanActive!=null){
 		
 		if(index!="5"){
 			//10-- condition
 			
 			if(currentSpanActive!=null){
 	 	 	 	currentSpanActive.text(index+1);
 	 	 	 //update quantity:siteRedesign :start
 	 	 	 	currentSpanActive.parent().find('.a-dropdown-prompt1').val(index+1);
 	 	 	 	var id_Updade= (currentSpanActive.parent().find('.a-dropdown-prompt1').attr('id'));
 	 	 	    submitUpdate(id_Updade);
 	 	 	 //update quantity:siteRedesign :end
 	 	 	 	currentSpanActive=null;
 			}

 	 	 	//Here update backend quantity
 	 	 	//displayAjaxProgress();
 		}else{
 			//10+ condition
 			if(currentSpanBoxContainer!=null){
 	 			currentSpanBoxContainer.addClass('select-hidden');
 	 			currentDivInputPlusContainer.addClass('input-10-plus-active');
 	 			
 	 			var inputQty= currentDivInputPlusContainer.find('.plus-qty');
 	 			inputQty.focus();
 	 			var currentQty=inputQty.attr('currentval');
 	 		     //alert();
		    		var buttonUpdate=currentDivInputPlusContainer.find('.sc-update-link');

 	 			$(inputQty).bind('input propertychange', function() {

 	 		    	if(currentQty!=inputQty.val()){
 	 		    		buttonUpdate.addClass('different');
 	 		    	}else{
 	 		    		buttonUpdate.removeClass('different');
 	 		    	}
 	 				
 	 			});		

 			}

 			
 			
 		}

	}


}


function deleteItem(){
	
	displayAjaxProgress();
}


function showError(){
	
	if(showerror){
				$('#myModalAlertError').modal();
	}
	
}




function displayAjaxProgress(argument){
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	setTimeout(function() {
		$loading.hide(); 
		if(argument==1){
			//back History
			 history.back(1);
		}
	}, 2000);
	

}

function displayAjaxProgressCuppon(validationClass){
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();  displayCuppon(validationClass); }, 2000);
}


