
$(document).ready(function(){ 
	$("#cuppon_button").click(function(){ //alert(1);
	  var $loading = $('#sc-page-spinner');
      $loading.show();
		couponSubmit();
		  var $loading = $('#sc-page-spinner');
          $loading.hide();
		
		});

});

/*START: PA, Site-Redesign Change for PDP login error changes*/
$(document).ready(function(){
	/*START: PA, added login error in cart page*/
	var cartErrorPageObj=$('#cartLoginErrorPage').length;
	if(cartErrorPageObj > 0){		
		var carterrorPage = document.getElementById('cartLoginErrorPage').value;		
		if(carterrorPage=='true'){			
		$("#checkoutmyLogginAlert").modal('show');
		$("div.modal-backdrop").css("opacity", ".62");		
		}
		}
	
	var errorPageObj=$('#pdpLoginErrorPage').length;
		if(errorPageObj > 0){
			
		var errorPage = document.getElementById('pdpLoginErrorPage').value;;	
		if(errorPage=='true'){			
		$("#myLogginAlert").modal('show');
		$("div.modal-backdrop").css("opacity", ".92");
		var url=document.getElementById('currentProductDetailsPageUrl').value;
		$("div.modal-backdrop").on('click', function(){
		     window.location =url ;    
		});
		}
		}	
		
	
	});
	/*END: PA, Site-Redesign Change for PDP login error changes*/
