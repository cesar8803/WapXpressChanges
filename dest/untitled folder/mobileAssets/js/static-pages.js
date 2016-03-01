$(document).ready(function() {
if (phoneWidth > 650) {
var jq = document.createElement('script');
jq.src = "/mobileAssets/js/touch-timline.js";
document.getElementsByTagName('body')[0].appendChild(jq);
}
$(window).on("orientationchange", function() {
if (phoneWidth > 650) {
var selectedevent = $(".selected-event").attr("id");
$("script[src='/mobileAssets/js/touch-timline.js']").remove()
$(".timeline-body, .timeline-arrow, .timeline-container, .timeline-event-node").remove();
var jq = document.createElement('script');
jq.src = "/mobileAssets/js/touch-timline.js";
document.getElementsByTagName('body')[0].appendChild(jq);
if(selectedevent != "timeline-event-node-0"){
setTimeout(function() {
$("#"+selectedevent).trigger("click");
}, 300);
}
}
});
if (phoneWidth < 650) {
var selecthtml = "";
var i = 0;
$(".timeline-event").each(function(){
var selectoptionval = $(this).find(".timeline-title").html();
var selectval = "select"+i;
$(this).attr("id",selectval);
selecthtml += '<option value="'+selectval+'">'+selectoptionval+'</option>';
i++;
});
$(".timeline-select").append(selecthtml);
$(".timeline-event").hide();
$("#select0").show();
$(".timeline-select").on('change', function() {
var selectedid = $(this).val();
$(".timeline-event").hide();
$("#"+selectedid).show();
});
}
});