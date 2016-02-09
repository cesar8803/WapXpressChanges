/**
* Llamada por el control del boton "Enviar";
* Realiza previamente las validaciones sobre los campos obligatorios y sus respectivos formatos,
* Envia la peticion al servidor para procesar la informacion.
*
* It is called by the event onclick in the control button named "Enviar"
* It does all the early validations through of submitForm() method and after that if everythings
* is ok it sends the request to the server.
*/
function sendForm() {
var login = document.getElementById('login1');
var password = document.getElementById('passwordInput');
//var confirmPass = document.getElementById('confirmPassword');
var firstName = document.getElementById('firstName');
var paternalName = document.getElementById('paternalName');
var maternalName = document.getElementById('maternalName');
var chkTerminos = document.getElementById('terminos');
var divErrors = document.getElementById('errors');
var bMonth = document.getElementById('my_account_born_month');
var bYear = document.getElementById('my_account_born_year');
var days = document.getElementById('my_account_born_day');
var d= days.value;
var yr=bYear.value;
var mnth=bMonth.value;
divErrors.innerHTML = '';
var foundErrors = false;
var errors = '';
var errors1 = '';
var fixday=31;
var regexp = /^[a-zA-Z\-\']*$/;

if( login != null && login.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#reqFieldError").val()+"</div>";
foundErrors = true;
}
else if( password != null && password.value.length < 1){

errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#reqFieldError").val()+"</div>";
foundErrors = true;
}
else if( password != null && password.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#pwdLengthError").val()+"</div>";
foundErrors = true;
}

else if( firstName == null || firstName.value.length < 1 ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#nameValidError").val()+"</div>";
foundErrors = true;
}
else if(! regexp.test(firstName.value) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span> "+$("#nameValidError").val()+"</div>";
foundErrors = true;
}
else if(! regexp.test(paternalName.value) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#nameValidError").val()+"</div>";
foundErrors = true;
}
else if(! regexp.test(maternalName.value) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#nameValidError").val()+"</div>";
foundErrors = true;
}
else if( paternalName == null || paternalName.value.length < 1 ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#reqFieldError").val()+"</div>";
foundErrors = true;
}
/*
else if(!document.getElementsByName("gender")[0].checked && !document.getElementsByName("gender")[1].checked)
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#reqFieldError").val()+"</div>";
foundErrors = true;
}

else if( chkTerminos != null && chkTerminos.checked==false )
{

errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#termConditionError").val()+"</div>";
foundErrors = true;
}
*/
else if((d=="" || d==null) || (mnth=="" || mnth==null) || (yr==""||yr==null))
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#DOBError").val()+"</div>";
foundErrors = true;
}
else if(mnth==2)
{


if((yr%400)==0 ||((yr%4)==0 && (yr%100)!=0))
{
fixday=29;
if(d>fixday)
{

errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#DOBError").val()+"</div>";
foundErrors = true;
}
}
else
{
fixday=28;
if(d>fixday)
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#DOBError").val()+"</div>";
foundErrors = true;
}
}
}
else if (mnth == 4 ||mnth == 6 ||mnth == 9 ||mnth == 11)
{

fixday=30;
if(d>fixday)
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#DOBError").val()+"</div>";
foundErrors = true;
}
}


else
{
/*
if(!foundErrors )
{
if( !echeck( login.value ) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>El correo electrónico no es válido. Favor de verificarlo.</div>";
foundErrors = true;
}
}
*/
}




if( foundErrors ){

divErrors.style.display='block';
divErrors.innerHTML = errors;
//_gaq.push(['_trackPageview','/ga/registro_sitio/error/' + errors1 ]);
return false;
}
else{
//checkPromos();
document.registerForm.submit();
}


}

/**
* Verifica que el argumento 'str' tenga la estructura de una direccion de correo electronico valida.
*/
function echeck(str) {
var at="@"
var dot="."
var lat=str.indexOf(at)
var lstr=str.length
var ldot=str.indexOf(dot)
if (str.indexOf(at)==-1){
// alert("Invalid E-mail ID")
return false
}

if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
// alert("Invalid E-mail ID")
return false
}

if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
// alert("Invalid E-mail ID")
return false
}

if (str.indexOf(at,(lat+1))!=-1){
// alert("Invalid E-mail ID")
return false
}

if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
// alert("Invalid E-mail ID")
return false
}

if (str.indexOf(dot,(lat+2))==-1){
// alert("Invalid E-mail ID")
return false
}

if (str.indexOf(" ")!=-1){
// alert("Invalid E-mail ID")
return false
}

return true
}


function clearErrorSection(){
var divErrors = document.getElementById('errors');
divErrors.innerHTML = '';
divErrors.style.display='none';
}

function updatelogin()
{
var link = document.getElementById('forgotlink');
link.href =link.href+"?login="+document.getElementById('login').value;
}
/**
* It is called by the event onclick in the control button named "Entrar" from login page
* It does all the early validations through of submitForm() method and after that if everything
* is ok it sends the request to the server.
*/
function validateLoginForm() {

var login = document.getElementById('login');
var password = document.getElementById('pass');
var divErrors = document.getElementById('errors');
var foundErrors = false;
var errors = '';

if(login.value.length < 1 && password.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#emptyEmailAndPWDError").val()+"</div>";
foundErrors = true;
}
else if( login == null || login.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#emptyEmailError").val()+"</div>";
foundErrors = true;
}
else if( password == null || password.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#emptyPasswordError").val()+"</div>";
foundErrors = true;
}
else if( password != null && password.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#passwordLength_Not_8Error").val()+"</div>";
foundErrors = true;
}
else
{
if( !echeck( login.value ) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#inValidEmailFormatError").val()+"</div>";
foundErrors = true;
}

}
if( foundErrors ){

divErrors.style.display='block';
divErrors.innerHTML = errors;
login.value='';
password.value='';
return false;
}
else
{
document.login_form.submit();
}
}


/** functions for Agent Login Starts
* It is called by the event onclick in the control button named "Entrar" from "Agent login" page
* It does all the early validations through of submitForm() method and after that if everything
* is ok it sends the request to the server.
*/
function validateAgentLoginForm() {
var login = document.getElementById('login');
var password = document.getElementById('pass');
var divErrors = document.getElementById('errors');
var foundErrors = false;
var errors = '';

if( login == null || login.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Por favor captura un valor para el campo 'Correo Electrónico'.</div>";
foundErrors = true;
}
else if( password == null || password.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Por favor captura un valor para el campo 'Contraseña'.</div>";
foundErrors = true;
}
else if( password != null && password.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>Tu contraseña debe contener al menos 8 caracteres.</div>";
foundErrors = true;
}
else
{
if( !echeck( login.value ) ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>El correo electrónico no es válido. Favor de verificarlo.</div>";
foundErrors = true;
}

}
if( foundErrors ){

divErrors.style.display='block';
divErrors.innerHTML = errors;
login.value='';
password.value='';
return false;
}
else
{
document.login_form.submit();
}


}

function updateAgentlogin()
{
var link = document.getElementById('forgotlink');
link.href =link.href+"?login="+document.getElementById('login').value;
}



/**
* Validation for change password field.
*/
function agentChangePassword(){
var oldPassword = document.getElementById('oldPassword');
var newPassword = document.getElementById('newPassword');
var confirmPassword = document.getElementById('confirmPassword');
var divErrors = document.getElementById('errors');
divErrors.innerHTML = '';
var foundErrors = false;
var errors = '';

if( oldPassword == null || oldPassword.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Existen campos obligatorios sin información. Favor de ingresar los datos marcados con *.</div>";
foundErrors = true;
}
else if( oldPassword != null && oldPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>Tu contraseña debe contener al menos 8 caracteres.</div>";
foundErrors = true;
}
else if( newPassword != null && newPassword.value.length < 1 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Existen campos obligatorios sin información. Favor de ingresar los datos marcados con *.</div>";
foundErrors = true;
}
else if( newPassword != null && newPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Tu contraseña debe contener al menos 8 caracteres.</div>";
foundErrors = true;
}
else if( confirmPassword != null && confirmPassword.value.length < 1 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Existen campos obligatorios sin información. Favor de ingresar los datos marcados con *.</div>";
foundErrors = true;
}
else if( confirmPassword != null && confirmPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>Tu contraseña debe contener al menos 8 caracteres.</div>";
foundErrors = true;
}
else if( newPassword != null && confirmPassword != null){
var matchPass = newPassword.value == confirmPassword.value;
if( !matchPass ){
errors = errors + "<div class='aviso'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>La contraseña y su confirmación son diferentes .Por favor intenta nuevamente.</div>";
foundErrors = true;
}
}

if( foundErrors ){
divErrors.style.display='block';
divErrors.innerHTML = errors;
oldPassword.value='';
newPassword.value='';
confirmPassword.value='';
return false;
}
else{
document.form_guest_personal_data.submit();
}
}


/**
* Functions for Agent Login Ends
*/
/**
* Validation for forgot password email address , not be null when user click the button .
*/
function forgotPasswordEmail(){
var email = document.getElementById('email');
var divErrors = document.getElementById('errors');
divErrors.innerHTML = '';
var foundErrors = false;
var errors = '';

if( email == null || email.value.length < 1 ){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#nullEmail").val()+"</div>";
foundErrors = true;
}
if( foundErrors ){
divErrors.style.display='block';
divErrors.innerHTML = errors;
return false;
}
else{
//checkPromos();
document.registerForm.submit();
}
}

/**
* Validation for change password field.
*/
function changePassword(){
var oldPassword = document.getElementById('oldPassword');
var newPassword = document.getElementById('newPassword');
var confirmPassword = document.getElementById('confirmPassword');
var divErrors = document.getElementById('errors');
divErrors.innerHTML = '';
var foundErrors = false;
var errors = '';

if( oldPassword == null || oldPassword.value.length < 1){
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#missingOldPassword").val()+"</div>";
foundErrors = true;
}
else if( oldPassword != null && oldPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#oldPasswordLength").val()+"</div>";
foundErrors = true;
}
else if( newPassword != null && newPassword.value.length < 1 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#emptyNewPassword").val()+"</div>";
foundErrors = true;
}
else if( newPassword != null && newPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#newPasswordLength").val()+"</div>";
foundErrors = true;
}
else if( confirmPassword != null && confirmPassword.value.length < 1 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#emptyConfirmPassword").val()+"</div>";
foundErrors = true;
}
else if( confirmPassword != null && confirmPassword.value.length < 8 )
{
errors = errors + "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt='' /></span>"+$("#confirmPasswordLength").val()+"</div>";
foundErrors = true;
}
else if( newPassword != null && confirmPassword != null){
var matchPass = newPassword.value == confirmPassword.value;
if( !matchPass ){
errors = errors + "<div class='aviso'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#unmatchingPassword").val()+"</div>";
foundErrors = true;
}
}

if( foundErrors ){
divErrors.style.display='block';
divErrors.innerHTML = errors;
oldPassword.value='';
newPassword.value='';
confirmPassword.value='';
return false;
}
else{
document.form_guest_personal_data.submit();
}
}

/**
* Validation for select/unselect all option in account preference page .
*/
checked =false;
function checkAll(acc_preferences){
var checkboxes = new Array();
checkboxes = document.forms[acc_preferences].getElementsByTagName('input');
if(checked == true){
checked = false;
} else {
checked = true;
}
for(var i=0; i<checkboxes.length; i++)
if(checkboxes[i].type == 'checkbox'){
checkboxes[i].checked=checked;
}
}
/*
* The given method is used in phone registration page for body reloading purpose.
* And will set some values in url for modification purpose.
*/
function fillAmount(v_service,vPageName){

vPhoneNService = '';
var vPhoneNumber = $("#registerPhoneNumber").val();
var vPhoneOwner = $("#registeredPhoneOwnerName").val();
var vPhoneId = $("#id").val();
var vAirTimeSku = $("#airTimeSKU").val();

vUrl = vPageName+'?vService='+v_service;
// ISSUE FIXING FOR 401
var vnewNumber = $("#newNumber").val();
var vnewOwner = $("#newOwner").val();

if(vnewNumber != undefined && vnewNumber != vPhoneNumber){
// alert(vnewNumber);
vPhoneNService = vPhoneNService +'&vPhoneNumber='+vPhoneNumber;
}

if(vnewOwner != undefined && vnewOwner != vPhoneOwner){
vPhoneNService = vPhoneNService +'&vShortname='+vPhoneOwner;
}
// ISSUE FIXING FOR 401
if(vPhoneNumber !=null && vPhoneNumber != '' && (vPhoneId == null || vPhoneId == ''))
{
vPhoneNService = vPhoneNService+'&phoneNumber='+vPhoneNumber;
}

if(vPhoneOwner !=null && vPhoneOwner != '' && (vPhoneId == null || vPhoneId == ''))
{
vPhoneNService = vPhoneNService+'&shortname='+vPhoneOwner;
}

if(vPhoneId !=null && vPhoneId != '')
{
vPhoneNService = vPhoneNService+'&id='+vPhoneId;
}

self.location = vUrl + vPhoneNService;
}

/*
* The given function is used in phone registration page for validating the mandatory fields.
* El Teléfono es requerido = Phone is required
* El Nombre es requerido = Name is required
*/
function validatePhoneFields(){
var vPhoneNumber = $("#registerPhoneNumber").val();
var vPhoneOwner = $("#registeredPhoneOwnerName").val();
var returnFlag = true;
// MODIFIED FOR KNOWN ISSUE
var vAirTimeSKU = $("#airTimeSKU").val();
if(vAirTimeSKU == '' || vAirTimeSKU == null){
$("#msgAirTimeSKU").text($("#montoError").val());
returnFlag = false;
}else{
$("#msgAirTimeSKU").text("");
}
// MODIFIED FOR KNOWN ISSUE
if(vPhoneNumber == '' || vPhoneNumber == null){
$("#msgPhoneNumber").text($("#numberError").val());
$("#registerPhoneNumber").addClass("error");
returnFlag = false;
}else if(vPhoneNumber.length != 10){
$("#msgPhoneNumber").text($("#numberError").val());
$("#registerPhoneNumber").addClass("error");
returnFlag = false;
}else{
$("#msgPhoneNumber").text("");
$("#registerPhoneNumber").removeClass("error");
}
if(vPhoneOwner == '' || vPhoneOwner == null){
$("#msgPhoneOwner").text($("#nameError").val());
$("#registeredPhoneOwnerName").addClass("error");
returnFlag = false;
}else{
$("#msgPhoneOwner").text("");
$("#registeredPhoneOwnerName").removeClass("error");
}

return returnFlag;

}

/*
* Phone field entry
*/
function allowNumericalValuesOnly(evt)
{
var charCode = (evt.which) ? evt.which : event.keyCode;
if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
return false;
return true;
}

/*
* Method for submit the add default card functionality
* and check if checkbox is selected then submit the data
*
*/
function addDefaultCard(defaultCardId)
{
var defaultCardIdForm=defaultCardId.id+"SelectForm";
var defaultCheckBox = document.getElementById(defaultCardId.id).checked;
if(defaultCheckBox)
{
document.getElementById(defaultCardIdForm).submit();
}
}


//***** Start : validation for checkbox at invoice page.
function validateCheckBoxValue(fieldName){
var vReturnVal = $("input[name="+fieldName+"]:checked").is(":checked");
if (!vReturnVal || $("input[name="+fieldName+"]:checked").hasClass('radio_disable'))
{
vReturnVal=false;
var divErrors = document.getElementById('errors');
errors = "<div class='alerta error'><span class='icono_aviso'></span>"+$("#selectInvoiceError").val()+"</div>";
divErrors.style.display='block';
divErrors.innerHTML = errors;
}

return vReturnVal;
}

//***** End : validation for checkbox at invoice page.

//***** End : validation for checkbox at invoice page.

/* //***** Start : validation for invoice add new address page.

* The given function is used in Add E-Invoicing Address for validating the mandatory fields.
* El RFC es requerido. = The RFC is required
* El Nombre es requerido. = Name is required
* El Apellido Paterno es requerido = The Father's name is required
* El Código Postal es requerido = The Postal Code is required
* El Estado es requerido = The State is required
* El Municipio es requerido = The Municipality is required
* La Colonia es requerida = La Colonia is required
* La Calle es requerida = Street is required
* El Número Externo es requerido = The External Number is required

function chkInvoiceAddrDetail(){
var vrfc1 = $("#rfc1").val();
var vrfc2 = $("#rfc2").val();
var vrfc3 = $("#rfc3").val();
var vname = $("#name").val();
var vfathersName = $("#fathersName").val();
var vcp = $("#cp").val();
var vstate = $("#state").val();
var vdeleg = $("#deleg").val();
var vcol = $("#col").val();
var vstreet = $("#street").val();
var vnumberOutdoor = $("#numberOutdoor").val();
var returnFlag = true;

v_state_status = $('#state').is(':visible');
v_deleg_status = $('#deleg').is(':visible');
v_col_status = $('#col').is(':visible');

if(v_state_status == false && v_deleg_status == false && v_col_status == false){
vstate = $("#stateDescription").val();
vdeleg = $("#delegDescription").val();
vcol = $("#colDescription").val();
}
//return true;
if(vrfc1 == '' || vrfc1 == null || vrfc2 == '' || vrfc2 == null || vrfc3 == '' || vrfc3 == null){

$("#errMsgForRFC").text($("#rfcError").val());
returnFlag = false;
}else{$("#errMsgForRFC").text("");}
if(vname == '' || vname == null){
$("#errMsgForName").text($("#nombreError").val());
returnFlag = false;
}else{$("#errMsgForName").text("");}
if(vfathersName == '' || vfathersName == null){
$("#errMsgForFathersName").text($("#fatherNameError").val());
returnFlag = false;
}else{$("#errMsgForFathersName").text("");}
if(vcp == '' || vcp == null){
$("#errMsgForCP").text($("#cpError").val());
returnFlag = false;
}else{$("#errMsgForCP").text("");}
if(vstate == '' || vstate == null){
$("#errMsgForState").text($("#stateError").val());
returnFlag = false;
}else{$("#errMsgForState").text("");}
if(vdeleg == '' || vdeleg == null){
$("#errMsgForDeleg").text($("#municipalityError").val());
returnFlag = false;
}else{$("#errMsgForDeleg").text("");}
if(vcol == '' || vcol == null){
$("#errMsgForCol").text($("#colonyError").val());
returnFlag = false;
}else{$("#errMsgForCol").text("");}
if( vstreet == '' || vstreet == null){
$("#errMsgForStreet").text($("#streetError").val());
returnFlag = false;
}else{$("#errMsgForStreet").text("");}
if(vnumberOutdoor == '' || vnumberOutdoor == null){
$("#errMsgForNum").text($("#numExternalError").val());
returnFlag = false;
}else{$("#errMsgForNum").text("");}


// showing mandatory field
if(vrfc1.length < 3 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc1").addClass("error");
returnFlag = false;
}else{
$("#rfc1").removeClass("error");
}
if(vrfc2.length < 6 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc2").addClass("error");
returnFlag = false;
}else{
$("#rfc2").removeClass("error");
}
if(vrfc3.length < 3 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc3").addClass("error");
returnFlag = false;
}else{
$("#rfc3").removeClass("error");
}
if(vname.length == 0 ){
$("#errMsgForName").text($("#nombreError").val());
$("#name").addClass("error");
returnFlag = false;
}else{
$("#name").removeClass("error");
}
if(vfathersName.length == 0 ){
$("#errMsgForFathersName").text($("#fatherNameError").val());
$("#fathersName").addClass("error");
returnFlag = false;
}else{
$("#fathersName").removeClass("error");
}
if(vcp.length < 5 ){
$("#errMsgForCP").text($("#cpError").val());
$("#cp").addClass("error");
returnFlag = false;
}else{
$("#cp").removeClass("error");
}
if(vstreet.length == 0 ){
$("#errMsgForStreet").text($("#streetError").val());
$("#street").addClass("error");
returnFlag = false;
}else{
$("#street").removeClass("error");
}
if(vnumberOutdoor.length == 0 ){
$("#errMsgForNum").text($("#numExternalError").val());
$("#numberOutdoor").addClass("error");
returnFlag = false;
}else{
$("#numberOutdoor").removeClass("error");
}
//**************************************************
setTimeout(function() {
v_state_status = $('#state').is(':visible');
v_deleg_status = $('#deleg').is(':visible');
v_col_status = $('#col').is(':visible');
if(v_state_status == false){
vstate = $("#stateDescription").val();
vdeleg = $("#delegDescription").val();
vcol = $("#colDescription").val();
}
if(v_state_status == false && vstate.length ==0){
$("#errMsgForState").text($("#stateError").val());
$("#stateDescription").addClass("error");
returnFlag = false;
}else if(v_state_status == false && vstate.length !=0){
$("#errMsgForState").text("");
$("#stateDescription").removeClass("error");
}
if(v_deleg_status == false && vdeleg.length ==0){
$("#errMsgForDeleg").text($("#municipalityError").val());
$("#delegDescription").addClass("error");
returnFlag = false;
}else if(v_deleg_status == false && vdeleg.length !=0){
$("#errMsgForDeleg").text("");
$("#delegDescription").removeClass("error");
}
if(v_col_status == false && vcol.length ==0){
$("#errMsgForCol").text($("#colonyError").val());
$("#colDescription").addClass("error");
returnFlag = false;
}else if(v_col_status == false && vcol.length !=0){
$("#errMsgForCol").text("");
$("#colDescription").removeClass("error");
}

if(v_state_status == true){
$("#errMsgForState").text("");
$("#stateDescription").removeClass("error");
}
if(v_deleg_status == true){
$("#errMsgForDeleg").text("");
$("#delegDescription").removeClass("error");
}
if(v_col_status == true){
$("#errMsgForCol").text("");
$("#colDescription").removeClass("error");
}
}, 1000);
//**************************************************

// showing mandatory field



return returnFlag;
}
//***** End : validation for invoice add new address page.
*/
/*
* Start: validation of rfc field values in E_invoicing date range page.
*/
// **************************************************************************//
// **************************************************************************//
// **************************************************************************//

function chkRfcForDateRangePage() {
var returnFlag = true;
var vrfc1 = $("#rfc-zip1").val();
var vrfc2 = $("#rfc-zip2").val();
var vrfc3 = $("#rfc-zip3").val();
var vToDate = $("#toDate").val();
var vFromDate = $("#fromDate").val();


if (vrfc1 == '' || vrfc1 == null || vrfc2 == '' || vrfc2 == null
|| vrfc3 == '' || vrfc3 == null) {
$("#errMsgForRFC").text($("#rfcError").val());
returnFlag = false;
} else {
$("#errMsgForRFC").html("");
}

if (vFromDate == '' || vFromDate == null) {
$("#errMsgForDate").text($("#dateError").val()).show();
$("#fromDate").addClass("error");
returnFlag = false;
} else {
$("#errMsgForDate").text("");
$("#fromDate").removeClass("error");
}
if (vToDate == '' || vToDate == null) {
$("#errMsgForDate").text($("#dateError").val()).show();
$("#toDate").addClass("error");
returnFlag = false;
} else {
$("#errMsgForDate").text("");
$("#toDate").removeClass("error");
returnFlag = true;
}
if (validDate(vFromDate, vToDate) == false) {
$("#errMsgForDate").text($("#dateError1").val()).show();
returnFlag = false;
} else if (dateDifferenceValidation(vFromDate, vToDate) == 1) {

$("#errMsgForDate").text($("#dateError1").val()).show();// dateError1
returnFlag = false;
} else if (dateDifferenceValidation(vFromDate, vToDate) == 2) {
$("#errMsgForDate").text($("#dateError2").val()).show();
returnFlag = false;
} else {
$("#errMsgForDate").text("");
}
if (returnFlag) {
$("#rfc1").prop('disabled', false);
$("#rfc2").prop('disabled', false);
$("#rfc3").prop('disabled', false);
}
return returnFlag;
}
function validDate(fromDate, toDate) {

returnFlag = true;
var validDateFomat = new RegExp(/(\d{2}\/\d{2}\/\d{4})/gm);
returnFlag = validDateFomat.test(fromDate);
if (returnFlag) {
var res = fromDate.split("/");
returnFlag = validateDate(res[0], res[1], res[2]);
}
if (!returnFlag) {
$("#fromDate").addClass("error");
returnFlag = false;
} else {
$("#fromDate").removeClass("error");
}
var validDateFomat = new RegExp(/(\d{2}\/\d{2}\/\d{4})/gm);
returnFlag = validDateFomat.test(toDate);

if (returnFlag) {
var res1 = toDate.split("/");
returnFlag = validateDate(res1[0], res1[1], res1[2]);
}

if (!returnFlag) {
$("#toDate").addClass("error");
returnFlag = false;
} else {
$("#toDate").removeClass("error");
}

return returnFlag;
}
function dateDifferenceValidation(fromDate, toDate) {
validateDateFlag = 0;

var res = fromDate.split("/");
var d1 = new Date(res[2], res[1], res[0]);
var res1 = toDate.split("/");
var d2 = new Date(res1[2], res1[1], res1[0]);
var diff = new Date(d1.getTime() - d2.getTime());
if (d2 < d1) {
validateDateFlag = 2;
}
return validateDateFlag;
}
function daysInFebruary(year) {
return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29
: 28);
}
function DaysArray(n) {
for (var i = 1; i <= n; i++) {
this[i] = 31
if (i == 4 || i == 6 || i == 9 || i == 11) {
this[i] = 30
}
if (i == 2) {
this[i] = 29
}
}
return this
}
function validateDate(strDay, strMonth, strYear) {
var returnFlag = true;
var maxYear = new Date().getFullYear();
var daysInMonth = DaysArray(12);
month = parseInt(strMonth, 10);
day = parseInt(strDay, 10);
year = parseInt(strYear);

if (month > 12 || month < 0 || strYear < 1900) {
returnFlag = false;
} else if (strDay.length < 1 || day < 1 || day > 31
|| (month == 2 && day > daysInFebruary(year))
|| day > daysInMonth[month]) {
returnFlag = false;
} else if (strYear.length != 4 || year == 0) {
returnFlag = false;
}
return returnFlag
}
// **************************************************************************//
// **************************************************************************//
// **************************************************************************//


/*
* End: validation of rfc field values in E_invoicing date range page.
*/

/*
* Start: E invoice billing apge.
*/
function validateBillingInputs(){
var returnFlag = true;
var vrfc1 = $("#rfc1").val();
var vrfc2 = $("#rfc2").val();
var vrfc3 = $("#rfc3").val();
var vcp = $("#cp").val();

if(vrfc1 == '' || vrfc1 == null || vrfc2 == '' || vrfc2 == null || vrfc3 == '' || vrfc3 == null){
$("#errMsgForRFC").text($("#rfcError").val());
returnFlag = false;
}else{$("#errMsgForRFC").text("");}

if(vcp == '' || vcp == null){
$("#errMsgCP").text($("#cpError").val());
$("#cp").addClass("error");
returnFlag = false;
}else if(vcp.length < 5){
returnFlag = false;
var divErrors = document.getElementById('errors');
$("#cp").addClass("error");
errors = "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#cpInvalidLengthError").val()+"</div>";
divErrors.style.display='block';
divErrors.innerHTML = errors;
$("#cp").addClass('error');
$("#cp").focus();
}else{$("#errMsgCP").text(""); $("#cp").removeClass("error");}


// showing mandatory field
if(vrfc1.length < 3 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc1").addClass("error");
returnFlag = false;
}else{
$("#rfc1").removeClass("error");
}
if(vrfc2.length < 6 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc2").addClass("error");
returnFlag = false;
}else{
$("#rfc2").removeClass("error");
}
if(vrfc3.length < 3 ){
$("#errMsgForRFC").text($("#rfcError").val());
$("#rfc3").addClass("error");
returnFlag = false;
}else{
$("#rfc3").removeClass("error");
}

// showing mandatory field

return returnFlag;
}

/*
* End: E invoice billing apge
*/

/*
* Start : Date range form rfc1,rfc2 and rfc3 must be disabled when the form gets loaded.
*/
function disableRFC(){
if($("#rfc1").val().length > 0)
$("#rfc1").prop('disabled',true);
if($("#rfc2").val().length > 0)
$("#rfc2").prop('disabled',true);
if($("#rfc3").val().length > 0)
$("#rfc3").prop('disabled',true);
}
/*
* End : Date range form rfc1,rfc2 and rfc3 must be disabled when the form gets loaded.
*/
function allowNumberWithSlash(value){
$(document).ready(function () {
//called when key is pressed in textbox
$("#"+value.id).keypress(function (e) {
//if the letter is not digit then display error and don't type anything
if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 47) {
//display error message
$("#errMsgForDate").html("Introduzca Entrada válida.").show().fadeOut("slow");
return false;
}
});
});

}

/* remove space issue fixing for : 268*/
function removeSpaces(value,id) {
/*var regexp = /^\s*$/;
if($("#"+id).val().contains("")||($("#"+id).val().match(regexp)))
$("#"+id).val(value.replace(/\s+/g, ''));*/
var regexp = /^\S*$/;
var reg =/^[a-zA-Z0-9]/;
var ualt=document.getElementById("error-keyup-2");
if (value.indexOf(" ") > -1){
($("#"+id)).focus();
ualt.innerHTML="<font color='red'> Por favor introduzca la contraseña </font>";
return false;
}else

{
ualt.innerHTML=" ";

return true;
}

}

function removeSpacesChangePwd(value,id,displayId) {

var regexp = /^\S*$/;
var reg =/^[a-zA-Z0-9]/;
var ualt=document.getElementById(displayId);
if (value.indexOf(" ") > -1){
($("#"+id)).focus();
ualt.innerHTML="<font color='red'> Por favor introduzca la contraseña </font>";
return false;
}else

{
ualt.innerHTML=" ";

return true;
}

}

/* remove space issue fixing for : 268*/

/* Start :: validation of shipping invoice page...*/
function validateEmailIdField(){
var returnFlag = true;
var foundErrors = false;
var divErrors = document.getElementById('errors');
if(($("#emailId").val() == null || $("#emailId").val() == '') && $('input[name=shippingInvTyp]:checked').val() == 3 ){
returnFlag = false;
errors = "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#emailError").val()+"</div>";
foundErrors = true;
}else if($("#emailId").val() != null && echeck($("#emailId").val()) == false && $('input[name=shippingInvTyp]:checked').val() == 3){
returnFlag = false;
errors = "<div class='alerta error'><span class='icono_aviso'><img src='/web/images/icono_error.gif' border='0' alt=''/></span>"+$("#validEmailError").val()+"</div>";
foundErrors = true;
}
if(foundErrors){
divErrors.style.display='block';
divErrors.innerHTML = errors;
$("#emailId").addClass('error');
$("#emailId").focus();
returnFlag = false;
}
return returnFlag;
}
/* End :: validation of shipping invoice page...*/

function onlyNumbers(event) {
if((event.which>47)&&(event.which<58)) return true; else return false;
}

//$(function(){
//$("#my_account_born_day").find("#first").attr("selected", true);
//$("#my_account_born_month").find("#second").attr("selected", true);
//$("#my_account_born_year").find("#third").attr("selected", true);

//});

/* Start : Terms & Condition defect-1410 */
var WindowObjectReference; // global variable
function openNewWindowPopup(newWindowURL)
{
if(WindowObjectReference == null || WindowObjectReference.closed){
WindowObjectReference = window.open(newWindowURL,"TermsAndCondition", "resizable=yes,scrollbars=yes,status=yes,width = 1200, height = 600");
}
}
/* End : Terms & Condition Issue */

/* Start : Calling the droplet by jquery Ajax fo PhoneServiceAirtimeSkuDroplet*/
function getAmount(airtimeSku)
{
$('#formcolorbox').show();
try {
$.ajax({
type : "POST",
cache : false,
url : "./phoneServiceAmountLoader.jsp?airtimeSku="+airtimeSku,
data : $(this).serializeArray(),
success : function(data) {
var innerOptions = $.trim(data);
$('#airTimeSKU').empty();
$('#airTimeSKU').append(innerOptions);
}
});
} finally {
window.setTimeout(function() {
hideResponseImage();
}, 500);
unloadUI();
}
return false;

}
function hideResponseImage(){
$('#formcolorbox').hide();
}
function unloadUI(){
/// $.unblockUI();
return false;
}
/* End : Calling the droplet by jquery Ajax fo PhoneServiceAirtimeSkuDroplet*/
function validatePhoneNumber(){
var returnFlag = true;
var vPhoneNumber = $("#registerPhoneNumber").val();
if(vPhoneNumber == '' || vPhoneNumber == null){
$("#msgPhoneNumber").text($("#numberError").val());
$("#registerPhoneNumber").addClass("error");
returnFlag = false;
}else if(vPhoneNumber.length != 10){
$("#msgPhoneNumber").text($("#numberError").val());
$("#registerPhoneNumber").addClass("error");
returnFlag = false;
}else{
returnFlag = true;
$("#msgPhoneNumber").text("");
$("#registerPhoneNumber").removeClass("error");
}
return returnFlag;
}
function validatePhoneOwner(){
var returnFlag = true;
var vPhoneOwner = $("#registeredPhoneOwnerName").val();

if(vPhoneOwner == '' || vPhoneOwner == null){
returnFlag = false;
$("#msgPhoneOwner").text($("#nameError").val());
$("#registeredPhoneOwnerName").addClass("error");
}else{
returnFlag = true;
$("#msgPhoneOwner").text("");
$("#registeredPhoneOwnerName").removeClass("error");
}
return returnFlag;
}
/*function validaterfc_zip(){
var returnFlag = true;
var vPhoneOwner = $("#registeredPhoneOwnerName").val();

if(vPhoneOwner == '' || vPhoneOwner == null){
returnFlag = false;
$("#msgPhoneOwner").text($("#nameError").val());
$("#registeredPhoneOwnerName").addClass("error");
}else{
returnFlag = true;
$("#msgPhoneOwner").text("");
$("#registeredPhoneOwnerName").removeClass("error");
}
return returnFlag;
}*/
/*$( document ).ready(function() {
$('#fromDate').datepicker({
beforeShow : function(){
$( this ).datepicker('option','maxDate', $('#toDate').val() );
}
});
$('#toDate').datepicker({
beforeShow : function(){
$( this ).datepicker('option','minDate', $('#fromDate').val() );
}
});
});*/

/**
 * ssonti - 04/06/2015 - Code changes for ChangeRequest_LP_Limit_CreditCards_9 
 * Javascript function to display the error in the my account add credit cards page. 
 */
function displayMaxCreditCardsError() {

  

	var divErrors = document.getElementById('errors');
	var errors = '';
	errors = errors
				+ "<div class='alerta displayMaxCrediterror'><button type='button' onclick='displayMaxCreditpopup();' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"
				+"<span>"+$("#maxProfileCreditCardError").val()+"</span></div>";	
	divErrors.style.display = 'block';
	divErrors.innerHTML = errors;
	$('#errors').modal('show')
	return false;
}
function displayMaxCreditpopup()
{
$('#errors').modal('hide');
}
//jon script click todo el area de pedidos
$(document).ready(function(){
	var tableRow = $("div.order-status-table-row");
	if(tableRow != null){
$("div.order-status-table-row").each(function(){
	var link = $( this ).find("a").attr("href");
	console.log(link);
	var evento = 'http://www.liverpool.com.mx'+link
	$(this).attr('onclick','location.href=\''+evento+'\'');




});
}
});
