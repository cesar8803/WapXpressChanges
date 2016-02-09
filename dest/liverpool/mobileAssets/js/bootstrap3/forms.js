$(function() {

	//Multiple TDC forms 
	$('#creditype').on('change', function() {		
		
		displayAjaxProgress();
		
	});
	
	 $("#newdeliverydddress input[mandatory='true']").attr("required","true");
    	$("#newdeliverydddress select[mandatory='true']").attr("required","true");
    	$("#adress_form select[mandatory='true']").attr("required","true");
    	$("#adress_content input[mandatory='true']").attr("required","true");
    	$("#nameForm_validation input[mandatory='true']").attr("required","true");
    	$("#data_receiver input[mandatory='true']").attr("required","true");
    	//$("#guest_form_checkout_express_pay_method input[mandatory='true']").attr("required","true");
    	//$("#guest_form_checkout_express_pay_method select[mandatory='true']").attr("required","true");
    	$("#billing select[mandatory='true']").attr("required","true");
    	$("#add-credit-card input[mandatory='true']").attr("required","true");
    	$("#add-credit-card select[mandatory='true']").attr("required","true");
    	$("#ebooks-gift-form input[mandatory='true']").attr("required","true");
    	
    	
	$('#adress_form').validator().on('submit', function (e) {
		 if (e.isDefaultPrevented()) {
		 } else {
		    // everything looks good!
		  }
	});
	$('#add-credit-card').validator().on('submit', function (e) {
		 if (e.isDefaultPrevented()) {
		    // handle the invalid form....
			 $('#noerror').css( "height", "30px");
			 
		    
		    
		 } else {
		    // everything looks good!
		  }
	});
	
	
	$('#newdeliverydddress').validator().on('submit', function (e) {
		 if (e.isDefaultPrevented()) {
		
		 } else {
			 console.log(1);
			 newdeliveryaddressadd();
			 return false;
		  }
	});
		$('#myCreditCardForm').validator().on('submit', function (e) {
		 if (e.isDefaultPrevented()) {
		    // handle the invalid form...
		    
		    
		 } else {
		    // everything looks good!
		  }
	});
	
	
	//FOR SELECT FIELDS
	$('#myCreditCardForm')
     /*   .find('[name="town"]').selectpicker().change(function(e) {
                // revalidate the color when it is changed
                $('#myCreditCardForm').formValidation('revalidateField', 'town');
            })
            .end()
        .find('[name="creditype"]').selectpicker().change(function(e) {
                // revalidate the language when it is changed
                $('#myCreditCardForm').formValidation('revalidateField', 'creditype');
            })*/
            //.end()
       /* .formValidation({
            framework: 'bootstrap',
            excluded: ':disabled',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                town: {
                    validators: {
                        callback: {
                            message: 'Selecciona un valor',
                            callback: function(value, validator, $field) {
                                // Get the selected options
                                var options = validator.getFieldElements('town').val();
                                return (options != "Seleciona Delegación o Municipio");
                            }
                        }
                    }
                },
                creditype: {
                    validators: {
                        callback: {
                            message: 'Selecciona un valor',
                            callback: function(value, validator, $field) {
                                // Get the selected options
                                var options = validator.getFieldElements('town').val();
                                return (options != "Seleccionar");
                            }
                        }
                    }
                }
            }
        });*/
	
	

	

for ( var q = 0; q < $('#guest_form_checkout_express_pay_method').size(); q++) {
	var formcount = $("form").eq(q);
	// console.log(formcount);
	if (formcount.hasClass('form-withphone'))
{

formcount.validate({
					meta : "validate",
					groups : {
						Location : "rfc-zip1 rfc-zip2 rfc-zip3 phone-no1 phone-no2 reg-dob1 reg-dob2 reg-dob3 rfc1 rfc2 rfc3 phoneNumber lada",
					// Expiry: "expmonth expyear"
					},
					errorPlacement : function(error, element) {
						if (element.attr("name") == "lada" || element.attr("name") == "phoneNumber") {
							error.insertAfter("#phoneNumber");
						} 
						else {
							error.insertAfter(element);
						}
					}
				});
	} else {
		formcount.validate({
			meta : "validate"
		});
	}
}
	
	
});

// END PA : site redesign Mearged from wap 6.0 for shipping/billing


/*function checkIsLogged() {
	

}

function gotoCheckOut(islogged) {

}
*/
