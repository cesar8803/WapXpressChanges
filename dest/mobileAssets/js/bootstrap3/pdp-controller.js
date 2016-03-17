/* $(function () { });*/

$(document).ready(function() {  
	$(document).trigger("PDPExtendedInfo");
	$("#login input[mandatory='true']").attr("required","true");
	$('#login').validator();
  		 $(".carousel-inner").swiperight(function() {  
    		  $(this).parent().carousel('prev');  
	    		});  
		   $(".carousel-inner").swipeleft(function() {  
		      $(this).parent().carousel('next');  
	   }); 
	   //filter return new function
        $(".filter-return").on("click", function() {
        $("#myModal").animate({right: -$("#myModal").outerWidth()});
        lpobj.hideOverlayFilter();

        //$(".filter-btn").removeClass('active');
        //$(".filter-btn").css({ 'display': 'inline'});
        });
        $(".filter-return").on("click", function() {
        $("#myModal2").animate({right: -$("#myModal2").outerWidth()});
        lpobj.hideOverlayFilter();
        }); 

        $('.popover-show').popover({
        placement : 'bottom',
        html:true
        });
$('.popover-show').on('shown.bs.popover', function () {
	 $(".star-ratingloginpop").on("click", function(event) {
		 lpobj.showLoginPopup();
     	});
         });



$('.pdpstarsreating').on("click", function() {
	var overlay = jQuery('<div id="staroverlay"> </div>');
	overlay.appendTo(document.body);
	$('#staroverlay').on("click", function() {
		if($('.popover').css('display') == 'block')
			{
			$('.popover').attr('style','');
			}
		$('#staroverlay').remove();
		
	});

});
   


        $("#input-21f").rating({
        			  starCaptions: function(val) {
                        if (val < 3) {
                            return val + ' estrellas';
                        } else {
                            return val + ' estrellas';
                        }
                    },
                    starCaptionClasses: function(val) {
                        if (val < 3) {
                            return 'label label-default';
                        } else {
                            return 'label label-success';
                        }
                    },
                    hoverOnClear: false
                });

$("#input-21f").on("rating.change", function(event, value, caption) {
	
	$(".anonymousRating").html('&nbsp;');
	var rating = $(this).val();

	var productId = $("#productId").val()

	$.ajax( {
	type : "post",
	url : "/tienda/m/common/frag/updateProductRating.jsp",
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
});
        
   
    $("ul.pdt-list > li .prod-info .precios_producto p.precio-modulo.newprice").css("display","inline-block");

    var bckButton = $(".btn-back-head");
	if(bckButton != null){
		console.log("ejecutando");
		$(".btn-back-head").attr('onclick', '');
		$(".btn-back-head").on("click",function(e){

		e.preventDefault();

         window.history.back();
	    });
	}
	//Función para cambiar precios en el PDP, solo activar con el SetTimeOut en caso de ser necesario.

	//setTimeout(explode, 2000);

    $("#search-icon-contain").click(function(){
        $("#myModal_search").modal();
    });
    $(".close_search").click(function(){
        $("#myModal_search").modal("hide");
    });
    
    $(".rating-container").click(function(){
        $("#myAlert").show();
        setTimeout(function(){
            $("#myAlert").hide();
        },3000);
    });
    
    $(".rating-container").alert();
   
    ratingAlert();
    //$("#myAlert").alert('close');


    //WAP enchancements 

    $('.cerrar-modal-login').click(function(){
        $("#modalLogin").modal('hide');
    });
});  

function ratingAlert(){
     $("#ratingForm").after('<div class="alert alert-success" id="myAlert" style="display:none">Tu calificacion fue aplicada exitosamente</div>');
}
//Función para cambiar precios en el PDP, solo activar con el SetTimeOut en caso de ser necesario.
function explode(){
	var skus = [
		["1039117866"," $ 4,599 ","$ 3,219 "],
		["1038202568"," $ 12,499 ","$ 7,499 "],
		["1040755922"," $ 18,999 ","$ 11,399 "],
		["1036101705"," $ 26,499 ","$ 15,899 "],
		["1042206276"," $ 39,999 ","$ 17,999 "],
		["1036101721"," $ 99,999 ","$ 49,999 "],
		["1042087781"," $ 37,199 ","$ 18,599 "],
		["1036991778"," $ 29,999 ","$ 16,499 "],
		["1042822759"," $ 74,999 ","$ 33,749 "],
		["1026281705"," $ 139,999 ","$ 83,999 "],
		["1037089911"," $ 27,999 ","$ 14,951 "],
		["1037089903"," $ 23,999 ","$ 12,959 "],
		["1042700769"," $ 61,999 ","$ 30,503 "],
		["1041404503"," $ 89,999 ","$ 43,199 "],
		["1037091231"," $ 92,999 ","$ 50,219 "]]	
		
		for(var i = 0; i < skus.length; i++) {
				var sku = skus[i][0];
					if(window.location.href.indexOf(sku) > -1){
							 console.log("Condicion cumplida" );
							 console.log(sku);
							  $('.newprice').text(skus[i][2]);
					  }else{
							//console.log("Condicion NO cumplida" );

						}
		}
	}


