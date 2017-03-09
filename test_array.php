<?php
	date_default_timezone_set("America/New_York");
	function unique_multidim_array($array, $key) { 
    $temp_array = array(); 
    $i = 0; 
    $key_array = array(); 
    
    foreach($array as $val) { 
        if (!in_array($val[$key], $key_array)) { 
            $key_array[$i] = $val[$key]; 
            $temp_array[$i] = $val; 
        } 
        $i++; 
    } 
    return $temp_array; 
	}

	$dates = array( "2017-10-01", "2017-10-01","2017-10-01","2017-10-02","2017-10-02","2017-10-01","2017-10-03","2017-10-03","2017-10-04","2017-10-01","2017-10-03","2017-10-01");
	$days = array();

	foreach ($dates as $row) {
	  $dayofweek = date('w', strtotime($row) );
	  $day = "";
	  
	  switch( $dayofweek ) {
	  	case 0:
	  		$day = "M";
	  		break;
	  	case 1:
	  		$day = "T";
	  		break;
	  	case 2:
	  		$day = "W";
	  		break;
	  	case 3:
	  		$day = "T";
	  		break;
	  	case 4:
	  		$day = "F";
	  		break;
	  	case 5:
	  		$day = "S";
	  		break;
	  	case 6:
	  		$day = "S";
	  		break;
	  }	

	  $days[] = array("day" => $day, "date" => $row);
	}

	print_r( unique_multidim_array($days, "date") );
?>