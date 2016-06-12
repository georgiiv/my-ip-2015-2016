$(document).ready(function() {
	"use strict"
	
	$(".read-more").click(function() {
		
	});
	
	var glob = 0;
	$("tbody > tr").each(function(){
		$(this).children(':nth-child(3)').append("<button class=" + glob + ">LOL</button>");
		glob++;
	});

	$(".0").click(function(){
		$("#name1").remove();
	});

	$(".1").click(function(){
		var inp = $("div > input").val();
		$('div').attr('data-filter-value', inp);
	});

	$(".2").click(function(){
		var num = 0;
		$(".row-number").each(function(){
			$(this).text(num);
			num++;
		});
	});

});
