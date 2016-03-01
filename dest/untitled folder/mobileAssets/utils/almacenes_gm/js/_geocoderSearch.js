var saggestions=new Array();
var lat=new Array();
var lng=new Array();
var zcode=new Array();
var sname=new Array();
var cname=new Array();
var contentString = "";
var content = document.createElement("DIV");
var title = document.createElement("DIV");
var streetview = document.createElement("DIV");
content.appendChild(title);
var mapIcon;
// Define marcadores
var arrayContent ;

$(document).ready(function() {	
	getOptions_onload();
	var Suggestion_Obj='';
	var contextPath = $("#storePage_contextPath").val();
	$.ajax({
		url: contextPath +'/browse/searchSuggestionsInter.jsp',
		type:"POST",
		dataType:"json",
		success:function(data){
		//  alert(Object.keys(data.StoreNames).length);
		for(var i=0;i<Object.keys(data.StoreNames).length;i++){
			//console.log(Object.keys(data.StoreNames)[i]);
			Suggestion_Obj=data.StoreNames;
			var temp=Object.keys(data.StoreNames)[i];
			//console.log(data.StoreNames[temp][0]+"   "+data.StoreNames[temp][1])
			saggestions[i]=Object.keys(data.StoreNames)[i];
			lat[i]=data.StoreNames[temp][0];
			lng[i]=data.StoreNames[temp][1]; 
			sname[i]=data.StoreNames[temp][2];
			zcode[i]=data.StoreNames[temp][3];
			cname[i]=data.StoreNames[temp][4];
		}
	}
	})

	$( "#inAlmacen" ).autocomplete({
		source: saggestions,
		select:function (event,ui){ 
		 event.preventDefault();
		 $( "#inAlmacen" ).val(ui.item.label);
		} 
		

	});

	$('#middle_fieldset select option').each(function () { 
		if($.trim($(this).attr('value'))=="liverpool"){ 
			//$(this).attr('selected','selected'); 
			var strUser = "liverpool";
			var action = contextPath+"/browse/selectedStores.jsp?selectedStore="+strUser; 
			jQuery.get(action,function(data){
				$('#lstAlmacenes').replaceWith($.trim(data));
			});
		}
	});
});           

$(document).ready(function() {	
	$('#inAlmacen').keypress(function(event) {
    if (event.which === 13) {
         codeLatLng1();
    }
});
});

var geocoder;
var map;
var infowindow = new google.maps.InfoWindow({maxWidth: 430, content: contentString});
var marker;
var pin = new google.maps.MVCObject();
google.maps.event.addListenerOnce(infowindow, "domready", function() {
});
function googlecode(title)
{
	var searchTerm = title;			 
     try {    
    	 dataLayer.push({
			 'eventCategory': '/ga/almacenes/'+searchTerm,
             'eventAction': 'click',	              
             'eventLabel': 'GoogleMaps',
             'event': 'click',
         });
     } catch (e) {
         //console.log(e);
     }
}
 



google.maps.event.addListener(infowindow, 'domready', function() {
$("#tabs").tabs();
});

var initialize= '';
 
google.maps.event.addDomListener(window, 'load', initialize);


function getOption(){
	var lstCbo = document.getElementById("lstAlmacenes");
	var resp;
	resp =  lstCbo.options[lstCbo.selectedIndex].value;

	iniMaps('',resp,false,'');
	setIndex();
}

 
function codeLatLng1(){ 
	
	var latval;
	var lngval;	
	var searchText;	
	var inputval=$.trim($('#inAlmacen').val());
	var latlng;
	if(inputval!='' & saggestions.length > 1){
		for(var i=0;i<saggestions.length;i++){ 
			if(saggestions[i]==inputval){ 
				lngval=lng[i];
				latval=lat[i];  
			}
			else if(sname[i]==inputval){
				
				lngval=lng[i];
				latval=lat[i];  
			}
			else if(zcode[i]==inputval){
				lngval=lng[i];
				latval=lat[i];  
			}
			else if(cname[i]==inputval){
				lngval=lng[i];
				latval=lat[i];  
			}

		}   
			
	 
		var e = document.getElementById("cboAlmacen");		 
		var strUser = e.options[e.selectedIndex].value;	
		if (strUser === "dutyfree") mapIcon = "/mobileAssets/utils/almacenes_gm/images/df.png";
	    else if (strUser === "ff") mapIcon = "/mobileAssets/utils/almacenes_gm/images/ff.png";
	    else if (strUser === "liverpool") mapIcon = "/mobileAssets/utils/almacenes_gm/images/icoBolsa.png";
	    else if (strUser === "cc") mapIcon = "/mobileAssets/utils/almacenes_gm/images/cc.png";
		var contextPath = $("#storePage_contextPath").val();			 
		var title=($("#lstAlmacenes option:first").text());	
	
		if(isNaN(latval) && isNaN(lngval)){
			searchText = $.trim($('#inAlmacen').val());
		}else{
			latlng = new google.maps.LatLng(latval, lngval);
		}
		 
		$.ajax({		
			url:contextPath+"/browse/selectedStores.jsp",
			type:"POST",
			dataType:"html",
			data:{lngval: lngval, latval: latval, searchText: searchText},
			success:function(data)
			{	
				//console.log(data);
				if(searchText  != undefined ){
					if(data.indexOf("No Data") > -1 ){			 
						$('#firstcompare-error').modal('show');
						window.scrollTo(0,0); 
					}else{
						$('.multitextbox').html(data);
						var searchInput = $('#lstAlmacenes option:first').val();  								 
						var searchFields = searchInput.split(",");
						var searchLat = searchFields[0];
						var searchLng = searchFields[1];
						latlng = new google.maps.LatLng(searchLat, searchLng);
						$("#cboAlmacen").val($.trim($("#cboAlmacen option:first").html()));
					}
				}else{
					$('.multitextbox').html(data);
				}
				  
					var title=($("#lstAlmacenes option:first").text());				
					$.ajax({		
							url:contextPath+'/browse/infoBoxData.jsp?selectedStoreName='+escape(title),
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
							if (status == google.maps.GeocoderStatus.OK) 
							{								 
								if (results[1]) {
								var input = $('#lstAlmacenes option:first').val();  								 
								var fields = input.split(",");
								var lat = fields[0];
								var lng = fields[1];								 
								initialize(lat,lng);
									map.setZoom(17);
									marker = new google.maps.Marker({
										position: latlng,
										icon: mapIcon,
										map: map
									});
									//openInfoWindow(marker,title,addr, additionalServices, photoDetails);										
									//$('.gm-style-iw').parents().eq(2).hide();
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
														
									$('#firstcompare-error').modal('show');
									  window.scrollTo(0,0);
									
									//console.log('No results found');
								}
							} 
							else {								
								//console.log('Geocoder failed due to: ' + status);
							}
						});					
						
						}
						});			
				}
			});
	}
}



function getOptions(){
	var strUser = jQuery("#cboAlmacen").val();
	var contextPath = $("#storePage_contextPath").val();
	if (strUser === "dutyfree") mapIcon = "/mobileAssets/utils/almacenes_gm/images/df.png";
		else if (strUser === "ff") mapIcon = "/mobileAssets/utils/almacenes_gm/images/ff.png";
		else if (strUser === "liverpool") mapIcon = "/mobileAssets/utils/almacenes_gm/images/icoBolsa.png";
		else if (strUser === "cc") mapIcon = "/mobileAssets/utils/almacenes_gm/images/cc.png";
		else strUser = "liverpool";
	var action = contextPath+"/browse/selectedStores.jsp?selectedStore="+strUser+'&langval='+''; 
	jQuery.get(action,function(data){
		$('#lstAlmacenes').replaceWith($.trim(data));
		var defLatlng = $('#lstAlmacenes option:first').val();
		if (defLatlng != '') codeLatLng(defLatlng, mapIcon);
	});
}
function getOptions_onload(){
 
	var strUser = $("#cboAlmacen option:eq(1)").val();
	var contextPath = $("#storePage_contextPath").val();
	var action = contextPath+"/browse/selectedStores.jsp?selectedStore="+strUser+'&langval='+''; 
	jQuery.get(action,function(data){
		$('#lstAlmacenes').replaceWith($.trim(data));
		var defLatlng = "19.433713,-99.182773";
		mapIcon = "/mobileAssets/utils/almacenes_gm/images/icoBolsa.png";
	    if (defLatlng != '') codeLatLng(defLatlng, mapIcon);
	});
}



