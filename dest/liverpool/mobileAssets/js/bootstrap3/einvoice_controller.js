$(document).ready(function(){

  $(".table tr").click(function(){
   //console.log("click");

   var inp = $(this).find("input");
   $(inp).prop("checked", true);
  });


});