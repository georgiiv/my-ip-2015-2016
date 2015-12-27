$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/tasks";
	function taskEndpoint(taskId) {
		return ENDPOINT + "/" + taskId;
	}

	function showPanel(panelName) {
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#"+panelName).show();
	}

	function listTasks() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	function readTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});
	}
	function showTaskView(task) {
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		showPanel("readPanel");
	}
	function reloadTasks() {
		listTasks().then(function(response) {
			function addTaskToList(task) {
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}
			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});
	}
	function attachHandlers() {
		$(document).on("click", "#tasksList [data-task-id]", function() {
			var taskId = $(this).attr("data-task-id");
			readTask(taskId).then(showTaskView);
			$('#readPanel').attr('data-task-id', taskId);
		});

		$(".task-action-cancel").click(function() {
			showPanel("emptyPanel");
		});

		$(document).on("click", "#addTaskButton", function(){
			showPanel("createPanel");
		});

		$("#readPanel").on("click", ".task-action-ok", function(){
			showPanel("updatePanel");
		});

		$("#createPanel").on("click", ".task-action-ok", function(){
			$.ajax(ENDPOINT, {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					title: $("#createPanel input.form-control").val(),
					description: $("#createPanel textarea.form-control").val() 
				}),
				dataType: "json"
			}).then(function (response) {
				showPanel("emptyPanel");
				reloadTasks();
			});

		});

		$("#updatePanel").on("click", ".task-action-ok", function(){
			var taskId = $("#readPanel").attr("data-task-id");
			$.ajax(taskEndpoint(taskId), {
				method: "PUT",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					title: $("#updatePanel input.form-control").val(),
					description: $("#updatePanel textarea.form-control").val() 
				}),
				dataType: "json"
			}).then(function (response) {
				showPanel("emptyPanel");
				reloadTasks();
			});
		});

		$("#readPanel").on("click", ".task-action-remove", function(){
			var taskId = $("#readPanel").attr("data-task-id");
			$.ajax(taskEndpoint(taskId), {
				method: "DELETE"
			}).then(function(response){
				showPanel("emptyPanel");
				reloadTasks();
			});
		});
	}
	attachHandlers();
	reloadTasks();
});
