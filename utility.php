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
      	remove_client( $_POST['id'] );
      	break;
      case 'add_job_code':
      	add_job_code( $_POST['code'], $_POST['desc'] );
      	break;
      case 'rem_job_code':
      	remove_job_code( $_POST['id'] );
      	break;
      case 'buildClientTable':
      	build_client_table();
      	break;
      case 'buildJobCodeTable':
      	build_job_code_table();
      	break;
    }
	}	

	/* Begin Read Functions */
	function get_employee( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
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
    mysqli_close($link);
	}

	function get_client( $id ) {	
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
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
    mysqli_close( $link );
	}

	function get_job_code( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
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
	  mysqli_close($link);
	}

	function get_time_entry( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
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
    mysqli_close($link);
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
		mysqli_close($link); //DONE
	}

	function remove_client( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($id == "") {
			echo "Please enter a site name";
		} else {
			$result = mysqli_query( $link, "DELETE FROM clients WHERE id = $id");
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		} //DONE
	}

	function add_job_code( $code, $desc ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($code == "") {
			echo "Please enter a job code";
		} else {
			$s_code = mysqli_real_escape_string($link, $code);
			$s_desc = mysqli_real_escape_string($link, $desc);
			$result = mysqli_query($link, "INSERT INTO jobcodes (code, description) VALUES ('$s_code', '$s_desc')");	
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
		mysqli_close($link);
	}

	function remove_job_code( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($id == "") {
			echo "Please enter a site name";
		} else {
			$result = mysqli_query( $link, "DELETE FROM jobcodes WHERE id = $id");
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
	}

	function add_time_entry( $employee, $client, $job_code, $hours, $description ) {}

	function remove_time_entry( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM timeentry WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
	}
	/* End Create/Update/Delete Functions */

	/* Table Building - Simple JSON return */
	function build_client_table() {
		echo json_encode(get_client(""));
	}

	function build_job_code_table() {
		echo json_encode(get_job_code(""));
	}

	function build_employee_table() {
		echo json_encode(get_employee(""));
	}

	function build_time_entry_table( $id ) {
		echo json_encode(get_time_entry($id));
	}
?>