    function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function getDistance(latGeo,lngGeo){
		
			var j=0;
			xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var busca = new Array(eventosXML.length);
			$.ajax( {
			type : "get",
			async : false,
			url : "/assets/utils/almacenes_gm/markers_productivo.xml",
			dataType : "xml",
			success : function(datosxml) {

					var len = $(datosxml).find('marker').length;
					finder = new Array(len);
					// busca =  new Array(len);
					finder[0] = {lat : 'vacio',lng : 'vacio',name : 'vacio',ico : 'vacio'};
					
				    var mark = $(datosxml).find('marker').each(function() {
				    j=j+1;	
					var name = $(this).find('name').text();
					var latd = $(this).attr('lat'); //$(datosxml).find('lat');
					var lngd = $(this).attr('lng');
					
					busca[j] = {
						lat : latd,
						lng : lngd
					};
					
				});

			}

		});
			var points = new Array(eventosXML.length);
			for (index in busca){
	           
	           var lat1=latGeo;//'19.42705'; 
	           var Lat2=busca[index].lat;
	           var lon1=lngGeo;//'-99.12757099999999';
	           var Lon2=busca[index].lng;
	           
	           var R =  6371 ;  // km 
               var dLat =  toRad( Lat2 - lat1 ); 
			   var dLon =  toRad( Lon2 - lon1 ); 
			   var lat1 = toRad(lat1); 
			   var Lat2 = toRad(Lat2);
			  
			   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				   Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(Lat2); 
			   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			   var d = R * c;
			  points[index] = 
			  {			d : d ,
						lat : busca[index].lat,
						lng : busca[index].lng
					};
	           
	        }
		//var points = [40,100,1,5,25,10];
			points.sort(function(a,b){return a.d-b.d}).d;
//			alert('distancias   ' + points[0].d + '  ' + points[0].lat + '  ' + points[0].lng);
			
			return points;
		
     }



function Evento(datos, descripcion, comentario) {
	this.datos = datos;
	this.descripcion = descripcion;
	this.comentario = comentario;
}

function CargarLatLog(type, find) {

	try {
		var j = 0;
		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var busca = new Array(eventosXML.length);
		if (eventosXML.length > 0) {
			eventos = new Array(); //clase con los datos cargados
		}
		if (type != '' && find == '') {
			for ( var i = 0; i < eventosXML.length; i++) {

				xmlEvento = eventosXML[i];
				datos = xmlEvento.getElementsByTagName("name")[0].firstChild.nodeValue;
				var typeAlmecen = xmlDoc.getElementsByTagName("marker")[i]
						.getAttribute("type");

				type = type.toLowerCase();
				typeAlmecen = typeAlmecen.toLowerCase();

				if (type == typeAlmecen && find == '') {

					var latd = xmlDoc.getElementsByTagName("marker")[i]
							.getAttribute("lat");
					var lngd = xmlDoc.getElementsByTagName("marker")[i]
							.getAttribute("lng");
					var ico = xmlDoc.getElementsByTagName("marker")[i]
							.getAttribute("ico");
					busca[j] = {
						lat : latd,
						lng : lngd,
						name : datos,
						ico : ico
					};
					j++
				}
			}
		} else {

			busca = findMarker(find);

		}
		return busca;
	} catch (e) {
		alert("Se produjo un error en la carga de los datos CargarLatLog()");
	}

}

function searchMarker(marker, type) {

	try {

		var j;
		var busca = new Array(1);
		var intDesc = 1;
		var tags = new Array(1);

		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var busca = new Array(1);
		$.ajax( {
			type : "get",
			async : false,
			url : "/assets/utils/almacenes_gm/markers_productivo.xml",
			dataType : "xml",
			success : function(datosxml) {

				var len = $(datosxml).find('marker').length;
				var mark = $(datosxml).find('marker')
						.each(function() {
							var arrayTags = new Array(len);

							busca = new Array(1);
							var mark = $(this).text();

							//var contenidoNodo =  $(this).find('tag1').text();
								var name = $(this).find('name').text();
								var type = $(this).attr('type');

								if (name == marker) {
									var numTag = $(this).find('numTag').text();
									var num = parseInt(numTag);
									busca[0] = name;
									arrayTags[0] = busca;

									for ( var j = 0; j < num; j++) {
										busca = new Array(1);
										busca[0] = $(this)
												.find('tag' + intDesc).attr(
														'descripcion');//$(this).find('tag' + intDesc).text();//xmlDoc.getElementsByTagName("tag" + intDesc)[0].getAttribute("descripcion");
										busca[1] = $(this)
												.find('tag' + intDesc).text();
										intDesc++;
										arrayTags[j + 1] = busca;
									}
									tags[0] = arrayTags;
								}
							});

			}

		});

		return tags;

	} catch (e) {
		alert("Se produjo un error en la carga de los datos searchMarker");
	}
}

function LoadMarkers() {
	try {

		var j;
		var busca = new Array(1);

		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var tags = new Array(eventosXML.length);

		for ( var i = 0; i < eventosXML.length; i++) {
			xmlEvento = eventosXML[i];
			var intDesc = 0;
			var numTag = xmlEvento.getElementsByTagName("numTag")[0].firstChild.nodeValue;
			var arrayTags = new Array(numTag);
			var busca = new Array(1);
			busca[0] = xmlEvento.getElementsByTagName("name")[0].firstChild.nodeValue;
			var comp = xmlEvento.getElementsByTagName("name")[0].firstChild.nodeValue;

			arrayTags[0] = busca;
			// document.write( comp);

			for ( var j = 0; j < numTag; j++) {

				busca = new Array(1);
				intDesc++;
				busca[0] = xmlDoc.getElementsByTagName("tag" + intDesc)[0]
						.getAttribute("descripcion");
				busca[1] = xmlEvento.getElementsByTagName("tag" + intDesc)[0].firstChild.nodeValue;

				arrayTags[j + 1] = busca;
			}

			tags[i] = arrayTags;

		}

		return tags;

	} catch (e) {
		alert("Se produjo un error en la carga de los datos LoadMarkers");
	}

}
function CargarBuscador() {

	try {
		var j;
	
		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var busca = new Array(eventosXML.length);
		if (eventosXML.length > 0) {
			eventos = new Array(); //clase con los datos cargados
		}
		for ( var i = 0; i < eventosXML.length; i++) {

			xmlEvento = eventosXML[i];
			datos = xmlEvento.getElementsByTagName("name")[0].firstChild.nodeValue;
			busca[i] = datos;
		}
			
		return busca;
		
	} catch (e) {
		alert("Se produjo un error en la carga de los datos CargarBuscador");
	}

}

function getNameLength(marker) {
	try {

		var j;
		var busca = new Array(1);
		var intDesc = 1;
		var num;
		var tags = new Array(1);
		var numTag;
		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');
		var busca = new Array(1);
		$.ajax( {
			type : "get",
			async : false,
			url : "/assets/utils/almacenes_gm/markers_productivo.xml",
			dataType : "xml",
			success : function(datosxml) {

				var len = $(datosxml).find('marker').length;
				var mark = $(datosxml).find('marker').each(function() {
					var arrayTags = new Array(len);

					busca = new Array(1);
					var mark = $(this).text();

					//var contenidoNodo =  $(this).find('tag1').text();
						var name = $(this).find('name').text();

						if (name == marker) {

							numTag = $(this).find('numTag').text();
							num = parseInt(numTag);
						}

					});

			}

		});

		return num;

	} catch (e) {
		alert("Se produjo un error en la carga de los datos getNameLength");
	}

}

function findMarker(text) {

	try {
		var j;
		var intDesc = 1;

		var finder = new Array(1);
		var latd = 'vacio';
		var lngd = 'vacio';
		var inc = 0;
		var val = 1;
		var paso = 0;
		xmlDoc = AbrirFichero("/assets/utils/almacenes_gm/markers_productivo.xml");
		eventosXML = xmlDoc.getElementsByTagName('marker');

		$.ajax( {
			type : "get",
			async : false,
			url : "/assets/utils/almacenes_gm/markers_productivo.xml",
			dataType : "xml",
			success : function(datosxml) {

				var len = $(datosxml).find('marker').length;
				finder = new Array(len);
				finder[0] = {lat : 'vacio',lng : 'vacio',name : 'vacio',ico : 'vacio'};

				var mark = $(datosxml).find('marker').each(function() {
					var name = $(this).find('name').text();

					var latd = $(this).attr('lat'); //$(datosxml).find('lat');
						var lngd = $(this).attr('lng');
						var ico = $(this).attr('ico');

						var numTag = $(this).find('numTag').text();
						var num = parseInt(numTag);
						intDesc = 1;

						for ( var j = 0; j < num; j++) {
							var desc = $(this).find('tag' + intDesc).attr(
									'descripcion'); //$(this).find('tag' + intDesc).text();//xmlDoc.getElementsByTagName("tag" + intDesc)[0].getAttribute("descripcion");
							var cont = $(this).find('tag' + intDesc).text();
							var totalStr = name + ' ' + desc + ' ' + cont;

							totalStr = totalStr.toLowerCase();
							text = text.toLowerCase();

							if (paso == 0) {
								if (totalStr.match(text)) {
									finder[0] = {
										lat : latd,
										lng : lngd,
										name : name,
										ico : ico
									};
									paso++
								}
							} else {
								if (totalStr.match(text)
										&& finder[val - 1].name != name) {
									finder[val] = {
										lat : latd,
										lng : lngd,
										name : name,
										ico : ico
									};
									inc++;
									val++;
								}
							}
							intDesc++;
						}

					});

			}

		});
		
			return finder;

	} catch (e) {
		alert("Se produjo un error en la carga de los datos... findMarker  "
				+ e);
	}
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
