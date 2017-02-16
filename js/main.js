$(document).ready( function() {
	//Pre-fill out the new time-entry form
	$(document).on('click', '.new-time-entry', function() {             
		//console.log('1');
		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_logged_in_user" }}).done(function( msg ) { $('#timeEntryEmployeeID').val(msg); console.log('Current User: ' + msg); });
		//console.log('2');
	  $.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select class='form-control' id='timeEntrySiteName'><option value='null'>Select a site name</option>";
			if (typeof json.id !== 'undefined') length = 1;
			else length = Object.keys(json).length;
			for (var i=0; i < length; i++) {
				if (length > 1) var o = json[i];
				else var o = json;
				finishedSelect += "<option value='" + o.id + "'>" + o.site_name + "</option>";
			}	
			finishedSelect += "</select>";

			$('#timeEntrySiteNameSelect').empty();
			$('#timeEntrySiteNameSelect').append(finishedSelect);
	  });
    //console.log('3');        
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildJobCodeTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select class='form-control' id='timeEntryJobCode'><option value='null'>Select a job code</option>";
			if (typeof json.id !== 'undefined') length = 1;
			else length = Object.keys(json).length;
			for (var i=0; i < length; i++) {
				if (length > 1) var o = json[i];
				else var o = json;
				finishedSelect += "<option value='" + o.id + "'>" + o.code + " | " + o.description + "</option>";
			}	
			finishedSelect += "</select>";

			$('#timeEntryJobCodeSelect').empty();
			$('#timeEntryJobCodeSelect').append(finishedSelect);
	  });
	});
	
	/* ADD/REMOVE DATA FUNCTIONS */
	/* Add Employee */
	$(document).on("click", ".add-employee", function() {
		var name = $('#newEmployeeName').val();	
		var phone = $('#newEmployeePhone').val();
		var email = $('#newEmployeeEmail').val();	
		var accessCode = $('#newEmployeeAccessCode').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_employee", name: name, phone: phone, email: email, accessCode: accessCode }
		}).done(function( msg ) {		  
		  $("#newEmployeeModal").modal("hide");
		  displayAlert( msg, "Employee" );
		  buildEmployeeTable();
		});  
	});

	/* Remove Employee  */
	$(document).on("click", ".remove-employee", function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_employee", id: this.id }
			}).done(function( msg ) {
			  displayAlert( msg, "Employee" );
			  buildEmployeeTable();
			}); 
		}
	 });

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
		  displayAlert( msg, "Job code" );
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
			  displayAlert( msg, "Job code" );
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

	/* SUBMIT BUTTON IN THE TIME ENTRY MODAL */
	$(document).on("click", ".time-entry-submit", function() {
		//TODO: check if updating or new record
		//TODO: check if record is finalized; prevent update if so
		var date = $('#timeEntryDate').val();	
		var employee_id = $('#timeEntryEmployeeID').val();
		var site_name = $('#timeEntrySiteName').val();	
		var job_code = $('#timeEntryJobCode').val();	
		var hours = $('#timeEntryHours').val();
		var description = $('#timeEntryDescription').val();

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_time_entry", date: date, employee_id: employee_id, site_name: site_name, job_code: job_code, hours: hours, description: description }
		}).done(function( msg ) {		  
		  $("#timeEntryModal").modal("hide");
		  displayAlert( msg, "Time Entry" );
		  buildTimeEntryTable_User();
		});  
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

	function buildEmployeeTable() {
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildEmployeeTable" }}).done(function( msg ) {
			var json = JSON.parse(msg);
			console.log( "json.length = " + json.length);
			console.log( "Object.keys(json).length = " + Object.keys(json).length);
			var finishedTable = "<table class='table'><tr><th>Name</th><th>Phone Number</th><th>Email Address</th><th></th></tr>";
			for (var i=0; i < json.length; i++) {
				var o = json[i];
				finishedTable += "<tr><td><p>" + o.name + "</p></td><td><p>" + o.phone + "</p></td><td>";
				finishedTable += "<p>" + o.email + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-employee'>Detail</button></td></tr>";
			}
			finishedTable += "</table><button class='btn btn-sm btn-success' data-toggle='modal' data-target='#newEmployeeModal'>New Employee</button>";

			$('.employeeTable').empty();
			$('.employeeTable').append(finishedTable);
			$('#newEmployeeName').val("");
			$('#newEmployeePhone').val("");
			$('#newEmployeeEmail').val("");
			$('#newEmployeeAccessCode').val("");
		});
	}

	function buildTimeEntryTable_User() {
    var employee;
    $.ajax({type: "POST", url: "../utility.php", data: { action: "get_logged_in_user" }}).done(function( msg ) { employee = msg; }).done( function() {
	    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildTimeEntryTable", employee: employee }}).done(function( msg ) {
				if (msg === "null") {
					$('.timeEntryTable').append("<p>No time entries found.</p><button class='new-time-entry btn btn-sm btn-success' data-toggle='modal' data-target='#timeEntryModal'>New Time Entry</button>");
					$('#timeEntryDate').val("");
				} else {
					var json = JSON.parse(msg);					
					var finishedTable = "<table class='table'><tr><th>Date</th><th>Site Name</th><th>Hours</th><th></th></tr>";
					
					var length;
					if (typeof json.id !== 'undefined') length = 1;
					else length = Object.keys(json).length;
					for (var i=0; i < length; i++) {
						if (length > 1) var o = json[i];
						else var o = json;
						
						let id = o.id;
						$.ajax({type: "POST", url: "../utility.php", data: { action: "get_client", client: o.client_id }}).done(function( msg ) { $('#tet-client-'+id).text(JSON.parse(msg).site_name); });

						finishedTable += "<tr><td><p>" + o.date + "</p></td><td>";
						finishedTable += "<p id='tet-client-" + o.id + "'></p></td><td><p>" + o.hours + "</p></td><td>";
						finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-time-entry'>Detail</button></td></tr>";
					}
					finishedTable += "</table><button class='new-time-entry btn btn-sm btn-success' data-toggle='modal' data-target='#timeEntryModal'>New Time Entry</button>";

					$('.timeEntryTable').empty();
					$('.timeEntryTable').append(finishedTable);
					$('#timeEntryDate').val("");
					$('#timeEntryEmployeeID').val("");
					$('#timeEntrySiteName').val("");
					$('#timeEntryJobCode').val("");
					$('#timeEntryHours').val("");
					$('#timeEntryDescription').val("");
				}

			}); //End of AJAX
		});
	}

	function buildTimeEntryTable() {
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildTimeEntryTable" }}).done(function( msg ) {
			var json = JSON.parse(msg);
			var finishedTable = "<table class='table'><tr><th>Date</th><th>Employee</th><th>Site Name</th><th>Hours</th><th></th></tr>";
			
			var length;
			if (typeof json.id !== 'undefined') length = 1;
			else length = Object.keys(json).length;
			for (var i=0; i < length; i++) {
				if (length > 1) var o = json[i];
				else var o = json;	

				let id = o.id;
				$.ajax({type: "POST", url: "../utility.php", data: { action: "get_employee", employee: o.employee_id }}).done(function( msg ) { $('#tet-emp-'+id).text(JSON.parse(msg).name);  });
				$.ajax({type: "POST", url: "../utility.php", data: { action: "get_client", client: o.client_id }}).done(function( msg ) { $('#tet-client-'+id).text(JSON.parse(msg).site_name); });

				finishedTable += "<tr><td><p>" + o.date + "</p></td><td><p id='tet-emp-" + o.id + "'></p></td><td>";
				finishedTable += "<p id='tet-client-" + o.id + "'></p></td><td><p>" + o.hours + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-time-entry'>Detail</button></td></tr>";
			}
			finishedTable += "</table>";//<button class='btn btn-sm btn-success' data-toggle='modal' data-target='#newTimeEntryModal'>New Time Entry</button>";

			$('.timeEntryTable').empty();
			$('.timeEntryTable').append(finishedTable);
			if (!$('#admin-container').hasClass('accordion')) addAccordion();
		});
	}

	/* STAND ALONE FUNCTIONS */
  function displayAlert( msg, messageText ) {
		if (msg === "Success") $(function() { new PNotify({ title: 'Success!!', delay: 2000, text: messageText + " has been added successfully", type: 'success' }); });
		else if (msg === "Failure") $(function() { new PNotify({ title: 'Error', delay: 2000, text: "Failed to add new " + messageText, type: 'error' }); });
	}

	/* MISC FUNCTIONS */
  function addAccordion() { //Activate accordion after the time entries tables is built
  	$('#admin-container').addClass('accordion');
		$( ".accordion" ).accordion({ collapsible: true, active: false }); 
  }

	/* Setup to figure out whether user is admin or not */
	$.ajax({type: "POST", url: "../utility.php", data: { action: "check_for_admin" }}).done(function( msg ) {
		if (msg === "1") {
			buildTimeEntryTable(); //Build time entry table from JSON
			buildEmployeeTable() //Build employee table from JSON
			buildClientTable(); //Build client table from JSON
			buildJobCodeTable(); //Build job code table from JSON
		} else {
			buildTimeEntryTable_User();
		}
	});

	$(function() { $("#timeEntryDate").datepicker(); });
});
