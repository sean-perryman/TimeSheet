$(document).ready( function() {
	/* Add Client Ajax Function */
	$('.add-client').click( function() {
		var client = prompt("Enter new site name");
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client", client: client }
		}).done(function( msg ) {		  
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

	//$(function() { PNotify.prototype.options.styling = "bootstrap3"; });

  /*$(function() {
    new PNotify({
    	title: 'Oh No!',
    	text: 'Something terrible happened.',
    	type: 'error'
		});
	});*/

	function displayAlert( msg, messageText ) {
		if (msg === "Success") $(function() { new PNotify({ title: 'Success!!', text: messageText, type: 'success' }); });
		else if (msg === "Failure") $(function() { new PNotify({ title: 'Error', text: messageText, type: 'error' }); });
		setTimeout( function() { window.location.reload(); }, 2000);
	}
});
