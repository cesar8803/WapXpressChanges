$(function() {

			var maxLength = 200;


		$('textarea').keyup(function() {
			var idChar=  $(this).attr("chars-name");
			var sChar="#"+idChar;
           console.log(sChar);
			//var idChars = $(this).find("span");
		  var length = $(this).val().length;
		  var length = maxLength-length;
		  $(sChar).text(length);
		});

	//var href = $("#btn_send_address");
	//href.attr('disabled',true);
	$(".checkbox").click(function(){
      	//alert("click");
		var inputs = $(this).find("input");
		console.log(inputs);
		var chk = $(this).attr("aria-expanded");
		//alert(chk);

		if(chk == "true"){

		inputs.prop('checked', false);

		}else{
			
		inputs.prop('checked', true);

		}	

		});


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


	$("#submit_button_purchase1").click(gotoCheckOut);

	$("#submit_button_purchase2").click(gotoCheckOut);
	
	$(".btn_send_address").click(gotoStep2);


	$(".submit_button_2_step3").click(gotoStep3);
	
	$(".submit_button_2_step4").click(gotoStep4);

	$(".sprite-eliminar").click(deleteItem);

	$("#continue_shopping_purchase").click(function() {
		parent.history.back();
		return false;
	});

});

function gotoCheckOut() {
	
	var $loading = $('#sc-page-spinner').hide();
	
		$loading.show();
	
	setTimeout(function() {  $loading.hide();
							window.location.href = '/step1_checkout.html';}, 3000);



}

function gotoStep2(event) {
	
	event.preventDefault();
	
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();	window.location.href = '/step2_paymentMethod.html';}, 3000);
}



function gotoStep3() {
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();	window.location.href = '/step3_promotions.html';}, 3000);
}

function gotoStep4() {
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();	window.location.href = '/step4_confirmation.html';}, 3000);
}


function deleteItem(){
	
	var $loading = $('#sc-page-spinner').hide();
	
	$loading.show();
	
	setTimeout(function() {$loading.hide();}, 3000);



}

