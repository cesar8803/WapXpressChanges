(function($) {
	$.fn.ddslick = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else {
			if (typeof method === "object" || !method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error("Method " + method + " does not exists.");
			}
		}
	};
	var k = 0;
	var methods = {}, defaults = {
		data : [],
		keepJSONItemsOnTop : false,
		width : 260,
		height : null,
		background : "#eee",
		selectText : "",
		defaultSelectedIndex : null,
		truncateDescription : true,
		imagePosition : "left",
		showSelectedHTML : true,
		clickOffToClose : true,
		onSelected : function(data) {
			selectedvalue(data.selectedData.value);
		}
	}, ddSelectHtml = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>', ddOptionsHtml = '<ul class="dd-options"></ul>', ddslickCSS = '<style id="css-ddslick" type="text/css">'
			+ ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}"
			+ ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }"
			+ ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}"
			+ ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}"
			+ ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }"
			+ ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}"
			+ ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}"
			+ ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }"
			+ ".dd-options > li:last-child > .dd-option{ border-bottom:none;}"
			+ ".dd-option:hover{ background:#f3f3f3; color:#000;}"
			+ ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }"
			+ ".dd-option-selected { background:#fff; }"
			+ ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;height: 27px;}"
			+ ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}"
			+ ".dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>";
	if ($("#css-ddslick").length <= 0) {
		$(ddslickCSS).appendTo("head");
	}
	methods.init = function(options) {
		var options = $.extend({}, defaults, options);
		return this
				.each(function() {
					var obj = $(this), data = obj.data("ddslick");
					if (!data) {
						var ddSelect = [], ddJson = options.data;
						obj.find("option").each(function() {
							var $this = $(this), thisData = $this.data();
							ddSelect.push({
								text : $.trim($this.text()),
								value : $this.val(),
								selected : $this.is(":selected"),
								description : thisData.description,
								imageSrc : thisData.imagesrc
							});
						});
						if (options.keepJSONItemsOnTop) {
							$.merge(options.data, ddSelect);
						} else {
							options.data = $.merge(ddSelect, options.data);
						}
						var original = obj, placeholder = $('<div id="'
								+ obj.attr("id") + '"></div>');
						obj.replaceWith(placeholder);
						obj = placeholder;
						obj.addClass("dd-container").append(ddSelectHtml)
								.append(ddOptionsHtml);
						var ddSelect = obj.find(".dd-select"), ddOptions = obj
								.find(".dd-options");
						ddOptions.css({
							width : options.width
						});
						ddSelect.css({
							width : options.width,
							background : options.background
						});
						obj.css({
							width : options.width
						});
						if (options.height != null) {
							ddOptions.css({
								height : options.height,
								overflow : "auto"
							});
						}
						$
								.each(
										options.data,
										function(index, item) {
											var splitvalue = item.value
													.split("|");
											var jsonsku = $(
													"#sku_" + splitvalue[1])
													.html();
											if (item.selected) {
												options.defaultSelectedIndex = index;
											}
											ddOptions
													.append("<li>"
															+ '<a class="dd-option">'
															+ (item.value ? ' <input class="dd-option-value" type="hidden" value="'
																	+ item.value
																	+ '" />'
																	: "")
															+ (item.imageSrc ? ' <img class="dd-option-image'
																	+ (options.imagePosition == "right" ? " dd-image-right"
																			: "")
																	+ '" src="'
																	+ item.imageSrc
																	+ '" id="thumnail_'
																	+ splitvalue[0]
																	+ '" />'
																	: "")
															+ (item.text ? ' <label class="dd-option-text">'
																	+ item.text
																	+ "</label>"
																	: "")
															+ (item.description ? ' <small class="dd-option-description dd-desc">'
																	+ item.description
																	+ "</small>"
																	: "")
															+ "</a>" + "</li>");
											thumnaildroupdawnImages(
													splitvalue[0], jsonsku,
													splitvalue[1]);
										});
						var pluginData = {
							settings : options,
							original : original,
							selectedIndex : -1,
							selectedItem : null,
							selectedData : null
						};
						obj.data("ddslick", pluginData);
						if (options.selectText.length > 0
								&& options.defaultSelectedIndex == null) {
							obj.find(".dd-selected").html(options.selectText);
						} else {
							var index = (options.defaultSelectedIndex != null
									&& options.defaultSelectedIndex >= 0 && options.defaultSelectedIndex < options.data.length) ? options.defaultSelectedIndex
									: 0;
							selectIndex(obj, index);
						}
						obj.find(".dd-select").on("click.ddslick", function() {
							open(obj);
						});
						obj.find(".dd-option").on("click.ddslick", function() {
							selectIndex(obj, $(this).closest("li").index());
						});
						if (options.clickOffToClose) {
							ddOptions.addClass("dd-click-off-close");
							obj.on("click.ddslick", function(e) {
								e.stopPropagation();
							});
							$("body").on(
									"click",
									function() {
										$(".dd-click-off-close").slideUp(50)
												.siblings(".dd-select").find(
														".dd-pointer")
												.removeClass("dd-pointer-up");
									});
						}
					}
				});
	};
	methods.select = function(options) {
		return this.each(function() {
			if (options.index) {
				selectIndex($(this), options.index);
			}
		});
	};
	methods.open = function() {
		return this.each(function() {
			var $this = $(this), pluginData = $this.data("ddslick");
			if (pluginData) {
				open($this);
			}
		});
	};
	methods.close = function() {
		return this.each(function() {
			var $this = $(this), pluginData = $this.data("ddslick");
			if (pluginData) {
				close($this);
			}
		});
	};
	methods.destroy = function() {
		return this.each(function() {
			var $this = $(this), pluginData = $this.data("ddslick");
			if (pluginData) {
				var originalElement = pluginData.original;
				$this.removeData("ddslick").unbind(".ddslick").replaceWith(
						originalElement);
			}
		});
	};
	function selectIndex(obj, index) {
		var pluginData = obj.data("ddslick");
		var ddSelected = obj.find(".dd-selected"), ddSelectedValue = ddSelected
				.siblings(".dd-selected-value"), ddOptions = obj
				.find(".dd-options"), ddPointer = ddSelected
				.siblings(".dd-pointer"), selectedOption = obj.find(
				".dd-option").eq(index), selectedLiItem = selectedOption
				.closest("li"), settings = pluginData.settings, selectedData = pluginData.settings.data[index];
		obj.find(".dd-option").removeClass("dd-option-selected");
		selectedOption.addClass("dd-option-selected");
		pluginData.selectedIndex = index;
		pluginData.selectedItem = selectedLiItem;
		pluginData.selectedData = selectedData;
		if (settings.showSelectedHTML) {
			var splitvalue = selectedData.value.split("|");
			var jsonsku = $("#sku_" + splitvalue[1]).html();
			
			/*START: Site redesign, MAC landing collections page price change*/
			var selected_value=selectedData.value;
			var splitted=selected_value.split("|");
			var skuId=splitted[0];
			var count=splitted[1];
			var intCount = parseInt(count);
			var priceval=pdpPriceValues[intCount-1];
			if (priceval.length >= 1) {
		        for (var i = 0; i < priceval.length; i++) {
		            $.each(priceval[i], function(key, value) {
		                if (skuId == priceval[i].SkuId) {
		                    var listprice = priceval[i].listPrice;
		                    var promoprice = priceval[i].promoPrice;
		                    var salePrice = priceval[i].salePrice;
		                   /* Here need confirmations how we will show the price in mac collections page,
		                    * only one price or strikeOutPrice, 
		                    * depending on the clarifications one of the method will call*/
		                     /*START: if we want only one price to show*/
		                    //var priceCont=createPrice(listprice,salePrice,promoprice);
		                    /*End: if we want only one price to show*/
		                    /*START: if we want Strikeout price to show*/
				    var priceCont=createStrikeOutPrice(listprice,salePrice,promoprice,count);
		                    /*End: if we want only one price to show*/
		                    $("#items_price_"+count).html(priceCont);
							}
							});
							
							}
		}
		$('#mac_sku_'+count).val(skuId);
		 /*END: Site redesign, MAC landing collections page price change*/
			
			ddSelected
					.html((selectedData.imageSrc ? '<img class="dd-selected-image'
							+ (settings.imagePosition == "right" ? " dd-image-right"
									: "")
							+ '" src="'
							+ selectedData.imageSrc
							+ '" id="selectedthumnail_' + splitvalue[0] + '"/>'
							: "")
							+ (selectedData.text ? '<label class="dd-selected-text">'
									+ selectedData.text + "</label>"
									: "")
							+ (selectedData.description ? '<small class="dd-selected-description dd-desc'
									+ (settings.truncateDescription ? " dd-selected-description-truncated"
											: "")
									+ '" >'
									+ selectedData.description + "</small>"
									: ""));
		} else {
			ddSelected.html(selectedData.text);
		}
		ddSelectedValue.val(selectedData.value);
		pluginData.original.val(selectedData.value);
		obj.data("ddslick", pluginData);
		close(obj);
		adjustSelectedHeight(obj);
		if (typeof settings.onSelected == "function") {
			settings.onSelected.call(this, pluginData);
		}
	}
	
	/*START: Site redesign, MAC landing collections page price change*/
	/*START: if we want Strikeout price to show*/
	function createStrikeOutPrice(listprice,salePrice,promoprice,count) {
		var ceilListprice=0;
        var ceilPromoPrice=0;
        var ceilSalePrice=0;
        if(listprice != undefined && salePrice != undefined && promoprice != undefined){
        	ceilListprice = Math.ceil(listprice);
        	ceilPromoPrice = Math.ceil(promoprice);
        	ceilSalePrice = Math.ceil(salePrice);
        }
       
		var priceCont='';
		listprice = Math.round(listprice);
		promoprice = Math.round(promoprice);
		salePrice = Math.round(salePrice);
	if (ceilListprice == 0 && ceilPromoPrice == 0 && ceilSalePrice == 0) {
        $("#items_price_"+count).css({
            'display': 'none',
            'border': 'none'
        });
	
    } else {
       
		if (ceilListprice != 0) {
			if (ceilPromoPrice == 0) {
				if (ceilSalePrice == 0 || ceilSalePrice == ceilListprice) {
                    //display listprice
					priceCont += '<p class="price" itemprop="price">';
					priceCont += '$ ' + listprice;
					priceCont += '</p>';
				}else{
					 var calculation1=(ceilListprice*4.5)/100;
					 var calculation2=(ceilListprice-ceilSalePrice);
					//display sale price and strike out list price
					// priceCont += '<p class="price-dashed">'
					// priceCont += '$<span itemprop="highPrice">' + listprice + '</span>'
					// priceCont += '</p>';
					 if(calculation2 >= calculation1){
					priceCont += '<div class="col-xs-4">'
					 priceCont += '<p class="precio-tachado-modulo">$' + listprice + '</p>'
					 priceCont += '</div>';
					 priceCont += ' <p class="reprice">';
					 priceCont += '$<span itemprop="lowPrice">' + salePrice + '</span>';
					 priceCont += '</p>';
					 }else{
						 priceCont += '<p class="price" itemprop="price">';
							priceCont += '$ ' + listprice;
							priceCont += '</p>';
					 }
				}
			}else{
				if(ceilListprice > ceilPromoPrice){
					//display promo price and strike out list price
					  priceCont += '<div class="col-xs-4">'
					  priceCont += '<p class="precio-tachado-modulo">$' + listprice + '</p>'
					  priceCont += '</div>';
					  priceCont += ' <p class="reprice">';
					  priceCont += '$<span itemprop="lowPrice">' + promoprice + '</span>';
					  priceCont += '</p>';
				}else{
					//display listprice
					 priceCont += '<p class="price" itemprop="price">';
                     priceCont += '$ ' + listprice;
                     priceCont += '</p>';
				}
			}
		}
    }
 return priceCont;
}
	/*END: if we want Strikeout price to show*/	
	
	/*START: if we want only one price to show*/
	function createPrice(listprice,salePrice,promoprice) {
		var priceCont='';
		listprice = Math.round(listprice);
		promoprice = Math.round(promoprice);
		salePrice = Math.round(salePrice);
		if(promoprice > 0){
			priceCont += '<p class="price" itemprop="price">';
			priceCont += '$ ' + promoprice;
			priceCont += '</p>';
		}
		else if (salePrice > 0 ) {
			priceCont += '<p class="price" itemprop="price">';
			priceCont += '$ ' + salePrice;
			priceCont += '</p>';
		} else {
			priceCont += '<p class="price" itemprop="price">';
			priceCont += '$ ' + listprice;
			priceCont += '</p>';
		}
		return priceCont;
	}
	/*END: if we want only one price to show*/
	 /*END: Site redesign, MAC landing collections page price change*/
	
	
	function open(obj) {
		var $this = obj.find(".dd-select"), ddOptions = $this
				.siblings(".dd-options"), ddPointer = $this.find(".dd-pointer"), wasOpen = ddOptions
				.is(":visible");
		$(".dd-click-off-close").not(ddOptions).slideUp(50);
		$(".dd-pointer").removeClass("dd-pointer-up");
		if (wasOpen) {
			ddOptions.slideUp("fast");
			ddPointer.removeClass("dd-pointer-up");
		} else {
			ddOptions.slideDown("fast");
			ddPointer.addClass("dd-pointer-up");
		}
		adjustOptionsHeight(obj);
	}
	function close(obj) {
		obj.find(".dd-options").slideUp(50);
		obj.find(".dd-pointer").removeClass("dd-pointer-up").removeClass(
				"dd-pointer-up");
	}
	function adjustSelectedHeight(obj) {
		var lSHeight = obj.find(".dd-select").css("height");
		var descriptionSelected = obj.find(".dd-selected-description");
		var imgSelected = obj.find(".dd-selected-image");
		if (descriptionSelected.length <= 0 && imgSelected.length > 0) {
			obj.find(".dd-selected-text").css("lineHeight", lSHeight);
		}
	}
	function adjustOptionsHeight(obj) {
		obj.find(".dd-option").each(function() {
			var $this = $(this);
			var lOHeight = $this.css("height");
			var descriptionOption = $this.find(".dd-option-description");
			var imgOption = obj.find(".dd-option-image");
			if (descriptionOption.length <= 0 && imgOption.length > 0) {
				$this.find(".dd-option-text").css("lineHeight", lOHeight);
			}
		});
	}
})(jQuery);