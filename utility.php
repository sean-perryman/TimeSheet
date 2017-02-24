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
		if (!is_session_started()) session_start();
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
      case 'add_employee':
      	add_employee( $_POST['name'], $_POST['phone'], $_POST['email'], $_POST['accessCode'] );
      	break;
      case 'update_employee':
      	update_employee( $_POST['id'], $_POST['name'], $_POST['phone'], $_POST['email'], $_POST['accessCode'] );
      	break;
      case 'add_time_entry':
      	add_time_entry( $_POST['date'], $_POST['employee_id'], $_POST['site_name'], $_POST['job_code'], $_POST['hours'], $_POST['description'], $_POST['finalized'] );
      	break;
      case 'update_time_entry':
      	update_time_entry( $_POST['timeentry_id'], $_POST['date'], $_POST['employee_id'], $_POST['site_name'], $_POST['job_code'], $_POST['hours'], $_POST['description'], $_POST['finalized'] );
      	break;
      case 'rem_employee':
      	remove_employee( $_POST['id'] );
      	break;
      case 'buildClientTable':
      	build_client_table();
      	break;
      case 'buildJobCodeTable':
      	build_job_code_table();
      	break;
      case 'buildEmployeeTable':
      	build_employee_table();
      	break;
      case 'buildTimeEntryTable':
      	build_time_entry_table( $_POST['date'] );
      	break;
      case 'get_employee':
      	echo json_encode(get_employee($_POST['employee']));
      	break;
      case 'get_client':
      	echo get_client( $_POST['client'] );
      	break;
      case 'check_for_admin':
        echo isset($_SESSION['admin']);
        break;
      case 'get_logged_in_user':
       	echo $_SESSION['user_id'];
       	break;
      case 'get_time_entry':
      	echo get_individual_time_entry($_POST['id']);
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

  	$data = array();  
    while ($row = mysqli_fetch_assoc($result)) {
    	$data[] = $row;
    }
    return $data;
    
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
    	echo json_encode(mysqli_fetch_assoc($result));
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

    if (mysqli_num_rows( $result ) == 0) echo "[{'id':''}]";
    elseif (mysqli_num_rows( $result) == 1) {
    	echo json_encode(mysqli_fetch_assoc($result));
    } else { 
    	$data = array();  
	    while ($row = mysqli_fetch_assoc($result)) {
	    	$data[] = $row;
	    }
	   	return $data;
    }
    mysqli_close( $link );
	}

	function get_individual_time_entry( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		$result = mysqli_query( $link, "SELECT * FROM timeentry WHERE id = $id" );

    if (mysqli_num_rows( $result ) == 0) return null;
    elseif (mysqli_num_rows( $result) == 1) echo json_encode(mysqli_fetch_assoc($result));
    mysqli_close($link);
	}

	function get_time_entry( $id, $date ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ( $id == "" ) {
			$result = mysqli_query( $link, "SELECT * FROM timeentry" );
		} elseif (isset($date)) {
			$result = mysqli_query( $link, "SELECT * FROM timeentry WHERE employee_id = $id AND date LIKE '" . $date . "%'" );
		} else {
			$result = mysqli_query( $link, "SELECT * FROM timeentry WHERE employee_id = $id" );
		}

  	$data = array();  
    while ($row = mysqli_fetch_assoc($result)) {
    	$data[] = $row;
    }
    return $data;
    
    mysqli_close($link);
	}
	/* End Read Functions*/

	/* Begin Create/Update/Delete Functions */
	function add_employee( $name, $phone, $email, $access_code ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($name == "") {
			echo "Please enter an employee name";
		} else {
			$s_name = mysqli_real_escape_string($link, $name);
			$s_phone = mysqli_real_escape_string($link, $phone);
			$s_email = mysqli_real_escape_string($link, $email);
			$s_access_code = mysqli_real_escape_string($link, $access_code);
			$result = mysqli_query($link, "INSERT INTO employees (name, phone, email, access_code) VALUES ('$s_name', '$s_phone', '$s_email', '$s_access_code')");	
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
		mysqli_close($link);
	}

	function update_employee( $id, $name, $phone, $email, $access_code ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		
		$s_id = mysqli_real_escape_string( $link, $id );
		$s_name = mysqli_real_escape_string($link, $name);
		$s_phone = mysqli_real_escape_string($link, $phone);
		$s_email = mysqli_real_escape_string($link, $email);
		$s_access_code = mysqli_real_escape_string($link, $access_code);
		$result = mysqli_query($link, "UPDATE employees SET name='$s_name', phone='$s_phone', email='$s_email', access_code='$s_access_code' WHERE id='$s_id'");	
		if (!$result) echo "Failure";
		else echo "Success";
		
		mysqli_close($link);
	}

	function remove_employee( $id ) {
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		if ($id == "") {
			echo "Please select an employee";
		} else {
			$result = mysqli_query( $link, "DELETE FROM employees WHERE id = $id");
			if (mysqli_num_rows($result) === 0) echo "Failure";
			else echo "Success";
		}
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

	function add_time_entry( $date, $employee, $client, $job_code, $hours, $description, $finalized ) {
		//TODO: some form of validation
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		
		$s_date = date( 'Y-m-d H:i:s', strtotime(mysqli_real_escape_string($link, $date)) );
		//$s_date = mysqli_real_escape_string($link, $date);
		$s_employee = mysqli_real_escape_string($link, $employee);
		$s_client = mysqli_real_escape_string($link, $client);
		$s_job_code = mysqli_real_escape_string($link, $job_code);
		$s_hours = mysqli_real_escape_string($link, $hours);
		$s_desc = mysqli_real_escape_string($link, $description);
		$s_finalized = mysqli_real_escape_string($link, $finalized);

		$result = mysqli_query($link, "INSERT INTO timeentry (date, employee_id, client_id, jobcode_id, hours, description, finalized) VALUES ('$s_date', '$s_employee', '$s_client', '$s_job_code', '$s_hours', '$s_desc', '$s_finalized')");	
		if (mysqli_num_rows($result) === 0) echo "Failure";
		else echo "Success";
		
		mysqli_close($link);
	}

	function update_time_entry( $timeentry_id, $date, $employee, $client, $job_code, $hours, $description, $finalized ) {
		//TODO: some form of validation
		$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
		
		$s_date = date( 'Y-m-d H:i:s', strtotime(mysqli_real_escape_string($link, $date)) );
		$s_id = mysqli_real_escape_string($link, $timeentry_id);
		$s_employee = mysqli_real_escape_string($link, $employee);
		$s_client = mysqli_real_escape_string($link, $client);
		$s_job_code = mysqli_real_escape_string($link, $job_code);
		$s_hours = mysqli_real_escape_string($link, $hours);
		$s_desc = mysqli_real_escape_string($link, $description);
		$s_finalized = mysqli_real_escape_string($link, $finalized);

		$sql = "UPDATE timeentry SET date='$s_date', employee_id='$s_employee', client_id='$s_client', jobcode_id='$s_job_code', hours='$s_hours', description='$s_desc', finalized='$s_finalized' WHERE id=" . $timeentry_id;
		$result = mysqli_query($link, $sql);
		if (!$result) echo "Failure";
		else echo "Success";
		
		mysqli_close($link);
	}

	function remove_time_entry( $id ) {}
	/* End Create/Update/Delete Functions */

	/* Table Building - Simple JSON return */
	function build_client_table() { echo json_encode(get_client("")); }

	function build_job_code_table() { echo json_encode(get_job_code("")); }

	function build_employee_table() { echo json_encode(get_employee("")); }

	function build_time_entry_table( $date ) { 
		if ($_SESSION['admin']) echo json_encode(get_time_entry()); 
		else if (isset($date)) echo json_encode(get_time_entry( $_SESSION['user_id'], $date ));
		else echo json_encode(get_time_entry( $_SESSION['user_id'] ));
	}
?>