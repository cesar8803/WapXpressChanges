/**
 * START
 * nkantamani-code changes for EInvoicing-Enhancements
 */
$(function() {
	var back = $("#okBackFlag").val();
	var okMonth = $("#okMonth").val();
	var okYear = $("#okYear").val();
	var backPage = $('#backPage').val();
	var errpage = $("#errPage").val();
	var succcode = $("#succ_code").val();
	var backAddr = $("#backAddr").val();
	var currentTime = new Date();
	
	

	if (succcode == '0' || succcode == '9999' || succcode == '9998' || succcode == '9997'  ) {
		$('#succes_btn').click();
		}
	if (back == 'Y' || errpage == 'Y' || backAddr == 'Y') {
		if (backPage == 'Acreditar') {
			$("#ayear").val(okYear);
			$("#amonth").val(okMonth);
			getAcreMonthNameLastDate(okMonth);
			enableMonths(backPage);
			var curmonth = currentTime.getMonth() + 1;
			var zero="0"
			$("#month").val(zero.concat(curmonth));
			var month = $("#month").val();
			getMonthNameLastDate(month);
			enableMonths("fisica");
		} else {
			$("#year").val(okYear);
			$("#month").val(okMonth);
			getMonthNameLastDate(okMonth);
			enableMonths(backPage);
			var curmonth = currentTime.getMonth() + 1;
			var zero="0"
			$("#amonth").val(zero.concat(curmonth));
			var amonth = $("#amonth").val();
			getAcreMonthNameLastDate(amonth);
			enableMonths("acreditar");
		}

	}
	else{
		var curmonth = currentTime.getMonth() + 1;
		var zero="0"
		$("#amonth").val(zero.concat(curmonth));
		$("#month").val(zero.concat(curmonth));
		var month = $("#month").val();
		var amonth = $("#amonth").val();
		getMonthNameLastDate(month);
		enableMonths("fisica");
		getAcreMonthNameLastDate(amonth);
		enableMonths("acreditar");
	}

});

function yearChange() {

	var apage = 'fisica';
	enableMonths(apage);
	if (($("#month").val() != null && $("#month").val() != '')) {
		var month = $("#month").val();
		getMonthNameLastDate(month);
	}

}

function yearAcreChange() {

	var apage = 'acreditar';
	enableMonths(apage);

	if (($("#amonth").val() != null && $("#amonth").val() != '')) {
		var month = $("#amonth").val();
		getAcreMonthNameLastDate(month);
	}

}

function getMonthNameLastDate(monthNo) {

	var m = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
			'Augusto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

	var year = $("#year").val();
	var lastDate = daysInMonth(monthNo, year);
	var monthName = m[monthNo - 1];
	$("#lastDate").val(lastDate);
	$("#monthName").val(monthName);

}

function getAcreMonthNameLastDate(monthNo) {

	var m = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
			'Augusto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

	var ayear = $("#ayear").val();
	var lastDate = daysInMonth(monthNo, ayear);
	var monthName = m[monthNo - 1];
	$("#aLastDate").val(lastDate);
	$("#aMonthName").val(monthName);

}

function daysInMonth(month, year) {
	var d = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	if (month != 2)
		return d[month - 1];
	if (year % 4 != 0)
		return d[1];
	if (year % 100 == 0 && year % 400 != 0)
		return d[1];
	return d[1] + 1;
}

function enableMonths(apage) {

	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var year = currentTime.getFullYear();
	var year1 = $("#year").val();
	var ayear = $("#ayear").val();

	if (apage == 'acreditar') {
		if (year == ayear) {

			$('#amonth').find("option").each(function() {
				if ($(this).val() > month) {
					$(this).attr("disabled", true);
				}
			});

		} else {
			$('#amonth').find("option").each(function() {
				$(this).attr("disabled", false);

			});

		}
	} else {
		if (year == year1) {

			$('#month').find("option").each(function() {
				if ($(this).val() > month) {
					$(this).attr("disabled", true);
				}
			});

		} else {
			$('#month').find("option").each(function() {
				$(this).attr("disabled", false);

			});

		}

	}

}

$(function() {
	$("#page-loading").hide();
	$("#collapseThree").hide();
	$("#collapseTwo").hide();
	$('#fisicaClick_tab').click(function() {
		$("#collapseTwo").hide();
		$("#name").val('');
		$("#lastname").val('');
		$("#maternalastname").val('');
		$("#emailId").val('');
		$("#pincode").val('');
		$("#errMsgName").css('display', 'none');
		$("#errMsgForLastName").css('display', 'none');
		$("#errMsgMotherName").css('display', 'none');
		$("#errMsgEmail1").css('display', 'none');
		$("#errMsgCP1").css('display', 'none');
	});
	$('#acreditaClick_tab').click(function() {
		$("#collapseThree").hide();
		$("#rfc1").val('');
		$("#rfc2").val('');
		$("#rfc3").val('');
		$("#postcode").val('');
		$("#email").val('');
		$("#errMsgForRFC").css('display', 'none');
		$("#errMsgCP").css('display', 'none');
		$("#errMsgEmail").css('display', 'none');
	});
	if (($("#okBackFlag").val() == 'Y' || $("#errPage").val() == 'Y' || $("#backAddr").val() == 'Y')
			&& ($('#backPage').val() == 'fisica')) {
		$('#fisicaClick_tab').click();
		$("#collapseThree").show();
	} else if (($("#okBackFlag").val() == 'Y' || $("#errPage").val() == 'Y' || $("#backAddr").val() == 'Y')
			&& ($('#backPage').val() == 'Acreditar')) {
		$('#acreditaClick_tab').click();
		$("#collapseTwo").show();
	}
	
	if( $("#errPage").val() == 'Y' && $('#tabPage').val() == 'fisica'){
		$('#createFisca').click();
	}else if( $("#errPage").val() == 'Y' && $('#tabPage').val() == 'Acreditar'){
		$('#createAcredita').click();
	}else{
		$('#createFisca').click();
	}
	
	$("#fisca_sbtn")
			.click(
					function() {
						
						if(validateSearchInvoiceInputs("fisica")!=true){
							return false;
							}
							else{

						$
								.ajax({
									type : "POST",
									data : $('#s_fiscaForm').serialize(),
									success : function(data) {
										var tempDiv = $("<div/>");
										tempDiv.append(data);
										var sessionOut = tempDiv.find("input[id='session_Timeout']").val();
										if(sessionOut == 'Y'){
										window.location.href ="/tienda/m";
										}
										else{
										var addrFlw = tempDiv.find(
												"input[id='addFlw']").val();
										if (addrFlw == 'Y') {
											window.location.href = "/tienda/m/users/selectInvoice.jsp?addrFlow=Y";

										} else {

											var result = $(data).filter(
													'div.alertas').length;
											if (result == 1) {

												$("#errorHandler").html(
														$.trim(data));
												$("#errorHandler").show();
											} else {
												$("#errorHandler").hide();
												$("#collapseThree").html(
														$.trim(data));

												$("#collapseThree").show();
											}
											$("#page-loading").hide();

										}
									}
									}

								});
					}
					});

	$("#acreditar_sbtn")
			.click(
					function() {
						if(validateSearchInvoiceInputs("acreditar")!=true){
							return false;
							}
							else{

						$
								.ajax({
									type : "POST",
									data : $('#s_AcreditarForm').serialize(),
									success : function(data) {
										var tempDiv = $("<div/>");
										tempDiv.append(data);
										var sessionOut = tempDiv.find("input[id='session_Timeout']").val();
										if(sessionOut == 'Y'){
										window.location.href ="/tienda/m";
										}
										else{
										
										var addrFlw = tempDiv.find(
												"input[id='addFlw']").val();
										if (addrFlw == 'Y') {
											window.location.href = "/tienda/m/users/selectInvoice.jsp?addrFlow=Y";

										} else {
											var result = $(data).filter(
													'div.alertas').length;
											if (result == 1) {

												$("#errorHandler").html(
														$.trim(data));
												$("#errorHandler").show();
											} else {
												$("#errorHandler").hide();
												$("#collapseTwo").html(
														$.trim(data));

												$("#collapseTwo").show();
											}

										}
									}
									}

								});
					}
					});
	
	
	$("#fisca_mbtn").click(function() {
		
		if(validateSearchInvoiceInputs("fisicaC")!=true){
			return false;
			}
			else{
	   $.ajax({
			     type: "POST",
			     data:  $('#fisicaC_Validate').serialize(),
			     success: function(data) {
			    		var tempDiv = $("<div/>");
						tempDiv.append(data);
						var sessionOut = tempDiv.find("input[id='session_Timeout']").val();
						if(sessionOut == 'Y'){
						window.location.href ="/tienda/m";
						}
						else{
			    	 var addrFlw = $(data).find("input[id='New_Addr']").val();
			    	 if (addrFlw == 'Y') {
			    	 window.location.href = "/tienda/m/users/invoicingAddNewAddress.jsp";

			    	 } else {
			    		 var result = $(data).filter(
							'div.alertas').length;
					if (result == 1) {

						$("#errorHandler").html(
								$.trim(data));
						$("#errorHandler").show();
					} else{
			    		 
			    		 $("#collapseThree").html($.trim(data));
			             $("#collapseThree").show();
			             $("#page-loading").hide();	
			    	 }
			    	 }
			     }
			     }
			 
			   });
			} 
		   
		
	});

});

function validateInvoiceInputs(type){
	
	var returnFlag = true;
	var vcp = $("#cp3").val();
	var vemail = $("#email3").val();
	var vcf = $("#cf3").val();
	
	 if(type=='acreditar'|| type=='cf3' ){
		 if(vcf == '' || vcf == null)
		 {
		 $("#errMsgCF3").text($("#emptyInvoiceCode").val());
		 $("#cf3").addClass("error");
		 returnFlag = false;
		 } else
		 {
		 $("#errMsgCF3").text("");
		 $("#cf3").removeClass("error");

		 }
	 }
	 
	 if(type=='acreditar' || type=='email3' ){
		 $("#errMsgEmail3").show();
	 if ((vemail == null || vemail == '')) {

	 $("#errMsgEmail3").text($("#emailEmtyError").val());
	 $("#email3").addClass("error");
	 returnFlag = false;
	 } else if (vemail != null  && vecheck(vemail) == false) {
	 $("#errMsgEmail3").text($("#emailFormatError").val());
	 $("#email3").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgEmail3").text("");
	 $("#email3").removeClass("error");
	 }
	 }
	 
	 if(type=='acreditar'|| type=='cp3' ){
			$("#errMsgCP3").show();
			 if ((vcp == '' || vcp == null) || vcp.length < 5) {
			 $("#errMsgCP3").text($("#cpError").val());
			 $("#cp3").addClass("error");
			 returnFlag = false;
			 } else {
			 $("#errMsgCP3").text("");
			 $("#cp3").removeClass("error");
			 }
			 }
	 
	 
	 
	 
	 
	 return returnFlag;
}

function validateExtranjeroInvoiceInputs(type){
	
	var returnFlag = true;
	var vcp = $("#cp2").val();
	var vemail = $("#email2").val();
	var vcf = $("#cf2").val();
	
	 if(type=='extranjero'|| type=='cf2' ){
		 if(vcf == '' || vcf == null)
		 {
		 $("#errMsgCF2").text($("#emptyInvoiceCode").val());
		 $("#cf2").addClass("error");
		 returnFlag = false;
		 } else
		 {
		 $("#errMsgCF2").text("");
		 $("#cf2").removeClass("error");

		 }
	 }
	 
	 if(type=='extranjero' || type=='email2' ){
		 $("#errMsgEmail2").show();
	 if ((vemail == null || vemail == '')) {

	 $("#errMsgEmail2").text($("#emailEmtyError").val());
	 $("#email2").addClass("error");
	 returnFlag = false;
	 } else if (vemail != null  && vecheck(vemail) == false) {
	 $("#errMsgEmail2").text($("#emailFormatError").val());
	 $("#email2").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgEmail2").text("");
	 $("#email2").removeClass("error");
	 }
	 }
	 
	 if(type=='extranjero'|| type=='cp2' ){
			$("#errMsgCP2").show();
			 if ((vcp == '' || vcp == null) || vcp.length < 5) {
			 $("#errMsgCP2").text($("#cpError").val());
			 $("#cp2").addClass("error");
			 returnFlag = false;
			 } else {
			 $("#errMsgCP2").text("");
			 $("#cp2").removeClass("error");
			 }
			 }
	 
	 
	 
	 
	 
	 return returnFlag;
}


function validateSearchInvoiceInputs(type){

	 var returnFlag = true;
	 var vrfc1 = $("#rfc1").val();
	 var vrfc2 = $("#rfc2").val();
	 var vrfc3 = $("#rfc3").val();
	 var vcp = $("#postcode").val();
	 var vemail = $("#email").val();
	 var vcp1 = $("#pincode").val();
	 var vemail1 = $("#emailId").val();
	 var vName=$("#name").val();
	 var vMaterno=$("#maternalastname").val();
	 var vPaterno=$("#lastname").val();
	 var vcf = $("#cf").val();
	 
	 if(type=='fisicaC'|| type=='cf' ){
		 if(vcf == '' || vcf == null)
		 {
		 $("#errMsgCF").text($("#emptyInvoiceCode").val());
		 $("#cf").addClass("error");
		 returnFlag = false;
		 } else
		 {
		 $("#errMsgCF").text("");
		 $("#cf").removeClass("error");

		 }
		 }
	 
	 if(type=='fisica'|| type=='rfc' || type=='fisicaC'){
	 $("#errMsgForRFC").show();
	 if (vrfc1 == '' || vrfc1 == null || vrfc2 == ''
	 || vrfc2 == null || vrfc3 == ''
	 || vrfc3 == null) {
	 $("#errMsgForRFC").text($("#rfcError").val());
	 returnFlag = false;
	 } else {
	 $("#errMsgForRFC").text("");
	 }
	 }
	 if(type=='fisica'|| type=='cp' || type=='fisicaC'){
	$("#errMsgCP").show();
	 if ((vcp == '' || vcp == null) || vcp.length < 5) {
	 $("#errMsgCP").text($("#cpError").val());
	 $("#postcode").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgCP").text("");
	 $("#postcode").removeClass("error");
	 }
	 }

	 if(type=='cp1' || type=='acreditar'){
	 $("#errMsgCP1").show();
	 if ((vcp1 == '' || vcp1 == null) || vcp1.length < 5) {
	 $("#errMsgCP1").text($("#cpError").val());
	 $("#pincode").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgCP1").text("");
	 $("#pincode").removeClass("error");
	 }
	 }

	 if(type=='fisica'|| type=='rfc' || type=='fisicaC'){
	$("#errMsgForRFC").show(); 
	 if (vrfc1.length < 3) {
	 $("#errMsgForRFC").text($("#rfcError").val());
	 $("#rfc1").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#rfc1").removeClass("error");
	 }
	 if (vrfc2.length < 6) {
	 $("#errMsgForRFC").text($("#rfcError").val());
	 $("#rfc2").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#rfc2").removeClass("error");
	 }
	 if (vrfc3.length < 3) {
	 $("#errMsgForRFC").text($("#rfcError").val());
	 $("#rfc3").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#rfc3").removeClass("error");
	 }
	 }

	 if(type=='fisica'|| type=='email' || type=='fisicaC'){
		 $("#errMsgEmail").show();
	 if ((vemail == null || vemail == '')) {

	 $("#errMsgEmail").text($("#emailEmtyError").val());
	 $("#email").addClass("error");
	 returnFlag = false;
	 } else if (vemail != null  && vecheck(vemail) == false) {
	 $("#errMsgEmail").text($("#emailFormatError").val());
	 $("#email").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgEmail").text("");
	 $("#email").removeClass("error");
	 }
	 }

	 if(type=='email1'|| type =='acreditar' ){
		 $("#errMsgEmail1").show();
	 if ((vemail1 == null || vemail1 == '')) {

	 $("#errMsgEmail1").text($("#emailEmtyError").val());
	 $("#emailId").addClass("error");
	 returnFlag = false;
	 } else if (vemail1 != null  && vecheck(vemail1) == false) {
	 $("#errMsgEmail1").text($("#emailFormatError").val());
	 $("#emailId").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgEmail1").text("");
	 $("#emailId").removeClass("error");
	 }
	 }

	 if(type=='acreditar' || type=='name')
	 {
		 $("#errMsgName").show();
	 if ((vName == null || vName == '')) {
	 $("#errMsgName").text($("#nameEmtyError").val());
	 $("#name").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgName").text("");
	 $("#name").removeClass("error");
	 }
	 }

	 if(type=='acreditar' || type=='materno')
	 {
		
		 $("#errMsgMotherName").show();
	 if ((vMaterno == null || vMaterno == '')) {
	 $("#errMsgMotherName").text($("#motherNameEmtyError").val());
	 $("#maternalastname").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgMotherName").text("");
	 $("#maternalastname").removeClass("error");
	 }
	 }


	 if(type=='acreditar' || type=='paterno')
	 {
		 $("#errMsgForLastName").show();
	 if ((vPaterno == null || vPaterno == '')) {
	 $("#errMsgForLastName").text($("#surnameNameEmtyError").val());
	 $("#lastname").addClass("error");
	 returnFlag = false;
	 } else {
	 $("#errMsgForLastName").text("");
	 $("#lastname").removeClass("error");
	 }
	 }


	 return returnFlag;
	 }

	function onlyNumbers(event) {
	 if(((event.which>47)&&(event.which<58)) || event.which == 13 || event.which == 8 || event.which == 0) return true; else return false;
	 }

	 function onlyAlfaNumerics(event){
	 var returnFlag = false;
	 // allow numbers
	 if((  ((event.which>47)&&(event.which<58)) || ((event.which>=65)&&(event.which<=90)) || ((event.which>=97)&&(event.which<=122))) || event.which == 13 || event.which == 8 || event.which == 0) returnFlag=true;
	 return returnFlag;
	 }

	 function onlyAlfabets(event){
	 var returnFlag = false;
	 // allow numbers
	 if((((event.which>=65)&&(event.which<=90)) || ((event.which>=97)&&(event.which<=122))) || event.which == 13 || event.which == 8 || event.which == 0) returnFlag=true;
	 return returnFlag;
	 }
	 
	 function onlyAlfabetsSpace(event){
		 var returnFlag = false;
		 // allow alphabest and space
		 if((((event.which>=65)&&(event.which<=90)) || ((event.which>=97)&&(event.which<=122))) || event.which == 13 || event.which == 8 || event.which == 0 ||event.which == 32) returnFlag=true;
		 return returnFlag;
		 }
	 
	
	    function onyAlphaNumericSpace(event){
			 var returnFlag = false;
			 // allow numbers
			 if((  ((event.which>47)&&(event.which<58)) || ((event.which>=65)&&(event.which<=90)) || ((event.which>=97)&&(event.which<=122))) || event.which == 13 || event.which == 8 || event.which == 0 ||event.which == 32 ) returnFlag=true;
			 return returnFlag;
		  }
	 
	 
	 
	 function addInvoice(){
		  var typeOfRFC = $("#tipoRFC").val();
		 
			if(typeOfRFC =="Moral"){
				 
				$("#razonSocial_id").show();
				$("#razon_social_label").parent().show();
				$("#razon_social_label").show();
				$("#razonSocial").show();
				$("#nombre_label").parent().hide();
				$("#ape_pat_label").parent().hide();
				$("#ape_mat_label").parent().hide();	
				$("#nombre").hide();
				$("#apellido_paterno").hide();
				$("#apellido_materno").hide();
			}else if(typeOfRFC =="Fisica") {
				$("#razon_social_label").parent().hide();
				$("#nombre_label").parent().show();
				$("#ape_pat_label").parent().show();
				$("#ape_mat_label").parent().show();
				$("#nombre").show();
				$("#apellido_paterno").show();
				$("#apellido_materno").show();
				$("#razonSocial").hide();
				$("#razonSocial_id").hide();
				}
	 }
	 
	 function vecheck(str) {
			var filter =  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		    if (!filter.test(str)) {
				return false;
			}
			return true;
		} 
