   // add the animation to the modal+
$( ".modal-fullscreen").each(function(index) {
   $(this).on('show.bs.modal', function (e) {
 var open = $(this).attr('data-easein');
     if(open == 'shake') {
                 $('#modalFiltros').velocity('callout.' + open);
            } else if(open == 'pulse') {
                 $('#modalFiltros').velocity('callout.' + open);
            } else if(open == 'tada') {
                 $('#modalFiltros').velocity('callout.' + open);
            } else if(open == 'flash') {
                 $('#modalFiltros').velocity('callout.' + open);
            }  else if(open == 'bounce') {
                 $('#modalFiltros').velocity('callout.' + open);
            } else if(open == 'swing') {
                 $('#modalFiltros').velocity('callout.' + open);
            }else {
              $('#modalFiltros').velocity('transition.' + open);
            }
             
}); 
});

$(".cerrar-filtros").on("click",function(){

$(".modal-fullscreen").velocity({right:"-100%"});
$(".modal-dialog").velocity({right:"-100%"});
$(".modal-backdrop .in").velocity({right:"-100%"});

    $(".modal-content").velocity({right:"-100%"},function(){
    $('#modalFiltros').modal('toggle');
    $(".modal-fullscreen").velocity({right:"0%"});
    $(".modal-dialog").velocity({right:"0%"});
    $(".modal-content").velocity({right:"0%"});
});
/*$(".modal-fullscreen").removeClass("in");
$(".modal-dialog").removeClass("in");
$(".modal-content").removeClass("in");
$(".modal-backdrop").removeClass("in");*/

});

$('.filtros-secundario h3').on("click", function() {
if ($(this).find("a").hasClass('active-filter')) {
$(this).parent().find("ul").slideToggle(200);
$(this).find("a").removeClass('active-filter');
}else{
   $('.filtros-secundario ul').slideUp(200);
   $('.filtros-secundario h3 a').removeClass('active-filter');
   $(this).parent().find("ul").slideToggle(200);
   $(this).find("a").addClass('active-filter');
}
});
