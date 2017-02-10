$(document).ready( function() {
	/* Add Client Ajax Function */
	$('.add-client').click( function() {
		var client = $('#newClientSite').val();
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client", client: client }
		}).done(function( msg ) {		  
		  $("#clientModal").modal().hide();
		  displayAlert( msg, "Client added successfully." );
		  
		});  
	});

	/* Remove Client Ajax Function */
	$('.remove-client').click( function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_client", client: this.id }
			}).done(function( msg ) {
			  displayAlert( msg, "Client removed successfully." );
			}); 
		} else window.location = "/";
	 });

	/* Add Job Code Ajax Function */
	$('.add-job-code').click( function() {
		var client = prompt("Enter new site name");
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client", client: client }
		}).done(function( msg ) {
		  window.location = "/";
		  alert( msg );
		  //jQuery in a flash message
		  //SetTimeout to fade it out
		});  
	});

	/* Remove Job Code Ajax Function */
	$('.remove-job-code').click( function() { 
		//Perhaps an ajax call to the get_client function to populate a variable?
		var c = confirm( "Please confirm you would like to delete this entry." );
		if (c) {
			$.ajax({
			  type: "POST",
			  url: "../utility.php",
			  data: { action: "rem_client", client: this.id }
			}).done(function( msg ) {
			  window.location = "/";
			  $('#alert').append('<p class="alert alert-info">' + msg + '<p>');
			  //jQuery in a flash message
			  //SetTimeout to fade it out
			}); 
		} else window.location = "/";
	 });

	//jQuery Accordion
	$( function() {
    $( "#accordion" ).accordion({ collapsible: true, active: false });
  } );

	function displayAlert( msg, messageText ) {
		if (msg === "Success") $(function() { new PNotify({ title: 'Success!!', text: messageText, type: 'success' }); });
		else if (msg === "Failure") $(function() { new PNotify({ title: 'Error', text: messageText, type: 'error' }); });
		//setTimeout( function() { window.location.reload(); }, 2000); //Need a more elegant way of handling this.
		/* Perhaps I can utilize ajax and rebuild the table with the get_whatever command. */
	}
	/*
	"<tr><td><p class=''>";
    echo $clients[$i]['site_name'];
    echo "</p></td>";
    echo '<td><button id="' . $clients[$i]['id'] . '" class="col-md-2 col-md-offset-3 btn btn-sm btn-danger remove-client">Delete</button>';
    echo '<button id="' . $clients[$i]['id'] . '" class="col-md-2 col-md-offset-2 btn btn-sm btn-info detail-client">Detail</button></td>';
    echo "</tr>";             

	*/

	$('.build-test-table').click(function () {
		$.ajax({
			type: "POST",
			url: "../utility.php",
			data: { action: "buildTestTable" }
			}).done(function( msg ) {
				var json = JSON.parse(msg)
				var finishedTable = "<table class='table'><tr><th>Site Name</th><th></th></tr>";
				for (var i=0; i < json.length; i++) {
					var o = json[i];
					//alert( o.site_name );
					finishedTable += "<tr><td><p>" + o.site_name + "</p></td><td><button id='" + o.id + "' class='col-md-2 col-md-offset-3 btn btn-sm btn-danger remove-client'>Delete</button>";
					finishedTable += "<button id='" + o.id + "' class='col-md-2 col-md-offset-2 btn btn-sm btn-info detail-client'>Detail</button></td></tr>";
				}
				finishedTable += "</table><button class='btn btn-sm btn-success' data-toggle='modal' data-target='#clientModal'>New Client</button>";

				$('.testTable').empty();
				$('.testTable').append(finishedTable);
			});
	});
});
