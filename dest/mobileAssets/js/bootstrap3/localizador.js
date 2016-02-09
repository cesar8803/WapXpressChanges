 var contentHTML = []; 
 var contentAll = [];
 var registrandoPosicion = false;
 var statusBackForList = false;
 var lati;
 var longi;

$(document).ready(function(){

  var datos = [];
var items = ["Saab", "Volvo", "BMW"];
var tipoVar;
var estadoVar;

$(".hasclear").keyup(function () {
    var t = $(this);
    var nR = 1;
    //t.next('span').toggle(Boolean(t.val()));
    //console.log("lol");
    $("#borrarTexto").toggle(Boolean(t.val()));

       var titulos = $("#buscarTypeAhead").val();
                   $("#list-store .panel .list-group").html("");

          //alert(titulos);
          console.log(titulos);
        $.getJSON( "tiendas-format.json", function( data ) {
            $.each( data, function( key, val ) {
     
              contentHTML[key] = val['content'];
              contentAll[key] = {"titulo":val['titulo'],"direccion":val['direccion'],"horario":val['horario'],"telefono":val['telefono'],"tipo":val['tipo'],"lat":val['lat'],"lng":val['lng'],"servicios":val['servicios'],"foto":val['foto']};
             // datos.push(val['titulo']);
         //   items[2]= val['content'];
        // console.log(val['titulo']);
             if(titulos.length >= 3){

                ga('send', 'event',  'busquedaTienda','search', 'text_field_search');

             }
             if(val.titulo.search(new RegExp(titulos, "i")) != -1 ){

               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
              console.log(val['titulo']);
             }
             else if(titulos == ""){
               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
             }else{
                 nR = 0
             }

             
         

            });

        });
         if( nR == 0){
         $("#list-store .panel .list-group").append("<li class='list-group-item'>No se encontraron resultados.</li>");

         }
});
$(".clearer").hide($(this).prev('input').val());

//$(".clearer").hide();

$("#borrarTexto").on('click', function() {
    console.log("click delete");
    $('#buscarTypeAhead').val('').focus();
    $(this).hide();
});

/*$('#buscarTypeAhead').on('click', function() {
   console.log("click en input type text");

   $("#modalBusqueda").modal('toggle');
       $('#searchTiendas input').focus();
       $('#searchTiendas input').first().focus()

  });*/

$('.obtain-state').on('click', function() {

     ga('send', 'event',  'obtenerEstados','click', 'ver_lista_estados');
     $('#byEstate').modal('toggle');
     statusBackForList = false;

     console.log($(this).find("h4").html());
     $("#list-store .panel .list-group").html("");
     estadoVar = $(this).find("h4").html();

      $.getJSON( "tiendas-format.json", function( data ) {
       $.each( data, function( key, val ) {
     
        contentHTML[key] = val['content'];
        contentAll[key] = {"titulo":val['titulo'],"direccion":val['direccion'],"horario":val['horario'],"telefono":val['telefono'],"tipo":val['tipo'],"lat":val['lat'],"lng":val['lng'],"servicios":val['servicios'],"foto":val['foto']};
        datos.push(val['titulo']);
         //   items[2]= val['content'];
         var direccionEntera = val['direccion'].toLowerCase();
         var lowerEstado = estadoVar.toLowerCase();
         console.log(direccionEntera);
         console.log("Hey you -->"+val['direccion'].indexOf(lowerEstado)); 
        if(direccionEntera.indexOf(lowerEstado) != -1 ){
         // if(preg_match("/"+lowerEstado+"/i", direccionEntera)){
                   console.log(direccionEntera);

        $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
         
         }
         if(estadoVar == "Todas"){

          $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
         
         
         }

         //}else{
          
          //console.log("no se encontraron tiendas");
         //$("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p></li>");
        
         //}

       });

   });



});

$('input[name=optionsRadios]').on('change', function() {
       $('#myModal').modal('toggle');
  

          $("#list-store .panel .list-group").html("");

   console.log($('input[name=optionsRadios]:checked').val());
   tipoVar = $('input[name=optionsRadios]:checked').val();
     ga('send', 'event',  'verTipoDeTienda','change', tipoVar);

   $.getJSON( "tiendas-format.json", function( data ) {
       $.each( data, function( key, val ) {
     
        contentHTML[key] = val['content'];
        contentAll[key] = {"titulo":val['titulo'],"direccion":val['direccion'],"horario":val['horario'],"telefono":val['telefono'],"tipo":val['tipo'],"lat":val['lat'],"lng":val['lng'],"servicios":val['servicios'],"foto":val['foto']};
        datos.push(val['titulo']);
         //   items[2]= val['content'];
        if(val['tipo'] == tipoVar ){
        $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
         }
         if(tipoVar == "all"){

         $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
         }

       });

   });

});



$.getJSON( "tiendas-format.json", function( data ) {
  //datos.push(data[0].titulo);
  //console.log(data[0].titulo);
          contentHTML = [];
          contentAll = [];
          $("#list-store .panel .list-group").html("");

  $.each( data, function( key, val ) {
    //items.push( "<li id='" + key + "'>" + val + "</li>" );
        contentHTML[key] = val['content'];

contentAll[key] = {"titulo":val['titulo'],"direccion":val['direccion'],"horario":val['horario'],"telefono":val['telefono'],"tipo":val['tipo'],"lat":val['lat'],"lng":val['lng'],"servicios":val['servicios'],"foto":val['foto']};
        datos.push(val['titulo']);
                  $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");


  });
 
  $(".typeahead").typeahead({ source:datos,items:100 });



});



$(".typeahead").change(function() {
    var current = $(".typeahead").typeahead("getActive");
    if (current) {
      
                  //alert($(".typeahead").val());
          
        // Some item from your model is active!
        if (current.name == $(".typeahead").val()) {
            // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
                 

        } else {
          

          //alert($(".typeahead").val());
            // This means it is only a partial match, you can either add a new item 
            // or take the active if you don't want new items
                       // alert($(".typeahead").val());
         var titulos = $(".typeahead").val();
                   $("#list-store .panel .list-group").html("");

          //alert(titulos);
        $.getJSON( "tiendas-format.json", function( data ) {
            $.each( data, function( key, val ) {
     
              contentHTML[key] = val['content'];
              contentAll[key] = {"titulo":val['titulo'],"direccion":val['direccion'],"horario":val['horario'],"telefono":val['telefono'],"tipo":val['tipo'],"lat":val['lat'],"lng":val['lng'],"servicios":val['servicios'],"foto":val['foto']};
             // datos.push(val['titulo']);
         //   items[2]= val['content'];
             if(val['titulo'] === titulos){
               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
             }
             if(titulos == ""){
               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><!--<p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p>--></li>");
             }
         

            });

        });
            //findMeWithCalc(destinationEnd);

        }

    } else {
        // Nothing is active so it is a new value (or maybe empty value)
                               // alert($(".typeahead").val());

    }
   });


  });

window.addEventListener('onorientationchange', function () {
    if (window.orientation == -90) {
        document.getElementById('orient').className = 'orientright';
    }
    if (window.orientation == 90) {
        document.getElementById('orient').className = 'orientleft';
    }
    if (window.orientation == 0) {
        document.getElementById('orient').className = '';
    }
}, true);

jQuery(function($) {
 
  
  // /////
  // CLEARABLE INPUT
  function tog(v){return v?'addClass':'removeClass';} 
  $(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
  }).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
  }).on('touchstart click', '.onX', function( ev ){
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
  });
  
  
});

/*function whenChangueSelect(){

  var tipot =  $('input[name=optionsRadios]:checked', '#formularioTipo').val();
  alert(tipot);
  
}*/


 //$.get('tiendas.json', function(data){
   

//},'json');
 
      // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
var radius; //how is this set up
var iconBase = '/mobileAssets/images/locator/marker-local.png';
var iconoGPS = '/mobileAssets/images/locator/icon_ubicacion.png';
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var stepDisplay;
var markerArray = [];
//var markers 
var coords;
var destinationEnd;

var lat;
var lng;

function initializeAlterno(wLat,wLng){
  radius = 100;
  console.log(wLat,wLng);
var mapOptions = {
    zoom: 15
  };
   map = new google.maps.Map(document.getElementById('map-container'),
      mapOptions);
     ga('send', 'event',  'inicializadorDeMapaAlterno','map', 'ver_mapa_alterno');

registrandoPosicion = false;
    
      var pos = new google.maps.LatLng(wLat,wLng);

        coords = new google.maps.LatLng(wLat,wLng);
      /*var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });*/

       
      var markers = new google.maps.Marker({
           position: pos,
              map: map,
              icon: iconBase,
              animation: google.maps.Animation.DROP
        });

      map.setCenter(pos);
    directionsDisplay.setMap(map);
       setMarkers(pos, radius, map);


}

function initialize() {

  radius = 15000; //how is this set up
  var mapOptions = {
    zoom: 13
  };
      var rendererOptions = {
        draggable: true
       };

directionsDisplay = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById('map-container'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
      ga('send', 'event',  'aceptaronGPS','gps', 'aceptaron_localizacion');

registrandoPosicion = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      
      lati = position.coords.latitude;
      longi = position.coords.longitude;

        coords = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      /*var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });*/

       
      var markers = new google.maps.Marker({
           position: pos,
              map: map,
              icon: iconoGPS,
              animation: google.maps.Animation.DROP
        });

      map.setCenter(pos);
    directionsDisplay.setMap(map);

    setMarkers(pos, radius, map);


    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  registrandoPosicion = false;
        ga('send', 'event',  'noAceptaronGPS','gps', 'no_aceptaron_localizacion');

                  radius = 15000; //how is this set up
              var mapOptions = {
                  zoom: 5
                };
             /* var rendererOptions = {
                  draggable: true
               };*/

//directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  map = new google.maps.Map(document.getElementById('map-container'),
      mapOptions);


    var pos = new google.maps.LatLng(19.362332,-99.275517);
    coords = new google.maps.LatLng(19.362332,-99.275517);



  /*var options = {
    map: map,
    icon: iconoGPS,
    position: new google.maps.LatLng(19.362332,-99.275517),
    content: content
  };*/

  //var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(pos);
    directionsDisplay.setMap(map);

    setMarkers(pos, radius, map);
  //map.setCenter(options.position);
}
function mapAnimate(lati,longi){
 //console.log("-->"+lati+longi);
      ga('send', 'event',  'animacionMapa','click', 'animacion_mapa_gps');

             map.panTo(new google.maps.LatLng(lati, longi));

   /*LatLng latLng = new LatLng(lati, longi);
    CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(latLng, 10);
    map.animateCamera(cameraUpdate);
    locationManager.removeUpdates(this);*/
}
/*Markers*/

   function setMarkers(center, radius, map) {
        var json = (function () { 
            var json = null; 
            $.ajax({ 
                'async': false, 
                'global': false, 
                'url': "tiendas-format.json", 
                'dataType': "json", 
                'success': function (data) {
                     json = data; 
                 }
            });
            return json;
        })();

       /* var circle = new google.maps.Circle({
                strokeColor: '#000000',
                strokeOpacity: 0.25,
                strokeWeight: 1.0,
                fillColor: '#ffffff',
                fillOpacity: 0.1,
                clickable: false,
                map: map,
                center: center,
                radius: radius
            });*/
      //  var bounds = circle.getBounds();

        //loop between each of the json elements
        for (var i = 0, length = json.length; i < length; i++) {
            var data = json[i],
            latLng = new google.maps.LatLng(data.lat, data.lng); 



           // if(bounds.contains(latLng)) {
                // Creating a marker and putting it on the map
                 marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: data.content,
                    icon: iconBase,
                    optimized: false,
                    animation: google.maps.Animation.DROP

                });
                infoBox(map, marker, data,i);
                markerArray.push(marker);
           // }
        }

      //  circle.bindTo('center', marker, 'position');
    }
$("#shadowGlobo").bind("click",function(){
var isiPad = navigator.userAgent.match(/iPad/i) != null;

             
  $("#resumenGlobo").animate({
                       height:"0%"
               }, 200, "linear", function() {
                 $('#resumenGlobo').css("display","none");
                    $('#shadowGlobo').css("display","none");

                });
//if($("#detalle-tienda").hasClass('in') == true){
  if(isiPad){
  $("#detalle-tienda").animate({
    height:"0%"
               }, 200, "linear", function() {
                 $('#detalle-tienda').css("display","none");
                    $('#shadowGlobo').css("display","none");

                });
}
//}
  

});
function closedAllOver(){
var isiPad = navigator.userAgent.match(/iPad/i) != null;

   $("#resumenGlobo").animate({
                       height:"0%"
               }, 200, "linear", function() {
                 $('#resumenGlobo').css("display","none");
                    $('#shadowGlobo').css("display","none");

                });
     if(isiPad){
  $("#detalle-tienda").animate({
    height:"0%"
               }, 200, "linear", function() {
                 $('#detalle-tienda').css("display","none");
                    $('#shadowGlobo').css("display","none");

                });
}

}
    function infoBox(map, marker, data,i) {
        var infoWindow = new google.maps.InfoWindow();
        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function(e) {
            lat = this.position.lat();
            lng = this.position.lng();
             var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
              //alert(isiPad);
                $('#resumenGlobo').css("display","none");
                   /*$("#resumenGlobo").animate({
                       height:"30%"
                   });*/
               //$('#btn-all').css("display","none");
                $('#shadowGlobo').css("display","block");

               $('#resumenGlobo').html('<b>' + data.content + '</b>');
               
                  $("#map-container-need").css("display","none");

               /*$("#detalle-tienda").animate({
                  height:"0%"
               },300,"linear",function(){
                
                 //$("#detalle-tienda").css("display","none");

               });*/


             }else{
            
             //$("#map-container").css("display","none");
            //infoWindow.setContent(data.content);
            //infoWindow.open(map, marker);
             $('#resumenGlobo').css("display","inline");
             $("#resumenGlobo").animate({
                       height:"17em"
               });
           // $('#btn-all').css("display","none");
             //$('#resumenGlobo').html('<b>' + data.content + '</b>');

            $('#shadowGlobo').css("display","block");

             $('#rsmTitulo').empty();
             $('#rsmTitulo').empty();
             $('#trTel').empty();
             $('#trHor').empty();
                        console.log("numero ->"+i);

             $('#resumenGlobo').attr("onclick","openDetailStoreData("+data.lat+","+data.lng+","+i+")");
             $('#rsmTitulo').html(data.titulo);
             $('#rsmDescripcion').html(data.direccion);
             $('#trTel').html(data.telefono);
             $('#trHor').html(data.horario);

             $("#detalle-tienda").animate({
                  height:"0%"
              },300,"linear",function(){
                
                $("#detalle-tienda").css("display","none");

              });
 
            }

        });

        // Creating a closure to retain the correct data 
        // Note how I pass the current data in the loop into the closure (marker, data)
        (function(marker, data) {
          // Attaching a click event to the current marker
          google.maps.event.addListener(marker, "click", function(e) {
            //infoWindow.setContent(data.content);
            //infoWindow.open(map, marker);
             //var warnings = $('#resumenGlobo');
            var isiPad = navigator.userAgent.match(/iPad/i) != null;
             
           if(isiPad){
           
           
           $( ".sprite-btn_mas" ).on( "click", function() {
                  //alert( $( this ).text() );
            });
           $( ".sprite-btn_mas" ).trigger( "click" );
           $("#map-container-need").css("display","none");
            

           }else{
            console.log("numero 1->"+i);

            $('#resumenGlobo').css("display","block");
            $('#shadowGlobo').css("display","inline");

              $("#resumenGlobo").animate({
                       height:"17em"
               });
            //$('#btn-all').css("display","none");
          $('#resumenGlobo').attr("onclick","openDetailStoreData("+data.lat+","+data.lng+","+i+")");

             $('#rsmTitulo').empty();
             $('#rsmDescripcion').empty();
             $('#trTel').empty();
             $('#trHor').empty();

            $('#rsmTitulo').html(data.titulo);
             $('#rsmDescripcion').html(data.direccion);
             $('#trTel').html(data.telefono);
             $('#trHor').html(data.horario);
           }

          });
        })(marker, data);
    }

/*function findMeWithCalc(){
  //google.maps.visualRefresh = true;

    
    directionsDisplay = new google.maps.DirectionsRenderer();


   

  console.log("find with calc--->"+lat+","+lng+"cordenadas actuales-->"+coords);

      console.log("Las cordenadas end-->"+destinationEnd);
      console.log("Las cordenadas ini-->"+coords);

     //set map options
     var mapOptions = 
     {
       zoom: 13,
       mapTypeId: google.maps.MapTypeId.ROADMAP, 
       center: coords
      };

     map = new google.maps.Map( document.getElementById("map-container-need"), mapOptions);
    
    directionsDisplay.setMap(map);

 




 
}*/
function removeMarkers()
{
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
}
function calcRoute(lat,lng){
//initialize();
//calcRoute()
// First, remove any existing markers from the map.
  /*for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Now, clear the array itself.
  markerArray = [];
*/

      destinationEnd = new google.maps.LatLng(lat, lng);

     var request = {
       origin: coords,
       destination: destinationEnd,
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };

     directionsService.route(request, function (response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
       /* var warnings = document.getElementById('warning-panel');
        warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';*/
        directionsDisplay.setOptions({ preserveViewport: true });

         directionsDisplay.setDirections(response);
         //showSteps(response);
       }
     });
}
//calcRoute()






/*Markers*/
google.maps.event.addDomListener(window, 'load', initialize);

 function cerrarGlobo(){
       var isiPad = navigator.userAgent.match(/iPad/i) != null;

             $("#resumenGlobo").animate({
                       height:"0%"
               }, 200, "linear", function() {
                 $('#resumenGlobo').css("display","none");
                });

                if(isiPad){

                 //$("#btn-all").css("display","none");

                }else{

                 //$('#btn-all').css("display","inline");

                }

}




 function openDetailStore(){
 console.log(contentHTML);
    ga('send', 'event', 'openDetailStore', 'click', 'ver_detalle_tienda_sencillo');

   $("#resumenGlobo").animate({
                       height:"0%"
               }, 200, "linear", function() {
                 $('#resumenGlobo').css("display","none");
                });
   $("#detalle-tienda").css("display","inline-block");
   $("#detalle-tienda").animate({
    height:"92%"
   });
   $("#botonClosedDetail").attr("onclick","closeDetailStore("+lat+","+lng+")");
   //findMeWithCalc(lat,lng);
   $("#map-container").css("display","none");
   $("#map-container-need").css("display","none");


   // findMeWithCalc();
 }
  function openDetailStoreData(lat,lng,val){
    //console.log("data--->"+contentHTML);
    //console.log("todo--->"+contentAll[val].titulo);
//$("body").css("overflow", "hidden");
    lat = lat;
    lng = lng;
    //console.log("cordenadas open detail data-->"+lat+","+lng);
   ga('send', 'event', 'openDetailStoreData','click', 'ver_detalle_tienda_data');

    var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
$("#detalle-tienda").css("display","inline-block");
   
   $("#detalle-tienda").animate({
    height:"650px"
   });

             }else{

   $("#detalle-tienda").css("display","inline-block");
   $("#detalle-tienda").animate({
    height:"92%"
   });

   }

$("#sectionAllLocators").animate({opacity:'0.0'},400,function(){
  
  $("#sectionAllLocators").css("display","none");
   $("#map-container-need").css("display","none");

  //$("#btn-all").css("display","inline-block");

});
         //   $('#btn-all').css("display","inline");

   $("#botonClosedDetail").attr("onclick","closeDetailStore("+lat+","+lng+")");
    
    if(isiPad){
   $("#map-container").css("display","inline");
 }else{
   $("#map-container").css("opacity","1");


 }

   $("#map-container-need").css("display","none");

   // $('#resumenGlobo').html('<b>' + contentHTML[val]+ '</b>');
   $('#resumenGlobo').css("display","none");

   if(contentAll[val].foto == ""){

       $('#img-detalle').attr("src","/mobileAssets/images/locator/img_liver.jpg");

   }else{

       $('#img-detalle').attr("src","http://www.liverpool.com.mx/"+contentAll[val].foto);


   }
    $('#detalle-tienda #titulo-de-tienda').html(contentAll[val].titulo);
    $('#detalle-tienda #direccion-de-tienda').html(contentAll[val].direccion);
    $('#detalle-tienda #telefono-de-tienda').html(contentAll[val].telefono);
    $('#detalle-tienda #horario-de-tienda').html(contentAll[val].horario);

    $('#detalle-tienda #llamada-numero').attr("href","tel:"+contentAll[val].telefono);
    $('#detalle-tienda #servicios-de-tienda').html(contentAll[val].servicios);
     console.log("servicios"+contentAll[val].servicios);

  //findMeWithCalc();
 }
 function closeDetailStore(lat,lng,direccion){
  

     if( (navigator.platform.indexOf("iPhone") != -1) 
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1)){
         window.open("maps://maps.google.com/maps?daddr="+lat+","+lng+"&amp;ll=");
        }
    else{
         window.open("http://maps.google.com/maps?daddr="+lat+","+lng+"&amp;ll=");
    }
      ga('send', 'event',  'detailStoreComoLlegar','click', 'como_llegar');
      //window.open("geo://?center="+lat+","+lng+"&zoom=15");//"+lat+","+lng);


  /* console.log("cordenadas close detail-->"+lat+","+lng);
   lat = lat;
   lng = lng;
  var isiPad = navigator.userAgent.match(/iPad/i) != null;*/

     //var lt = position.coords.lat;                    
     //users current
     //var lg = position.coords.lng;                 
     //location
     /* destinationEnd = new google.maps.LatLng(position.coords.lat, position.coords.lng);*/
   /* if(registrandoPosicion == false){

      initializeAlterno(lat, lng);
    
    }else{
     
     calcRoute(lat,lng)
    removeMarkers();

    }
   $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){

              $("#detalle-tienda").css("display","none");

                   $("#resumenGlobo").animate({
                       height:"30%"
                   }, 300, "linear", function() {

                    if(isiPad){
                      $('#resumenGlobo').css("display","none");

                    }else{

                          $('#resumenGlobo').css("display","none");


                    }
                         
                             $("#map-container").css("display","inline");
//$("#map-container").css("width","100%");
                          //$("#map-container-need").css("display","inline");

                          //$("#map-container-need").animate({

                          //         opacity: '1.0'

                          //},400,function(){

                               //$("#map-container").css("display","none");
                              $("#sectionAllLocators").animate({opacity:'0.0'},400,function(){
                                    $("#sectionAllLocators").css("display","none");

                                     if(isiPad){

                                     // $("#btn-all").css("display","none");

                                     }else{

                                     //$("#btn-all").css("display","inline-block");


                                     }

                                });

                            //});


                    });

  });*/

 }
 function closeOnlyDetail(){
   $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){

              $("#detalle-tienda").css("display","none");

                   $("#resumenGlobo").animate({
                       height:"17em"
                   }, 300, "linear", function() {

                    if(isiPad){
                      $('#resumenGlobo').css("display","none");

                    }else{

                          $('#resumenGlobo').css("display","none");


                    }
                         
                            // $("#map-container").css("display","inline");
//$("#map-container").css("width","100%");
                          //$("#map-container-need").css("display","inline");

                          //$("#map-container-need").animate({

                          //         opacity: '1.0'

                          //},400,function(){

                               //$("#map-container").css("display","none");
                             /* $("#sectionAllLocators").animate({opacity:'0.0'},400,function(){
                                    $("#sectionAllLocators").css("display","none");

                                     if(isiPad){

                                     // $("#btn-all").css("display","none");

                                     }else{

                                     //$("#btn-all").css("display","inline-block");


                                     }

                                });*/

                            //});


                    });

  });
 }
 function openAllList(){


  closeOnlyDetail();
  console.log("abrir"+registrandoPosicion);
  if(registrandoPosicion == false){
     $('#byEstate').modal('toggle');
     statusBackForList = true;
 }

    ga('send', 'event', 'openAllList', 'click', 'boton_busqueda');

var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
  $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){
    $("#detalle-tienda").css("display","none");
    });

$("#map-container").css("display","inline");
   $("#map-container-need").css("display","none");
$("#sectionAllLocators").css("z-index","100");
$("#sectionAllLocators").css("display","inline-block");
$("#sectionAllLocators").animate({opacity:'1.0'},400,function(){
  
});
             
             }else{

   $("#map-container").css("opacity","1");
   $("#map-container-need").css("display","none");

           $("#sectionAllLocators").css("display","inline-block");
           $("#sectionAllLocators").animate({opacity:'1.0'},400,function(){
  

           });

      }


//});
 }
function backPage(){

closedAllOver();
  if ( $("#detalle-tienda").is(":visible") || $("#sectionAllLocators").is(":visible")) {
    
   openAllMaps();

} else { 
    //alert("no esta visible");
    
    window.history.back();
}


}

 function openAllMaps(){


console.log("estado "+ $('#byEstate').hasClass('in'));

     if($('#byEstate').hasClass('in') == true){

        //statusBackForList = false;
        $('#byEstate').modal('toggle');
         statusBackForList = false;

       }
if(registrandoPosicion == true){
   mapAnimate(lati,longi);

}else{
  ga('send', 'event',  'verTodasLasTiendasMapa','click', 'ver_las_tiendas_mapa');

   initialize(); 
}
  //$("#map-container").css("width","100%");
//$("#map-container").css("display","none");
var isiPad = navigator.userAgent.match(/iPad/i) != null;

 $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){
    $("#detalle-tienda").css("display","none");
    });

   $("#map-container-need").css("display","none");
   $("#map-container").css("opacity","1");
$("#map-container").css("display","inline");

$("#map-container").animate({

    opacity: '1.0'

},400,function(){

$("#sectionAllLocators").animate({opacity:'0.0'},400,function(){
  
  $("#sectionAllLocators").css("display","none");

                                     /*if(isiPad){

                                      //$("#btn-all").css("display","none");

                                     }else{

                                     //$("#btn-all").css("display","inline-block");


                                     }*/

});

});
 }

 function showMapHide(){
//alert($('#byEstate').hasClass('in'));
       if($('#myModal').hasClass('in') == true){

        statusBackForList = false;
        $('#myModal').modal('toggle');
       }else{
console.log("mantener cerrado"+statusBackForList);
if(statusBackForList == true){
     $('#byEstate').modal('toggle');
     statusBackForList = false;
 }else{
   var isiPad = navigator.userAgent.match(/iPad/i) != null;

    $("#sectionAllLocators").css("display","none");
      statusBackAll = false;

}
}
/*if($('#byEstate').hasClass('in') == true){
 $('#byEstate').modal('toggle');
}
   //  $('#byEstate').modal('toggle');

var isiPad = navigator.userAgent.match(/iPad/i) != null;

    $("#sectionAllLocators").css("display","none");

                                     if(isiPad){

                                     // $("#btn-all").css("display","none");

                                     }else{

                                     //$("#btn-all").css("display","inline-block");


                                     }*/

 }

