$(document).ready( function() {
	$("#new-client-button").click( function() {
		$.ajax({
		  type: "POST",
		  url: "../utility.php",
		  data: { action: "add_client" }
		}).done(function( msg ) {
		  window.location = "/";
		  alert( msg );
		  //jQuery in a flash message
		  //SetTimeout to fade it out
		});  
	});
});
