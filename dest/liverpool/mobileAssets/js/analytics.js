//PA Modified below method modified for the Google tag manager purpose
function gaProductDetail() {
	
	var price=$("#ga_price").val();
	var prodName=$("#ga_prod_name").val();
	var skuId=$("#ga_skuid").val();
	var category=$('#ancestorLbl').text();
	var subCategory=$('#breadCrumbLbl').text();
	var brand=$("#ga_brand").val();
	var color=$("div").find("[data-id='ddlDynamic1color']  span").text().trim();
	
	
	try{
		
		if(!!color){
		dataLayer.push({
			'event': 'detailProduct',
			'ecommerce':{
				'detail':{
				'actionField':{'list':"'"+subCategory+"'"},
				'products':[{ 'name':"'"+prodName+"'",
				'id':"'"+skuId+"'",
				'price':"'"+price+"'",
				'brand':"'"+brand+"'",
				'category':"'"+category+"'",
				'subcategory':"'"+subCategory+"'",
				'variant':"'"+color+"'"
				}]
				}
				}
				});
		}
		else
			{
			dataLayer.push({
				'event': 'detailProduct',
				'ecommerce':{
					'detail':{
					'actionField':{'list':"'"+subCategory+"'"},
					'products':[{ 'name':"'"+prodName+"'",
					'id':"'"+skuId+"'",
					'price':"'"+price+"'",
					'brand':"'"+brand+"'",
					'category':"'"+category+"'",
					'subcategory':"'"+subCategory+"'",
					}]
					}
					}
					});
			
			}
	}catch(t){
		console.log(t);
	}

}

//PA Modified below method modified for the Google tag manager purpose
function plpProductInteraction(prodName,prodId,gtmPrice,prodBrand,color,position){
	
	var category=$('#ancestorLbl').text();
	var tempList=$('#breadCrumbLbl').text();
		 var url=window.location.href;
	 if (url.toLowerCase().indexOf("s=") >= 0){
		tempList='SearchResults';
				 }
	 try{
  if(!!color){
dataLayer.push({
'event':'productClick',
'ecommerce':{
'click':{
'actionField':{'list':"'"+tempList+"'"},
'products':[{
'name':"'"+prodName+"'",
'id':"'"+prodId+"'",
'price':"'"+gtmPrice+"'",
'brand':"'"+prodBrand+"'",
'category':"'"+category+"'",
'variant': "'"+color+"'",
'position':"'"+position+"'"
}]
}
}
});
}

else{
  	dataLayer.push({
		'event':'productClick',
        'ecommerce':{
        'click':{
         'actionField':{'list':"'"+tempList+"'"},
         'products':[{
         'name':"'"+prodName+"'",
         'id':"'"+prodId+"'",
          'price':"'"+gtmPrice+"'",
          'brand':"'"+prodBrand+"'",
          'category':"'"+category+"'",
          'position':"'"+position+"'"
					}]
					}
					}
					});
}

}
catch(t){
console.log(t);
}
}

//PA Modified below method modified for the Google tag manager purpose
function pdpAddToCartButton(prodName,prodId,price,brand){
	var color=$('div').find('[data-id="ddlDynamic1color"]  span').text().trim();
	
	try{
		if(!!color){
		dataLayer.push({
		'event' : 'addToCart',
		'ecommerce' : {
			'currencyCode' : 'MXN',
			'add' : {
				'products' : [ {
					'name' : "'"+prodName+"'",
					'id' : "'"+prodId+"'",
					'price' : "'"+price+"'",
					'brand' : "'"+brand+"'",
					'category' : "'"+$('#ancestorLbl').text()+"'",
					'subcategory' :"'"+ $('#breadCrumbLbl').text()+"'",
					'variant' : "'"+$('div').find('[data-id="ddlDynamic1color"]  span').text().trim()+"'",
					'quantity' : 1
				} ]
			}
		}
	});
		
		}
		else{
			dataLayer.push({
				'event' : 'addToCart',
				'ecommerce' : {
					'currencyCode' : 'MXN',
					'add' : {
						'products' : [ {
							'name' : "'"+prodName+"'",
							'id' : "'"+prodId+"'",
							'price' : "'"+price+"'",
							'brand' : "'"+brand+"'",
							'category' : "'"+$('#ancestorLbl').text()+"'",
							'subcategory' :"'"+ $('#breadCrumbLbl').text()+"'",
							'quantity' : 1
						} ]
					}
				}
			});
					
		}
	}
	
	 catch(t){
		 console.log(t);
	 }
}

//PA Modified below method modified for the Google tag manager purpose
function gtmRemoveFromCart(prodName,id,gtmPrice,prodBrand,category,subCategory,color,quantity){
try{
if(!!color){
dataLayer.push({
'event':'removeFromCart',
'ecommerce':{
'remove':{
'products':[{
'name' : "'"+prodName+"'",
'id' : "'"+id+"'",
'price' : "'"+gtmPrice+"'",
'brand' : "'"+prodBrand+"'",
'category':"'"+category+"'",
'subcategory':"'"+subCategory+"'",
'variant':"'"+color+"'",
'quantity':"'"+quantity+"'"
}]
}
}
});
}
else {
dataLayer.push({
'event':'removeFromCart',
'ecommerce':{
'remove':{
'products':[{
'name' : "'"+prodName+"'",
'id' : "'"+id+"'",
'price' : "'"+gtmPrice+"'",
'brand' : "'"+prodBrand+"'",
'category':"'"+category+"'",
'subcategory':"'"+subCategory+"'",
'quantity':"'"+quantity+"'"
}]
}
}
});
}
}
catch(t){
console.log(t);
}
}

//PA Modified below method modified for the Google tag manager purpose
function productGTMpush(item){
	var currentProduct=$(item).parents('li');
	console.log("GTM push for "+$(currentProduct).find('.gtmSkuId').val());

	dataLayer.push({
	'event': 'productImpresion',
	'ecommerce': {
	'currencyCode': 'MXN',
	'impressions': [
		{
		'name': $(currentProduct).find('.gtmProdName').val(),
		'id': $(currentProduct).find('.gtmSkuId').val(),
		'price': $(currentProduct).find('.gtmPlPrice').val(),
		'brand': $(currentProduct).find('.gtmPlpBarand').val(),
		'category':$(currentProduct).find('.gtmProdName').val(),
		'list': $(currentProduct).find('.gtmProdName').val(),
		'position': $(currentProduct).find('.gtmPosition').val()
		},
	]
	}
	});
	}