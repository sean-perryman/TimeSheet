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

	if (isset($_POST['action'])) {
    switch ($_POST['action']) {
      case 'add_client':
        add_client("test site 3107");
        break;
      case 'select':
        select();
        break;
    }
	}	

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

	function add_employee( $name, $phone, $email, $access_code, $admin ) {}

	function remove_employee( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM employees WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
	}

	function add_client( $site_name ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		$result = mysqli_query($link, "INSERT INTO clients (site_name) VALUES ('Test Site 3108')");
		if (mysqli_num_rows($result) > 0) {
		    echo "Success";
		} else {
		    echo "Failure";
		}
		mysqli_close($link);
	}

	function remove_client( $id ) {
		global $link;
		$result = mysqli_query( $link, "DELETE FROM clients WHERE id = $id");
		if (mysqli_num_rows($result) == 0) return false;
		else return true;
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
?>