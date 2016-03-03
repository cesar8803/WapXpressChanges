 var heightHTML = $(document).outerHeight();
 heightHTML = heightHTML - 50;
 console.log(heightHTML);
 $(document).ready(function(){

    //Function 

    $('.icon-search-liverpool').click(showLoginModal);

    $(".mm-second-content").find('div.row').hide();
    /*$(".megaMenu").css("height",heightHTML+'px');
    $(".megaMenu").css("top",'-'+heightHTML+'px');*/
    
    $(".mega-menu-root").css("height",heightHTML+'px');
    $(".mega-menu-main").css("height",heightHTML+'px');
    $(".mega-menu-second").css("height",heightHTML+'px');



    $('#busca').keyup(function(){
        var s = $(this).val();
        console.log(s);
        if(s.length > 2) $('#sb_cb0').css('visibility', 'visible');
        if(s.length <= 2) $('#sb_cb0').css('visibility', 'hidden');

    });

      $('#busca').on('focus', function () {
          var ot=parseInt($(this).offset().top),
              pt=parseInt($(this).position().top);
          var st=ot-0;//108 is height of up div
          var scrollTop=$('.wrapper').scrollTop();
          if(scrollTop){
              st=st+scrollTop;
          }

                 console.log(st-($(this).height()));

          $("body,html,.wrapper,.mobmenu").animate({
              scrollTop: 49
          },200);
      });



 });

// Listen for orientation changes
// Listen for resize changes
window.addEventListener("resize", function() {
    // Get screen size (inner/outerWidth, inner/outerHeight)
    if($(".c-hamburger").hasClass("is-active")===true){

    }else{
    heightHTML = $("body").outerHeight();
    $(".mega-menu-root").css("height",heightHTML+'px');
    $(".mega-menu-main").css("height",heightHTML+'px');
    $(".mega-menu-second").css("height",heightHTML+'px');
    }


}, false);
//Animation for mega menu button
 (function() {
    "use strict";
    var toggles = document.querySelectorAll(".c-hamburger");
       for (var i = toggles.length - 1; i >= 0; i--) {
           var toggle = toggles[i];
           toggleHandler(toggle);
       };
    function toggleHandler(toggle) {
       toggle.addEventListener( "click", function(e) {
            e.preventDefault();
        if($(".mega-menu-second").hasClass("is-menu-second-active")===true){
            //esconde la vista que contiene el segundo y tercer nivel
            $(".mm-second-content").find('div.row').hide();
            hideMegaMenuSecond();
            console.log("se ejecuta");
        } else{  
        if($(".mega-menu-main").hasClass("is-menu-main-active") === true){
               //esconde la vista en el menu que contiene el primer nivel
               hideMegaMenuMain();
        }else{

            if(this.classList.contains("is-active") === true){
                //esconde la vista que contiene todo el megamenu y restaura el scroll del body
                this.classList.remove("is-active");
                hideMegaMenuMobo();

                focusWrapperBody(); 

                
            } else{
                //muestra la vista que contiene todo el megamenu y modifica el scroll del body
                this.classList.add("is-active");
                showMegaMenuMobo();

                unfocusWrapperBody(); 
                
            }
        }
        }
       });
    }
})();
/*original efect*/
showMegaMenuMobo = function(){
$(".megaMenu").css("display","inline-block")
$(".megaMenu").css("position","absolute");
$(".megaMenu").animate({top:"56px"},200,function(){

});
//$(".megaMenu").css("top","56px");
$(".megaMenu").css("left","0%");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height","100%");
$(".megaMenu").css("z-index","1");
}
hideMegaMenuMobo = function(){

$(".megaMenu").css("position","absolute");
$(".megaMenu").animate({top:"-110%"},200,function(){
$(".megaMenu").css("display","none")
});
$(".megaMenu").css("left","0%");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height","100%");
$(".megaMenu").css("z-index","0");
}

$(".buscar-departamento").on("click",function(){
    //Toggle click
           if($(".mega-menu-main").hasClass("is-menu-main-active") === true){
                $(".mega-menu-main").removeClass("is-menu-main-active");
                hideMegaMenuMain();
            } else{
                $(".mega-menu-main").addClass("is-menu-main-active");
                showMegaMenuMain();
            }
});
/*Show menu main*/
showMegaMenuMain = function(){
    //e.preventDefault();
    $(".mega-menu-main").animate({left:"0%"},200,function(){

    });
}
hideMegaMenuMain = function(){
    //e.preventDefault();
    $(".mega-menu-main").animate({left:"-100%"},200,function(){
                $(".mega-menu-main").removeClass("is-menu-main-active");
    });
}
hideMegaMenuMainNoAnimate = function(){
    //e.preventDefault();
    $(".mega-menu-main").css("left","-100%");
    $(".mega-menu-main").removeClass("is-menu-main-active");

}

//show megamenu second
$(".mega-menu-main > ul.mega-menu-all-content > li > a").on("click", function(e){
    e.preventDefault();
    var idcategoria = $(this).attr("rel");
    var newId = "#" + idcategoria;
        $(newId).css('display', 'block');
    console.log(idcategoria);
    showMegaMenuSecond();
   
});
showMegaMenuSecond = function(){
   var heightSecond = $(".mega-menu-main").outerHeight();
   $(".mega-menu-second").css("height",heightSecond+"px");
   $(".mega-menu-second").css("display","inline-block");
   $(".mega-menu-second").animate({left:"0%"},200,function(){
       $(".mega-menu-second").addClass("is-menu-second-active");
   
   });
}
hideMegaMenuSecond = function(){
   $(".mega-menu-second").animate({left:"-100%"},200,function(){
       $(".mega-menu-second").css("display","none");
       $(".mega-menu-second").removeClass("is-menu-second-active");
   
   });
}
$('.mm-item-categorias h3').on("click", function() {
if ($(this).find("a").hasClass('active-item-second')) {
$(this).parent().find("ul").slideToggle(200);
$(this).find("a").removeClass('active-item-second');
}else{
   $('.mm-item-categorias ul').slideUp(200);
   $('.mm-item-categorias h3 a').removeClass('active-item-second');
   $(this).parent().find("ul").slideToggle(200);
   $(this).find("a").addClass('active-item-second');
}
/*}
else {
$('.right-menu ul').slideUp(500);
$('.right-menu h3').removeClass('showMinusIcon');
$(this).parent().find("ul").slideToggle(500);
$(this).addClass('showMinusIcon');
}*/

});
unfocusWrapperBody = function(){

                $(".wrapper").css("position","fixed");
                $(".wrapper").css("overflow-y","hidden");
                $(".wrapper").css("overflow-x","hidden");
                $(".wrapper").css("-webkit-overflow-scrolling","auto");
                $("body").css("position","fixed");
                $("body").css("overflow-y","hidden");
                $("body").css("overflow-x","hidden");
                $("body").css("-webkit-overflow-scrolling","auto");
}
focusWrapperBody = function(){

    $(".wrapper").css("position","");
    $(".wrapper").css("overflow-y","");
    $(".wrapper").css("-webkit-overflow-scrolling","");
    $("body").css("position","");
    $("body").css("overflow-y", "scroll");
    $("body").css("overflow-x"," hidden");
    $("body").css("-webkit-overflow-scrolling","touch");
    
}



function showLoginModal(){
    $('#full-width').modal('show'); 
}
/*Other efect*/
//var heightHDR = $(".megaMenu").height();
//var heightHDR = heightHDR+"px"
//console.log(heightHDR);
/*showMegaMenuMobo = function(){

$(".megaMenu").css("position","fixed");
$(".megaMenu").animate({left:"0%"},400,function(){

});
$(".megaMenu").css("top","56px");
//$(".megaMenu").css("left","0%");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height",heightHDR);
$(".megaMenu").css("z-index","999");
}
hideMegaMenuMobo = function(){

$(".megaMenu").css("position","absolute");
$(".megaMenu").animate({left:"-110%"},400,function(){

});
$(".megaMenu").css("top","56px");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height",heightHDR);
$(".megaMenu").css("z-index","0");
}*/