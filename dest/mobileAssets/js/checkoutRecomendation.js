function add_Product(productId, idDiv){
var contextPath=$('#contextPath').val();
$.post(contextPath+'/checkout/includes/recommendations_addToCart_checkout.jsp',
{ productId: productId, idDiv: idDiv},
function(data) {
$('#'+idDiv).html(data);
});
}



ATGSvcs.rec_builder("build_scroll_recomm_express", function(slot_name, rec_data) {
var dom = ATGSvcs.dom,
cfg = ATGSvcs.cfg,
price_string = ATGSvcs.price(slot_name, rec_data.price),
name_length = cfg('-name-length', slot_name, 0),
name = name_length ? ATGSvcs.util.trunc(rec_data.name, name_length) : rec_data.name,
append_string = cfg("-append-title", slot_name, null),
append_title = append_string ? dom.SPAN( {
Class :"cs-append-title"}, append_string) : null,
data_items = cfg("dataItems", slot_name, null), i, attribute_value;

//create cs-rec div
var divRec = document.createElement('div');
divRec.setAttribute('class','cs-rec');
divRec.setAttribute('id',ATGSvcs.rec_id(slot_name, rec_data.productId));
divRec.setAttribute("itemscope","itemscope");
divRec.setAttribute("itemtype","http://schema.org/Product");
//create a element
var a = document.createElement('a');
a.setAttribute("href",rec_data.url);
a.setAttribute("className", rec_data.productId);
//create img element
var img = document.createElement('img');
img.setAttribute("class","cs-image");
img.setAttribute("src",rec_data.image);
img.setAttribute("alt",rec_data.image);
img.setAttribute("name",rec_data.productId);
img.setAttribute("onerror",'onImgErrorProductoRecomendacion(this)' );
a.appendChild(img);
//create name span
var spanName = document.createElement('span');
spanName.setAttribute("class","cs-title cs-name");
spanName.setAttribute("itemprop","name");
spanName.appendChild(document.createTextNode(name,append_title));
//create grupo_precios div
var divPrice = document.createElement('hgroup');
divPrice.setAttribute('class','grupo_precios');
divPrice.setAttribute("itemscope","itemscope");
divPrice.setAttribute("itemprop","offers");
divPrice.setAttribute("itemtype","http://schema.org/AggregateOffer");
if (data_items) {
var getVal ="";
var isLowPrice = false;
for (i = 0; i < data_items.length;) {
attribute_value = rec_data[data_items[i]];
getVal = data_items[i++];
//just low price attr add MXN
var elem_spanLowPrice = document.createElement('span');
if(getVal == "lowPrice"){
elem_spanLowPrice.setAttribute("itemprop",getVal);
if (attribute_value != null){
elem_spanLowPrice.appendChild(document.createTextNode(attribute_value));
var h3Price = document.createElement('h3');
var h2LowPrice = document.createElement('h2');
var elem_spanPrice = document.createElement('span');
h3Price.setAttribute("class","cs-price");
h2LowPrice.setAttribute("class","cs-"+getVal);
//h3Price.appendChild(document.createTextNode('de '));
elem_spanPrice.setAttribute("itemprop","price");
elem_spanPrice.appendChild(document.createTextNode(price_string));
h3Price.appendChild(elem_spanLowPrice);
//h3Price.appendChild(document.createTextNode(' MXN') );
h2LowPrice.appendChild(elem_spanPrice);
//h2LowPrice.appendChild(document.createTextNode(' MXN') );
divPrice.appendChild(h3Price);
divPrice.appendChild(h2LowPrice);
}else{
var h2LowPrice = document.createElement('h2');
h2LowPrice.setAttribute("class","cs-lowPrice");
var spanPrice = document.createElement('span');
spanPrice.setAttribute("itemprop","price");
spanPrice.appendChild( document.createTextNode( price_string ) );
h2LowPrice.appendChild( spanPrice );
//h2LowPrice.appendChild(document.createTextNode(' MXN') );
divPrice.appendChild(h2LowPrice);
}
//other attributes
}else{
spanAtt.appendChild(document.createTextNode(attribute_value));
divPrice.appendChild(spanAtt);
}
}
}else{
var spanPrice = document.createElement('span');
spanPrice.setAttribute("class","cs-lowPrice");
spanPrice.setAttribute("itemprop","price");
//spanPrice.appendChild(document.createTextNode( price_string + ' MXN'));
divPrice.appendChild(spanPrice);
}
a.appendChild(spanName);
a.appendChild(divPrice);
divRec.appendChild(a);
var divBtn = document.createElement('div');
var divClassRecom=$('#divClass').val();
var divClassRecommendations = divClassRecom;

if( divClassRecommendations == '' ){
divClassRecommendations = 'btn_rec_dos';
}
divBtn.setAttribute('class',divClassRecommendations);
divBtn.setAttribute('id','btn_rec_dos'+rec_data.productId);
add_Product(rec_data.productId, 'btn_rec_dos'+rec_data.productId );
divRec.appendChild(divBtn);


return divRec;
});