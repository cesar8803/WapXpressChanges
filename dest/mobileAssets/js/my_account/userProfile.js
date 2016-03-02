jQuery(document).ready(function($) {
var onece = true;

//if ( $('#cp').exists() ) {
$('#cp').focusout(function(){
var countriesSelect = document.getElementById('country');
//Means CP is entered from shipping address page
if(countriesSelect==null){
onece = false;
obtainEma('cp');
}
else{ //Means CP is entered from billing address page
var countryId = countriesSelect.options[countriesSelect.selectedIndex].value;
if (countryId != "MX" )
{
onece = false;
}
else{
onece = false;
obtainEma('cp');
}
}
});
if (onece && $('#cp').val() != "") {
obtainEma('cp');

}

// }

$('#cp1').focusout(function(){
obtainEma('cp1');
});
var countriesSelect1 = document.getElementById('country');
if(countriesSelect1!=null)
{
onCountrySelectionChanged();
}
// Added code for adding new address while generating  Invoice 
if ($('#tipoRFC').exists()) {
	 var typeOfRFC = $("#tipoRFC").val();
	 
		if(typeOfRFC =="Moral"){
			 razon_social_label
			$("#razonSocial_id").show();
			$("#razon_social_label").show();
			$("#razonSocial").show();
			$("#nombre_label").parent().hide();
			$("#ape_pat_label").parent().hide();
			$("#ape_mat_label").parent().hide();	
			$("#nombre").hide();
			$("#apellido_paterno").hide();
			$("#apellido_materno").hide();
		}else if(typeOfRFC =="Fisica") {
			$("#razon_social_label").hide();
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

});

function solonum (cosa)
{
return cosa.value.replace(/\D/gi,"");
}

/** Array containing the messages that will be used in JavaScript. */
var messages = new Array();

var invalidPostalCodes = new Array();

/**
* Register a zipcode server side to be used in the
* Client side.
* @ Param key The key of the message.
* @ Param value The value of the message.
*/
function addInvalidPostalcode(key, value) {
var message = new Object();
message.key = key;
message.value = value;

invalidPostalCodes.push(message);
}

/**
* Returns an Invalid zipcode that was recorded on the server side to be used in
* The client side.
* @ Param key The key of the message.
* @ Return The value of the message.
*/
function getInvalidPostalcode(key) {
for (var i = 0; i < invalidPostalCodes.length; i++) {
var message = invalidPostalCodes[i];
if (message.value == key) {
return message.value;
}
}

return null;
}

/**
* Register a message from the server side to be used in the
* Client side.
* @ Param key The message key.
* @ Param value The value of the message.
*/
function addServerSideMessage(key, value) {
var message = new Object();
message.key = key;
message.value = value;

messages.push(message);
}

/**
* Returns a message that was recorded on the server side to be used in
* The client side.
* @ Param key The key of the message.
* @ Return The value of the message.
*/
function getServerSideMessage(key) {
for (var i = 0; i < messages.length; i++) {
var message = messages[i];

if (message.key == key) {
return message.value;
}
}

return null;
}


////////////////////////////////////////////////////////////////////////////////

/**
* Gets the messages recorded on an input error, and adds them to a div.
* Parameter errorsHtmlInputId: The id of the HTML input containing the
* Error messages.
* Parameter messagesDivId: The id of the div where the messages will be added.
*/
function showErrors(errorsHtmlInputId, messagesDivId) {

var errorsHtmlInput = document.getElementById(errorsHtmlInputId);

if (errorsHtmlInput == null) {
return;
}

if ((errorsHtmlInput.value == null) || (errorsHtmlInput.value == "")) {
return;
}

var messagesDiv = document.getElementById(messagesDivId);
messagesDiv.innerHTML += errorsHtmlInput.value;
messagesDiv.style.display = "block";
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


/**
* Displays an error message in a div.
* @ Param message The error message.
* @ Param divId The identifier of the div where the message will be written.
*/
function showError(message, divId) {
if(message == null ) {
message = "Por favor capturar C. P. correcta" ;
}
var errorHtml =
"<div id='alertas'>" +
"<div class='alertas'>" +
"<div class='alerta error'>" +

"<span class='icono_aviso'>" +
"" +
"</span>" +
"<p style='color:#FF0505; padding-left: 10px;'>"+message + "</p>" +
"</div>" +
"</div>" +

"</div>";

var div = document.getElementById(divId);
div.innerHTML = errorHtml;
div.style.display = "block";
}

/** Function invoked when the selection changes in select states. */
function onStateSelectionChanged() {

//loadUI();

try {
onStateSelectionChangedDelegate();
asignaDescripcion();

} catch (err) {
showError(err.message, "messagesDiv");
} finally {
unloadUI();
}
}


function getStates(){


var parameters = "action=estados";

var action = "/tienda/m/users/sepomex/userAddressResponse.jsp";

$.ajax( { url:action,
dataType: 'json',
async:true,
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
 
for (var i = 0; i < arrayEstados.length; i++) {

var estado = $.trim(arrayEstados[i]);
if (estado != '') {
var id_descripcion = estado.split(':');
var option = new Option(id_descripcion[1], id_descripcion[0]);
stateSelect.options.add(option);
}
}

var municipalitiesSelect = document.getElementById('deleg');
municipalitiesSelect.length = 0;
// Select from the colonies were clean.
var neighborhoodsSelect = document.getElementById('col');
neighborhoodsSelect.length = 0;
var optionSeleccionar = new Option('Seleccionar', '-1');
neighborhoodsSelect.options.add(optionSeleccionar);
}

function onStateSelectionChangedDelegate() {
cleanMessagesDiv("messagesDiv");

// The select Wipe municipalities.
var municipalitiesSelect = document.getElementById('deleg');
municipalitiesSelect.length = 0;

// Select from the colonies were clean.
var neighborhoodsSelect = document.getElementById('col');
neighborhoodsSelect.length = 1;

var statesSelect = document.getElementById('state');
var selectedStateIndex = statesSelect.selectedIndex;
var idEstado = statesSelect.options[selectedStateIndex].value;

// If the row is selected that says "Select".
if (idEstado == '-1') {
return;
}

var parameters = "action=municipios&idEstado=" + idEstado;

var action = "/tienda/m/users/sepomex/userAddressResponse.jsp";

$.ajax( { url:action,
dataType: 'json',
async:true,
complete: showMunicipiosResponse,
cache: false,
type: 'POST',
data: parameters
});
}

function showMunicipiosResponse(data) {

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
municipios.selectedIndex=0;

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


function obtainEma() {
$('#formcolorbox').show();
$('#my_account_update_data').addClass('formloader');

var anotherColDivElement = document.getElementById('otherNeighborhoodDiv');
if( anotherColDivElement != null ){

$('#otherNeighborhoodDiv').hide('slow');

}

var idCountry = "";
var countriesSelect = document.getElementById('country');
var inputCountry = document.getElementById('inputCountry');

if( countriesSelect != null ){
var countriesSelect = document.getElementById('country');
var selectedCountryIndex = countriesSelect.selectedIndex;
idCountry = countriesSelect.options[selectedCountryIndex].value;
} else
if( inputCountry != null ){

idCountry = "MX";


}


//Tattwa Change - if( idCountry == "MX" && $('#oldUser').val() == 'false' ){
if( idCountry == "MX" ){
//loadUI();

try {
//Tattwa Change -
cleanMessagesDiv("messagesDiv");

var codigoPostal = document.getElementById('cp');

var cp = $.trim(codigoPostal.value);
if ( cp == null || cp == "" ) {

getStates();
var myError = new Object();
myError.message = getServerSideMessage("postalCodeRequired");
//Tattwa Change - Need to correct call for populating getStates() noerror
throw(myError);
}

/*It validates that the zipcode is 5 characters*/
if( cp.length != null && cp.length < 5 ){

var error = '';
error = getServerSideMessage("postalCodeInvalidLength");

cleanMessagesDiv("messagesDiv");
//Prateek:Not Working ("messagesDiv")
showError(error, "messagesDiv");

return;
}

var invalidPostalCode = getInvalidPostalcode(cp);

if( invalidPostalCode != null ){
var error = '';
error = getServerSideMessage("postalCodeInvalid");

document.getElementById('cp').value = '';

cleanMessagesDiv("messagesDiv");
showError(error, "messagesDiv");

//getStates();

return;
}

var municipalitiesSelect = document.getElementById('deleg');
municipalitiesSelect.length = 0;

var neighborhoodsSelect = document.getElementById('col');
neighborhoodsSelect.length = 1;

var parameters = 'action=EMA&cp=' + cp;

var action = '/tienda/m/users/sepomex/userAddressResponse.jsp';
$.ajax({
url:action,
dataType: 'json',
async:true,
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
//Prateek:show/hide alert error overlay when enters invalid cp
var divErrors = document.getElementById('errors');
//divErrors.innerHTML = '';
var errors= '';
//alert(response);
if (response == "" || response == null) {
var populateadd=$('#populateAddress').val();
// alert(populateadd);
if (populateadd == 'false' || typeof populateadd =='undefined' )
{
if( $('#cp').hasClass('join')){
lpobj.showCompareError();
$('#stateDescription').val('');
$('#delegDescription').val('');
$('#colDescription').val('');
$('#cp').removeClass('join');
$('#delegDescription').addClass('error');
$('#colDescription').addClass('error');
}else
{
$('#delegDescription').removeClass('error');
$('#colDescription').removeClass('error');
}
}else
{
$('#delegDescription').removeClass('error');
$('#colDescription').removeClass('error');
}


$( "#state" ).hide();
$('#stateDescription').show();
$( "#deleg" ).hide()
$('#delegDescription').show();
$( "#col" ).hide()
$('#colDescription').show();
$('#populateAddress').val(false);
//Tattwa: getStates();

var myError = new Object();
myError.message = getServerSideMessage("noDataObtained");
throw(myError);
}else{
var errors= '';
//divErrors.innerHTML = errors;
}


$( "#stateDescription" ).hide()
$('#state').show();
$( "#delegDescription" ).hide( );
$('#deleg').show();

$( "#colDescription" ).hide()
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

statesSelect.length = 0;

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
statesSelect.selectedIndex = 0;
break;
}
}
// The select of municipalities is filled with the new municipalities.
var municipalitiesSelect = document.getElementById('deleg');


 municipalitiesSelect.length = 0;
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
if (muncipaSelectedIndex == 0)
{
municipalitiesSelect.selectedIndex = 0;
}


// The select colony is filled with new colonies.
var neighborhoodsSelect = document.getElementById('col');

neighborhoodsSelect.length = 0;
//Prateek:commented code for other colony
//var optionSeleccionar = new Option('Seleccionar', '-1');
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
//alert('---'+neighborhoodsSelect.options[i].value);
if (neighborhoodsSelect.options[i].value == $('#selectedNeighbourhood').val()) {
neighborhoodsSelect.selectedIndex = i;
break;
}
}

if (neighborhoodsSelect.selectedIndex == 0)
{
neighborhoodsSelect.selectedIndex = 1;
}
asignaDescripcion();
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



function loadUI(){
try
{
$.blockUI({
message: '<img src="/web/images/indicator.gif"/>',
css: {

border: 'none',
padding: '15px',
backgroundColor: '#fff',
'-webkit-border-radius': '10px',
'-moz-border-radius': '10px',
opacity: .5,
color: '#fff'
}

});
}catch(err){
alert("Error: " + err.message);
}
}

function unloadUI(){
$.unblockUI();
return false;
}
function unload_UI(){
//alert('settimeout');
$('#formcolorbox').hide();
$('#my_account_update_data').removeClass('formloader');
}

function resetSepomex(){
getStates();
}

function asignaDescripcion() {
//Select the value of Country is taken for validation
var countriesSelect = document.getElementById('country');
var inputCountry = document.getElementById('inputCountry');
//alert('inputCountry '+inputCountry);
//var oldUser = document.getElementById('oldUser');
//if( oldUser != null && oldUser.value == 'false' ){
if( countriesSelect != null ){
var selectedCountryIndex = countriesSelect.selectedIndex;
var idCountry = countriesSelect.options[selectedCountryIndex].value;
if( idCountry == 'MX' ){
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

if( selectedNeighborhood.value == '-2' ){
var otraColonia = document.getElementById('otherNeighborhood');
document.getElementById('colDescription').value = otraColonia.value;
}else{
document.getElementById('colDescription').value = neighborhoodDescription;
}

//alert( document.getElementById('colDescription').value );
}
} else if( inputCountry != null ){
//alert('The description of the state is stored in the hidden input');
// The description of the state is stored in the hidden input.
var statesSelect = document.getElementById('state');
var selectedState = statesSelect.options[statesSelect.selectedIndex];
var stateDescription = selectedState.text;
document.getElementById('stateDescription').value = stateDescription;


// The description of the delegation or municipality in the hidden input is saved.
var municipalitiesSelect = document.getElementById('deleg');
var selectedMunicipality =
municipalitiesSelect.options[municipalitiesSelect.selectedIndex];
var municipalityDescription = selectedMunicipality.text;
document.getElementById('delegDescription').value = municipalityDescription;


// The description of the settlement is stored in the hidden input.
var neighborhoodsSelect = document.getElementById('col');
var selectedNeighborhood =
neighborhoodsSelect.options[neighborhoodsSelect.selectedIndex];
var neighborhoodDescription = selectedNeighborhood.text;

if( selectedNeighborhood.value == '-2' ){
var otraColonia = document.getElementById('otherNeighborhood');
document.getElementById('colDescription').value = otraColonia.value;

}else{
document.getElementById('colDescription').value = neighborhoodDescription;
}


}
//}
window.setTimeout(function() {
unload_UI();
}, 6000);

}

/**
* Function call on country dropdown changed and validate if selected country is other than Mexico
* than allow the user to fill data in text field nad hide the dropdown of state,municipility etc
*/

function onCountrySelectionChanged(){

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


$(document).on('change','.default_shipping_address',function(){
$.ajax({
type : "POST",
cache : false,
url : "/tienda/m/users/frag/makeDefaultAddress.jsp?addressId="+$(this).attr('id'),
data : $(this).serializeArray(),
success : function(data) {
location.reload(true);
}
});
return false;
});
function addSocial(){
  var typeOfRFC = $("#tipoRFC").val();
 
	if(typeOfRFC =="Moral"){
		 razon_social_label
		$("#razonSocial_id").show();
		$("#razon_social_label").show();
		$("#razonSocial").show();
		$("#nombre_label").parent().hide();
		$("#ape_pat_label").parent().hide();
		$("#ape_mat_label").parent().hide();	
		$("#nombre").hide();
		$("#apellido_paterno").hide();
		$("#apellido_materno").hide();
	}else if(typeOfRFC =="Fisica") {
		$("#razon_social_label").hide();
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
