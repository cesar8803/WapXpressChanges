var map;
var geocoder;
var directionsService = new google.maps.DirectionsService();
var arrfind = CargarBuscador();


  function iniMaps(findLiverpool,find,loadlst,geoFind) {
var availableTags = CargarBuscador();
						$("#inAlmacen").autocomplete({
							source : availableTags
						});
	var j = 0 ;
	var strTabs = "";
	var strCont = "";
    var strTabId  = "";
    var div = '<div id="tab-';
    var div2 = 'style="width:80px;height:25px;" ">';
    var edDiv = '</div>';
    var tituloMarker = "Titulo Marker";
    var loadTabs = LoadMarkers();
	var loadsMarkers;
	this.contentString = "";

    // Crea el mapa

    var content = document.createElement("DIV");
    var title = document.createElement("DIV");
    var streetview = document.createElement("DIV");
    content.appendChild(title);

    // Define marcadores
    var arrayContent ;
    var typeAlmacen = getTypeAlm();
    if(geoFind!=''){
    typeAlmacen='liverpool'
    }
    var markers = CargarLatLog(typeAlmacen,find);

    if(markers[0].name=='vacio'){
    	alert('No se encontraron tiendas. Intente una dirección diferente.');
    } 	else{
	    infowindow = new google.maps.InfoWindow ( {maxWidth: 430, content: contentString});


	    var myLatlng = new google.maps.LatLng(19.433713,-99.182773);
	     map = new google.maps.Map(document.getElementById("map_canvas"), {
	       zoom: 17,
	      center: myLatlng,
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	    });
		    loadCmbo(markers,loadlst);
			loadsMarkers = markers;
			    for (index in markers){
	           addMarker(markers[index]);
	        }
	}

    function creaTabs(loadTab, marker){

   		   var number = getNameLength(marker);
    	   var etiquetas = new Array(marker);
    	   var divs = '<div id="tab-' ;
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

    		for(var i=1 ; i < number ; i++){

     	 		 n = n + 1;
    			 xtabs[i] =  '#tab-' + i ;
		     	 etiquetas[i] = '<li><a href= "' + xtabs[i] + '" ><span > ' + loadTab[i][0] + '</span></a></li>';
		     	 //construye body tabs
		     	 strTabIds= "tab-" +  n;
		     	 strConts = strConts + divs + i + div2s +  loadTab[i][1] + edDivs;
    		}
					for(i=1 ; i < number  ; i++){
	          			xstrTabs = xstrTabs + etiquetas[i] ;
     			}

     			contentStrings[0]=xstrTabs ;
     			contentStrings[1]=strConts;

				return contentStrings;
    }//end

	    function addMarker(data) {
   		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(data.lat, data.lng),
		  map: map,
		  title: data.name,
		  icon: data.ico//'images/icoBolsa.png'

		   });
		   google.maps.event.addListener(marker, "click", function () {
			  analytics(data.name);

			   openInfoWindow(marker);

		   });
    }//end addMarker

  //  se crea el div dentro del info window
    var pin = new google.maps.MVCObject();
    google.maps.event.addListenerOnce(infowindow, "domready", function() {
    });

    // funcionalidad para cuando se presione el click al marker se muestre infowindow
    function openInfoWindow(marker) {

          loadTabs =  searchMarker(marker.getTitle());
          arrayContent =  creaTabs(loadTabs[0],marker.getTitle());
          tituloMarker = marker.getTitle() + '<br><br>';
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

      		pageTracker._trackPageview("ga/almacenes/" + marker.getTitle());
    }  //end openInfoWindow



     google.maps.event.addListener(infowindow, 'domready', function() {
      $("#tabs").tabs();
    });




	  if(findLiverpool!=''){
	  		//var finder = finds(findLiverpool);

		   try{
				myLatlng = new google.maps.LatLng(loadsMarkers[0].lat,loadsMarkers[0].lng);
	   			map.setCenter(myLatlng);
				}
				catch(e){
				alert('error' + e);
				}
		  }
	  else{

		  	if(find!=''){
			  	 myLatlng = new google.maps.LatLng(loadsMarkers[0].lat,loadsMarkers[0].lng);
			       			map.setCenter(myLatlng);
		    }else{


		    	 if(geoFind==''){
		    	  	myLatlng = new google.maps.LatLng(19.433713,-99.182773);
			      	map.setCenter(myLatlng);
			      }
			      else{
			             // Try HTML5 geolocation

				        if(navigator.geolocation) {

				          navigator.geolocation.getCurrentPosition(function(position) {
				            var pos = new google.maps.LatLng(position.coords.latitude,
				                                             position.coords.longitude);

				            var points = new Array(1);
				                points = getDistance(position.coords.latitude,position.coords.longitude)
 						    var geoPos = new google.maps.LatLng(points[0].lat,points[0].lng);

				           		directionsDisplay = new google.maps.DirectionsRenderer();
				           		directionsDisplay.setMap(map);

							  var request = {
							    origin:pos,
							    destination:geoPos,
							    travelMode: google.maps.TravelMode.DRIVING
							  };

							  directionsService.route(request, function(result, status) {
							    if (status == google.maps.DirectionsStatus.OK) {
							      directionsDisplay.setDirections(result);
							    }
							  });


				            map.setCenter(geoPos);
				          }, function() {
				           // handleNoGeolocation(true);
				           	myLatlng = new google.maps.LatLng(19.433713,-99.182773);
			      			map.setCenter(myLatlng);
				          });
				        } else {
				          // Browser doesn't support Geolocation
				         // handleNoGeolocation(false);
				          	myLatlng = new google.maps.LatLng(19.433713,-99.182773);
			      			map.setCenter(myLatlng);
				        }
			      }
		    }
	  }
  }//end iniMaps
   function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'El servicio de Geolocalización no esta disponible.';
        } else {
          var content = 'Tu navegador no soporta Geolocalización.';
        }

        var options = {
          map: map,
          position: new google.maps.LatLng(60, 105),
          content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      }
  function loadCmbo(array,loadlst){

		  var  len =array.length;
      	  if(loadlst==true){
	      	cleanCbo();
	      }

	      for(var i = 0 ; i < len; i++){

		      try {
			      var elOptNew = document.createElement('option');


			      if(array[i]!=undefined && loadlst==true){

					  elOptNew.text = array[i].name;
					  elOptNew.value = array[i].name;
					  var elSel = document.getElementById('lstAlmacenes');
			 	      elSel.appendChild(elOptNew); //no IE
			 	      }
				  }
				  catch(ex) {
				    //elSel.add(elOptNew); // solo IE
				  }
		      }
  }

  function cleanCbo(){
	  var elSel = document.getElementById('lstAlmacenes');
	  if (elSel.length > 0)
	  {
	  for(i = elSel.length ; i>=0;i--){
	    	elSel.remove(i);
	    }
	  }
  }

	function getTypeAlm(){

		 var combo = document.getElementById("cboAlmacen");
		 var res;
			res =  combo.options[combo.selectedIndex].value;
		 return res;
	}

	function getCbo(){
		var e = document.getElementById("cboAlmacen");
		var strUser = e.options[e.selectedIndex].value;
	}

	function getInput(){
		var valor = document.getElementById("inAlmacen").value;
		return valor;
	}
	function getOption(){

		var lstCbo = document.getElementById("lstAlmacenes");
		var resp;
			resp =  lstCbo.options[lstCbo.selectedIndex].value;

		    iniMaps('',resp,false,'');
		    setIndex();

	}

	function analytics(nameAlmacen){
			_gaq.push(['_trackEvent', '/ga/almacenes/' + nameAlmacen, 'click', 'GoogleMaps']);
	}

	function buscarMapa(nameAlmacen){
		//_gaq.push(['_trackEvent', '/ga/almacenes/' + nameAlmacen, 'click', 'GoogleMaps']);

		if (getInput()!=''){

				 iniMaps('',getInput(),true,'')
				 setIndex();
		}else{
			alert('No se encontraron tiendas. Intente una dirección diferente.');
		}

	}
	function setIndex(){
		     var combo = document.getElementById("cboAlmacen");
			     combo.selectedIndex=0;
	}
