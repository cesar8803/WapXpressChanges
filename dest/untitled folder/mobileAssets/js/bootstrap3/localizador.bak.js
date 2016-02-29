 var contentHTML = []; 
 var contentAll = [];
 var registrandoPosicion = false;

$(document).ready(function(){

  var datos = [];
var items = ["Saab", "Volvo", "BMW"];
var tipoVar;
var estadoVar;

$('input[name=stateRadio]').on('change', function() {

     $('#byEstate').modal('toggle');

     console.log($('input[name=stateRadio]:checked').val());
     $("#list-store .panel .list-group").html("");
     estadoVar = $('input[name=stateRadio]:checked').val();

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
         if(estadoVar == "todas"){

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
        // Some item from your model is active!
        if (current.name == $(".typeahead").val()) {
            // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
            //alert($(".typeahead").val());
            
        } else {
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
               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p></li>");
             }
             if(titulos == ""){
               $("#list-store .panel .list-group").append("<li class='list-group-item' onclick='openDetailStoreData("+val['lat']+","+val['lng']+","+key+")'><h4>"+val['titulo']+"</h4><p>Dirección:"+val['direccion']+"</p><p>Teléfono:"+val['telefono']+"</p><p>Horario:"+val['horario']+"</p></li>");
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

registrandoPosicion = true;
    
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
registrandoPosicion = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

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
                infoBox(map, marker, data);
                markerArray.push(marker);
           // }
        }

      //  circle.bindTo('center', marker, 'position');
    }


    function infoBox(map, marker, data) {
        var infoWindow = new google.maps.InfoWindow();
        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function(e) {
            lat = this.position.lat();
            lng = this.position.lng();
             var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
              //alert(isiPad);
                $('#panel-info').css("display","none");
                   /*$("#panel-info").animate({
                       height:"30%"
                   });*/
               $('#btn-all').css("display","none");
               $('#panel-info').html('<b>' + data.content + '</b>');
               
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
             $('#panel-info').css("display","inline");
             $("#panel-info").animate({
                       height:"30%"
               });
            $('#btn-all').css("display","none");
             $('#panel-info').html('<b>' + data.content + '</b>');
             
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
             //var warnings = $('#panel-info');
            var isiPad = navigator.userAgent.match(/iPad/i) != null;
             
           if(isiPad){
           
           
           $( ".sprite-btn_mas" ).on( "click", function() {
                  //alert( $( this ).text() );
            });
           $( ".sprite-btn_mas" ).trigger( "click" );
           $("#map-container-need").css("display","none");
            

           }else{

            $('#panel-info').css("display","inline");
              $("#panel-info").animate({
                       height:"30%"
               });
            $('#btn-all').css("display","none");
            $('#panel-info').html('<b>' + data.content + '</b>');
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

             $("#panel-info").animate({
                       height:"0%"
               }, 400, "linear", function() {
                 $('#panel-info').css("display","none");
                });
                                    if(isiPad){

                                        $("#btn-all").css("display","none");

                                     }else{

                                        $('#btn-all').css("display","inline");

                                     }

}




 function openDetailStore(){
 console.log(contentHTML);

   $("#panel-info").animate({
                       height:"0%"
               }, 400, "linear", function() {
                 $('#panel-info').css("display","none");
                });
   $("#detalle-tienda").css("display","inline-block");
   $("#detalle-tienda").animate({
    height:"92%"
   });
   $("#botonClosedDetail").attr("onclick","closeDetailStore("+lat+","+lng+")");
   //findMeWithCalc(lat,lng);
   $("#map-container").css("display","none");
   $("#map-container-need").css("display","none");


    findMeWithCalc();
 }
  function openDetailStoreData(lat,lng,val){
    //console.log("data--->"+contentHTML);
    //console.log("todo--->"+contentAll[val].titulo);


    lat = lat;
    lng = lng;
    //console.log("cordenadas open detail data-->"+lat+","+lng);

    var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
$("#detalle-tienda").css("display","inline-block");
   $("#detalle-tienda").animate({
    height:"93%"
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

   // $('#panel-info').html('<b>' + contentHTML[val]+ '</b>');
   $('#panel-info').css("display","none");

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

  findMeWithCalc();
 }
 function closeDetailStore(lat,lng){
  

   console.log("cordenadas close detail-->"+lat+","+lng);
   lat = lat;
   lng = lng;
  var isiPad = navigator.userAgent.match(/iPad/i) != null;

     //var lt = position.coords.lat;                    
     //users current
     //var lg = position.coords.lng;                 
     //location
     /* destinationEnd = new google.maps.LatLng(position.coords.lat, position.coords.lng);*/
    if(registrandoPosicion == false){

      initializeAlterno(lat, lng);
    
    }else{
     
     calcRoute(lat,lng)
    removeMarkers();

    }
   $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){

              $("#detalle-tienda").css("display","none");

                   $("#panel-info").animate({
                       height:"30%"
                   }, 300, "linear", function() {

                    if(isiPad){
                      $('#panel-info').css("display","none");

                    }else{

                          $('#panel-info').css("display","none");


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

                                      $("#btn-all").css("display","none");

                                     }else{

                                     $("#btn-all").css("display","inline-block");


                                     }

                                });

                            //});


                    });

  });

 }
 function openAllList(){

//initialize();
/*$("#map-container").animate({

    opacity: '0.0'

},400,function(){*/
  if(registrandoPosicion == false){
     $('#byEstate').modal('toggle');
 }


var isiPad = navigator.userAgent.match(/iPad/i) != null;

             if(isiPad){
  $("#detalle-tienda").animate({
    height:"0%"
   },300,"linear",function(){
    $("#detalle-tienda").css("display","none");
    });

$("#map-container").css("display","inline");
   $("#map-container-need").css("display","none");
$("#sectionAllLocators").css("z-index","9999");
$("#sectionAllLocators").css("display","inline-block");
$("#sectionAllLocators").animate({opacity:'1.0'},400,function(){
  
  $("#btn-all").css("display","none");

});
             
             }else{

   $("#map-container").css("opacity","1");
   //$("#map-container").css("width","0");
   $("#map-container-need").css("display","none");

           $("#sectionAllLocators").css("display","inline-block");
           $("#sectionAllLocators").animate({opacity:'1.0'},400,function(){
  
             $("#btn-all").css("display","none");

           });

      }


//});
 }
function backPage(){

  if ( $("#detalle-tienda").is(":visible") || $("#sectionAllLocators").is(":visible")) {
    
   openAllMaps();

} else { 
    //alert("no esta visible");
    
    window.history.back();
}
}

 function openAllMaps(){
  initialize();
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

                                     if(isiPad){

                                      $("#btn-all").css("display","none");

                                     }else{

                                     $("#btn-all").css("display","inline-block");


                                     }

});

});
 }

 function showMapHide(){

var isiPad = navigator.userAgent.match(/iPad/i) != null;

    $("#sectionAllLocators").css("display","none");

     if(isiPad){

                                      $("#btn-all").css("display","none");

                                     }else{

                                     $("#btn-all").css("display","inline-block");


                                     }

 }
