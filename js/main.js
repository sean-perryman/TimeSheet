$(document).ready( function() {
	
	/* ADD/REMOVE DATA FUNCTIONS */
	/* Add Job Code */
	$(document).on("click", ".add-job-code", function() {
		var code = $('#newJobCode').val();	
		var desc = $('#newJobCodeDescription').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_job_code", code: code, desc: desc }
		}).done(function( msg ) {		  
		  $("#newJobCodeModal").modal("hide");
		  displayAlert( msg, "Job code added successfully." );
		  buildJobCodeTable();
		});  
	});

	/* Remove Job Code  */
	$(document).on("click", ".remove-job-code", function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_job_code", id: this.id }
			}).done(function( msg ) {
			  displayAlert( msg, "Job code removed successfully." );
			  buildJobCodeTable();
			}); 
		}
	 });

	/* Add Client */
	$(document).on("click", ".add-client", function() {
		var client = $('#newClientSite').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client", client: client }
		}).done(function( msg ) {		  
		  $("#newClientModal").modal("hide");
		  displayAlert( msg, "Client added successfully." );
		  buildClientTable();
		});  
	});

	/* Remove Client */
	$(document).on("click", ".remove-client", function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_client", id: this.id }
			}).done(function( msg ) {
			  displayAlert( msg, "Client removed successfully." );
			  buildClientTable();
			}); 
		}
	 });

	/* TABLE BUILDING FUNCTIONS */
	function buildClientTable() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) {
				var json = JSON.parse(msg);
				var finishedTable = "<table class='table'><tr><th>Site Name</th><th></th></tr>";
				for (var i=0; i < json.length; i++) {
					var o = json[i];
					finishedTable += "<tr><td><p>" + o.site_name + "</p></td><td><button id='" + o.id + "' class='col-md-2 col-md-offset-3 btn btn-sm btn-danger remove-client'>Delete</button>";
					finishedTable += "<button id='" + o.id + "' class='col-md-2 col-md-offset-2 btn btn-sm btn-info detail-client'>Detail</button></td></tr>";
				}
				finishedTable += "</table><button class='btn btn-sm btn-success' data-toggle='modal' data-target='#newClientModal'>New Client</button>";

				$('.clientTable').empty();
				$('.clientTable').append(finishedTable);
				$('#newClientSite').val("");				
			});
		}

	function buildJobCodeTable() {
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildJobCodeTable" }}).done(function( msg ) {
			var json = JSON.parse(msg);
			var finishedTable = "<table class='table'><tr><th>Code</th><th>Description</th> <th></th></tr>";
			for (var i=0; i < json.length; i++) {
				var o = json[i];
				finishedTable += "<tr><td><p>" + o.code + "</p></td><td><p>" + o.description + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-job-code'>Detail</button></td></tr>";
			}
			finishedTable += "</table><button class='btn btn-sm btn-success' data-toggle='modal' data-target='#newJobCodeModal'>New Job Code</button>";

			$('.jobCodeTable').empty();
			$('.jobCodeTable').append(finishedTable);
			$('#newJobCode').val("");
			$('#newJobCodeDescription').val("");
		});
	}

	/* STAND ALONE FUNCTIONS */
  function displayAlert( msg, messageText ) {
		if (msg === "Success") $(function() { new PNotify({ title: 'Success!!', delay: 2000, text: messageText, type: 'success' }); });
		else if (msg === "Failure") $(function() { new PNotify({ title: 'Error', delay: 2000, text: messageText, type: 'error' }); });
	}

	/* ANONYMOUS FUNCTIONS TO FIRE ON PAGE LOAD */
	$(function() { 
		buildClientTable(); //Build client table from JSON
		buildJobCodeTable(); //Build job code table from JSON
		$( "#accordion" ).accordion({ collapsible: true, active: false }); //Activate accordion
	}); 

	/* MISC FUNCTIONS */
	/* Fix for ajax disabling scrolling */
  $(document).ajaxStart(function () {
      //$("body").css("overflow-y","scroll");
  }).ajaxStop(function () {
      $("body").css("overflow-y","scroll");
  });
});
