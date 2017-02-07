<?php
	include( 'dblink.php' );
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

	function find_job_code_description( $code ) {
		echo "Testing";
		$result = mysqli_query( $link, "SELECT description FROM jobcodes WHERE code = $code" );
    if (mysqli_num_rows( $result ) == 0) return NULL;
    else {
      $row = mysqli_fetch_assoc($result);
      echo $row['description'];
    }
	}

	function find_site_name( $site ) {
		echo "Testing 2";
		$result = mysqli_query( $link, "SELECT site_name FROM clients WHERE id = $site" );
    if (mysqli_num_rows( $result ) == 0) return NULL;
    else {
      $row = mysqli_fetch_assoc($result);
      echo $row['site_name'];
    }
	}
?>