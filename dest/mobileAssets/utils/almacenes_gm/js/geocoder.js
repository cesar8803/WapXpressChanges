var geocoder;
var map;
var contentString = "";
var content = document.createElement("DIV");
var title = document.createElement("DIV");
var streetview = document.createElement("DIV");
content.appendChild(title);
$(function() {
    $( "#tabs" ).tabs();
  });
// Define marcadores
var arrayContent ;

var infowindow = new google.maps.InfoWindow({maxWidth: 430, content: contentString});
var marker;
var pin = new google.maps.MVCObject();

$(function(){
	var defLatlng = $('#lstAlmacenes option:first').val();
	//if (defLatlng != '') codeLatLng(defLatlng, '');
	});
	

google.maps.event.addListenerOnce(infowindow, "domready", function() {
});
function openInfoWindow(marker,title,addr, additionalServices, photoDetails,imageurl) {
 
	var loadTabs = [['',''],
	                ['Datos Generales',addr],
	                ['Servicios Adicionales', additionalServices],
	                ['Fotos',photoDetails],
	                [1,title]

	                 ];
	arrayContent =  creaTabs(loadTabs,marker,title,imageurl);
	if (title != '') tituloMarker = '<b>'+title +'</b>'+ '<br>';
	else tituloMarker = '<h1>&nbsp;</h1>';
	contentString = [
	                 tituloMarker,
	                 '<div id="tabs" >',
	                 '<ul>', arrayContent[0] // asigna el String de tabs strTabs
	                                      ,'</ul>',arrayContent[1]  , //strCont
	                                      '</div>'
	                                      ].join('');

	infowindow.setContent (contentString);
	title.innerHTML = marker.getTitle();
	pin.set("position", marker.getPosition());
	infowindow.open(map, marker);

	//pageTracker._trackPageview("ga/almacenes/" + marker.getTitle());
}  //end openInfoWindow



google.maps.event.addListener(infowindow, 'domready', function() {
$("#tabs").tabs();
});

function creaTabs(loadTabs, marker,title,imageurl){
 
	var number = 4;
	var etiquetas = new Array(marker);
	var divs = '<div id="tabs-' ;
	var div2s = '">';
	var edDivs = '</div>';
	var strConts = "";
	var strTabIds  = "";
	var n;
	var tabsx = new Array(number);
	var xtabs = new Array(number);
	var xstrTabs = "";
	var contentStrings = new Array(1);
	//var contentString ="";

	number = number + 1;
	//console.log(loadTabs[1][0] + '<br>' + loadTabs);
	for(var i=1 ; i < number ; i++){
		n = n + 1;			
		//construye body tabs
		strTabIds= "tabs-" +  n;
		if(i==4){
			strConts = strConts + divs + i + div2s + edDivs;
		}else{
			strConts = strConts + divs + i + div2s +  loadTabs[i][1] + edDivs;
		}		
		
		if( (loadTabs[i][1]!= '' && loadTabs[i][0] != 'Fotos' ) || ( loadTabs[i][0] == 'Fotos' && imageurl!='') )
		{
			xtabs[i] =  '#tabs-' + i ;		
			if(loadTabs[i][0]!=1){
				etiquetas[i] = '<li><a href= "' + xtabs[i] + '" >  ' + loadTabs[i][0] + '</a></li>';
			}
			else{		
				var title11 = loadTabs[i][1];			
				etiquetas[i] = '<li><a  onclick=gonext("' +encodeURIComponent(title11)+ '") >  Get Direction </a></li>';	
			}
			xstrTabs = xstrTabs + etiquetas[i] ;
		}	
	}	
	contentStrings[0]=xstrTabs ;
	contentStrings[1]=strConts;
	return contentStrings;
}//end

function gonext(dest)
{
	var furl="http://www.maps.google.com/maps?saddr=&daddr="+decodeURIComponent(dest);
	var win=window.open(furl, '_blank');
	win.focus();
}

function initialize(lat,lng){
   var input = $('#lstAlmacenes option:first').val();      
	if (typeof input == 'undefined') { 
					input = document.getElementById('lstAlmacenes').value; 
					var latlngStr = input.split(',', 2);
					var lat = parseFloat(latlngStr[0]);
					var lng = parseFloat(latlngStr[1]);
	}
	//alert(lat+"!"+lng);
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		zoom: 8,
		center: latlng,
		mapTypeId: 'roadmap'
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeLatLng(input,mapIcon) {
	 
	if(input == "19.433713,-99.182773"){
		var lat = "19.433713";
		var lng = "-99.182773";
		var latlng = new google.maps.LatLng(lat, lng);
		var strUser = "liverpool";
		var title = "Liverpool Polanco";
	}
	else{
		if (typeof input == 'undefined') { input = document.getElementById('lstAlmacenes').value;}
		var latlngStr = input.split(',', 2);
		var lat = parseFloat(latlngStr[0]);
		var lng = parseFloat(latlngStr[1]);
		var latlng = new google.maps.LatLng(lat, lng);
		var strUser = $("#cboAlmacen").val();
		var title = $("#lstAlmacenes option:selected").text(),addr;
		if(title=='') title= $('#lstAlmacenes option:first').text();
	}

	if (typeof(mapIcon)==='undefined' || mapIcon == '') {
		if (strUser === "dutyfree") mapIcon = "/mobileAssets/utils/almacenes_gm/images/df.png";
		else if (strUser === "ff") mapIcon = "/mobileAssets/utils/almacenes_gm/images/ff.png";
		else if (strUser === "liverpool") mapIcon = "/mobileAssets/utils/almacenes_gm/images/icoBolsa.png";
		else if (strUser === "cc") mapIcon = "/mobileAssets/utils/almacenes_gm/images/cc.png";
		else mapIcon = "/mobileAssets/utils/almacenes_gm/images/icoBolsa.png";
	}
	var contextPath = $("#storePage_contextPath").val();
	$.ajax({
		url: contextPath +'/browse/infoBoxData.jsp?selectedStoreName='+escape(title),
		type:"POST",
		dataType:"html",
		success:function(data){
		var temp = $.trim(data);
		var	temp1 = temp.split("|");
		addr = temp1[2];
		additionalServices = temp1[3];
		photoDetails = '<br><br><img src="' +temp1[4]  +'"/>';
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
				initialize(lat,lng);
					map.setZoom(17);
					marker = new google.maps.Marker({
						position: latlng,
						icon: mapIcon,
						map: map
					});
					 
					google.maps.event.addListener(marker, 'click', function()
					{						 
						openInfoWindow(marker,title,addr, additionalServices, photoDetails,temp1[4]);
						$('.gm-style-iw').parents().eq(2).show();
						setTimeout(function () {
							var title1=title;
							googlecode(title1);
						}, 500);
					});

				} else {
					//console.log('No results found');
				}
			} else {
				//console.log('Geocoder failed due to: ' + status);
			}
		});
	}
	});

}

 


