var stateClone = '';
var select1;
var select2;
$(function() {
	var onece = true;
	
	 stateClone = $('#state').find('option').clone(true);
	 select2 = $('#emptyBillingAddressFilled').detach();
	 
	 $('#alertas, .alertas, #errors, .exito, .aviso, .error, .avisos, #messagesDiv').on('click', function() {
			if($(this).is(':visible')){
			$(this).fadeOut('slow');
			} else {
			$(this).fadeIn('slow');
			}
		});
	 
	 
	 var onece = true;
	 $.fn.exists = function() {
	 return $(this).length > 0;
	 }
	 setTimeout(function(){ 
	 
	 if ($("#cvv1,#ccNo").exists()) {
		$('#ccNo').val('');
		$('#cvv1').val('');
	 }
	 
	 }, 2000);
	 
	 $("#phoneNumber,#lada,#num_int,#num_ext,#num_tarjeta,#cp,#officecodenumber,#officefonnumber,#phonenumber,#codenumber,#ccNo").on("keypress keyup blur", function(event) {
			$(this).addClass('join');
		    $(this).val($(this).val().replace(/[^\d].+/, ""));
				if ((event.which < 48 || event.which > 57)) {
		            event.preventDefault();
		        }
		    });
			
			
			 $("#cvv1,#ccNo").on("keypress keyup blur", function(event) {
				$(this).val($(this).val().replace(/[^\d].+/, ""));
				if ((event.which < 48 || event.which > 57)) {
		            event.preventDefault();
		        }
		    });

	/*	$("#name,#middlename,#paternalastname,#maternalastname,#colDescription,#delegDescription,#lastName,#firstName,#maternalName").on("keypress keyup blur", function(key) {
		    if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32)) return false;
		    });*/
		 if ($('#cp').exists()) {
			 
			 $('#cp1').focusout(function() {
			        obtainEma('cp1');
			    });
			 $('#cp').focusout(function() {
			        obtainEma('cp');
			    });
			 
				$('#cp').keyup(function(e) {
					var countriesSelect = document.getElementById('country');
					var cpValue = $('#cp').val();
					if (cpValue.length < 5) {
						$('#cp').addClass('error');
					} else {
						$('#cp').removeClass('error');
						$('#state').removeClass('error');
						$('#deleg').removeClass('error');
						$('#col').removeClass('error');

					}
						
					//Means CP is entered from shipping address page
					if (countriesSelect == null) {
						onece = false;
						if (cpValue != null && cpValue.length == 5) {
							if (document.getElementById('selectedNeighbourhood') != null) {
								$('#selectedNeighbourhood').val('');
							}
							obtainEma('cp');
						}
					} else { //Means CP is entered from billing address page
						var countryId = countriesSelect.options[countriesSelect.selectedIndex].value;
						if (countryId != "MX") {
							onece = false;
						} else {
							onece = false;
							if (cpValue != null && cpValue.length == 5) {
								obtainEma('cp');
							}
						}
					}
					if (e.keycode == 8) {
						backremove();
					}
				});
				if (onece && $('#cp').val() != "") {
					//alert('Edit');
					obtainEma('cp');

				}
			}
		 
		 
		 /*$("select").on("change",function(e){
				var value_selectbox = $( "select" ).val();
				if (value_selectbox != null){
						$(this).removeClass("error");
						e.preventDefault();
						e.stopPropagation();
				
				}
			});*/
	

});

	


function obtainEma() {
	$('#formcolorbox').show();
	$('#my_account_update_data').addClass('formloader');

	var anotherColDivElement = document.getElementById('otherNeighborhoodDiv');
	if (anotherColDivElement != null) {

		$('#otherNeighborhoodDiv').hide('slow');

	}

	var idCountry = "";
	var countriesSelect = document.getElementById('country');
	var inputCountry = document.getElementById('inputCountry');
	

	if (countriesSelect != null) {
		var countriesSelect = document.getElementById('country');
		var selectedCountryIndex = countriesSelect.selectedIndex;
		idCountry = countriesSelect.options[selectedCountryIndex].value;
	} else
	if (inputCountry != null) {

		idCountry = "MX";

	}


	//Tattwa Change - if( idCountry == "MX" && $('#oldUser').val() == 'false' ){
	if (idCountry == "MX") {
		//loadUI();

		try {
			//Tattwa Change - cleanMessagesDiv("messagesDiv");
			var codigoPostal = document.getElementById('cp');

			var cp = $.trim(codigoPostal.value);
			
			if (cp == null || cp == "") {
				console.log("cp=="+cp);
				getStates();
				var myError = new Object();
				myError.message = getServerSideMessage("postalCodeRequired");
				//Tattwa Change - Need to correct call for populating getStates() noerror
				throw (myError);
			}

			/*It validates that the zipcode is 5 characters*/
			if (cp.length != null && cp.length < 5) {

				var error = '';
				error = getServerSideMessage("postalCodeInvalidLength");

				// cleanMessagesDiv("messagesDiv");
				//Prateek:Not Working ("messagesDiv")
				showError(error, "messagesDiv");

				return;
			}

			var invalidPostalCode = getInvalidPostalcode(cp);

			if (invalidPostalCode != null) {
				var error = '';
				error = getServerSideMessage("postalCodeInvalid");

				document.getElementById('cp').value = '';

				//cleanMessagesDiv("messagesDiv");
				showError(error, "messagesDiv");

				//getStates();

				return;
			}
			
			var municipalitiesSelect = document.getElementById('deleg');
			municipalitiesSelect.length = 1;

			var neighborhoodsSelect = document.getElementById('col');
			neighborhoodsSelect.length = 1;

			var parameters = 'action=EMA&cp=' + cp;

			var action = '/tienda/m/users/sepomex/userAddressResponse.jsp';

			$.ajax({
				url: action,
				dataType: 'json',
				async: true,
				complete: showEmaResponse,
				cache: false,
				type: 'POST',
				data: parameters

			});
		} catch (err) {
			showError(err.message, "messagesDiv");
		} finally {
			window.setTimeout(function() {
				unload_UI();
			}, 2000);
			unloadUI();
		}
	}

}
function showEmaResponse(data) {
	var response = $.trim(data.responseText);
	
 
	// If the response contains HTML errors, messages are displayed.
	var errorsPosition = response.indexOf("<div class='avisos error'>")

	if (errorsPosition != -1) {
		var errorsHtml = response.substring(errorsPosition);
		var messagesDiv = document.getElementById("messagesDiv");
		messagesDiv.innerHTML += errorsHtml;
		messagesDiv.style.display = "block";
		return;
	}
	var divErrors = document.getElementById('errors');
	divErrors.innerHTML = '';
	var errors = '';
	if (response == "" || (response != null && response.indexOf("SepomexServiceIsDown") != -1) || response == null) {
		
		var populateadd = $('#populateAddress').val();
		if (populateadd == 'false' || typeof populateadd == 'undefined') {
			if ($('#cp').hasClass('join')) {
				showErrorPopup("No se obtuvieron datos");
				if (!(response != null && response.indexOf("SepomexServiceIsDown") != -1)) {
					divErrors.style.display = 'block';
					divErrors.style.background = 'rgba(255, 255, 255, 0.6)';
				}
				divErrors.innerHTML = errors;
				$("#state").html(stateClone);
				$('#stateDescription').val('');
				$('#delegDescription').val('');
				$('#colDescription').val('');
				$('#cp').removeClass('join');
				$('#delegDescription').removeClass('error');
				$('#colDescription').removeClass('error');
				$('#stateDescription').removeClass('error');
			} else {
				$('#delegDescription').removeClass('error');
				$('#colDescription').removeClass('error');
			}
		} else {
			$('#delegDescription').removeClass('error');
			$('#colDescription').removeClass('error');
		}

		if ($("#state_label") != 'undefined')
			$("#state_label").hide();
		if ($("#deleg_label") != 'undefined')
			$("#deleg_label").hide();
		if ($("#col_label") != 'undefined')
			$("#col_label").hide();
		//Prateek:commented the state hide functionality as per enhancement
		//$( "#state" ).hide();
		//$('#stateDescription').show();
		$("#deleg").hide()
		$('#delegDescription').show();
		$("#col").hide()
		$('#colDescription').show();
		$('#populateAddress').val(false);
		//Tattwa: getStates();

		var myError = new Object();
		myError.message = getServerSideMessage("noDataObtained");
		throw (myError);
	} else {
		if ($("#state_label") != 'undefined')
			$("#state_label").hide();
		if ($("#deleg_label") != 'undefined')
			$("#deleg_label").hide();
		if ($("#col_label") != 'undefined')
			$("#col_label").hide();
		if ($("#stateDescription_label") != 'undefined')
			$("#stateDescription_label").hide();
		if ($("#delegDescription_label") != 'undefined')
			$("#delegDescription_label").hide();
		if ($("#colDescription_label") != 'undefined')
			$("#colDescription_label").hide();
	}
	//Prateek:commented the state show functionality as per enhancement
	//$( "#stateDescription" ).hide()
	//$('#state').show();	
	$("#delegDescription").hide();
	$('#deleg').show();

	$("#colDescription").hide()
	$('#col').show();


	/*
	 * The response is divided into three separate parts by the pipe character
	 * '|'.
	 * The first part contains the idEstado, idMunicipio and idAsentamiento
	 * Separated by commas.
	 * The second part contains the delegations state or municipalities
	 * Separated by commas.
	 * The third part contains the colonies or settlements in the municipality or
	 * Delegation separated by commas.
	 */
	var responseParts = response.split('|');
	
	var ema = responseParts[0].split(',');
	
	var edos = responseParts[1].split(',');

	var municipalities = responseParts[2].split(',');
	var neighborhoods = responseParts[3].split(',');


	// Selected state.
	// The select of municipalities is filled with the new municipalities.
	var statesSelect = document.getElementById('state');
	console.log(statesSelect);
	statesSelect.length = 0;
	var optionSeleccionar = new Option('Seleccionar', '-1');
   // statesSelect.options.add(optionSeleccionar);

	for (var i = 0; i < edos.length; i++) {
		var edo = $.trim(edos[i]);

		if (edo != '') {
			var idAndDescription = edo.split(':');
			var option = new Option(idAndDescription[1], idAndDescription[0]);
			statesSelect.options.add(option);
		}
	}

	var stateId = ema[0];

	var statesSelect = document.getElementById('state');

	for (var i = 0; i < statesSelect.length; i++) {
		if (statesSelect.options[i].value == $('#selectedState').val()) {
			statesSelect.selectedIndex = i;
			break;
		} else if ($('#selectedState').val() == "") {
			if (statesSelect.length == 2) {
				statesSelect.selectedIndex = 1;
			} else {
				statesSelect.selectedIndex = 0;
			}
			break;
		} else if (document.getElementById('selectedState') == null) {
			if (statesSelect.length == 2) {
				statesSelect.selectedIndex = 1;
			} else {
				statesSelect.selectedIndex = 0;
			}
			break;
		} else {
			if (statesSelect.length == 2) {
				statesSelect.selectedIndex = 1;
			} else {
				statesSelect.selectedIndex = 0;
			}
		}
	}
	if ($("#state") != 'undefined' && $("#state").val() != '-1') {
		$("#state_label").hide();
		$(".statesdiv").remove();
		$("label[for='state']").parents().removeClass('has-error');
		//Bugzilla Fix:- 5006 - Start
		//$("label[for='state']").remove();
		//Bugzilla Fix:- 5006 - End
	}
	if ($("#deleg") != 'undefined' && $("#deleg").val() != '-1') {
		$("label[for='deleglabel']").parents().removeClass('has-error');
		$(".delegdes").remove();
		$("label[for='deleg']").remove();
		$("#deleg_label").hide();
	}
	if ($("#col") != 'undefined' && $("#col").val() != '-1') {
		$("label[for='collabel']").parents().removeClass('has-error');
		$(".coldes").remove();
		$("label[for='col']").remove();
		$("#col_label").hide();
	}

	// The select of municipalities is filled with the new municipalities.
	var municipalitiesSelect = document.getElementById('deleg');

	municipalitiesSelect.length = 0;
	//municipalitiesSelect.options.add(optionSeleccionar);
	for (var i = 0; i < municipalities.length; i++) {
		var municipality = $.trim(municipalities[i]);

		if (municipality != '') {
			var idAndDescription = municipality.split(':');
			var option = new Option(idAndDescription[1], idAndDescription[0]);
			municipalitiesSelect.options.add(option);
		}
	}
	// The town is selected.

	var municipalityId = ema[1];
	for (var i = 0; i < municipalitiesSelect.length; i++) {
		if (municipalitiesSelect.options[i].value == $('#selectedMunicipality').val()) {
			municipalitiesSelect.selectedIndex = i;
			break;
		}
	}
	var muncipaSelectedIndex = municipalitiesSelect.selectedIndex;
	if (muncipaSelectedIndex == 0) {
		municipalitiesSelect.selectedIndex = 0;
	}


	// The select colony is filled with new colonies.
	var neighborhoodsSelect = document.getElementById('col');

	neighborhoodsSelect.length = 0;
	//Prateek:commented code for  other colony
		//neighborhoodsSelect.options.add(optionSeleccionar);
	var optionOtra = new Option('OTRA COLONIA', '-2');
	neighborhoodsSelect.options.add(optionOtra);
	for (var i = 0; i < neighborhoods.length; i++) {
		var neighborhood = $.trim(neighborhoods[i]);

		if (neighborhood != '') {
			var idAndDescription = neighborhood.split(':');
			var option = new Option(idAndDescription[1], idAndDescription[0]);
			neighborhoodsSelect.options.add(option);
		}
	}
	// The colony is selected.
	var neighborhoodId = ema[2];
	for (var i = 0; i < neighborhoodsSelect.length; i++) {
		if (neighborhoodsSelect.options[i].value == $('#selectedNeighbourhood').val()) {
			neighborhoodsSelect.selectedIndex = i;
			break;
		}
	}

	if (neighborhoodsSelect.selectedIndex == 0) {
		neighborhoodsSelect.selectedIndex = 1;
	}
	asignaDescripcion();
}


function showError(message, divId) {

if (message == null) {
    message = "Por favor capturar C. P. correcta";
}
var errorHtml =
    "<div id='alertas'>" +
    "<div class='alertas'>" +
    "<div class='alerta error'>" +

    "<span class='icono_aviso'>" +
    "<img src='/web/images/icono_error.gif' border='0' alt=''/>" +
    "</span>" +
    message +
    "</div>" +
    "</div>" +

    "</div>";

var div = document.getElementById(divId);
div.innerHTML = errorHtml;
div.style.display = "block";
}

/*for dynamic dropdown*/
function onStateSelectionChanged() {
try {
    onStateSelectionChangedDelegate();
} catch (err) { 
    showError(err.message, "messagesDiv");
} 
}


function onStateSelectionChangedDelegate() {

// The select Wipe municipalities.
var municipalitiesSelect = document.getElementById('deleg');
municipalitiesSelect.length = 0;

// Select from the colonies were clean.
var neighborhoodsSelect = document.getElementById('col');
neighborhoodsSelect.length = 0;

var statesSelect = document.getElementById('state');
var selectedStateIndex = statesSelect.selectedIndex;
var idEstado = statesSelect.options[selectedStateIndex].value;

// If the row is selected that says "Select".
if (idEstado == '-1') {
    return;
}
var stateDescription = statesSelect.options[selectedStateIndex].text;
document.getElementById('stateDescription').value = stateDescription;

var parameters = "action=municipios&idEstado=" + idEstado;

var action = "/tienda/m/users/sepomex/userAddressResponse.jsp";

$.ajax({
    url: action,
    dataType: 'json',
    complete: showMunicipiosResponse,
    cache: false,
    type: 'POST',
    data: parameters
});
}


function showMunicipiosResponse(data) {

var respuesta = $.trim(data.responseText);
if (respuesta == "" || respuesta == null) {
    if ($("#deleg_label") != 'undefined')
        $("#deleg_label").hide();
    if ($("#col_label") != 'undefined')
        $("#col_label").hide();
    $("#deleg").hide()
    $('#delegDescription').val('');
    $('#delegDescription').show();
    $("#col").hide()
    $('#colDescription').val('');
    $('#colDescription').show();
}

// If the response contains HTML errors, messages are displayed.
var errorsPosition = respuesta.indexOf("<div class='avisos error'>")
if (errorsPosition != -1) {
    var errorsHtml = respuesta.substring(errorsPosition);
    var messagesDiv = document.getElementById("messagesDiv");
    messagesDiv.innerHTML += errorsHtml;
    messagesDiv.style.display = "block";
    return;
}

var arrayMunicipios = respuesta.split('|');
var municipios = document.getElementById('deleg');
for (var i = 0; i < arrayMunicipios.length; i++) {

    var municipio = $.trim(arrayMunicipios[i]);
    if (municipio != '') {
        var id_descripcion = municipio.split(':');
        var option = new Option(id_descripcion[1], id_descripcion[0]);
        municipios.options.add(option);

    }
}
municipios.selectedIndex = 1;

}

function unload_UI() {
$('#formcolorbox').hide();
$('#my_account_update_data').removeClass('formloader');
}

function defaultImageonCart(e,noImageUrl) {
e.src = noImageUrl;
e.onerror = "";
return true
}



/**
* Function invoked when the selection changes in the colony or select
* Settlements.
*/
function onNeighborhoodSelectionChanged() {

var colSelect = document.getElementById('col');
if( colSelect != null ){

var selectedColIndex = colSelect.selectedIndex;
var idCol = colSelect.options[selectedColIndex].value;
if( idCol != null && idCol == '-2' ){
$('#otherNeighborhoodDiv').show('slow');
$('#otherNeighborhood').val('');
}else{
$('#otherNeighborhoodDiv').hide('slow');
}

}
asignaDescripcion();
}

/** Invoked Function When the selection changes in select Municipalities. */
function onMunicipalitySelectionChanged() {

if($("#deleg").val() != null && $("#deleg").val()=='')
{
$("#col").val('');
return;
}
try {
onMunicipalitySelectionChangedDelegate();
asignaDescripcion();
} catch (err) {
showError(err.message, "messagesDiv");
} finally {
unloadUI();
}
}

function onMunicipalitySelectionChangedDelegate() {
	// The message div is cleaned.
	cleanMessagesDiv("messagesDiv");
	
	// Select from the colonies were clean.
	var neighborhoodsSelect = document.getElementById('col');
	neighborhoodsSelect.length = 1;
	
	// If there is an element with id == otherColonia, is disabled.
	var statesSelect = document.getElementById('state');
	var selectedStateIndex = statesSelect.selectedIndex;
	var idEstado = statesSelect.options[selectedStateIndex].value;

	// If the row is selected that says "Select".
	if (idEstado == '-1') {
	var myError = new Object();
	myError.message = getServerSideMessage("stateRequired");
	throw(myError);
	}


	var municipalitiesSelect = document.getElementById('deleg');
	var selectedMunicipalityIndex = municipalitiesSelect.selectedIndex;
	var idMunicipio =
	municipalitiesSelect.options[selectedMunicipalityIndex].value;

	// If the row is selected that says "Select".
	if (idMunicipio == '-1') {
	return;
	}

	var parameters = "action=asentamientos&idMunicipio=" + idMunicipio + "&idEstado=" + idEstado;

	var action = "/tienda/m/users/sepomex/userAddressResponse.jsp";

	$.ajax( { url:action,
	dataType: 'json',
	async:false,
	complete: showAsentamientosResponse,
	cache: false,
	type: 'POST',
	data: parameters
	});
	}


function showAsentamientosResponse(data) {

	var respuesta = $.trim(data.responseText);

	// If the response contains HTML errors, messages are displayed.
	var errorsPosition = respuesta.indexOf("<div class='avisos error'>")
	if (errorsPosition != -1) {
	var errorsHtml = respuesta.substring(errorsPosition);
	var messagesDiv = document.getElementById("messagesDiv");
	messagesDiv.innerHTML += errorsHtml;
	messagesDiv.style.display = "block";
	return;
	}

	var neighborhoodsSelect = document.getElementById('col');
	var arrayAsentamientos = respuesta.split('|');

	//var optionOtra = new Option('OTRA COLONIA', '-2');
	//neighborhoodsSelect.options.add(optionOtra);

	for (var i = 0; i < arrayAsentamientos.length; i++) {

	var asentamiento = $.trim(arrayAsentamientos[i]);

	if (asentamiento != '') {
	var id_descripcion = asentamiento.split(':');
	var option = new Option(id_descripcion[1], id_descripcion[0]);
	neighborhoodsSelect.options.add(option);
	}
	}


	// If there is an element with id == otherColonia ...
	if (document.getElementById("otherColonia") != null) {

	// An option to select is added.
	var option = new Option(getServerSideMessage("other"), "otro");
	neighborhoodsSelect.options.add(option);
	}
	neighborhoodsSelect.selectedIndex=2;
	window.setTimeout(function() {
	unload_UI();
	}, 6000);
	}

/**
* Clear the content of a div and hidden messages.
* Parameter messagesDivId: The message id of the div.
*/
function cleanMessagesDiv(messagesDivId) {
var messagesDiv = document.getElementById(messagesDivId);
if(messagesDiv != null){
messagesDiv.innerHTML = "";
messagesDiv.style.display = "none";
}
}

function manageBillingAddress() {
	if (document.getElementById('copyDefaultAddressCkbx').checked) {
		select1 = $('#emptyBillingAddress').detach();
		$('#billingAddressDiv').append(select2);
		document.getElementById('emptyBillingAddressFilled').style.display = 'block';
		obtainEma();
	} else {
		$('#billingAddressDiv').append(select1);
		document.getElementById('emptyBillingAddress').style.display = 'block';
		select2 = $('#emptyBillingAddressFilled').detach();
	}
}


function asignaDescripcion() {
    //Select the value of Country is taken for validation
    var countriesSelect = document.getElementById('country');
    var inputCountry = document.getElementById('inputCountry');
    //var oldUser = document.getElementById('oldUser');
    //if( oldUser != null && oldUser.value == 'false' ){
    if (countriesSelect != null) {
        //alert('document.getElementById');
        var selectedCountryIndex = countriesSelect.selectedIndex;
        var idCountry = countriesSelect.options[selectedCountryIndex].value;
        if (idCountry == 'MX') {
            //alert( "Mexico" );
            // The description of the state is stored in the hidden input.
            var statesSelect = document.getElementById('state');
            var selectedState = statesSelect.options[statesSelect.selectedIndex];
            var stateDescription = selectedState.text;
            document.getElementById('stateDescription').value = stateDescription;
            //alert( document.getElementById('stateDescription').value );

            // The description of the delegation or municipality in the hidden input is saved.
            var municipalitiesSelect = document.getElementById('deleg');
            var selectedMunicipality =
                municipalitiesSelect.options[municipalitiesSelect.selectedIndex];
            var municipalityDescription = selectedMunicipality.text;
            document.getElementById('delegDescription').value = municipalityDescription;
            //alert( document.getElementById('delegDescription').value );

            // The description of the settlement is stored in the hidden input.
            var neighborhoodsSelect = document.getElementById('col');
            var selectedNeighborhood =
                neighborhoodsSelect.options[neighborhoodsSelect.selectedIndex];
            var neighborhoodDescription = selectedNeighborhood.text;

            if (selectedNeighborhood.value == '-2') {
                var otraColonia = document.getElementById('otherNeighborhood');
                if (document.getElementById('populateAddress') != null) {
                    $('#otherNeighborhoodDiv').show('slow');
                }
                document.getElementById('colDescription').value = otraColonia.value;
            } else {
                document.getElementById('colDescription').value = neighborhoodDescription;
            }

            //alert( document.getElementById('colDescription').value );
        }
    } else if (inputCountry != null) {
        //alert('The description of the state is stored in the hidden input');
        // The description of the state is stored in the hidden input.
        var statesSelect = document.getElementById('state');
        var selectedState = statesSelect.options[statesSelect.selectedIndex];
        var stateDescription = selectedState.text;
        //alert("stateDescription"+stateDescription);
        document.getElementById('stateDescription').value = stateDescription;


        // The description of the delegation or municipality in the hidden input is saved.
        var municipalitiesSelect = document.getElementById('deleg');
        var selectedMunicipality =
            municipalitiesSelect.options[municipalitiesSelect.selectedIndex];
        var municipalityDescription = selectedMunicipality.text;
        //alert("municipalityDescription"+municipalityDescription);
        document.getElementById('delegDescription').value = municipalityDescription;


        // The description of the settlement is stored in the hidden input.
        var neighborhoodsSelect = document.getElementById('col');
        var selectedNeighborhood =
            neighborhoodsSelect.options[neighborhoodsSelect.selectedIndex];
        var neighborhoodDescription = selectedNeighborhood.text;
        // alert("neighborhoodDescription"+neighborhoodDescription);

        if (selectedNeighborhood.value == '-2') {
            var otraColonia = document.getElementById('otherNeighborhood');
            if (document.getElementById('populateAddress') != null) {
                $('#otherNeighborhoodDiv').show('slow');
            }
            document.getElementById('colDescription').value = otraColonia.value;

        } else {
            document.getElementById('colDescription').value = neighborhoodDescription;
        }


    }
    //}
    window.setTimeout(function() {
        unload_UI();
    }, 6000);

}



var messages = new Array();
function getServerSideMessage(key) {
		for (var i = 0; i < messages.length; i++) {
			var message = messages[i];

			if (message.key == key) {
				return message.value;
			}
		}

		return null;
	}
	var invalidPostalCodes = new Array();


function getInvalidPostalcode(key) {
    for (var i = 0; i < invalidPostalCodes.length; i++) {
        var message = invalidPostalCodes[i];

        //alert( "key :: " + key + " message.key :: " + message.key + " message.value :: "  +  message.value );

        if (message.value == key) {
            return message.value;
        }
    }

    return null;
}

function getStates() {


    var parameters = "action=estados";

    var action = "/tienda/m/users/sepomex/userAddressResponse.jsp";

    $.ajax({
        url: action,
        dataType: 'json',
        async: true,
        complete: showEstadosResponse,
        cache: false,
        type: 'POST',
        data: parameters
    });

}
function showEstadosResponse(data) {
    var respuesta = $.trim(data.responseText);
    // If the response contains HTML errors, messages are displayed.
    var errorsPosition = respuesta.indexOf("<div class='avisos error'>");
    if (errorsPosition != -1) {
        var errorsHtml = respuesta.substring(errorsPosition);
        var messagesDiv = document.getElementById("messagesDiv");
        messagesDiv.innerHTML += errorsHtml;
        messagesDiv.style.display = "block";
        return;
    }

    var stateSelect = document.getElementById('state');
    stateSelect.length = 0;
    var arrayEstados = respuesta.split('|');

    var optionSeleccionar = new Option('Seleccionar', '-1');
    stateSelect.options.add(optionSeleccionar);


    for (var i = 0; i < arrayEstados.length; i++) {

        var estado = $.trim(arrayEstados[i]);
        if (estado != '') {
            var id_descripcion = estado.split(':');
            var option = new Option(id_descripcion[1], id_descripcion[0]);
            stateSelect.options.add(option);
        }
    }

    // clean the select option from the text box.
    var municipalitiesSelect = document.getElementById('deleg');
    municipalitiesSelect.length = 0;
    var optionSeleccionar = new Option('Seleccionar', '-1');
    municipalitiesSelect.options.add(optionSeleccionar);

    // clean the select option from the text box.
    var neighborhoodsSelect = document.getElementById('col');
    neighborhoodsSelect.length = 0;
    var optionSeleccionar = new Option('Seleccionar', '-1');
    neighborhoodsSelect.options.add(optionSeleccionar);
}
function backremove() {
    if (cpValue.length < 4) {
        $('#cp').addClass('error');
    } else {
        $('#cp').removeClass('error');
        $('#state').removeClass('error');
        $('#deleg').removeClass('error');
        $('#col').removeClass('error');

    }

}

function showErrorPopup(msg){
	$('#error-alert-popup-text').html(msg);
	$('#myModalAlertError').modal();
}

/* START : LP PA Site Redesign for CP country dropdown HYD team *
* Function call on country dropdown changed and validate if selected country is other than Mexico
* than allow the user to fill data in text field and hide the dropdown of state,municipility etc
*/

function onCountrySelectionChanged() {

//check whether the page is edit credit card or new acredit card
//if edit then no need to clear the value
var creditCardPageType=document.getElementById('creditCardPageType');

if(creditCardPageType!=null && creditCardPageType.value == 'addCreditCardPage' )
{
$('#delegDescription').val('');
$('#deleg').val('');
$('#stateDescription').val('');
$('#state').val('');
$('#colDescription').val('');
$('#col').val('');
}
else
{
window.setTimeout(function() {
unload_UI();
}, 1000);
//unloadUI();
}
var countriesSelect = document.getElementById('country');
var countryId = countriesSelect.options[countriesSelect.selectedIndex].value;

if( countryId == "MX" ){
$('#delegDescription').hide('slow');
$('#stateDescription').hide('slow');
$('#colDescription').hide('slow');

$('#deleg').show('slow');
$('#state').show('slow');
$('#col').show('slow');

} else {
$('#deleg').hide('slow');
$('#state').hide('slow');
$('#col').hide('slow');
$('#delegDescription').show('slow');
$('#colDescription').show('slow');
$('#stateDescription').show('slow');
}
}
/* END : LP PA Site Redesign for CP country dropdown HYD team */