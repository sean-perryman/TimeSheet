$(document).ready( function() {
	/* TIME ENTRY */
	//Time Entry Detail
	$(document).on('click', '.detail-time-entry', function() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_time_entry", id: this.id }}).done(function( msg ) { 
			var json = JSON.parse(msg);
			
			$.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) { 
		    var json = JSON.parse(msg);		
				var length;
				var finishedSelect = "<select name='timeEntrySiteName' class='form-control' id='timeEntrySiteName'><option value='null'>Select a site name</option>";
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
		  }).done( function() { 
		  	$('#timeEntrySiteName').val(json.client_id); 
		  	if (json.finalized == 1 && $('#admin-container').length == false) $('#timeEntrySiteName').attr("disabled", "disabled");
		  });
	    
	    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildJobCodeTable" }}).done(function( msg ) { 
		    var json = JSON.parse(msg);		
				var length;
				var finishedSelect = "<select name='timeEntryJobCode' class='form-control' id='timeEntryJobCode'><option value='null'>Select a job code</option>";
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
		  }).done( function() { 
		  	$('#timeEntryJobCode').val(json.jobcode_id); 
		  	if (json.finalized == 1 && $('#admin-container').length == false) $('#timeEntryJobCode').attr("disabled", "disabled");
		  });

		  $.ajax({type: "POST", url: "../utility.php", data: { action: "buildEmployeeTable" }}).done(function( msg ) { 
		    var json = JSON.parse(msg);		
				var length;
				var finishedSelect = "<select name='timeEntryEmployee' class='form-control' id='timeEntryEmployee'>";
				if (typeof json.id !== 'undefined') length = 1;
				else length = Object.keys(json).length;
				for (var i=0; i < length; i++) {
					if (length > 1) var o = json[i];
					else var o = json;
					finishedSelect += "<option value='" + o.id + "'>" + o.name + "</option>";
				}	
				finishedSelect += "</select>";

				$('#timeEntryEmployeeSelect').empty();
				$('#timeEntryEmployeeSelect').append(finishedSelect);
		  }).done( function() { $('#timeEntryEmployee').val(json.employee_id); });

			$('#timeEntryDate').val(json.date);	
			$('#timeEntryEmployeeID').val(json.employee_id);
			$('#timeEntryHours').val(json.hours);
			$('#timeEntryID').val(json.id);
			$('.remove-time-entry').attr( 'id', json.id );
			$('#timeEntryDescription').val(json.description);

			if (json.finalized == 1) $('#timeEntryFinalized').prop("checked", true);
			else $('#timeEntryFinalized').prop("checked", false);

			if ($('#admin-container').length == true) $('.remove-time-entry').removeClass("hidden");
			else $('.remove-time-entry').addClass("hidden");

			if (json.finalized == 1 && $('#admin-container').length == false) {
				$('#timeEntryDate').attr("disabled", "disabled");
				$('#timeEntryHours').attr("disabled", "disabled");
				$('#timeEntryDescription').attr("disabled", "disabled");
				$('#timeEntryButton').attr("disabled", "disabled");
				$('#timeEntryFinalized').attr("disabled", "disabled");
			} else {
				$('#timeEntryDate').removeAttr("disabled", "disabled");
				$('#timeEntryHours').removeAttr("disabled", "disabled");
				$('#timeEntryDescription').removeAttr("disabled", "disabled");
				$('#timeEntryButton').removeAttr("disabled", "disabled");
				$('#timeEntryFinalized').removeAttr("disabled", "disabled");
			}
		});
		//Remove submit class from button
		$('#timeEntryButton').removeClass('time-entry-submit');
		
		//Add update class to button
		$('#timeEntryButton').addClass('time-entry-update');

		//TODO: Disable update button when finalized = true
		//Change text to update
		$('#timeEntryButton').text('Update');
	});

	//Pre-fill out the new time-entry form
	$(document).on('click', '.new-time-entry', function() { 
		var today = new Date();

		$('#timeEntryDate').val(today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
		$('#timeEntryEmployeeID').val("");
		$('#timeEntrySiteName').val("");
		$('#timeEntryJobCode').val("");
		$('#timeEntryHours').val("");
		$('#timeEntryDescription').val("");

		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_logged_in_user" }}).done(function( msg ) { $('#timeEntryEmployeeID').val(msg); });
	  $.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select name='timeEntrySiteName' class='form-control' id='timeEntrySiteName'><option value='null'>Select a site name</option>";
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
          
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildJobCodeTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select name='timeEntryJobCode' class='form-control' id='timeEntryJobCode'><option value='null'>Select a job code</option>";
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

	  //Remove update class from button
		$('#timeEntryButton').removeClass('time-entry-update');
		
		//Add new entry class
		$('#timeEntryButton').addClass('time-entry-submit');

		//Change text to submit
		$('#timeEntryButton').text('Submit');
	});

	/* SUBMIT BUTTON IN THE TIME ENTRY MODAL */
	$(document).on("click", ".time-entry-update", function() {
		var timeentry_id = $('#timeEntryID').val();
		var date = $('#timeEntryDate').val();	
		var employee_id = $('#timeEntryEmployeeID').val();
		var site_name = $('#timeEntrySiteName').val();	
		var job_code = $('#timeEntryJobCode').val();	
		var hours = $('#timeEntryHours').val();
		var description = $('#timeEntryDescription').val();
		var finalized = 0;
		if ($('#timeEntryFinalized').prop( "checked" )) finalized = 1;

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "update_time_entry", timeentry_id: timeentry_id, date: date, employee_id: employee_id, site_name: site_name, job_code: job_code, hours: hours, description: description, finalized: finalized }
		}).done(function( msg ) {		  
		  $("#timeEntryModal").modal("hide");
		  displayAlert( msg, "Time Entry" );
		  var today = new Date();
	    var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
		  $.ajax({type: "POST", url: "../utility.php", data: { action: "check_for_admin" }}).done(function( msg ) {
				if (msg === "1") buildTimeEntryTable();
				else buildTimeEntryTable_User(date);
			});
		});  
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
		var finalized = 0;
		if ($('#timeEntryFinalized').prop( "checked" )) finalized = 1;

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_time_entry", date: date, employee_id: employee_id, site_name: site_name, job_code: job_code, hours: hours, description: description, finalized: finalized }
		}).done(function( msg ) {		  
		  $("#timeEntryModal").modal("hide");
		  displayAlert( msg, "Time Entry" );
		  var today = new Date();
	    var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
		  buildTimeEntryTable_User(date);
		});  
	});
	
	/* USER TIME ENTRY VIEW FUNCTIONS */
	$(document).on('click', '#filterTimeEntries', function(event) {
		event.preventDefault();
		var d = $('#displayTimeEntriesDate').val();
		buildTimeEntryTable_User( d );
	});

	$(document).on('click', '#showAllTimeEntries', function(event) {
		event.preventDefault();
		buildTimeEntryTable_User();
	});

	$(document).on('click', '#todayTimeEntries', function(event) {
		event.preventDefault();
		var today = new Date();
	  var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
		$('#displayTimeEntriesDate').val(date);
		buildTimeEntryTable_User(date);
	});

	/* Remove Job Code  */
	$(document).on("click", ".remove-time-entry", function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_time_entry", id: this.id }
			}).done(function( msg ) {
				$('#timeEntryModal').modal("hide");
			  displayAlert( msg, "Time Entry" );
			  buildTimeEntryTable();
			}); 
		}
	});

	/* EMPLOYEE */
	$(document).on('click', '.detail-employee', function() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_employee", employee: this.id }}).done(function( msg ) { 
			var json = JSON.parse(msg);
			
			$('#employeeName').val(json[0].name);	
			$('#employeePhone').val(json[0].phone);
			$('#employeeEmail').val(json[0].email);
			$('#employeeAccessCode').val(json[0].access_code);
			$('.removeEmployeeButton').attr( "id", json[0].id );
		});
		//Remove submit class from button
		$('#employeeModalButton').removeClass('add-employee');
		
		//Add update class to button
		$('#employeeModalButton').addClass('update-employee');

		//Change text to update
		$('#employeeModalButton').text('Update');
		$('#employeeModalLabel').text('Update Employee');
		$('.removeEmployeeButton').removeClass("hidden");
	});

	/* Add Employee */
	$(document).on("click", ".add-employee", function() {
		var name = $('#employeeName').val();	
		var phone = $('#employeePhone').val();
		var email = $('#employeeEmail').val();	
		var accessCode = $('#employeeAccessCode').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_employee", name: name, phone: phone, email: email, accessCode: accessCode }
		}).done(function( msg ) {		  
		  $("#employeeModal").modal("hide");
		  displayAlert( msg, "Employee" );
		  buildEmployeeTable();
		});  
	});

	/* Remove Employee  */
	$(document).on("click", ".remove-employee", function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		console.log( "ID: " + this.id );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_employee", id: this.id }
			}).done(function( msg ) {
			  $("#employeeModal").modal("hide");
		  	displayAlert( msg, "Employee" );
		  	buildEmployeeTable();
		  	buildTimeEntryTable();
			}); 
		}
	});

	//Update employee function
	$(document).on("click", ".update-employee", function() {
		var name = $('#employeeName').val();	
		var phone = $('#employeePhone').val();
		var email = $('#employeeEmail').val();	
		var accessCode = $('#employeeAccessCode').val();
		var id = $('.removeEmployeeButton').attr('id');

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "update_employee", id: id, name: name, phone: phone, email: email, accessCode: accessCode }
		}).done(function( msg ) {		  
		  $("#employeeModal").modal("hide");
		  displayAlert( msg, "Employee" );
		  buildEmployeeTable();
		  buildTimeEntryTable();
		});  
	});

	//New employee
	$(document).on("click", ".new-employee", function() {
		$('#employeeName').val("");	
		$('#employeePhone').val("");
		$('#employeeEmail').val("");	
		$('#employeeAccessCode').val("");
		
		$('#employeeModalButton').addClass('add-employee');
		$('#employeeModalButton').removeClass('update-employee');
		$('.removeEmployeeButton').addClass("hidden");

		$('#employeeModalLabel').text('Add Employee');
		$('#employeeModalButton').text('Submit');
	});


	/* JOB CODE */
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
			  buildTimeEntryTable();
			}); 
		}
	});

	//Update job code
	$(document).on("click", ".update-job-code", function() { 
		var code = $('#jobCodeCode').val();	
		var desc = $('#jobCodeDescription').val();
		var id = $('.removeJobCodeButton').attr('id');

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "update_job_code", id: id, code: code, desc: desc }
		}).done(function( msg ) {		  
		  $("#jobCodeModal").modal("hide");
		  displayAlert( msg, "Job Code" );
		  buildJobCodeTable();
		  buildTimeEntryTable();
		});  
	});

	//New job code
	$(document).on("click", ".new-job-code", function() { 
		$('#jobCodeCode').val("");	
		$('#jobCodeDescription').val("");
		
		$('#jobCodeModalButton').addClass('add-job-code');
		$('#jobCodeModalButton').removeClass('update-job-code');
		$('.removeJobCodeButton').addClass("hidden");

		$('#jobCodeModalLabel').text('Add Employee');
		$('#jobCodeModalButton').text('Submit');
	});

	$(document).on('click', '.detail-job-code', function() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_job_code", id: this.id }}).done(function( msg ) { 
			var json = JSON.parse(msg);
			
			$('#jobCodeCode').val(json[0].code);	
			$('#jobCodeDescription').val(json[0].description);
			
			$('.removeJobCodeButton').attr( "id", json[0].id );
		});
		//Remove submit class from button
		$('#jobCodeModalButton').removeClass('add-job-code');
		
		//Add update class to button
		$('#jobCodeModalButton').addClass('update-job-code');

		//Change text to update
		$('#jobCodeModalButton').text('Update');
		$('#jobCodeModalLabel').text('Update Job Code');
		$('.removeJobCodeButton').removeClass("hidden");
	});

	/* CLIENT */
	/* Add Client */
	$(document).on("click", ".add-client", function() {
		var client = $('#newClientSite').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client", client: client }
		}).done(function( msg ) {		  
		  $("#clientModal").modal("hide");
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
			  $("#clientModal").modal("hide");
			  buildClientTable();
			  buildTimeEntryTable();
			}); 
		}
	});

	$(document).on("click", ".new-client", function() { 
		$('#clientSite').val("");	
		
		$('#clientModalButton').addClass('add-client');
		$('#clientModalButton').removeClass('update-client');
		$('.removeClientButton').addClass("hidden");

		$('#clientModalLabel').text('Add Employee');
		$('#clientModalButton').text('Submit');
	});

	//Update client site
	$(document).on("click", ".update-client", function() { 
		var site_name = $('#clientSite').val();	
		var id = $('.removeClientButton').attr('id');

		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "update_client", id: id, site_name: site_name }
		}).done(function( msg ) {		  
		  $("#clientModal").modal("hide");
		  displayAlert( msg, "Client" );
		  buildClientTable();
		  buildTimeEntryTable();
		});  
	});

	//Client detail
	$(document).on('click', '.detail-client', function() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "get_client", client: this.id }}).done(function( msg ) { 
			var json = JSON.parse(msg);
			
			$('#clientSite').val(json[0].site_name);	
			
			$('.removeClientButton').attr( "id", json[0].id );
		});
		//Remove submit class from button
		$('#clientModalButton').removeClass('add-client');
		
		//Add update class to button
		$('#clientModalButton').addClass('update-client');

		//Change text to update
		$('#clientModalButton').text('Update');
		$('#clientModalLabel').text('Update Client Site');
		$('.removeClientButton').removeClass("hidden");
	});

	$(document).on('click', '#viewTimeSheet', function(event) {
		event.preventDefault();
		var start_date = $('#timeentryExportStartDate').val();
		var finish_date = $('#timeentryExportFinishDate').val();
		var employee = $('#employeeExport').val(); 
		var clientSite = $('#clientSiteExport').val();

		var clientSiteName = $('#clientSiteExport').find(":selected").text();
		var employeeName = $('#employeeExport').find(":selected").text();

		//Set hidden values for exporting
		$('#tsexport_client_id').val(clientSite);
		$('#tsexport_employee_id').val(employee);
		$('#tsexport_start_date').val(start_date);
		$('#tsexport_finish_date').val(finish_date);
		$('#tsexport_employee_name').val(employeeName);
		$('#tsexport_client_site').val(clientSiteName);

		$.ajax({type: "POST", url: "../utility.php", data: { action: "export_time_sheet", start_date: start_date, finish_date: finish_date, employeeID: employee, clientSiteID: clientSite }}).done(function( msg ) {
			var json = JSON.parse(msg);
			
			//Populate header
			var header = "<h3>" + employeeName + " | " + clientSiteName + " | " + start_date + " | " + finish_date + "</h3>";
			$('#timesheetModalLabel').empty();
			$('#timesheetModalLabel').append(header);

			//Create display table
			var finishedTable = "<table class='table table-bordered'><tr><th>Job Code</th><th>Hours</th><th>Description</th></tr>";
			jQuery.each( json, function() {
				/*console.log( "ID: " + this.id );
				console.log( "Client_ID: " + this.client_id );
				console.log( "Employee_ID: " + this.employee_id );
				console.log( "JobCode_ID: " + this.employee_id );
				console.log( "Description: " + this.description );
				console.log( "Hours: " + this.hours );*/

				finishedTable += "<tr><td><p id='exp-id-" + this.id + "'></p></td><td><p>" + this.hours + "</p></td><td><p>" + this.description + "</p></td>";
				
				//Pull the job code from the unique ID
				let id = this.id;
				$.ajax({type: "POST", url: "../utility.php", data: { action: "get_job_code", id: this.jobcode_id }}).done(function(msg) { $('#exp-id-'+id).text(JSON.parse(msg)[0].code); });
			});
			finishedTable += "</table>";

			$('#displayTimeSheet').empty();
			$('#displayTimeSheet').append(finishedTable);
		}); 	
	});
	
	$(document).on('click', '.export-timesheet', function(event) {
		console.log( "Export button pressed" );
		console.log("/********************/");
		var clientSite = $('#tsexport_client_id').val();
		var employee = $('#tsexport_employee_id').val();
		var employeeName = $('#tsexport_employee_name').val();
		var clientName = $('#tsexport_client_site').val();
		var start_date = $('#tsexport_start_date').val();
		var finish_date = $('#tsexport_finish_date').val();

		console.log( "Client ID: " + clientSite );
		console.log( "Employee ID: " + employee );
		console.log( "Start Date: " + start_date );
		console.log( "Finish Date: " + finish_date );
		console.log( "-=-=-=-=-=-=-=-=-=-=-=-=");

		window.location = "../tbs/excel_export.php?start_date=" + encodeURIComponent(start_date) + "&finish_date=" + encodeURIComponent(finish_date) + "&employee=" + encodeURIComponent(employeeName) + "&site_name=" + encodeURIComponent(clientName) + "&employee_id=" + employee + "&client_id=" + clientSite;
		//Pull time entries
		//$.ajax({type: "POST", url: "../utility.php", data: { action: "export_time_sheet", start_date: start_date, finish_date: finish_date, employeeID: employee, clientSiteID: clientSite }}).done(function( msg ) {
			//console.log( "AJAX completed.");
			//var json = JSON.parse(msg);
			//console.log( json );
			
			//AJAX call to excel_export.php
			//$.ajax({type: "POST", url: "../tbs/excel_export.php", data: { start_date: start_date, finish_date: finish_date, employee: employeeName, site_name: clientName, json: msg }}).done(function(msg){
				//$("#timesheetModal").modal("hide");
		  	//displayAlert( msg, "Excel export completed" );
			//});

			//window.location = "../tbs/excel_export.php?start_date=" + encodeURIComponent(start_date) + "&finish_date=" + encodeURIComponent(finish_date) + "&employee=" + encodeURIComponent(employeeName) + "&site_name=" + encodeURIComponent(clientName) + "&json=" + encodeURIComponent(msg);
		//});
	});
	
	/* TABLE BUILDING FUNCTIONS */
	function buildClientTable() {
		$.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) {
			var json = JSON.parse(msg);
			var finishedTable = "<table class='table'><tr><th>Site Name</th><th></th></tr>";
			for (var i=0; i < json.length; i++) {
				var o = json[i];
				finishedTable += "<tr><td><p>" + o.site_name + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-client' data-toggle='modal' data-target='#clientModal'>Detail</button></td></tr>";
			}
			finishedTable += "</table><button class='new-client btn btn-sm btn-success' data-toggle='modal' data-target='#clientModal'>New Client</button>";

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
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-job-code' data-toggle='modal' data-target='#jobCodeModal'>Detail</button></td></tr>";
			}
			finishedTable += "</table><button class='new-job-code btn btn-sm btn-success' data-toggle='modal' data-target='#jobCodeModal'>New Job Code</button>";

			$('.jobCodeTable').empty();
			$('.jobCodeTable').append(finishedTable);
			$('#newJobCode').val("");
			$('#newJobCodeDescription').val("");
		});
	}

	function buildEmployeeTable() {
    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildEmployeeTable" }}).done(function( msg ) {
			var json = JSON.parse(msg);
			//console.log( "json.length = " + json.length);
			//console.log( "Object.keys(json).length = " + Object.keys(json).length);
			var finishedTable = "<table class='table'><tr><th>Name</th><th>Phone Number</th><th>Email Address</th><th></th></tr>";
			for (var i=0; i < json.length; i++) {
				var o = json[i];
				finishedTable += "<tr><td><p>" + o.name + "</p></td><td><p>" + o.phone + "</p></td><td>";
				finishedTable += "<p>" + o.email + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-employee' data-toggle='modal' data-target='#employeeModal'>Detail</button></td></tr>";
			}
			finishedTable += "</table><button class='new-employee btn btn-sm btn-success' data-toggle='modal' data-target='#employeeModal'>New Employee</button>";

			$('.employeeTable').empty();
			$('.employeeTable').append(finishedTable);
			$('#employeeName').val("");
			$('#employeePhone').val("");
			$('#employeeEmail').val("");
			$('#employeeAccessCode').val("");
		});
	}

	function buildTimeEntryTable_User( date ) {
    var employee;
    $.ajax({type: "POST", url: "../utility.php", data: { action: "get_logged_in_user" }}).done(function( msg ) { employee = msg; }).done( function() {
	    $.ajax({type: "POST", url: "../utility.php", data: { action: "buildTimeEntryTable", date: date }}).done(function( msg ) {
				if (msg === "null") {
					$('.timeEntryTable').append("<p>No time entries found.</p><button class='new-time-entry btn btn-sm btn-success' data-toggle='modal' data-target='#timeEntryModal'>New Time Entry</button>");
					$('#timeEntryDate').val("");
				} else {
					console.log(msg);
					var json = JSON.parse(msg);					
					var finishedTable = "<table class='table'><tr><th>Date</th><th>Site Name</th><th>Hours</th><th></th></tr>";
					
					var length;
					if (typeof json.id !== 'undefined') length = 1;
					else length = Object.keys(json).length;
					for (var i=0; i < length; i++) {
						var o = json[i];
						
						let id = o.id;
						$.ajax({type: "POST", url: "../utility.php", data: { action: "get_client", client: o.client_id }}).done(function( msg ) { $('#tet-client-'+id).text(JSON.parse(msg)[0].site_name); });

						finishedTable += "<tr><td><p>" + o.date + "</p></td><td>";
						finishedTable += "<p id='tet-client-" + o.id + "'></p></td><td><p>" + o.hours + "</p></td><td>";
						finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-time-entry' data-toggle='modal' data-target='#timeEntryModal'>Detail</button></td></tr>";
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
				$.ajax({type: "POST", url: "../utility.php", data: { action: "get_employee", employee: o.employee_id }}).done(function( msg ) { 
					var json = JSON.parse(msg);
					var name = "N/A";
					if (typeof json[0] !== 'undefined') name = json[0].name;
					$('#tet-emp-'+id).text(name);  
				});
				$.ajax({type: "POST", url: "../utility.php", data: { action: "get_client", client: o.client_id }}).done(function( msg ) { 
					var json = JSON.parse(msg);
					var site_name = "N/A";
					if (typeof json[0] !== 'undefined') site_name = json[0].site_name;
					$('#tet-client-'+id).text(site_name); 
				});

				finishedTable += "<tr><td><p>" + o.date + "</p></td><td><p id='tet-emp-" + o.id + "'></p></td><td>";
				finishedTable += "<p id='tet-client-" + o.id + "'></p></td><td><p>" + o.hours + "</p></td><td>";
				finishedTable += "<button id='" + o.id + "' class='btn btn-sm btn-info detail-time-entry' data-toggle='modal' data-target='#timeEntryModal'>Detail</button></td></tr>";
			}
			finishedTable += "</table>";

			$('.timeEntryTable').empty();
			$('.timeEntryTable').append(finishedTable);
			if (!$('#admin-container').hasClass('accordion')) addAccordion();
		});
	}

	/* MISC FUNCTIONS */
  function displayAlert( msg, messageText ) {
		if (msg === "Success") $(function() { new PNotify({ title: 'Success!!', delay: 2000, text: messageText + " has been added successfully", type: 'success' }); });
		else if (msg === "Failure") $(function() { new PNotify({ title: 'Error', delay: 2000, text: "Failed to add new " + messageText, type: 'error' }); });
		else $(function() { new PNotify({ title: 'Other', delay: 10000, text: "Message: " + msg, type: 'info' }); });
	}

  function addAccordion() { //Activate accordion after the time entries tables is built
  	$('#admin-container').addClass('accordion');
		$( ".accordion" ).accordion({ collapsible: true, active: false }); 
  }

  function buildAdminExportSelects() {
  	$.ajax({type: "POST", url: "../utility.php", data: { action: "buildClientTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select name='clientSiteExport' class='form-control' id='clientSiteExport'><option value='null'>Select a site name</option>";
			if (typeof json.id !== 'undefined') length = 1;
			else length = Object.keys(json).length;
			for (var i=0; i < length; i++) {
				if (length > 1) var o = json[i];
				else var o = json;
				finishedSelect += "<option value='" + o.id + "'>" + o.site_name + "</option>";
			}	
			finishedSelect += "</select>";

			$('#clientSiteExportSelect').empty();
			$('#clientSiteExportSelect').append(finishedSelect);
	  });

	  $.ajax({type: "POST", url: "../utility.php", data: { action: "buildEmployeeTable" }}).done(function( msg ) { 
	    var json = JSON.parse(msg);		
			var length;
			var finishedSelect = "<select name='employeeExport' class='form-control' id='employeeExport'><option value='null'>Select an employee</option>";
			if (typeof json.id !== 'undefined') length = 1;
			else length = Object.keys(json).length;
			for (var i=0; i < length; i++) {
				if (length > 1) var o = json[i];
				else var o = json;
				finishedSelect += "<option value='" + o.id + "'>" + o.name + "</option>";
			}	
			finishedSelect += "</select>";

			$('#employeeExportSelect').empty();
			$('#employeeExportSelect').append(finishedSelect);
	  });
  }

	/* Setup to figure out whether user is admin or not */
	$.ajax({type: "POST", url: "../utility.php", data: { action: "get_logged_in_user" }}).done(function( msg ) {
		console.log( "logged in user: " + msg );
		if (msg > 0) {
			$.ajax({type: "POST", url: "../utility.php", data: { action: "check_for_admin" }}).done(function( msg ) {
				console.log( "msg: " + msg );
				if (msg === "1") {
					buildTimeEntryTable(); //Build time entry table from JSON
					buildEmployeeTable() //Build employee table from JSON
					buildClientTable(); //Build client table from JSON
					buildJobCodeTable(); //Build job code table from JSON

					//Add something in here to make the admin detail view work
					$('#timeEntryEmployeeSelect').removeClass('hidden');
					$('#timeEntryEmployeeLabel').removeClass('hidden');
					
					var today = new Date();
		      var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
		      $('#timeentryExportStartDate').val(date);
		      $('#timeentryExportFinishDate').val(date);

		      buildAdminExportSelects();
				} else {
					var today = new Date();
			    var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
					buildTimeEntryTable_User(date);
					$('#displayTimeEntriesDate').val(date);
				}
			});
		}
	});

	$(function() { $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' }); });
});
