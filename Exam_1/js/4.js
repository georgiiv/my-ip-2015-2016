$(document).ready(function() {
	"use strict"
	
	$(".read-more").click(function() {
		$(this).parent().append($(this).attr("data-more")); //appends data-more to the parrent of the button
		$(this).remove();
	});

	$("#add").click(function() {
		var text = $("#content").val();
		alert(text);
		$(".user-content").append("<div>" + $("#content").val() + "</div>");
		$("#content").remove();
	});


});
