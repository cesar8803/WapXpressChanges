//product with variants color/size this method called on page load to select color and size
function LoadProductData(skuImageMap) {
    var data = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        for (i = 0; i < allVariants.skuVriant.length; i++) {
            key = getAllKeys(allVariants.skuVriant[i]);
            if (i >= 1) {
                tempKey = getAllKeys(allVariants.skuVriant[i - 1]);
                if (key.length > tempKey.length) {
                    var keys = key;
                }
                if (tempKey.length > key.length) {
                    keys = tempKey;
                }
            }

        }
        if (keys == undefined) {
            keys = key;
        }
        for (var i = 0, j = keys.length; i < j; i++) {
            data.push(convertIt(allVariants.skuVriant, keys[i]));
        }
        var isActive = "";
        for (var i = 1; i < keys.length; i++) {
            CreateControl(keys[i], keys[i], data[i], isActive, i, keys.length - 1, skuImageMap);
        }
        dynaDDLChange(1, keys.length - 1, skuImageMap)
    }
}

function CreateControlOption(ctlID, data) {
    if (data != undefined) {
        ctlID.empty();
        //ctlID.append($('<option></option>').val('-1').html('Selecciona'));
        for (var i = 0; i < data.length; i++) {
            ctlID.append($('<option></option>').val(data[i]).html(data[i]));
            $('.selectpicker').selectpicker('refresh');
        }
    }
}

function CreateControlLenseOption(ctlID, data) {
    if (data != undefined) {
        ctlID.empty();
        ctlID.append($('<option></option>').val('-1').html('Selecciona'));
        for (var i = 0; i < data.length; i++) {
            ctlID.append($('<option></option>').val(data[i]).html(data[i]));
        }
    }
}
//This method is called on selection of variants color/size to laod respective data on next dropdown
//This method is called on selection of variants color/size to laod respective data on next dropdown
function dynaDDLChange(currentID, TotalID, skuImageMap) {
    //alert('test');
    var disabledStatus = false;
    var data = [];
    var seleIndex = 1;
                var firstRowValue = []
                var isActive = '';
    if ($("#dynaDDL").find('[id^="ddlDynamic' + currentID + '"]').val() == -1) {
        disabledStatus = true;
       seleIndex = 0;
    }
                $("#dynaDDL div.firstRowDiv select option").each(function(){
                                                var value = $(this).text();
                                                firstRowValue.push(value)
                }); 
    var FilterData = $("#dynaDDL").find('[id^="ddlDynamic' + currentID + '"]').val();
    var tempArrat = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        for (i = 0; i < allVariants.skuVriant.length; i++) {
            key = getAllKeys(allVariants.skuVriant[i]);
            if (i >= 1) {
                tempKey = getAllKeys(allVariants.skuVriant[i - 1]);
                if (key.length > tempKey.length) {
                    var keys = key;
                }
                if (tempKey.length > key.length) {
                    keys = tempKey;
                }
            }

        }
        if (keys == undefined) {
            keys = key;
        }
                                TotalID = keys.length - 1;
        for (var i = 0; i < keys.length; i++) {
            tempArrat = convertItFilter(allVariants.skuVriant, keys[i], keys[currentID], FilterData, currentID, TotalID, "");
            data.push(tempArrat);
        }
    }

     var tempcurrentID = currentID + 1;
    if (tempcurrentID <= TotalID) {
        CreateControlOption($("#dynaDDL").find('[id^="ddlDynamic' + tempcurrentID + '"]'), data[tempcurrentID]);
        $("#dynaDDL").find('[id^="ddlDynamic' + tempcurrentID + '"]').prop('disabled', disabledStatus);
    }
    if (tempcurrentID < TotalID) {
        dynaDDLChange(tempcurrentID, TotalID, skuImageMap);
    } else {
        $("#skuId").val(data[0][0]);
        $("#ga_skuid").val(data[0][0]);//setting skuid for google analytics
		getprice(data[0][0]);
        loadPromotions(data[0][0], skuImageMap);
    } 
           
}

$(document).ready(function() {

    var targetvalue = $("select.onlyvariant option:first").val();
    var Macvalue = $("select.mac option:first").val();
    var productId = $("#productId").val();
    //alert(targetvalue);
    if (targetvalue != '' && targetvalue != undefined) {
        var skuMap = $("#skumap").html();
        loadPromotions(targetvalue, skuMap);
    } else completeGallery(productId);
    if (Macvalue != '' && Macvalue != undefined) {
        var skuMap = $("#skumap").html();
        loadMacImage(Macvalue, skuMap);
    }



});

function loadMacImage(skuId, skuImageMap) {
    $('#loading').show();
    var requiredlistprice = $('#requiredlistprice').val();
    var requiredsaleprice = $('#requiredsaleprice').val();
    /*START: PA, Site-Redesign Change for listprice to price range*/
    var minimumListPrice = $('#minimumListPrice').val();
    var requiredpromoprice = $('#requiredpromoprice').val();
    var maximumListPrice = $('#maximumListPrice').val();
    var minimumPromoPrice = $('#minimumPromoPrice').val();
    var maximumPromoPrice = $('#maximumPromoPrice').val();
    var numRecords = $('#numRecords').val();
    var contextPath = $('#contextpath').val();
    var url = contextPath + '/browse/pdPromos.jsp?skuId=' + skuId + '&requiredlistprice=' + requiredlistprice + '&requiredsaleprice=' + requiredsaleprice + '&minimumListPrice=' + minimumListPrice + '&maximumListPrice=' + maximumListPrice + '&minimumPromoPrice=' + minimumPromoPrice + '&maximumPromoPrice=' + maximumPromoPrice + '&requiredpromoprice=' + requiredpromoprice + '&numRecords=' + numRecords;
    /*END: PA, Site-Redesign Change for listprice to price range*/
    $.ajax({
        'async': true,
        'global': false,
        'url': url,
        'success': function(data) {
            val = data;
            $('#pdpromos').html(data);
            var lpPromos = $("#lppromodesc").html();
            var otherPromos = $("#otherpromodesc").html();
            $(".tarejtas-liverpool").html(lpPromos);
            $(".tarjetas-externas").html(otherPromos);
        },
        error: function() {
            $('#loading').hide();
        }
    });
    $('#loading').hide();

}

function loadPromotions(skuId, skuImageMap) {

    if (skuImageMap == null) {
        var skuImageMap = $("#skumap").html();
    }
    var parseImageMap = '';

    try {
        parseImageMap = JSON.parse(skuImageMap);
    } catch (e) {
        parseImageMap = skuImageMap;
    }
    var sku = skuId + '_th';
    var skuImageUrl = parseImageMap[sku];

    var requiredlistprice = $('#requiredlistprice').val();
    var requiredsaleprice = $('#requiredsaleprice').val();
    /*START: PA, Site-Redesign Change for listprice to price range*/
    var requiredpromoprice = $('#requiredpromoprice').val();
    var minimumListPrice = $('#minimumListPrice').val();
    var maximumListPrice = $('#maximumListPrice').val();
    var minimumPromoPrice = $('#minimumPromoPrice').val();
    var maximumPromoPrice = $('#maximumPromoPrice').val();
    var numRecords = $('#numRecords').val();
    var contextPath = $('#contextpath').val();
    var url = contextPath + '/browse/pdPromos.jsp?skuId=' + skuId + '&requiredlistprice=' + requiredlistprice + '&requiredsaleprice=' + requiredsaleprice + '&minimumListPrice=' + minimumListPrice + '&maximumListPrice=' + maximumListPrice + '&minimumPromoPrice=' + minimumPromoPrice + '&maximumPromoPrice=' + maximumPromoPrice + '&requiredpromoprice=' + requiredpromoprice + '&numRecords=' + numRecords;
    /*END: PA, Site-Redesign Change for listprice to price range*/
    $.ajax({
        'async': true,
        'global': false,
        'url': url,
        'success': function(data) {
            val = data;
            $('#pdpromos').html(data);
            /*var lpPromos = $("#lppromodesc").html();
            var otherPromos = $("#otherpromodesc").html();*/
            if (skuImageUrl == null) {
                pdCDNImage('xl', skuId);
            } else {
                //image is avaliable in source and get setting the src to the image.
                $(".bigImage").attr("src", skuImageUrl);
            }

            /*$(".lppromos").html(lpPromos);
            $(".otherpromos").html(otherPromos);*/
            $('#loading').hide();
            completeGallery(skuId);
        },
        error: function() {
            $('#loading').hide();
        }
    });
}


function RemoveCTL() {
    for (var i = 2; i < keys.length; i++) {
        $("#dynaDDL").find('[id^="paraDynamic' + i + '"]').remove();
    }
}

function CreateControl(ctlText, ctlName, data, isActive, currentID, TotalID, skuImageMap) {


                if (ctlText == 'dimension') {
                                ctlText = "Tamano";
                }
    if (ctlText == 'color') {
        ctlText = 'Color';
    }
    if (ctlText == 'size') {
        ctlText = 'Talla';
    }
                if (ctlText == 'textura') {
                                ctlText="Texture";
                }
                if (ctlText == 'material') {
                                ctlText = "Material";
                }
    var label = "<label id='lblDynamic" + ctlName + "' for='ddlDynamic" + currentID + ctlName + "' class='attrLabel'>" + ctlText + ":</label>";
    var select = "<select name='" + ctlText + "' class='valid lp-select-style selectpicker' id='ddlDynamic" + currentID + ctlName + "'" + isActive + " onChange='javascript:dynaDDLChange(" + currentID + " , " + TotalID + ", " + skuImageMap + " );javascript:gaProductDetail();' >";
    
    var options;
    for (var i = 0; i < data.length; i++) {
         options += "<option  data-content='<img src=/mobileAssets/images/plp-ajax-loader.gif id=macsh_"+allVariants.skuVriant[i].SkuId+" class=maccolorsh style=height:25;width:25></span> "+ data[i] +"' value='" + data[i] + "'>" + data[i] + "</option>";
    }
    select += options + "</select>";
    tempCTL = '<div class="color-option">' + label + select + '</div>'; //console.log(allVariants.skuVriant[0].SkuId);
    $('#dynaDDL').append(tempCTL);
                $('#dynaDDL div:nth-child(1)').addClass('firstRowDiv');
}

function getAllKeys(jsonData) {
    var keyList = [];
    try {
        $.each(jsonData, function(key, value) {
            if (((key.indexOf('sku') == -1) && (key.indexOf('quantity') == -1)) || key == 'Skuid') {
                keyList.push(key);
            }
        });

    } catch (e) {

    }
    return keyList;
}

function convertItFilter(json, KeyName, FilterKey, FilterData, currentID, TotalID, GroupID) {
    var ret = [];

                
                
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
                                keys = getAllKeys(json[i]);
        var temp = 0;
        for (var i1 = 1; i1 <= currentID; i1++) {
            var ctl = $("#dynaDDL").find('[id^="ddlDynamic' + GroupID + i1 + '"]');
            if ($.trim(cur[keys[i1]]) == $.trim(ctl.val())) {
                temp = temp + 1;
            }
        }

        if (temp == currentID)
            if ($.trim(cur[FilterKey]) === $.trim(FilterData)) {
                for (var key in cur) {
                    if ((key.indexOf('sku') == -1) || key == 'SkuId') {
                        if ($.trim(KeyName) === $.trim(key)) {
                            ret.push($.trim(cur[key]));
                        }
                    }
                }
            }

    }
    return GetUnique(ret);
}

function GetIDFromJSONKeyValueFilter(json, FilterKey, FilterData) {
    var ret = -1;
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
        for (var key in cur) {
            if (($.trim(cur[FilterKey]) === $.trim(FilterData))) {
                ret = i;
                break;
            }
        }
    }
    return ret;
}

function JSONKeyValueFilter(json, FilterKey, FilterData) {
    var ret = [];
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
        for (var key in cur) {
            if (($.trim(cur[FilterKey]) === $.trim(FilterData))) {
                ret.push($.trim(cur[key]));
            }
        }
    }
    return GetUnique(ret);
}

function convertIt(json, KeyName) {
    var ret = [];
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
        for (var key in cur) {
            //ret.push(key);
            if ((key.indexOf('sku') == -1) || key == 'Skuid') {
                if (KeyName === key) {
                    ret.push($.trim(cur[key]));
                }
            }
        }

    }
    return GetUnique(ret);
}

function GetUnique(inputArray) {
    var outputArray = [];

    for (var i = 0; i < inputArray.length; i++) {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
            outputArray.push(inputArray[i]);
        }
    }

    return outputArray;
}
//separate methods for selection of left eye(lense PDP)
//This method handles the check box selections.
function lenseLoad(index) {
    if (index == "leftEyeCheckbox") {
        $('#dynaDDLLeftLense select, #dynaDDLLeftLense label').addClass('hide');
        if (document.getElementById('leftEyeCheckbox').checked == 1) {
            $('#dynaDDLLeftLense select:first, #dynaDDLLeftLense label.attrLabel:first').toggleClass('hide');
            $('#dynaDDLLeftLense a.power-tooltip').removeClass('hide');
        } else {
            $("#LeftLenseskuId").val('');
            $('#dynaDDLLeftLense a.power-tooltip').addClass('hide');
        }
    } else if (index == "rightEyeCheckbox") {
        $('#dynaDDLRightLense select, #dynaDDLRightLense label').addClass('hide');
        if (document.getElementById('rightEyeCheckbox').checked == 1) {
            $('#dynaDDLRightLense select:first, #dynaDDLRightLense label.attrLabel:first').toggleClass('hide');
            $('#dynaDDLRightLense a.cilindro-tooltip').removeClass('hide');
        } else {
            $("#RightLenseskuId").val('');
            $('#dynaDDLRightLense a.cilindro-tooltip').addClass('hide');
        }
    }
}

//Lense product with variants axis,cylinder,power,base_curve..... this method called on page load to select these left lense and right lense.
function LoadLeftLenseData() {
    var data = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        keys = getAllKeys(allVariants.skuVriant[0]);
        for (var i = 0, j = keys.length; i < j; i++) {
            data.push(convertIt(allVariants.skuVriant, keys[i]));
        }
        var isActive = "";
        for (var i = 1; i < keys.length; i++) {
            CreateLeftLenseControl(keys[i], keys[i], data[i], isActive, i, keys.length - 1);
        }
    }
}
//This method is called on the on selection of variants for left lense to laod respective data on next dropdown
function dynaDDLLeftLenseChange(currentID, TotalID, tempCall) {
    var disabledStatus = false;
    var data = [];
    var seleIndex = 1;

    if ($("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + currentID + '"]').val() == -1) {
        disabledStatus = true;
        seleIndex = 0;
    }
    if (typeof(tempCall) === 'undefined') {
        $("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + (currentID + 1) + '"]').removeClass('hide');
        $("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + (currentID + 1) + '"]').prev('label').removeClass('hide');
    }

    var FilterData = $("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + currentID + '"]').val();
    var tempArrat = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        keys = getAllKeys(allVariants.skuVriant[0]);
        for (var i = 0; i < keys.length; i++) {
            tempArrat = convertItLeftLenseFilter(allVariants.skuVriant, keys[i], keys[currentID], FilterData, currentID, TotalID, "");
            data.push(tempArrat);
        }
    }

    var tempcurrentID = currentID + 1;
    if (tempcurrentID <= TotalID) {
        CreateControlLenseOption($("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + tempcurrentID + '"]'), data[tempcurrentID]);

    }
    if (tempcurrentID <= TotalID) {
        dynaDDLLeftLenseChange(tempcurrentID, TotalID, true);
    } else {
        $("#LeftLenseskuId").val(data[0][0]);
    }
}

function RemoveLeftLenseCTL() {
    for (var i = 2; i < keys.length; i++) {
        $("#dynaDDLLeftLense").find('[id^="paraDynamic' + i + '"]').remove();
    }
}

function CreateLeftLenseControl(ctlText, ctlName, data, isActive, currentID, TotalID) {
    var tempCTL;

    if (ctlText == 'bopticsCylinder') {
        ctlText = 'Cilindro (Cyl)'
    }
    if (ctlText == 'aopticsPower') {
        ctlText = 'Poder (Pwr)'
    }
    if (ctlText == 'copticsAxis') {
        ctlText = 'Eje'
    }

    var label = "<label id='lblLeftLenseDynamic" + ctlName + "' for='ddlLeftLenseDynamic" + currentID + ctlName + "' class='attrLabel hide'>" + ctlText + ":</label>";
    var select = "<select class='combo_select_detalle hide' id='ddlLeftLenseDynamic" + currentID + ctlName + "'" + isActive + " onChange='javascript:dynaDDLLeftLenseChange(" + currentID + " , " + TotalID + " )' >";

    var options = "<option value='-1'>Selecciona</option>";
    for (var i = 0; i < data.length; i++) {
        options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
    }

    select += options + "</select>";
    tempCTL = '<p class="lense_sub_opt">' + label + select + '</p>';

    $('#dynaDDLLeftLense').append(tempCTL);

}
//This method is called to remove duplicate variants if any.
function convertItLeftLenseFilter(json, KeyName, FilterKey, FilterData, currentID, TotalID, GroupID) {
    var ret = [];
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
        var temp = 0;
        for (var i1 = 1; i1 <= currentID; i1++) {
            var ctl = $("#dynaDDLLeftLense").find('[id^="ddlLeftLenseDynamic' + GroupID + i1 + '"]');
            if (ctl.val() != undefined && cur[keys[i1]] != undefined) {
                if (cur[keys[i1]].trim() == ctl.val().trim()) {
                    temp = temp + 1;
                }
            }
        }
        if (temp == currentID)
            if ($.trim(cur[FilterKey]) === $.trim(FilterData)) {
                for (var key in cur) {
                    if ((key.indexOf('sku') == -1) || key == 'Skuid') {
                        if ($.trim(KeyName) === $.trim(key)) {
                            ret.push($.trim(cur[key]));
                        }
                    }
                }
            }

    }
    return GetUnique(ret);
}


//separate methods for selection of right eye(lense PDP)
//This method is called on the on selection of variants for right lense to laod respective data on next dropdown
function LoadRightLenseData() {
    var data = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        keys = getAllKeys(allVariants.skuVriant[0]);
        for (var i = 0, j = keys.length; i < j; i++) {
            data.push(convertIt(allVariants.skuVriant, keys[i]));
        }
        var isActive = "";
        for (var i = 1; i < keys.length; i++) {
            //CreateControl("Item attribute #"+i,keys[i] ,data[i],isActive ,i,keys.length-1 );

            CreateRightLenseControl(keys[i], keys[i], data[i], isActive, i, keys.length - 1);
        }
    }
}




function dynaDDLRightLenseChange(currentID, TotalID, tempCall) {
    var disabledStatus = false;
    var data = [];
    var seleIndex = 1;
    if ($("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + currentID + '"]').val() == -1) {
        disabledStatus = true;
        seleIndex = 0;
    }
    if (typeof(tempCall) === 'undefined') {
        $("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + (currentID + 1) + '"]').removeClass('hide');
        $("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + (currentID + 1) + '"]').prev('label').removeClass('hide');
    }

    var FilterData = $("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + currentID + '"]').val();
    var tempArrat = [];
    if (allVariants != null && allVariants.skuVriant.length > 0) {
        keys = getAllKeys(allVariants.skuVriant[0]);
        for (var i = 0; i < keys.length; i++) {
            tempArrat = convertItRightLenseFilter(allVariants.skuVriant, keys[i], keys[currentID], FilterData, currentID, TotalID, "");
            data.push(tempArrat);
        }
    }

    var tempcurrentID = currentID + 1;
    if (tempcurrentID <= TotalID) {
        CreateControlLenseOption($("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + tempcurrentID + '"]'), data[tempcurrentID]);
    }
    if (tempcurrentID <= TotalID) {
        dynaDDLRightLenseChange(tempcurrentID, TotalID, true);
    } else {
        $("#RightLenseskuId").val(data[0][0]);
    }
}

function RemoveRightLenseCTL() {
    for (var i = 2; i < keys.length; i++) {
        $("#dynaDDLRightLense").find('[id^="paraDynamic' + i + '"]').remove();
    }
}

function CreateRightLenseControl(ctlText, ctlName, data, isActive, currentID, TotalID) {
    var tempCTL;

    if (ctlText == 'bopticsCylinder') {
        ctlText = 'Cilindro (Cyl)'
    }
    if (ctlText == 'aopticsPower') {
        ctlText = 'Poder (Pwr)'
    }
    if (ctlText == 'copticsAxis') {
        ctlText = 'Eje'
    }

    var label = "<label id='lblRightLenseDynamic" + ctlName + "' for='ddlRightLenseDynamic" + currentID + ctlName + "' class='attrLabel hide'>" + ctlText + ":</label>";
    var select = "<select class='combo_select_detalle hide' id='ddlRightLenseDynamic" + currentID + ctlName + "'" + isActive + " onChange='javascript:dynaDDLRightLenseChange(" + currentID + " , " + TotalID + " )' >";

    var options = "<option value='-1'>Selecciona</option>";
    for (var i = 0; i < data.length; i++) {
        options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
    }
    select += options + "</select>";
    tempCTL = '<p>' + label + select + '</p>';

    $('#dynaDDLRightLense').append(tempCTL);

}


function convertItRightLenseFilter(json, KeyName, FilterKey, FilterData, currentID, TotalID, GroupID) {
    var ret = [];
    for (var i = 0, j = json.length; i < j; i++) {
        var cur = json[i];
        var temp = 0;
        for (var i1 = 1; i1 <= currentID; i1++) {
            var ctl = $("#dynaDDLRightLense").find('[id^="ddlRightLenseDynamic' + GroupID + i1 + '"]');
            if (ctl.val() != undefined && cur[keys[i1]] != undefined) {
                if (cur[keys[i1]].trim() == ctl.val().trim()) {
                    temp = temp + 1;
                }
            }
        }
        if (temp == currentID)
            if ($.trim(cur[FilterKey]) === $.trim(FilterData)) {
                for (var key in cur) {
                    if ((key.indexOf('sku') == -1) || key == 'Skuid') {
                        if ($.trim(KeyName) === $.trim(key)) {
                            ret.push($.trim(cur[key]));
                        }
                    }
                }
            }

    }
    return GetUnique(ret);
}

//PDP scripts

//This method is validate that only numerical from 1-999 is entered in the quantity box in the PDP.
$(function() {
    $('#selectedQuantity').keypress(function(e) {
        var decimal = ".";
        var key = (e.which) ? e.which : e.keyCode ? e.keyCode : 0;
        var allowed_keys_array = new Array(8, 9, 13, 35, 37, 39, 46);
        var allow = true;
        // allow Ctrl+A
        if (e.ctrlKey && key == 97) allow = true;
        // allow Ctrl+X (cut)
        if (e.ctrlKey && key == 120) allow = true;
        // allow Ctrl+C (copy)
        if (e.ctrlKey && key == 99) allow = true;
        // allow Ctrl+Z (undo)
        if (e.ctrlKey && key == 122) allow = true;
        // allow or deny Ctrl+V (paste), Shift+Ins
        if ((e.ctrlKey && key == 118) || (e.shiftKey && key == 45)) allow = true;

        if (key < 48 || key > 57) {
            //--- for only one decimal

            //--- for tab,enter,left & right arrow,home,end,backspace,delete
            if (key != 8 && key != 9 && key != 13 && key != 39 && key != 46) {
                allow = false;
            } else {
                // for detecting special keys (listed above)
                // IE does not support 'charCode' and ignores them in keypress anyway

                if (typeof e.charCode != "undefined") {
                    // special keys have 'keyCode' and 'which' the same (e.g. backspace)
                    if (e.keyCode == e.which && e.which != 0) {
                        allow = true;
                        // . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
                        if (e.which == 46) {
                            allow = false;
                        }

                    }
                    // or keyCode != 0 and 'charCode'/'which' = 0
                    else if (e.keyCode != 0 && e.charCode == 0 && e.which == 0) {
                        allow = true;
                    }
                }

            }
            if (key == decimal.charCodeAt(0)) {
                allow = false;
            }
        } else {
            allow = true;
        }
        return allow;
    });
});

function expandview() {
    $('.payment-block').slideToggle(300);
    $('.payment-block').toggleClass('expand');
    if ($('.payment-block').hasClass('expand')) {
        $('.calculate span').removeClass('down-arrow');
        $('.up-arrow').css('display', 'block');
        $('.calculate span').addClass('up-arrow');
    } else {
        $('.calculate span').removeClass('up-arrow');
        $('.down-arrow').css('display', 'block');
        $('.calculate span').addClass('down-arrow');
    }
}




//Content from the productdetail page.
//Cantidad de imagenes que seran buscadas para el SKU actual.
var imagesToSearch = 12;
//Variable que indica cuantas URL han sido revisadas.
var urlsChecked = 0;
var kk = 0;
/**
* Esta funcion busca las imagenes correspondientes a un SKU y las integra
* en la galeria. La cantidad maxima de imagenes a buscar esta definida en
* la variable "imagesToSearch".
* @param gallerySku El SKU de interes.
*/
function completeGallery(gallerySku) {
    //alert("gallerysku"+gallerySku);
    for (var i = 1; i <= imagesToSearch; i++) {
        var url = create_url("xl", gallerySku + "_" + i + "p");
        checkUrl(url);
    }
}
/**
* Esta funcion consulta la URL de una imagen para ver si existe y en caso
* de exito agrega un elemento a la galeria.
*/
var i = 0;

function checkUrl(url) {
    var img = new Image();
    img.onload = function() {

        var i = kk;
        /*alert(kk);*/
        kk++;
        /*if(kk ==1)
        {
        var bigimgeurl = $('.bigImage').attr('src');

        addImageToGallery(bigimgeurl);
        }*/

        addImageToGallery(url);
        onUrlChecked();
    };
    img.onerror = function() {
        onUrlChecked();
    };
    img.onabort = function() {
        onUrlChecked();
    };
    img.src = url;
}


/*if($('.loadhref').length >=1)
{
var bigimgeurl = $('.bigImage').attr('src');
addImageToGallery(bigimgeurl);
}
alert($('.loadhref').length);*/

/**
* Funcion invocada cuando ha terminado la revision de una URL.
*/
function onUrlChecked() {
    urlsChecked++;
    if (urlsChecked >= imagesToSearch) {
        runEtalage();
    }
}
/**
* Ejecuta etalage sobre la lista de imagenes.
* Si etalage ya fue ejecutado anteriormente, hace nada.
*/
function runEtalage() {

    /*
     * Si etalage no ha sido ejecutado, la lista tiene el ID
     * "listBeforeEtalage".
     * Si este ID no existe significa que etalage ya fue ejecutado, asi que
     * hace nada y termina.
     */
    var list = document.getElementById("listBeforeEtalage");
    var listphone = document.getElementById("phonelistBeforeEtalage");

    if (list == undefined) {
        return;
    }
    if (listphone == undefined) {
        return;
    }
    // En este punto se sabe que etalage no ha sido ejecutado.
    // Se cambia el id de la lista a "etalage".
    //list.setAttribute("id", "etalage");
    // Ejecuta etalage sobre la lista con ID "etalage".
    //etalage_load();
}
/*
* Cuando haya transcurrido cierto tiempo a partir de la carga de la pagina,
* se intenta ejecutar etalage aunque no hayan terminado todas las llamadas
* a la funcion checkUrl().
* Si etalage ya fue ejecutado, hace nada (no lo vuelve a ejecutar).
*/


function addImageToGallery(url) {
    /*alert(kk);*/
    //alert(kk);
    $("#prd-img-hidden .item a img").attr("src", url);
    $("#prd-img-hidden .item a").attr("data-slide-to", kk);
    $("#prd-img-hidden .item a").attr("title", "title" + kk);
    /*alert($("#prd-img-hidden").html());*/
    var prd_sec = $("#prd-img-hidden").html();

    $(".carousel.slide .carousel-inner").append(prd_sec);

    /*starts: for carousel radio buttons*/
    $(".prd-img-hidden-radio li").attr("data-slide-to", kk);
    var prd_sec_radio = $("#prd-img-hidden-radio").html();
    $("#myCarousel.lp-carousel .carousel-indicators").append(prd_sec_radio);
    /*ends: for carousel radio buttons*/
    /*modal popup starts*/
    var prdpopup = $(".carousel.slide .carousel-inner").html();
    $("#myModal .carousel-inner").html(prdpopup);


    var ahref = document.createElement("li");
    ahref.setAttribute("data-target", "#myCarousel");
    ahref.setAttribute("data-slide-to", kk);

    ahref.setAttribute("class", "");
    $(".carousel-indicators").append(ahref);


    /*$("#myModal .carousel-inner div.item").each(function(){
                $(this).addClass("size-img-prev");
    });*/
    /*modalpopup ends*/

    /*var list = document.getElementById("carousel-inner");*/
    /*var listphone = document.getElementById("phonelistBeforeEtalage");*/
    /*
     * Si no existe la lista con ID "listBeforeEtalage" significa que
     * etalage ya fue ejecutado. Asi que hace nada y termina.
     */




    /*if (list == undefined) {
    return;
    }

    var li = document.createElement("div");
    var ahref = document.createElement("a");
    //var ahref = createahref(url);

    if(k==1)
    {
    //$('.bigImage').attr('src')
    ahref.setAttribute("class", "loadhref active");
    }else ahref.setAttribute("class", "loadhref");
    ahref.setAttribute("href", "javascript:void(0);");
    ahref.setAttribute("data-image", url);
    ahref.setAttribute("data-zoom-image", url);

    var thumbImage = createThumbImage(url);
    var sourceImage = createSourceImage(url);

    li.appendChild(ahref);
    li.appendChild(ahref);
    ahref.appendChild(thumbImage);




    var liphone = document.createElement("li");
    var ahrefphone = document.createElement("a");
    //var ahref = createahref(url);
    //ahref.setAttribute("class", "active");
    ahrefphone.setAttribute("href", "javascript:void(0);");
    ahrefphone.setAttribute("data-image", url);
    ahrefphone.setAttribute("data-zoom-image", url);

    var thumbImage = createThumbImage(url);
    var sourceImage = createSourceImage(url);


    liphone.appendChild(ahrefphone);
    liphone.appendChild(ahrefphone);
    ahrefphone.appendChild(thumbImage);

    listphone.appendChild(liphone);
    list.appendChild(li);
    if(k>=4)
    {
    $('.lrpl-slider-rightarrow').show();
    $('.lrpl-slider-leftarrow').show();

    }else { $('.lrpl-slider-rightarrow').hide();$('.lrpl-slider-leftarrow').hide(); }

    var phoneWidth = $(window).width();
    if (((phoneWidth >= 767) || (phoneWidth <= 500)) && ($('#zoom-target').length > 0)) {

    $('.smallImg').bind('click', function() {
    var ImgSrc = $(this).attr('src');
    $(this).parents('.pdp-image-container').find('.bigImage').attr('src', ImgSrc);
    $('.zoomWindowContainer div').css('background-image', 'url("' + ImgSrc + '")');
    $('.pdp-image-carousel li a').removeClass('active');
    $(this).parent('a').addClass('active');
    });
    }*/
    //listphone.appendChild(liphone);

}

function createThumbImage(url) {
    var img = new Image();
    img.setAttribute("class", "prodimg smallImg");
    img.alt = "";
    img.src = url;
    return img;
}


/**
* Crea uma imagen correspondiente al elemento "Source Image" requerido por
* la galeria etalage.
* @url La URL de la imagen que sera utilizada.
* @return El objeto Image creado.
*/
function createSourceImage(url) {
    var img = new Image();
    img.setAttribute("class", "prodimg smallImg");
    img.alt = "";
    img.src = url;
    return img;
}

function get_time_etalage() {
    return 8000;
}

function checkimageinserver(skuImageUrl) {
    var ImageObject = new Image();
    ImageObject.src = skuImageUrl; // try to get image
    $(".bigImage").attr("src", "");
    if ($(".bigImage").attr("src") == "") {
        $(".bigImage").attr("src", "/mobileAssets/images/plp-ajax-loader.gif");
    }
    ImageObject.onload = function() {
        $(".bigImage").attr("src", skuImageUrl);
    };
    ImageObject.onerror = function() {
        $(".bigImage").attr("src", "/mobileAssets/images/fillers/filler_REC.gif");

    };
}
window.setTimeout(runEtalage, get_time_etalage());


function getprice(finalSkuId) {

    if (pdpPriceVal.length >= 1) {
        for (var i = 0; i < pdpPriceVal.length; i++) {
            $.each(pdpPriceVal[i], function(key, value) {
                if (finalSkuId == value) {
                    var priceCont = "";
                    var listprice = pdpPriceVal[i].listPrice;
                    var promoprice = pdpPriceVal[i].promoPrice;
                    var salePrice = pdpPriceVal[i].salePrice;
                    var ceilListprice = Math.ceil(listprice);
                    var ceilPromoPrice = Math.ceil(promoprice);
                    var ceilSalePrice = Math.ceil(salePrice);
					listprice = roundOffDecimalValue(listprice);
                    promoprice = roundOffDecimalValue(promoprice);
					salePrice = roundOffDecimalValue(salePrice);
					//start::setting price values for google analytics
					var gtm_listprice=pdpPriceVal[i].listPrice;
					var gtm_promoprice=pdpPriceVal[i].promoPrice;
					var gtm_salePrice=pdpPriceVal[i].salePrice;
					//END::setting price values for google analytics  
                    if (ceilListprice == 0 && ceilPromoPrice == 0 && ceilSalePrice == 0) {
                        $("#finalSkuIdPrice").css({
                            'display': 'none',
                            'border': 'none'
                        });
                        $("#pdpromos").addClass("precios_producto");
                    } else {
                        $("#pdpromos").css('display', 'none');
                        $("#pdpromos").removeClass("precios_producto");

						$("#finalSkuIdPrice").css({
                            'display': 'block',
                            'border-bottom': '1px dotted #aaa'
                        });
                        priceCont = '<div class="precios_producto finalPrice">'
                        priceCont += '<div class="subset-pricing plp-prices row">';
						if (ceilListprice != 0) {
							if (ceilPromoPrice == 0) {
								if (ceilSalePrice == 0 || ceilSalePrice == ceilListprice) {
                                    //display listprice
									priceCont += '<div class="col-xs-6">';
									priceCont += '<p class="newprice">$' + listprice + '</p>';
									priceCont += '</div>';
									$("#ga_price").val(Math.round(gtm_listprice));//Setting price for google tag manager
								}else{
									//display sale price and strike out list price
									priceCont += '<div class="col-xs-4">'
									priceCont += '<p class="precio-tachado-modulo">$' + listprice + '</p>'
									priceCont += '</div>';
									priceCont += '<div class="col-xs-6">';
									priceCont += '<p class="newprice">$' + salePrice + '</p>';
									priceCont += '</div>';
									$("#ga_price").val(Math.round(gtm_salePrice));//Setting price for google tag manager
								}
							}else{
								if(ceilListprice > ceilPromoPrice){
									//display promo price and strike out list price
									  priceCont += '<div class="col-xs-4">'
									  priceCont += '<p class="precio-tachado-modulo">$' + listprice + '</p>'
									  priceCont += '</div>';
									  priceCont += '<div class="col-xs-6">';
									  priceCont += '<p class="newprice">$' + promoprice + '</p>';
									  priceCont += '</div>';
									  $("#ga_price").val(Math.round(gtm_promoprice));//Setting price for google tag manager
								}else{
									//display listprice
									 priceCont += '<div class="col-xs-6">';
                                     priceCont += '<p class="newprice">$' + listprice + '</p>';
                                     priceCont += '</div>';
                                     $("#ga_price").val(Math.round(gtm_listprice));//Setting price for google tag manager
								}
							}
						}
                    }
                    priceCont += '</div>'
                    priceCont += '</div>'
                    $("#finalSkuIdPrice").html(priceCont);
                    $('#finalSkuIdPrice').prev().css('display', 'none');
                }
            });
        }
    }

}
function roundOffDecimalValue(value){
	var num=formatNumber(Math.round(value));
	return num;
}

function formatNumber(number) {
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1;
}