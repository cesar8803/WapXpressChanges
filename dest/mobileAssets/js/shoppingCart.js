$(document).ready(function() {
                 if($('#isChangePassword').val() != 's'){
                        //defect:7228  fix start
                		//reloadCart();
                		//defect:7228  fix end
                }
});

function submitRemove(form) {
    form.submit();
}

function submitUpdate(formId) {
    formId.submit();
}

function submitUpdateIncrement(formId, quantId) {
    quantity = parseInt(document.getElementById(quantId).value);
    quantity = quantity + 1;
    document.getElementById(quantId).value = quantity;
    if ($("#" + formId).valid()) {
        document.getElementById(formId).submit();
    }
}

function submitUpdateDecrement(formId, quantId) {
    quantity = parseInt(document.getElementById(quantId).value);
    quantity = quantity - 1;
    document.getElementById(quantId).value = quantity;
    if ($("#" + formId).valid()) {
        document.getElementById(formId).submit();
    }
}

function load(popUpVar, isLensePage) {
    var contextPath = $("#contextJSPPath").val();
    if (popUpVar == true) {
        if (isLensePage == true) {
            $("#lenseOverlayDiv").show();
        }
    }
}

function pageViewType(viewType) {
    if (viewType == "grid") {
        $("#grid").click();
    } else {
        if (viewType == "list") {
            $("#list").click();
        } else {
            (viewType == "rows");
        }
    }
    $("#rows").click();
}

function warnEbooks() {
    $("#warningForEbook").attr("style", "display:block;");
    $("#divWarningForEbook").attr("style", "display:block;");
    $("#divWarningForEbook").children("div").show();
}

function submitAddToCartPagar(formId, skuid, isGiftItem) {
	/*START: PA, Site-Redesign Change to prevent one more form submission*/
	window.event.preventDefault();
	/*END: PA, Site-Redesign Change to prevent one more form submission*/
    var contextPath = $("#contextroot").val();
    if (document.getElementById("viewType") != null) {
        formId.persistViewType.value = document.getElementById("viewType").value;
    }
    console.log(formId + "===============" + skuid + "=============" + isGiftItem);
    if (isGiftItem == "true") {
        console.log("in side isgiftitem");
        if (formId.prodTypeId.value == "E Book") {
            formId.itemToGiftId.value = "false";
            formId.isEbookToGiftId.value = "true";
        } else {
            formId.itemToGiftId.value = "true";
        }
    }
    setTimeout(function() {
        $("#addItemToCartForm").ajaxSubmit({
            cache: true,
            beforeSend: function() {
                var $loading = $("#sc-page-spinner");
                $loading.show();
            },
            success: function(data) {
                var $loading = $("#sc-page-spinner").hide();
                $loading.hide();
                var res = data.trim();
                if (res == "successmee") {
					window.location.href = "/tienda/m" + "/cart/cart.jsp";
				} else {
					/*START: PA, Site-Redesign Change for New Error Alert modal*/
					//$("#pdpaddtocart-error").modal("show");
					var errorText = $(res).find( '.bgAlertError' ).html();
					$("#formError").html(errorText);
					$("#myModalAlertError").modal("show");
					/*END: PA, Site-Redesign Change for New Error Alert modal*/
				}
				console.log("seccess ajax");
			}
		});
	}, 1000);
}

function submitAddToCart(formId, skuid, isGiftItem) {
    if (document.getElementById("viewType") != null) {
        formId.persistViewType.value = document.getElementById("viewType").value;
    }
    console.log(formId + "===============" + skuid + "=============" + isGiftItem);
    if (isGiftItem == "true") {
        console.log("in side isgiftitem");
        if (formId.prodTypeId.value == "E Book") {
            formId.itemToGiftId.value = "false";
            formId.isEbookToGiftId.value = "true";
        } else {
            formId.itemToGiftId.value = "true";
        }
    }
    setTimeout(function() {
        console.log("form execution1");
        $("#addItemToCartForm").ajaxSubmit({
            cache: true,
            beforeSend: function() {
                var $loading = $("#sc-page-spinner");
                $loading.show();
            },
            success: function(data) {
                var $loading = $("#sc-page-spinner").hide();
                $loading.hide();
                var res = data.trim();
                if (res == "successmee") {
                    reloadCart();
                    $("#myModalAlert").modal("show");
                } else {
                	/*START: PA, Site-Redesign Change for New Error Alert modal*/
					var errorText = $(res).find( '.bgAlertError' ).html();
					$("#formError").html(errorText);
					//$("#pdpaddtocart-error").modal("show");
					$("#myModalAlertError").modal("show");
					/*END: PA, Site-Redesign Change for New Error Alert modal*/
                }
                console.log("seccess ajax");
            }
        });
    }, 1000);
}

function reloadCart() {
    $.ajax({
        type: "POST",
        url: "/tienda/m/common/frag/headerLinks.jsp",
        beforeSend: function() {
            var $loading = $("#sc-page-spinner").hide();
            $loading.show();
        },
        success: function(data) {
            console.log("seccess update ");
            $("#testHeaderCartContent").html(data);
            var pcart_val = $(".headerrightmenu .shopping-bag a .badge").text();
            $(".badge-position .img-size-icon-bag .badge").text(pcart_val);
            $(".col-xs-7 .img-size-icon-bag .badge").text(pcart_val);
            var $loading = $("#sc-page-spinner").hide();
            $loading.hide();
        },
        error: function(error) {
            console.log("error in add to cart");
        }
    });
}

function checkoutLoginPopup() {
    var contextPath = $("#contextroot").val();
    var array = $("textarea");
    var tmpData = new Array();
    var str = "";
    var name = document.getElementsByName("name");
    var email = document.getElementsByName("email");
    var confirmEmail = document.getElementsByName("confirmEmail");
    var recpName = "";
    var recEmail = "";
    var recConfirmEmail = "";
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $.each(name, function(index, value) {
        recpName += $(value).attr("id") + $(value).val() + "_name";
    });
    $.each(email, function(index, value) {
        recEmail += $(value).attr("id") + $(value).val() + "_email";
    });
    $.each(confirmEmail, function(index, value) {
        recConfirmEmail += $(value).attr("id") + $(value).val() + "_confirmEmail";
    });
    $.each(array, function(index, value) {
        if ($(value).attr("id") + $(value).val() !== "undefined") {
            str += $(value).attr("id") + $(value).val() + "_mes";
        }
    });
    $.ajax({
        type: "POST",
        url: contextPath + "/checkout/includes/sendGiftMessageToDroplet.jsp?&giftMessages=" + str + "&recpName=" + recpName + "&recEmail=" + recEmail + "&recConfirmEmail=" + recConfirmEmail,
        success: function(data) {
            val = data;
            $("#loading").hide();
        },
        error: function(error) {
            var err = error;
            console.log(err);
        }
    });
}

function submitMultipleAddToCart(formId, isGiftItem) {
    $("#bothnotSelected,#leftnotSelected,#rightnotSelected").hide();
    if (document.getElementById("leftEyeCheckbox").checked != 1 && document.getElementById("rightEyeCheckbox").checked != 1) {
        $("#firstcompare-error").modal("show");
    } else {
        if (document.getElementById("leftEyeCheckbox").checked == 1 && document.getElementById("rightEyeCheckbox").checked == 1 && $("#LeftLenseskuId").val() != "" && $("#RightLenseskuId").val() != "") {
            var LeftLenseskuId = document.getElementById("LeftLenseskuId").value;
            document.getElementById("leftItemId").value = LeftLenseskuId;
            var RightLenseskuId = document.getElementById("RightLenseskuId").value;
            document.getElementById("rightItemId").value = RightLenseskuId;
            var selectedQuantityLense = document.getElementById("selectedQuantity").value;
            document.getElementById("leftItemQuantity").value = selectedQuantityLense;
            document.getElementById("rightItemQuantity").value = selectedQuantityLense;
            if (isGiftItem == "true") {
                document.getElementById("lenseItemToGiftId").value = "true";
            }
        } else {
            if ($("#LeftLenseskuId").val() == "") {
                $("#leftcompare-error").modal("show");
            } else {
                if ($("#RightLenseskuId").val() == "") {
                    $("#rightcompare-error").modal("show");
                }
            }
        }
    }
}

function submitMultipleAddToCartAjaxPagar(formId, isGiftItem) {
	/*START: PA, Site-Redesign Change to prevent one more form submission in pager Ahora button*/
	window.event.preventDefault();
	/*END: PA, Site-Redesign Change to prevent one more form submission*/
    var contextPath = $("#contextroot").val();
    $("#bothnotSelected,#leftnotSelected,#rightnotSelected").hide();
    if (document.getElementById("leftEyeCheckbox").checked != 1 && document.getElementById("rightEyeCheckbox").checked != 1) {
        $("#firstcompare-error").modal("show");
    } else {
        if (document.getElementById("leftEyeCheckbox").checked == 1 && document.getElementById("rightEyeCheckbox").checked == 1 && $("#LeftLenseskuId").val() != "" && $("#RightLenseskuId").val() != "") {
            var LeftLenseskuId = document.getElementById("LeftLenseskuId").value;
            document.getElementById("leftItemId").value = LeftLenseskuId;
            var RightLenseskuId = document.getElementById("RightLenseskuId").value;
            document.getElementById("rightItemId").value = RightLenseskuId;
            var selectedQuantityLense = document.getElementById("selectedQuantity").value;
            document.getElementById("leftItemQuantity").value = selectedQuantityLense;
            document.getElementById("rightItemQuantity").value = selectedQuantityLense;
            if (isGiftItem == "true") {
                document.getElementById("lenseItemToGiftId").value = "true";
            }
            setTimeout(function() {
                console.log("form execution1");
                $("form#addItemToCartForm1").ajaxSubmit({
                    cache: true,
                    beforeSend: function() {
                        var $loading = $("#sc-page-spinner");
                        $loading.show();
                    },
                    success: function(data) {
                        var $loading = $("#sc-page-spinner").hide();
                        $loading.hide();
                        var res = data.trim();
                        if (res == "successmee") {
                            window.location.href = "/tienda/m" + "/cart/cart.jsp";
                        } else {
							/*START: PA, Site-Redesign Change for New Error Alert modal*/
							var errorText = $(res).find( '.bgAlertError' ).html();
							$("#formError").html(errorText);
							$("#myModalAlertError").modal("show");
							/*END: PA, Site-Redesign Change for New Error Alert modal*/
                        }
                        console.log("seccess ajax");
                    }
                });
            }, 1000);
        } else {
            if ($("#LeftLenseskuId").val() == "") {
                $("#leftcompare-error").modal("show");
            } else {
                if ($("#RightLenseskuId").val() == "") {
                    $("#rightcompare-error").modal("show");
                }
            }
        }
    }
}

function submitMultipleAddToCartAjax(formId, isGiftItem) {
    $("#bothnotSelected,#leftnotSelected,#rightnotSelected").hide();
    if (document.getElementById("leftEyeCheckbox").checked != 1 && document.getElementById("rightEyeCheckbox").checked != 1) {
        $("#firstcompare-error").modal("show");
    } else {
        if (document.getElementById("leftEyeCheckbox").checked == 1 && document.getElementById("rightEyeCheckbox").checked == 1 && $("#LeftLenseskuId").val() != "" && $("#RightLenseskuId").val() != "") {
            var LeftLenseskuId = document.getElementById("LeftLenseskuId").value;
            document.getElementById("leftItemId").value = LeftLenseskuId;
            var RightLenseskuId = document.getElementById("RightLenseskuId").value;
            document.getElementById("rightItemId").value = RightLenseskuId;
            var selectedQuantityLense = document.getElementById("selectedQuantity").value;
            document.getElementById("leftItemQuantity").value = selectedQuantityLense;
            document.getElementById("rightItemQuantity").value = selectedQuantityLense;
            if (isGiftItem == "true") {
                document.getElementById("lenseItemToGiftId").value = "true";
            }
            setTimeout(function() {
                console.log("form execution1");
                $("form#addItemToCartForm1").ajaxSubmit({
                    cache: true,
                    beforeSend: function() {
                        var $loading = $("#sc-page-spinner");
                        $loading.show();
                    },
                    success: function(data) {
                        var $loading = $("#sc-page-spinner").hide();
                        $loading.hide();
                        var res = data.trim();
                        if (res == "successmee") {
                            reloadCart();
                            $("#myModalAlert").modal("show");
                        } else {
				/*START: PA, Site-Redesign Change for New Error Alert modal*/
				var errorText = $(res).find( '.bgAlertError' ).html();
                           	$("#formError").html(errorText);
				$("#myModalAlertError").modal("show");
				/*END: PA, Site-Redesign Change for New Error Alert modal*/
                        }
                        console.log("seccess ajax");
                    }
                });
            }, 1000);
        } else {
            if ($("#LeftLenseskuId").val() == "") {
                $("#leftcompare-error").modal("show");
            } else {
                if ($("#RightLenseskuId").val() == "") {
                    $("#rightcompare-error").modal("show");
                }
            }
        }
    }
}

function numericFilter(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function macRefIds(count) {
    var macSkuId = document.getElementById("select" + count).value;
    document.getElementById("mac_sku_" + count).value = macSkuId;
    var macquant = document.getElementById("mac_quant_" + count).value;
    document.getElementById("mac_quant_" + count).name = macSkuId;
    document.getElementById("mac_quant_" + count).value = macquant;
}

function macUpdateQuantity(count) {
    var macSkuId = document.getElementById("select" + count).value;
    var macquant = document.getElementById("mac_quant_" + count).value;
    document.getElementById("mac_quant2_" + count).name = macSkuId;
    document.getElementById("mac_quant2_" + count).value = macquant;
}

function macDetailRefIds() {
    var macDetailSkuId = document.getElementById("msdrpdd20").value;
    document.getElementById("macDetailSkuId").value = macDetailSkuId;
}

function defaultImageonCart(e, noImageUrl) {
    e.src = noImageUrl;
    e.onerror = "";
    return true;
}

function checkValue(val) {
    var contextPath = $("#contextJSPPath").val();
    var count = parseInt(val);
    var errorMsg = $("#cart_error_msg").val();
    if (count == 0) {
        $("#GR_carterrormsg").text(errorMsg);
        return false;
    } else {
        window.location = "../cart/cart.jsp";
    }
}

function macLoad(macPopUp) {
    if (macPopUp == true) {
        $("#macOverlayDiv").show();
    }
}

function redirectAfterAddItem() {
    var isValidForm = false;
    $(".selector").each(function() {
        $(this).find(".ui-layer-ebookmessage").show("slow");
        isValidForm = $(this).valid();
        if (!isValidForm) {
            return isValidForm;
        } else {
            $(this).find(".ui-layer-ebookmessage").hide("slow");
        }
    });
    if (!isValidForm) {
        return false;
    }
    var cdlerror = $("#cdlerror").val();
    if (cdlerror == "true") {
        $("#compare-error").modal("show");
        return false;
    } else {
        var contextPath = $("#contextroot").val();
        var array = $("textarea");
        var tmpData = new Array();
        var contextPath = $("#contextroot").val();
        var array = $("textarea");
        var tmpData = new Array();
        var str = "";
        var name = document.getElementsByName("name");
        var email = document.getElementsByName("email");
        var confirmEmail = document.getElementsByName("confirmEmail");
        var recpName = "";
        var recEmail = "";
        var recConfirmEmail = "";
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        $.each(name, function(index, value) {
            recpName += $(value).attr("id") + $(value).val() + "_name";
        });
        $.each(email, function(index, value) {
            recEmail += $(value).attr("id") + $(value).val() + "_email";
        });
        $.each(confirmEmail, function(index, value) {
            recConfirmEmail += $(value).attr("id") + $(value).val() + "_confirmEmail";
        });
        $.each(array, function(index, value) {
            if ($(value).attr("id") + $(value).val() !== "undefined") {
                str += $(value).attr("id") + $(value).val() + "_mes";
            }
        });
        $.ajax({
            type: "POST",
            url: contextPath + "/checkout/includes/sendGiftMessageToDroplet.jsp?&giftMessages=" + str + "&recpName=" + recpName + "&recEmail=" + recEmail + "&recConfirmEmail=" + recConfirmEmail,
            async: false,
            success: function(data) {
                val = data;
                $("#loading").hide();
                console.log("call: sendGiftMessageToDroplet.jsp - success");
            },
            error: function(error) {
                var err = error;
                console.log("call: sendGiftMessageToDroplet.jsp - Failure");
                console.log(err);
            }
        });
        if ($("#setGiftMessages").val() === "1") {
            console.log("redirecting to billing.");
            window.location = contextPath + "/checkout/billing.jsp";
        } else {
            if ($("#setGiftMessages").val() === "2") {
                console.log("redirecting to shipping.");
                window.location = contextPath + "/checkout/shipping.jsp";
            }
        }
    }
}

function submitAddToCartEbook(formId) {
    if (document.getElementById("viewType") != null) {
        formId.persistViewType.value = document.getElementById("viewType").value;
    }
    formId.submit();
}