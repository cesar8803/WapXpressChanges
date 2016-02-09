
$(function() {
if($('.prod-info').exists()){
	
	if(!$('.ebookpdpdp').exists()){
		
		if (phoneWidth >= 768) 
		{lpobj.setdynamicheight('moreheight',0,'moreheight');}
		else {lpobj.setdynamicheight('prod-info',0,'moreheight'); }
	}
}
if(localStorage['visited']== "small-view"){
	$("ul.pdt-list li").addClass("super-view");
	$("ul.pdt-list li").removeClass("span3");
	$("#btn-view-grid").attr("src","/mobileAssets/images/icons/small-view-grid.png");		
}
else{
	$("ul.pdt-list li").addClass("span3");
	$("ul.pdt-list li").removeClass("super-view");
	 $("#btn-view-grid").attr("src","/mobileAssets/images/icons/large-view-grid.png");		
}
$(window).on("orientationchange", function() {
	
	if (phoneWidth <= 320) 
	{
				
		$(".ebookdesc").hide();
	$("ul.pdt-list li").addClass("span3");
	$("ul.pdt-list li").removeClass("super-view");}

			
		
	});
});

