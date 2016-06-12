$(document).ready(function() {
	"use strict"

	
	$(".autoremove").click(function() {
		$(".autoremove").remove();
	});

	$("#create").click(function() {
		$("body").append("<div>Hello World</div>");
	});

	$("div >button").click(function() {
		$(this).text($(this).attr("data-value"));
	});

	$(".concatenate").click(function() {
		var glob = "";
		$("button").each(function() {
  			glob = glob + $(this).text();

		});
		$("input").val(glob);
	});


});