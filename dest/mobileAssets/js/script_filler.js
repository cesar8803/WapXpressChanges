$(document).ready(function() {
    var noimge = $(".noimagecat");
    var noimageminicartItem = $(".noimageminicartItem");
    var noimagecartItem = $(".noimagecartItem");
    var nocart_image = $(".nocart_image");
    Getonerrrimage(noimge, "lg");
    Getonerrrimage(noimageminicartItem, "sm");
    Getonerrrimage(noimagecartItem, "lg");
    Getonerrrimage(nocart_image, "lg");
    setTimeout(function() {
        $("li a:first").attr("calss", "active");
    }, 3000);
  
    $('#phonebackbutton,#ipadbackbutton').on('click', function() {
        var contextPath = $("#mobilePage_contextPath").val();
        if ($('#commerceItemCountId').val() == 0) {
            window.location = contextPath;
        } else {
            window.history.back();
        }
    });
$.fn.exists = function() {
        return $(this).length > 0;
    }


							setTimeout(function() {
							
							if ($('.maccolorsh').length > 0) {

							var skuVarientsVal = $(".maccolorsh");
							var defaultid = $('.btn-default span img').attr('id');
							getlandAkamaiImage(defaultid , 'sm');



							$( ".btn-default" ).on( "focusout", function( e ) { 
							var selectedimg = $(this).find('span img').attr('id');
							var replaceimg = $('.selected a img').attr('src');
							$("#" + selectedimg).attr("src",replaceimg);
							});

								GetonskuVarientsVal(skuVarientsVal, "sm");
							}

							}, 5000);


							setTimeout(function() {
							if ($('.maccolorsh').length > 0) {


							var firstmacid = $( "ul.inner li a img:first-child" ).attr('id');
							$( "ul.inner li a img:first-child" ).attr('id','first'+firstmacid);
							firstmacid = $( "ul.inner li a img:first-child" ).attr('id');
							getlandAkamaiImage(firstmacid , 'sm');
								}

							}, 6000);
							
							setTimeout(function() {
							var prodid= $('#productId').val();
							if($('.bigImage').attr('src') == '') { pdCDNImage('xl',prodid)  }
							}, 500);


});


function GetonskuVarientsVal(e, t) {
       $.each(e, function(e, n) {
	getlandAkamaiImage(this.id, 'sm');
       });
}
function Getonerrrimage(classname, size) {
    $.each(classname, function(optionkey, optionkeyvalue) {
        getlandAkamaiImage(this.id, size);
    });
}

function onImgErrorBanner(e) {
    e.src = "/mobileAssets/images/fillers/filler_BC.jpg";
    e.onerror = "";
    return true;
}

function onImgErrorBannerGate(e) {
    e.src = "/mobileAssets/images/fillers/filler_gate.jpg";
    e.onerror = "";
    return true;
}

function onImgErrorSlider(e) {
    e.src = "/mobileAssets/images/fillers/filler_SM.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoRecomendacion(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoType(e) {
    e.src = "/mobileAssets/images/fillers/filler_type.jpg";
    e.onerror = "";
    return true;
}

function onImgErrorAlertaAdd(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoBolsa(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoComparar(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoBolsa(e) {
    e.src = "/mobileAssets/images/fillers/filler_XSM.jpg";
    e.onerror = "";
    return true;
}

function onImgErrorPortadaSeccionBanner(e) {
    e.src = "/mobileAssets/images/fillers/fillerXLG.gif";
    e.onerror = "";
    return true;
}

function onImgErrorPortadaSeccionMini(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoCheckout(e) {
    e.src = "/mobileAssets/images/fillers/filler_SM.gif";
    e.onerror = "";
    return true;
}

function onImgErrorPortadaSeccionPromociones(e) {
    e.src = "/mobileAssets/images/fillers/filler_SM.gif";
    e.onerror = "";
    return true;
}

function onImgErrorSeccionProducto(e) {
    e.src = "/mobileAssets/images/fillers/filler_SM.gif";
    e.onerror = "";
    return true;
}

function onImgErrorProductoLarge(e, noImageUrl) {
    e.src = noImageUrl;
    e.onerror = "";
    return true;
}

function onImgErrorDetalleXL(e) {
    e.src = "/mobileAssets/images/fillers/fillerXLG.gif";
    e.onerror = "";
    return true;
}

function onImgErrorSM(e) {
    e.src = "/mobileAssets/images/fillers/filler_REC.gif";
    e.onerror = "";
    return true;
}

function onImageErrorProductoRecomendacion(e) {
    if (e.attr("src") == "/mobileAssets/images/plp-ajax-loader.gif") {
        e.attr("src", "/mobileAssets/images/fillers/filler_REC.gif");
    }
}

function getAkamaiImage(e, size, sku, noImageUrl) {
    var skuImageUrl = create_url(size, sku);
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl;
    if ($("#" + sku).attr("src") == "") {
        $("#" + sku).attr("src", "/mobileAssets/images/plp-ajax-loader.gif");
    }
    ImageObject.onload = function() {
        e.src = skuImageUrl;
    };
    ImageObject.onerror = function() {
        onImgErrorProductoLarge(e, noImageUrl);
    };
}

function getlandAkamaiImage(sku, size) {
    var skuslipt = sku.split("_");
    var skuid = 0;
    var replacesrc = "";
    if (skuslipt[1] != undefined) {
        skuid = skuslipt[1];
        replacesrc = sku;
    } else {
        skuid = skuslipt[0];
        replacesrc = skuslipt[0];
    }
    var skuImageUrl = create_url(size, skuid);
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl;
    ImageObject.onload = function() {
        $("#" + replacesrc).attr("src", skuImageUrl);
    };
    ImageObject.onerror = function() {
        $("#" + replacesrc).attr("src", "/mobileAssets/images/fillers/filler_REC.gif");
    };
}

function getCDNImage(e, size, sku, noImageUrl) {
    var skuImageUrl = create_url(size, sku);
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl;
    ImageObject.onload = function() {
        $(".bigImage").attr("src", skuImageUrl);
        $(".bigImage").attr("data-zoom-image", skuImageUrl);
        $(".smallImg").attr("src", skuImageUrl);
        $(".smallImg").attr("data-zoom-image", skuImageUrl);
    };
    ImageObject.onerror = function() {
        $(".bigImage").attr("src", noImageUrl);
        $(".bigImage").attr("data-zoom-image", skuImageUrl);
        $(".smallImg").attr("src", noImageUrl);
        $(".smallImg").attr("data-zoom-image", noImageUrl);
    };
}

function pdCDNImage(size, sku) {
    var skuImageUrl = create_url(size, sku);
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl;
    $(".bigImage").attr("src", "");
    if ($(".bigImage").attr("src") == "") {
        $(".bigImage").attr("src", "/mobileAssets/images/plp-ajax-loader.gif");
    }
    ImageObject.onload = function() {
        $(".bigImage").attr("src", skuImageUrl);
        $(".bigImage").attr("data-zoom-image", skuImageUrl);
    };
    ImageObject.onerror = function() {
        $(".bigImage").attr("src", "/mobileAssets/images/fillers/filler_REC.gif");
        $(".bigImage").attr("data-zoom-image", "/mobileAssets/images/fillers/filler_REC.gif");
    };
}
//fix for defect 5596
function pdCDNImageGiftList(e,size, sku) {
    var skuImageUrl = create_url(size, sku);
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl;
    ImageObject.onload = function() {
    	$(".gift-image-container").find('img').attr("src", skuImageUrl);
    };
    ImageObject.onerror = function() {
    	$(".gift-image-container").find('img').attr("src", "/mobileAssets/images/fillers/filler_REC.gif");
    };
  }