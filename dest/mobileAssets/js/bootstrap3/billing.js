$( document ).ready(function() {
			var $loading = $('#sc-page-spinner');
			$loading.show();
			
			var paySelGrup = $('#paymentSelected').val();
			var isLoggedInId = $('#isLoggedInId').val();
			var contextPath =  $('#contextJSPPath').val();
			console.log('paySelGrup ------->'+paySelGrup);
			if(paySelGrup != ''){
				switchAvailablePayment(paySelGrup, contextPath, isLoggedInId,true);
				if(paySelGrup == 'CIEBancomer'){
					$('#accordion #collapseThree').addClass('in');
				}
				if(paySelGrup == 'creditCard'){
					$('#accordion #collapseOne').addClass('in');
				}
				if(paySelGrup == 'paypal'){
					$('#accordion #collapseTwo').addClass('in');
				}
			} else {
				switchAvailablePayment('creditCard', contextPath, isLoggedInId,true);
				$('#accordion #collapseOne').addClass('in');
			}
			//changediv();
			if(isLoggedInId == 'true'){
				selectCreditCardCall($('#defaultCCNickName').val());
			} else {
				$loading.hide();
			}
			
		    $('[data-toggle="tooltip"]').tooltip();   
			
			$(':not(#anything)').on('click', function (e) {
			    $('[data-toggle="tooltip"]').each(function () {
			        //the 'is' for buttons that trigger popups
			        //the 'has' for icons within a button that triggers a popup
			        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
			            $(this).tooltip('hide');
			        }
			    });
			});
			
			
			
			$.validator.setDefaults({
			    errorPlacement: function(error, element) {
			      // if the input has a prepend or append element, put the validation msg after the parent div
			      if(element.parent().hasClass('input-prepend') || element.parent().hasClass('input-append')) {
			    	  alert(1);
			        error.insertAfter(element.parent());		
			      // else just place the validation message immediatly after the input
			      } else {
			        error.insertAfter(element);
			      }
			    },
			    errorElement: "label", // contain the error msg in a small tag
			   // wrapper: "ul", // wrap the error message and small tag in a div
			    highlight: function(element) {
			      $(element).closest('.form-group').addClass('has-error'); // add the Bootstrap error class to the control group
			    },
			    success: function(element) {
			      $(element).closest('.form-group').removeClass('has-error'); // remove the Boostrap error class from the control group
			    }
			  });
		});
		
		