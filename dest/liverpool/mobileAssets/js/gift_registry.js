function validateGREventSearchForm() {
	var valid = 1;
	var notNumRegex = /^[a-zA-Z áéíñóúüÁÉÍÑÓÚÜ]*$/;
	var numRegex = /^[0-9]*$/;
	var booleanError= false;
	var complementText= "Es necesario introducir al menos uno de los apellidos";

	
		var nombre=$('input[placeholder="Nombre"]').val();
	
		var appellidoPatterno=	$('input[placeholder="Apellido Paterno"]').val();
		
		var appellidoMatterno=	$('input[placeholder="Apellido Materno"]').val();
		if(nombre!="" && appellidoPatterno!=""  || nombre!="" && appellidoMatterno!="" ){
	
					$("#eventSearch input[type=text]").each(function() {
						
				
					
								if (valid > 0) {
									if ($(this).val() != "") {
										valid += 1;
									}
									if ($(this).attr("id") == "giftrg-no") {
										if (!numRegex.test($(this).val())) {
											displayError();
											valid = 0;
										}
									} else {
										if (!notNumRegex.test($(this).val())) {
											displayError();
											valid = 0;
										}
									}
								}
							
					
					});
		
		}else{
			
			var message= $("#gift_errormsg").text();
			$("#gift_errormsg").text(complementText);	
			//displayError();
			booleanError=true;

		}
	
	
	
	if (valid > 1) {
		if ($("#giftrg-date").val() == "dd" && $("#giftrg-month").val() == "mm"
				&& $("#giftrg-year").val() == "aaaa") {
			return true;
		} else {
			if ($("#giftrg-date").val() == "dd"
					|| $("#giftrg-month").val() == "mm"
					|| $("#giftrg-year").val() == "aaaa") {
				
					if(booleanError==false){
						displayError();

					}else{
						displayError(complementText);

					}
				return false;
			}
		}
	} else {
		if (valid == 0) {
			displayError();
			return false;
		} else {
			if ($("#giftrg-date").val() == "dd"
					|| $("#giftrg-month").val() == "mm"
					|| $("#giftrg-year").val() == "aaaa") {
				if(booleanError== true)
				displayError();
				return false;
			} else {
				return true;
			}
		}
	}
}
function validateGRCardSearchForm() {
	var valid = 1;
	var notNumRegex = /^([^0-9]*)$/;
	var numRegex = /^[0-9]*$/;
	$("#reporteMesaForm input[type=text]").each(function() {
		if (valid > 0) {
			if ($(this).val() != "") {
				valid += 1;
			}
			if ($(this).attr("id") == "taregeta") {
				if (!numRegex.test($(this).val())) {
					displayError();
					valid = 0;
				}
			} else {
				if (!notNumRegex.test($(this).val())) {
					displayError();
					valid = 0;
				}
			}
		}
	});
	if (valid > 1) {
		$("#reporteMesaForm").attr("target", "_blank");
		return true;
	} else {
		displayError();
		return false;
	}
}
function displayError(messageError) {
	if(messageError==null && messageError==""){
		var errorMsg = $("#form_error_msg").val();
		$("#gift_errormsg").text(errorMsg);
	}
	

	return false;
}
$(document).ready(function() {
	getRecipientIndex();
	lazyLoading();
	processErrorImages();
});
function processErrorImages() {
	$(".event_item_photo").each(function() {
		var elem = $(this);
		var url = elem.attr("href");
		$.ajax({
			url : url,
			type : "HEAD",
			error : function() {
			},
			success : function() {
				elem.removeClass("hide_element");
			}
		});
	});
}
function lazyLoading() {
	var load = true;
	var processing = false;
	if ($("#lazyclick").length) {
		$(window).scroll(
				function(e) {
					if (processing) {
						return false;
					}
					if ($(window).scrollTop() >= ($(document).height() - $(
							window).height()) - 1500) {
						processing = true;
						if (load) {
							var url = $("#lazyclick").attr("href");
							$.get(url, function(data) {
								if ($.trim(data) != "") {
									$("#gift_registry_table_events tbody")
											.append(data);
									processing = false;
								} else {
									load = false;
								}
							});
						}
					}
				});
	}
}
function getRecipientIndex() {
	if ($("#gift_registry_grooms_select").length) {
		var rValue = $("#gift_registry_grooms_select").val();
		var rValueName = $("#gift_registry_grooms_select option:selected")
				.text();
		var nameLength = rValueName.length;
		var nameSplit = rValueName.split(" ");
		var lastLength = nameLength - nameSplit[0].length;
		var lastNameLength = nameSplit[0].length + 1;
		var lastName = rValueName.slice(lastNameLength);
		var firstName = nameSplit[0];
		var address = $("#addressGR_" + rValue).val();
		var state = $("#state_" + rValue).val();
		var postalCode = $("#postalCode_" + rValue).val();
		var colony = $("#colony_" + rValue).val();
		var rMes_eventType = $("#mes_event_type").val();
		$(".eventRecipientIndex").val(rValue);
		$(".firstName").val(firstName);
		$(".lastName").val(lastName);
		$(".address1").val(address);
		$(".address2").val(address);
		$(".state").val(state);
		$(".postalCode").val(postalCode);
		$(".colony").val(colony);
		$(".mes_eventType").val(rMes_eventType);
	}
}
function searchDepto() {
	var select = document.getElementById("gift_registry_category_select");
	var index = select.selectedIndex;
	var value = select.options[index].value;
	document.location.href = "#" + value;
	return false;
}
setTimeout(function() {
	var a = document.createElement("script");
	var b = document.getElementsByTagName("script")[0];
	a.src = document.location.protocol
			+ "//dnn506yrbagrg.cloudfront.net/pages/scripts/0012/7965.js?"
			+ Math.floor(new Date().getTime() / 3600000);
	a.async = true;
	a.type = "text/javascript";
	b.parentNode.insertBefore(a, b);
}, 1);
dataLayer = [];
(function(w, d, s, l, i) {
	w[l] = w[l] || [];
	w[l].push({
		"gtm.start" : new Date().getTime(),
		event : "gtm.js"
	});
	var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l="
			+ l
			: "";
	j.async = true;
	j.src = "//www.googletagmanager.com/gtm.js?id=" + i + dl;
	f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-446F");
/* Jon */

$(document)
		.ready(
				function() {

					var existScrollPane = $("body > div.wrapper > div.gift-results-container.gift-list-events-container > div.span7.gift-results-left > div.row-fluid.gift-results-events.scrollpane.jspScrollable > div > div.jspPane");
					if (existScrollPane != null) {
						existScrollPane.css("height", "auto");
					}
				});
/* Jon */
