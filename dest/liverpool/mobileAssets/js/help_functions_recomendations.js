 
            function initializesliders(i) {
            	for (i = 0; i <= 10; i++) {
            	var phoneWidth = $(window).width();
            	var abc = $('.globalslider').eq(i).parents('.globalslidercontainer').find('.prev');
            	var bca = $('.globalslider').eq(i).parents('.globalslidercontainer').find('.next');
            	var autof = eval($('.globalslider').eq(i).attr('title'));
            	if (autof == "" || autof == undefined) {
            	autof = false;
            	// To make slider automatic this value should be true
            	}
            	var finin = eval($('.globalslider').eq(i).attr('alt'));
            	if (finin == "false") {
            	finin = false;
            	}
            	var direcn = $('.globalslider').eq(i).attr('hreflang');
            	if (direcn == "" || direcn == undefined) {
            	direcn = 'left';
            	// For Horizental slider

            	}
            	var itemc = '';

            	if (phoneWidth < 570 || (phoneWidth < 650 && $(window).height() < 370))
            	{
            	itemc = parseInt($('.globalslider').eq(i).parents('.globalslidercontainer').find('.itemCount').attr('hreflang'));

            	}
            	else
            	{
            	itemc = parseInt($('.globalslider').eq(i).parents('.globalslidercontainer').find('.itemCount').val());

            	}
            	if (isNaN(parseInt(itemc))) {
            	itemc = 1; // For Slider item count
            	}
            	  mslide(i, itemc, finin, autof, abc, bca, direcn);
            	}
            };
            
             function mslide(i, itemc, finin, autof, abc, bca, direcn) {
                var phoneWidth = $(window).width();
                var scrollSet = '';
                if (phoneWidth < 650) {
                    scrollSet = 2;
                } else {
                    if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('catlevelbanner')) {
                        scrollSet = 2;
                    } else {
                        scrollSet = itemc;
                    }
                }
                if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('pdp-image-carousel')) {
                    $('.globalslider').eq(i).carouFredSel({
                        items: itemc,
                        scroll: scrollSet,
                        prev: abc,
                        next: bca,
                        auto: autof,
                        direction: direcn,
                        circular: finin,
                        infinite: finin,
                        swipe: {
                            onMouse: false,
                            onTouch: false
                        }
                    });
                } else if ($('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('breadcrumb-slider') || $('.globalslider').eq(i).parents('.globalslidercontainer').hasClass('mobilemenu-slider')) {
                    $('.globalslider').eq(i).carouFredSel({
                        items: itemc,
                        scroll: {
                            items: 1,
                            easing: "cubic",
                            duration: 9,
                            fx: "scroll"
                        },
                        width: '100%',
                        responsive: true,
                        prev: abc,
                        next: bca,
                        auto: autof,
                        direction: direcn,
                        circular: finin,
                        infinite: finin,
                        swipe: {
                            onMouse: false,
                            onTouch: false
                        }
                    });
                } else {
                	
                    $('.globalslider').eq(i).carouFredSel({
                        items: itemc,
                        scroll: scrollSet,
                        width: '100%',
                        responsive: true,
                        prev: abc,
                        next: bca,
                        auto: autof,
                        direction: direcn,
                        circular: finin,
                        infinite: finin,
                        swipe: {
                            onMouse: false,
                            onTouch: false
                        }
                    });
                }
                if (phoneWidth >= 570 && phoneWidth <= 1024) {
                    $('.globalslider').eq(i).find('li').touchwipe({
                        wipeLeft: function(e) {
                            $('.globalslider').eq(i).trigger('next', itemc);
                            e.preventDefault();
                        },
                        wipeRight: function(e) {
                            $('.globalslider').eq(i).trigger('prev', itemc);
                            e.preventDefault();
                        },
                        min_move_x: 20,
                        preventDefaultEvents: false

                    });
                }
                if (phoneWidth < 570) {
                    $('.globalslider').eq(i).find('li').touchwipe({
                        wipeLeft: function(e) {
                            $('.globalslider').eq(i).trigger('next', itemc);
                            e.preventDefault();
                        },
                        wipeRight: function(e) {
                            $('.globalslider').eq(i).trigger('prev', itemc);
                            e.preventDefault();
                        },
                        min_move_x: 25,
                        preventDefaultEvents: false
                    });

                }
            };
            