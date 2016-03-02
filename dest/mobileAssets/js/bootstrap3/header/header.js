 var heightHTML = $("body").outerHeight();
 $(document).ready(function(){

    $(".mm-second-content").find('div.row').hide();
    $(".megaMenu").css("height",heightHTML+'px');
    $(".megaMenu").css("top",'-'+heightHTML+'px');
    $(".mega-menu-root").css("height",heightHTML+'px');
    $(".mega-menu-main").css("height",heightHTML+'px');
    $(".mega-menu-second").css("height",heightHTML+'px');
 });

// Listen for orientation changes
// Listen for resize changes
window.addEventListener("resize", function() {
    // Get screen size (inner/outerWidth, inner/outerHeight)
    heightHTML = $("body").outerHeight();
    $(".megaMenu").css("height",heightHTML+'px');
    $(".megaMenu").css("top",'-'+heightHTML+'px');
    $(".mega-menu-root").css("height",heightHTML+'px');
    $(".mega-menu-main").css("height",heightHTML+'px');
    $(".mega-menu-second").css("height",heightHTML+'px');


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
                $("wrapper").css("position","");
                $("wrapper").css("overflow-y","scroll");
                $("wrapper").css("-webkit-overflow-scrolling","touch");
                
            } else{
                //muestra la vista que contiene todo el megamenu y modifica el scroll del body
                this.classList.add("is-active");
                showMegaMenuMobo();
                $("wrapper").css("position","fixed");
                $("wrapper").css("width","100%");
                $("wrapper").css("overflow-y","hidden");
                $("wrapper").css("overflow-x","hidden");
                $("wrapper").css("-webkit-overflow-scrolling","auto");

                /*$("body").css("-webkit-overflow-scrolling","auto")
                $("body").css("overflow-y","hidden");
                $("body").css("-webkit-transform","translate3d(0,0,0)");
                */
                /*document.ontouchmove = function(event){
                event.preventDefault();
                }*/
            }
        }
        }
       });
    }
})();
/*original efect*/
showMegaMenuMobo = function(){

$(".megaMenu").css("position","absolute");
$(".megaMenu").animate({top:"56px"},200,function(){

});
//$(".megaMenu").css("top","56px");
$(".megaMenu").css("left","0%");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height",heightHTML+'px');
$(".megaMenu").css("z-index","1");
}
hideMegaMenuMobo = function(){

$(".megaMenu").css("position","absolute");
$(".megaMenu").animate({top:"-"+heightHTML+'px'},200,function(){

});
$(".megaMenu").css("left","0%");
$(".megaMenu").css("width","100%");
$(".megaMenu").css("height",heightHTML+'px');
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