lpaccobj = {};
(function($) {
	$(function() {
		var leftHeight = $(".accleft-nav").height();
		var rightHeight = $(".accright-content").outerHeight(true);
		if ((leftHeight <= rightHeight) && (phoneWidth > 769)) {
			$(".accleft-nav").height(rightHeight);
		}
		$(window).bind("load resize", resizeFrame);
		function resizeFrame() {
			var leftHeightNew = $(".accleft-nav").height();
			var rightHeightNew = $(".accright-content").outerHeight(true);
			if ((leftHeightNew <= rightHeightNew) && (phoneWidth > 769)) {
				$(".accleft-nav").height(rightHeightNew);
			}
		}
		setInterval(resizeFrame, 150);
		$(".close_icon").live("click touchstart", function(e) {
			e.preventDefault();
			var delcount = this.id;
			var contextPath = $("#mobilePage_contextPath").val();
			if (delcount >= 1) {
				$.ajax({
					type : "GET",
					url : contextPath + "/users/frag/confrimPhonePopup.jsp",
					dataType : "html",
					success : function(data) {
						$("#address-delete-modal").html(data);
						$("#address-delete-modal").modal("show");
					}
				});
				$(this).addClass("active");
				$(".del-btn").live("click", function() {
					$("#add_phone_form" + delcount).submit();
					$(".delview-modal").modal("hide");
				});
				$(".no-btn").live("click", function() {
					$(".close_icon.active").removeClass("active");
				});
				$(".modal-backdrop").live("click", function() {
					$(".close_icon.active").removeClass("active");
				});
			}
		});
		for (var q = 0; q < $("form").size(); q++) {
			var formcount = $("form").eq(q);
			if (formcount.hasClass("form-withphone")) {
				formcount
						.validate({
							meta : "validate",
							groups : {
								Location : "rfc-zip1 rfc-zip2 rfc-zip3 phone-no1 phone-no2 reg-dob1 reg-dob2 reg-dob3 rfc1 rfc2 rfc3 phoneNumber lada",
							},
							errorPlacement : function(error, element) {
								if (isiPhone != -1) {
									$("#headernev").attr("style",
											"position: relative !important;");
								}
								if (element.attr("name") == "rfc-zip1"
										|| element.attr("name") == "rfc-zip2"
										|| element.attr("name") == "rfc-zip3") {
									error.insertAfter(".rfc-ip-block3");
								} else {
									if (element.attr("name") == "phone-no1"
											|| element.attr("name") == "phone-no2") {
										error.insertAfter("#phone-no2");
									} else {
										if (element.attr("name") == "reg-dob1"
												|| element.attr("name") == "reg-dob2"
												|| element.attr("name") == "reg-dob3") {
											error.insertAfter("#reg-dob3");
										} else {
											if (element.attr("name") == "rfc1"
													|| element.attr("name") == "rfc2"
													|| element.attr("name") == "rfc3") {
												error.insertAfter("#rfc3");
											} else {
												if (element.attr("name") == "lada"
														|| element.attr("name") == "phoneNumber") {
													error
															.insertAfter("#telephone");
												} else {
													if (element.attr("id") == "gendertextm"
															|| element
																	.attr("id") == "gendertextfm") {
														error
																.insertAfter("#gender-opt");
													} else {
														error
																.insertAfter(element);
													}
												}
											}
										}
									}
								}
							}
						});
			} else {
				formcount.validate({
					meta : "validate"
				});
			}
		}
		if ($(".yearSelect").length > 0) {
			$("#registration").submit(
					function() {
						var ytr = $(".yearSelect").val();
						var mth = $(".monthSelect").val();
						var dth = $(".daySelect").val();
						var d = new Date();
						var year = d.getFullYear();
						var month = d.getMonth();
						var day = d.getDate();
						if ((ytr == "" && mth == "" && dth == "")
								|| (ytr != "" && mth != "" && dth != "")) {
							$(".validate-dob").hide();
							if (ytr != "" && mth != "" && dth != "") {
								if (ytr > year) {
									$(".validate-fut").show();
								}
								if (ytr > year && mth > month && dth > day) {
									$(".validate-fut").show();
								}
								if (ytr == year && mth >= month && dth > day) {
									$(".validate-fut").show();
								}
								if (ytr == year && mth > month) {
									$(".validate-fut").show();
								}
							}
							return true;
						} else {
							$(".validate-dob").show();
							return false;
						}
					});
		}
		$(".yearSelect").live("change", function() {
			var _curVal = $(this).val();
			if (_curVal != "" || _curVal != null) {
				$(".monthSelect").attr("disabled", false);
			}
		});
		$(".monthSelect").live("change", function() {
			var _curVal = $(this).val();
			if (_curVal != "" || _curVal != null) {
				$(".daySelect").attr("disabled", false);
			}
			lpaccobj.getDays();
		});
		$(".yearSelect").live("change", function() {
			lpaccobj.getDays();
		});
		lpaccobj.getDays();
		$(".remove-address-link").live(
				"click",
				function() {
					var contextPath = $("#mobilePage_contextPath").val();
					var delcount = $(this).parents(".saved-address-content")
							.children(".saved-address").size();
					var IdValue = $(this).attr("id");
					if (delcount >= 1) {
						$.ajax({
							type : "GET",
							url : contextPath
									+ "/users/frag/confrimAdress_Popup.jsp?Id="
									+ IdValue,
							dataType : "html",
							success : function(data) {
								$("#address-delete-modal").html(data);
								$("#address-delete-modal").modal("show");
							}
						});
						$(this).addClass("active");
						$(".del-btn").live(
								"click",
								function() {
									$(".remove-address-link.active").closest(
											".saved-address").remove();
									$(".delview-modal").modal("hide");
								});
						$(".no-btn").live(
								"click",
								function() {
									$(".remove-address-link.active")
											.removeClass("active");
								});
						$(".modal-backdrop").live(
								"click",
								function() {
									$(".remove-address-link.active")
											.removeClass("active");
								});
					}
				});
		if (phoneWidth < 768) {
			$(".leftnavbar .btn-navbar, .leftnavbar a")
					.live(
							"click",
							function() {
								if ($(this).parent(".leftnavbar").hasClass(
										"active")) {
									$(".leftnav-mobilelinks").slideUp(500);
									$(this).parent(".leftnavbar").removeClass(
											"active");
								} else {
									$(this).parent(".leftnavbar").addClass(
											"active");
									$(".leftnav-mobilelinks").slideDown(500);
								}
							});
		}
		if (phoneWidth < 768) {
			var newbreadcrumdiv = "<div class='cloned-breadcrumb-div'></div>";
			$("<div class='cloned-breadcrumb-div'></div>").insertAfter(
					$(".mobile-breadcrumb .globalslidercontainer"));
			$(".cloned-breadcrumb-div").css("visibility", "hidden");
			$(".mobile-breadcrumb").find(".globalslider").clone().addClass(
					"cloned-breadcrumb-ul").removeClass("globalslider")
					.appendTo(".cloned-breadcrumb-div");
			$(".breadcrumb-open").on("click", function() {
				for (var i = 0; i < $(".globalslider").size(); i++) {
					lpobj.initializesliders(i);
				}
				lpaccobj.enableDisableBreadcrumbSlider();
				$(".mobile-subbreadcrumb").css("visibility", "hidden");
				$(this).css("visibility", "hidden");
				$(".breadcrumb-close").css("visibility", "visible");
			});
			$(".breadcrumb-close").on("click", function() {
				$(".breadcrumb-slider").css("visibility", "hidden");
				$(".mobile-subbreadcrumb").css("visibility", "visible");
				$(this).css("visibility", "hidden");
				$(".breadcrumb-open").css("visibility", "visible");
				$(".cloned-breadcrumb-div").css("visibility", "hidden");
			});
		}
		$(window).on("orientationchange", function() {
			if ($(".breadcrumb-open").css("visibility") == "hidden") {
				lpaccobj.enableDisableBreadcrumbSlider();
			}
		});
	});
	lpaccobj = {
		enableDisableBreadcrumbSlider : function() {
			var windowWidth = $(window).width();
			if (windowWidth < 560) {
				$(".breadcrumb-slider").css("visibility", "visible");
				$(".cloned-breadcrumb-div").css("visibility", "hidden");
			} else {
				$(".cloned-breadcrumb-div").css("visibility", "visible");
				$(".breadcrumb-slider").css("visibility", "hidden");
			}
		},
		getDays : function() {
			var month = $(".monthSelect").val();
			var dayDropDown = $(".daySelect");
			var res = $(".daySelect :selected").text();
			dayDropDown.html("");
			if (month == 2) {
				for (var i = 1; i <= 28; i++) {
					if (i == 1) {
						dayDropDown.append("<option value=" + "" + ">" + "Dia"
								+ "</option>");
						dayDropDown.append("<option value=" + i + ">" + i
								+ "</option>");
					} else {
						dayDropDown.append("<option value=" + i + ">" + i
								+ "</option>");
					}
				}
				var year = $(".yearSelect").val();
				if (parseInt(year) % 4 == 0) {
					dayDropDown.append("<option value='29'>29</option>");
				}
			} else {
				if (month == 4 || month == 6 || month == 9 || month == 11) {
					for (var i = 1; i <= 30; i++) {
						if (i == 1) {
							dayDropDown.append("<option value=" + "" + ">"
									+ "Dia" + "</option>");
							dayDropDown.append("<option value=" + i + ">" + i
									+ "</option>");
						} else {
							dayDropDown.append("<option value=" + i + ">" + i
									+ "</option>");
						}
					}
				} else {
					for (var i = 0; i <= 31; i++) {
						if (i == 0) {
							dayDropDown.append("<option value=" + "" + ">"
									+ "Dia" + "</option>");
						} else {
							dayDropDown.append("<option value=" + i + ">" + i
									+ "</option>");
						}
					}
				}
			}
			$("#reg-dob3 option[value=" + res + "]").attr("selected", true);
		}
	};
})(jQuery);
function showDeleteModal(key) {
	var delcount = $(this).parents(".saved-address-content").children(
			".saved-address").size();
	var contextPath = $("#mobilePage_contextPath").val();
	$
			.ajax({
				type : "GET",
				url : contextPath
						+ "/users/frag/creditCardConfrimPopup.jsp?key=" + key,
				dataType : "html",
				success : function(data) {
					$("#address-delete-modal").html(data);
					$("#address-delete-modal").modal("show");
				}
			});
}
function showDeleteCard(key) {
	var contextPath = $("#mobilePage_contextPath").val();
	$.ajax({
		type : "GET",
		url : contextPath
				+ "/users/credit/includes/removeCardConfirmPopup.jsp?key="
				+ key,
		dataType : "html",
		success : function(data) {
			$("#address-delete-modal").html(data);
			$("#address-delete-modal").modal("show");
		}
	});
}
$(document).ready(function() {
	var selectedDay = $("#selectedDay").val();
	var selectedMonth = $("#selectedMonth").val();
	var selectedYear = $("#selectedYear").val();
	var cp = $("#cp").val();
	$("#reg-dob3 option[value=" + selectedDay + "]").attr("selected", true);
	$("#reg-dob2 option[value=" + selectedMonth + "]").attr("selected", true);
	$("#reg-dob1 option[value=" + selectedYear + "]").attr("selected", true);
});
function changecp(key) {
	var contextPath = $("#mobilePage_contextPath").val();
	$
			.ajax({
				type : "GET",
				url : contextPath
						+ "/users/credit/includes/removeCardConfirmPopup.jsp?key="
						+ key,
				dataType : "html",
				success : function(data) {
					data = "";
					if (data == "") {
						$("#changestate")
								.html(
										'<input type="text" value="" name="estado" id="estado" class="input-large {validate:{required:true}}">');
						$("#changecolonia")
								.html(
										'<input type="text" value="" name="colonia" id="colonia" class="input-large {validate:{required:true}}">');
						$("#changedelegacion")
								.html(
										'<input type="text" value="" name="delegación" id="delegacion" class="input-large {validate:{required:true}}">');
					}
					$("#estado").validate();
					$("#colonia").validate();
					$("#delegación").validate();
				}
			});
}
$(".invoice-rfc-zip1")
		.keypress(
				function(event) {
					var returnFlag = false;
					if ((((event.which >= 65) && (event.which <= 90)) || ((event.which >= 97) && (event.which <= 122)))
							|| event.which == 13
							|| event.which == 8
							|| event.which == 0) {
						returnFlag = true;
					}
					return returnFlag;
				});
$(".invoice-rfc-zip2,.invoice-pinCode").keypress(
		function(event) {
			if (((event.which > 47) && (event.which < 58)) || event.which == 13
					|| event.which == 8 || event.which == 0) {
				return true;
			} else {
				return false;
			}
		});
$(".invoice-rfc-zip3")
		.keypress(
				function(event) {
					var returnFlag = false;
					if ((((event.which > 47) && (event.which < 58))
							|| ((event.which >= 65) && (event.which <= 90)) || ((event.which >= 97) && (event.which <= 122)))
							|| event.which == 13
							|| event.which == 8
							|| event.which == 0) {
						returnFlag = true;
					}
					return returnFlag;
				});