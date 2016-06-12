$(document).ready(function() {
	"use strict"


	$("#remove").click(function() {
		$("div").each(function() {
  			$(this).remove();
		});
	});

	$("#add").click(function() {
		$("span > span").append("<input/>")
		$("span > span > input").val("auto");
	});

	$(".autofill-action").click(function() {
		$(".autofill-data").each(function() {
			$(this).text($(this).attr("data-autofill-value"));
		});
	});
});