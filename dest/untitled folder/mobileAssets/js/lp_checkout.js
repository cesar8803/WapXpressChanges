var select1;
var select2;
jQuery(document).ready(function($) {
    select2 = $("#emptyBillingAddressFilled").detach();
    lpobj.showHideAirtimeExpiary();
    var cardType = $("#tipo_tarjeta").val();
    var expirationDateDiv = $("#expirationDateDiv");
    if (cardType == "liverpool" || cardType == "galeriasFashionCard") {
        expirationDateDiv.hide();
    } else {
        expirationDateDiv.show();
    }
    jQuery(".g-payment-form .btn_pagar_precheckout").live("click", function($) {
        if (jQuery("input[type=radio]:checked").size() == 0) {
            var message = jQuery("#noPaymentSelected").val();
            var errorHtml = "<div id='alertas'>" + "<div class='alertas'>" + "<div class='alerta error'>" + "<span class='icono_aviso'>" + "<img src='/web/images/icono_error.gif' border='0' alt=''/>" + "</span>" + message + "</div>" + "</div>" + "</div>";
            jQuery("#alertas").html(errorHtml);
            jQuery("#alertas").show();
        } else {}
    });
    var selects = $(".discount-option select");
    for (var i = 0; i < selects.length; i++) {
        if (selects[i].id.indexOf("promoCode_") == 0) {
            var test = $(selects[i]).attr("id");
            $("#" + test).val(window.localStorage.getItem(test));
        }
    }
    $("#checckout_capture").keyup(function(event) {
        if (event.keyCode == 13) {
            if ($("#orderCommitForm").valid()) {
                $(".order-con-finish-buy").hide();
                $("#orderCommitBtn").trigger("click");
            }
        }
    });
});

function soloNumeros(input) {
    return input.value.replace(/\D/gi, "");
}

function soloCharsOnly(input) {
    return input.value.replace(/\d/gi, "");
}

function soloChars(input) {
    return input.value.replace(/[\(\)+\!\\@\#\$\%\^\&\*\;\"\:\|\{\}\<\>\=\_\.\?\/\`\~\,\]\[\,]/g, "");
}

function manageBillingAddress() {
    if (document.getElementById("copyDefaultAddressCkbx").checked) {
        select1 = $("#emptyBillingAddress").detach();
        $("#billingAddressDiv").append(select2);
        document.getElementById("emptyBillingAddressFilled").style.display = "block";
        obtainEma("cp1");
    } else {
        $("#billingAddressDiv").append(select1);
        document.getElementById("emptyBillingAddress").style.display = "block";
        select2 = $("#emptyBillingAddressFilled").detach();
    }
}

function creditContinue() {
    document.creditContinueForm2.creditContinueBtn.click();
}

function onCardSelectionChange() {
    $("#onChangeFormBtn").click();
    window.localStorage.clear();
}

function getCCValues() {
    var checkedValue;
    var nipValue;
    var yearTx;
    var monthTx;
    var inputs = document.getElementsByName("selecttarjeta");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            checkedValue = inputs[i].value;
        }
    }
    var inputsNip = document.getElementsByName("nip_express");
    for (var i = 0; i < inputsNip.length; i++) {
        if (inputsNip[i].value != "") {
            nipValue = inputsNip[i].value;
        }
    }
    var inputsYear = document.getElementsByName("anio");
    for (var i = 0; i < inputsYear.length; i++) {
        if ((inputsYear[i].value != "ano") && (inputsYear[i].value != "Ano")) {
            yearTx = inputsYear[i].value;
        }
    }
    var inputsMonth = document.getElementsByName("mes");
    for (var i = 0; i < inputsMonth.length; i++) {
        if ((inputsMonth[i].value != "mes") && (inputsMonth[i].value != "Mes")) {
            monthTx = inputsMonth[i].value;
        }
    }
    document.creditContinueForm2.yearCard.value = yearTx;
    document.creditContinueForm2.monthCard.value = monthTx;
    document.creditContinueForm2.ccVerNo.value = nipValue;
    document.creditContinueForm2.selecttarjeta.value = checkedValue;
}

function checkoutRemove(form) {
    form.submit();
}

function submitCheckoutUpdate(formId, quantId) {
    var formIdStr = formId;
    var startIndex = formIdStr.indexOf("ci");
    var endIndex = formIdStr.length;
    var commId = formIdStr.substr(startIndex, endIndex);
    var qty = $("#" + quantId).val();
    $("#" + commId).val(qty);
    $("#" + formId).submit();
}

function submitCheckoutIncrement(formId, quantId) {
    var formIdStr = formId;
    var startIndex = formIdStr.indexOf("ci");
    var endIndex = formIdStr.length;
    var commId = formIdStr.substr(startIndex, endIndex);
    var qty = $("#" + quantId).val();
    var quantity = parseInt(qty);
    quantity = quantity + 1;
    $("#" + commId).val(quantity);
    $("#" + formId).submit();
}

function submitCheckoutDecrement(formId, quantId) {
    var formIdStr = formId;
    var startIndex = formIdStr.indexOf("ci");
    var endIndex = formIdStr.length;
    var commId = formIdStr.substr(startIndex, endIndex);
    var qty = $("#" + quantId).val();
    var quantity = parseInt(qty);
    quantity = quantity - 1;
    $("#" + commId).val(quantity);
    $("#" + formId).submit();
}

function onCardTypeChange() {
    var cardType = document.getElementById("tipo_tarjeta").value;
    var expirationDateDiv = document.getElementById("expirationDateDiv");
    if (cardType == "liverpool" || cardType == "galeriasFashionCard" || cardType == "fabricasDeFrancia") {
        expirationDateDiv.style.display = "none";
    } else {
        expirationDateDiv.style.display = "block";
    }
}

function getCheckedValue() {
    var inputChecked = document.getElementsByName("defaultCardSelect");
    var checkedValue;
    for (var i = 0; i < inputChecked.length; i++) {
        if (inputChecked[i].checked) {
            checkedValue = inputChecked[i].value;
        }
    }
    document.defaultAddForm.checkedValue.value = checkedValue;
}

function submitAirtimeForm() {
    document.getElementById("airTimeSubmitId").submit();
}

function submitDeletePhoneForm(form) {
    form.submit();
}

function isLPCorGalerisDeFrancia(cardKey) {
    var selected = document.getElementById(cardKey);
    if ((selected != null) && (selected.value == "LPC" || selected.value == "fabricasDeFrancia")) {
        $(".expire_field").show();
    } else {
        $(".expire_field").hide();
    }
}

function storeValuesAtSessionForAirtime(e) {
    var operation = $(e).attr("id");
    var airtimePhoneId = $(e).parent().parent().parent()
        .find("#airtimePhoneId").val();
    var contextPath = $("#contextJSPPath").val();
    var url = contextPath + "/checkout/includes/sessionStorage.jsp?airtimePhoneId=" + airtimePhoneId;
    var addPhoneURL = contextPath + "/users/addPhone.jsp";
    var editPhoneURL = contextPath + "/users/editPhone.jsp";
    var addCreditCardURL = contextPath + "/users/newCreditCardCheckout.jsp";
    $.ajax({
        type: "POST",
        cache: false,
        url: url,
        success: function() {
            if (operation == "addPhone") {
                window.location.href = addPhoneURL;
            }
            if (operation == "editPhone") {
                window.location.href = editPhoneURL;
            }
            if (operation == "addCard") {
                window.location.href = addCreditCardURL;
            }
        },
        error: function(error) {}
    });
}

function storeValuesAtSessionForCheckout(e) {
    var contextPath = $("#contextPath").val();
    var isCheckout = $("#isCheckout").val();
    var url = contextPath + "/checkout/includes/sessionStorage.jsp?isCheckout=" + true;
    var addCreditCardURL = contextPath + "/users/newCreditCardCheckout.jsp";
    $.ajax({
        type: "POST",
        cache: false,
        url: url,
        success: function() {
            window.location.href = addCreditCardURL;
        },
        error: function(error) {}
    });
}

function solonum(cosa) {
    return cosa.value.replace(/\D/gi, "");
}

function editShipping() {
    var checkedValue;
    var inputs = document.getElementsByName("shippingRadio");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            checkedValue = inputs[i].value;
        }
    }
    $("#editAddressVal").val(checkedValue);
    isBilling = ($("#editAddressVal").val() == "My Billing Address");
    if (isBilling) {
        $("#billingForm").submit();
    } else {
        $("#selectedAddressForEdit").val(checkedValue);
        $("#editAddressForm").click();
    }
}

function getAvailablePayment(selectedPG, isLoggedIn, contextPath, onPageLoad) {
    $("#search_jq_opt").empty();
    $.post(contextPath + "/checkout/includes/checkAvailablePaymentOptios.jsp", {
        selectedPG: selectedPG
    }, function(data) {
        var isCIEAvailable = $(data).filter("#cieNotAvailable").val();
        var isCIENotAvailable = $(data).filter("#ciePaymentError")
            .val();
        if (selectedPG == "CIEBancomer") {
            $("#loading").show();
            $.post(
                contextPath + "/checkout/includes/addCIEPayment.jsp", {
                    isCIEAvailable: isCIEAvailable,
                    selectedPG: selectedPG
                },
                function(data) {
                    if (isCIEAvailable == "true") {
                        $("#search_jq_opt").html(data).show();
                    } else {
                        $("#search_jq_opt").hide();
                        if (onPageLoad == "false") {}
                    }
                });
        } else {
            if (isLoggedIn == "false") {
                $.post(contextPath + "/checkout/includes/addCards.jsp", {
                    selectedPG: selectedPG
                }, function(data) {
                    $("#search_jq_opt").html(data).show();
                });
            } else {
                $.post(contextPath + "/checkout/includes/displayCards.jsp", {
                    selectedPG: selectedPG
                }, function(data) {
                    $("#search_jq_opt").html(data).show();
                });
            }
        }
    });
}

function switchAvailablePayment(selectedPG, contextPath, isUserLoggedIn,
    isOnload) {
    $("#box-overlay-first").css("display", "block");
    $("#page-loading").css("display", "block");
    console.log("selectedPG->" + selectedPG);
    console.log("contextPath->" + contextPath);
    console.log("isUserLoggedIn->" + isUserLoggedIn);
    var isCIEAvailable = $("#cieNotAvailable").val();
    console.log("isCIEAvailable->" + isCIEAvailable);
    if (selectedPG == "CIEBancomer") {
        $(".checkout-footer").css("position", "fixed");
        if (isCIEAvailable == "false") {
            $("#page-loading").css("display", "none");
            $("#box-overlay-first").css("display", "none");
            return false;
        }
    } else {
        if (selectedPG == "paypal") {
            $(".checkout-footer").css("position", "fixed");
        } else {
            $(".checkout-footer").css("position", "relative");
        }
    }
    window.localStorage.clear();
    $.post(contextPath + "/checkout/includes/checkAvailablePaymentOptios.jsp", {
        selectedPG: selectedPG
    }, function(data) {
        console.log("User selected payment type - " + selectedPG);
        $("#selectedPayMethod").val(selectedPG);
        if (!isOnload) {
            location.reload();
        }
        $("#page-loading").css("display", "none");
        $("#box-overlay-first").css("display", "none");
    });
}

function submitGuestPaymentMethod() {
    var selectedPayGrp = $("#selectedPayMethod").val();
    console.log("selectedPayGrp-->" + selectedPayGrp);
    if (selectedPayGrp == "CIEBancomer") {
        if ($("#form_guest_bancomer_pay_method").valid()) {
            console.log("Submitting form --> form_guest_bancomer_pay_method");
            $("#bancomerPaymentMethod").trigger("click");
        }
    } else {
        if (selectedPayGrp == "paypal") {
            if ($("#form_guest_paypal_method").valid()) {
                console.log("Submitting form --> form_guest_pay_method");
                $("#payPalPaymentMethod").trigger("click");
            }
        } else {
            if ($("#form_guest_credit_pay_method").valid()) {
                console.log("Submitting form --> form_guest_credit_pay_method");
                $("#creditPaymentMethod").trigger("click");
            }
        }
    }
}

        function loadCartItems(selectedPG, contextPath) {
            console.log("Loading cart items : Start.");
            $("#cartItemsDivId").empty();
            $.post(contextPath + "/checkout/includes/cartItems.jsp", {
                selectedPG: selectedPG
            }, function(data) {
                $("#cartItemsDivId").html(data).show();
                console.log("Loading cart items : Done.");
                $("#page-loading").css("display", "none");
                $("#box-overlay-first").css("display", "none");
            });
        }
        $(function() {
            $('#form_guest_personal_data input[type="text"],' + '#form_guest_credit_pay_method input[type="text"]').click(function() {
                $(".checkout-footer").css("position", "relative");
            });
        });

        function assignAirtimeSkusToHandler(airtimePhoneItem, selPhoneCheckBox, event) {
            var airtimeSkuID = $("#phone_" + airtimePhoneItem).val();
            if (event == "onCheckboxSelect") {
                if ($(selPhoneCheckBox).attr("checked")) {
                    $("#AirSKU_" + airtimePhoneItem).val(airtimeSkuID);
                } else {
                    $("#AirSKU_" + airtimePhoneItem).val("");
                }
            } else {
                var selectedPhoneCheckBox = $(selPhoneCheckBox).parent().parent().find("[type=checkbox]");
                if ($(selectedPhoneCheckBox).attr("checked")) {
                    $("#AirSKU_" + airtimePhoneItem).val(airtimeSkuID);
                } else {
                    $("#AirSKU_" + airtimePhoneItem).val("");
                }
            }
        }

        function updatePromocodes() {
            var eles = [];
            var eles1 = [];
            var selects = $(".cart-product-desc select");
            for (var i = 0; i < selects.length; i++) {
                if (selects[i].id.indexOf("promoCode_") == 0) {
                    eles.push(selects[i].value);
                    eles1.push($(selects[i]).attr("id"));
                    window.localStorage.setItem($(selects[i]).attr("id"), selects[i].value);
                }
            }
            document.creditContinueForm2.updatePromocodesBtn.click();
        }

        function callCommitOrder() {
                if ($("#orderCommitForm").valid()) {
                    $(".order-con-finish-buy").hide();
                    $("#orderCommitBtn").trigger("click");
                }
            }
            /**
             * ssonti - 04/06/2015 - Code changes for ChangeRequest_LP_Limit_CreditCards_9
             * Javascript function to display the error in the checkout billing page.
             */
        function displayMaxCreditCardsErrorinCheckout() {

            var divErrors = document.getElementById('alertas');
            var errors = '';
            errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>" + $("#maxProfileCreditCardError").val() + "</div>";

            divErrors.style.display = 'block';
            divErrors.innerHTML = errors;
            return false;
        }