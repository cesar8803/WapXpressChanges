function showProductPromotions(contextPath,prodId,salePrice,listPrice,productSmallImgUrl,enablePromoService,promoPrice){jQuery.ajax({url:contextPath+"/browse/productPromos.jsp?productID="+prodId+"&salePrice="+salePrice+"&listPrice="+listPrice+"&productSmallImgUrl="+productSmallImgUrl+"&enablePromoService="+enablePromoService+"&promoPrice="+promoPrice,dataType:"html",success:function(data){$("#view-promo-modal").html(data);$("#view-promo-modal").modal("show");}});}function showCartProductPromotions(imageId,itemId,ItemName){jQuery.ajax({url:"/tienda/m/cart/frag/view-promo-popup.jsp?skuId=="+imageId+"&itemId="+itemId+"&ItemName="+ItemName,dataType:"html",success:function(data){$("#view-promo-modal").html(data);$("#view-promo-modal").modal("show");}});}