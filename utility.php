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
    	$data[] = array();
      while ($row = mysqli_fetch_assoc($result)) {
      	$data[] = $row;
      }
      return $data;
    }
    mysqli_close( $link );
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
	    while ($row = mysqli_fetch_row($result)) {
	    	$data[] = $row[1];
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
	    while ($row = mysqli_fetch_row($result)) {
	    	$data[] = $row[1];
	    }
	   	return $data;
	  }
    mysqli_close( $link );
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
    mysqli_close( $link );
	}
?>