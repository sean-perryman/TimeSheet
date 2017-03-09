<?php
date_default_timezone_set("America/New_York");

function export_time_sheet( $start_date, $finish_date, $employeeID, $clientSiteID ) {
	$link = mysqli_connect( "localhost", "timesheet", "Pzfe24^8", "timeSheet" );
	$result = mysqli_query( $link, "SELECT * FROM timeentry WHERE employee_id = $employeeID AND client_id = $clientSiteID AND date BETWEEN '$start_date' AND '$finish_date'");

  $data = array();  
  while ($row = mysqli_fetch_assoc($result)) {
  	$data[] = $row;
  }
  return $data;
  
  mysqli_close($link);
}

$start_date = new DateTime($_GET['start_date']);
$finish_date = new DateTime($_GET['finish_date']);
$interval = new DateInterval('P1D');

$data = Array();

/* GET */
$data['date_range'] = $_GET['start_date'] . " to " . $_GET['finish_date'];
$data['employee'] = $_GET['employee'];
$data['site_name'] = $_GET['site_name'];

$te = export_time_sheet( $_GET['start_date'], $_GET['finish_date'], $_GET['employee_id'], $_GET['client_id'] );

$date_range = new DatePeriod( $start_date, $interval, $finish_date );

$dates = Array();
foreach($date_range as $date){
	$tmp = $date->format("Y-m-d");
  $dates[$tmp] = Array();
  $dates[$tmp]['day'] = substr(date("l", strtotime($tmp)), 0, 1);
  $dates[$tmp]['date'] = $tmp;
}

$t_dates = Array();
foreach( $te as $row ) {
	$temp_date = date("Y-m-d", strtotime($row['date']));
	$t_dates[$temp_date] = $temp_date;
}

$unique_dates = array_unique($t_dates);

$hours = Array();
foreach ($unique_dates as $row) {
	$hours[$row] = Array();
}
echo count($te);
foreach($te as $row) { //This is crapping when it tries to create another $hours[#][jobcode_id] that already exists. 
	$temp = date( "Y-m-d", strtotime($row['date']) );
	echo $row['jobcode_id'] . "\n\r";
	$hours[$temp][$row['jobcode_id']] = $row['hours'];
}

echo "<pre>";
var_dump( $hours );
echo "</pre>";

/* TINY BUT STRONG - OpenTBS
include_once('tbs_class.php');
include_once('tbs_plugin_opentbs.php');

$TBS = new clsTinyButStrong;
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN);

$template = "template.xlsx";
$TBS->LoadTemplate($template, OPENTBS_ALREADY_UTF8);

$TBS->MergeBlock('data', $data);
$TBS->MergeBlock('te,te2', $te);

$file_name = $data['site_name'] . ".xlsx";
$TBS->Show(OPENTBS_DOWNLOAD, $file_name);*/

exit();
?>