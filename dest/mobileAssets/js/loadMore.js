$(".load-more").live('click', function() {
	$('#cP').val(parseInt($('#cP').val()) + 1);
	var currentPage = $('#cP').val();
	var totRecsPerPage = $('#recsPerPage').val();
	var queryString = $('#queryString').val();
	var totalRecord = $('#totalRecord').val();
	var nsvalue = $('#Ns_Val').val();
	var navValue = $('#navValue').val();
	var NttValue = decodeURIComponent($('#NttValue').val());
	var nextStartIdx = currentPage * totRecsPerPage;
	var contextPath = $('#contextPATH').val();
	var reqUrl = $('#reqUrl').val();
	$("body").append('<div id="sc-page-spinner" class="a-row a-hidden" style="display: none;"> <div class="a-row sc-overwrap"></div> <div class="a-row sc-spinner"> <img alt="" src="/mobileAssets/images/icons/ajax-loader.gif"> </div> </div>');
	$("#sc-page-spinner").show();
	if(nextStartIdx < totalRecord){
		$('.ajax-loader, .ajax-overlay').fadeIn(100);
		var currentObj = $('.view-selection').find('a.active');
		var URL = contextPath+"/browse/listingProducts.jsp?"+navValue+"&No="+nextStartIdx+"&Ns="+nsvalue+"&reqUrl="+reqUrl
		var data = lpobj.ajaxGetContent(URL, "html");
		data.success(function(data) {
			$("#sc-page-spinner").remove();
			if ($.trim(data) != "") {
				console.log(data);
				$('.pdt-list-detail').append(data);
				if (phoneWidth > 767) {
					if ($(currentObj).hasClass('large-veiw')) {
						$('.product-list-section').addClass('large-view-active');
					}
					else {
						$('.product-list-section').removeClass('large-view-active');
					}
				}
				$('.ajax-loader, .ajax-overlay').fadeOut(1000);
			}
		});

	}
	else{
		$('.load-more').css('display','none');
		$("#sc-page-spinner").remove();
	}
});
