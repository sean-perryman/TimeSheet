<?php
	// Check for session
	function is_session_started() {
    if ( php_sapi_name() !== 'cli' ) {
      if ( version_compare(phpversion(), '5.4.0', '>=') ) {
        return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
      } else {
        return session_id() === '' ? FALSE : TRUE;
      }
    }
    return FALSE;
	}

	/* POST action AJAX handler */
	if (isset($_POST['action'])) {
    switch ($_POST['action']) {
      case 'add_client':
        add_client($_POST['client']);
        break;
      case 'rem_client':
      	remove_client( $_POST['client'] );
      	break;
      case 'select':
        select();
        break;
    }
	}	

	/* Begin Read Functions */
	function get_employee( $id ) {
		global $link;
		if ( $id == "" ) {
			$result = mysqli_query( $link, "SELECT * FROM employees" );
		} else {
			$result = mysqli_query( $link, "SELECT * FROM employees WHERE id = $id" );
		}

    if (mysqli_num_rows( $result ) == 0) echo "N/A";
    elseif (mysqli_num_rows( $result) == 1) {
    	return mysqli_fetch_assoc($result);
    } else { 
    	$data = array();  
      while ($row = mysqli_fetch_assoc($result)) {
      	$data[] = $row;
      }
      return $data;
    }
	}

	function get_client( $id ) {
		global $link;
		if ( $id == "" ) {
			$result = mysqli_query( $link, "SELECT * FROM clients" );
		} else {
			$result = mysqli_query( $link, "SELECT * FROM clients WHERE id = $id" );
		}

    if (mysqli_num_rows( $result ) == 0) echo "N/A";
    elseif (mysqli_num_rows( $result) == 1) {
    	echo mysqli_fetch_row($result)[1];
    } else { 
    	$data = array();  
	    while ($row = mysqli_fetch_assoc($result)) {
	    	$data[] = $row;
	    }
	   	return $data;
    }
	}

	function get_job_code( $id ) {
		global $link;
		if ( $id == "" ) {
			$result = mysqli_query( $link, "SELECT * FROM jobcodes" );
		} else {
			$result = mysqli_query( $link, "SELECT * FROM jobcodes WHERE id = $id" );
		}

    if (mysqli_num_rows( $result ) == 0) echo "N/A";
    elseif (mysqli_num_rows( $result) == 1) {
    	echo mysqli_fetch_row($result)[1];
    } else { 
    	$data = array();  
	    while ($row = mysqli_fetch_assoc($result)) {
	    	$data[] = $row;
	    }
	   	return $data;
	  }
	}

	function get_time_entry( $id ) {
		global $link;
		if ( $id == "" ) {
			$result = mysqli_query( $link, "SELECT * FROM timeentry" );
		} else {
			$result = mysqli_query( $link, "SELECT * FROM timeentry WHERE employee_id = $id" );
		}

    if (mysqli_num_rows( $result ) == 0) echo "N/A";
    elseif (mysqli_num_rows( $result) == 1) {
    	return mysqli_fetch_assoc($result);
    } else { 
    	$data = array();  
      while ($row = mysqli_fetch_assoc($result)) {
      	$data[] = $row;
      }
      return $data;
    }
	}
	/* End Read Functions*/


	/* Begin Create/Update/Delete Functions */
	function add_employee( $name, $phone, $email, $access_code, $admin ) {}

	function remove_employee( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM employees WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
	}

	function add_client( $site_name ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($site_name == "") {
			echo "Please enter a site name";
		} else {
			$scrubbed = mysqli_real_escape_string($link, $site_name);
			$result = mysqli_query($link, "INSERT INTO clients (site_name) VALUES ('$scrubbed')");	
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
		mysqli_close($link);
	}

	function remove_client( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($id == "") {
			echo "Please enter a site name";
		} else {
			$result = mysqli_query( $link, "DELETE FROM clients WHERE id = $id");
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
	}

	function add_job_code( $code, $description ) {}

	function remove_job_code( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM jobcodes WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
	}

	function add_time_entry( $employee, $client, $job_code, $hours, $description ) {}

	function remove_time_entry( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM timeentry WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
	}

	/* End Create/Update/Delete Functions */

	/* Testing out building the client table from here, so that I can do it on the fly after updating */
	function build_client_table() {
		$clients = get_client("");
    /*<table class='table'>
      <tr>
        <th>Site Name</th>
        <th></th>
      </tr>
      <?php for ($i = 0; $i < count($clients); $i++) {
        echo "<tr><td><p class=''>";
        echo $clients[$i]['site_name'];
        echo "</p></td>";
        echo '<td><button id="' . $clients[$i]['id'] . '" class="col-md-2 col-md-offset-3 btn btn-sm btn-danger remove-client">Delete</button>';
        echo '<button id="' . $clients[$i]['id'] . '" class="col-md-2 col-md-offset-2 btn btn-sm btn-info detail-client">Detail</button></td>';
        echo "</tr>";             
      } ?>
    </table>
    <button class="btn btn-sm btn-success" data-toggle="modal" data-target="#clientModal">New Client</button>*/
	}
?>