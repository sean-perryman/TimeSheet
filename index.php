<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  
  require('header.php');
  global $link;
  //Process access_code to user_id
  if (isset($_POST)) {
    if (isset($_POST['accesscode'])) { //Test if Access Code is set, pull user data or return error
      $code = mysqli_real_escape_string( $link, $_POST['accesscode']);

      $result = mysqli_query( $link, "SELECT * FROM employees WHERE access_code = $code" );
      $row = mysqli_fetch_assoc($result);
      if (!$row) {
        echo "<h3 class='alert-danger well'>Error - user does not exist</h3>";
      } else { //User has authenticated
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['name'] = $row['name'];
        if ($row['admin'] === "1") $_SESSION['admin'] = true;
        header( "Location: /" );
      }
    } elseif (isset($_POST['log_out']) && $_POST['log_out'] === "true") {
      session_unset();
      header( "Location: /" );
    }
  }
?>

  
    <div class="container">
      <?php
        if (isset($_SESSION['user_id'])) { // User is logged in
          //Non-Admin User - Displays all of their time entries
          if (!isset($_SESSION['admin'])) { 
            require('time_entry_modal.php');       
            ?><h2 class="alert alert-info">Time Entries</h2>
              <form class="well form-inline">
                <div class="form-group">
                  <input class="form-control datepicker" id="displayTimeEntriesDate">
                </div>
                <button class="btn btn-success" id='filterTimeEntries'>Filter</button>
                <button class="btn btn-info" id='todayTimeEntries'>Today</button>
                <button class="btn btn-info" id='showAllTimeEntries'>Show All Entries</button>
              </form>
              <div class="timeEntryTable mainTables"> <!-- Time Entries--></div><?php
            
          } else {//End non-admin user ?>
            <?php require('client_modal.php'); ?>
            <?php require('job_code_modal.php'); ?>
            <?php require('employee_modal.php'); ?>
            <?php require('time_entry_modal.php'); ?>
            <?php require('timesheet_modal.php'); ?>

            <form class="well form-inline">
              <div class="form-group">
                <label>Start Date</label>
                <input class="form-control datepicker" id="timeentryExportStartDate">
              </div>
              <div class="form-group">
                <label>Finish Date</label>
                <input class="form-control datepicker" id="timeentryExportFinishDate">
              </div>
              <div class="form-group" id="employeeExportSelect"></div>
              <div class="form-group" id="clientSiteExportSelect"></div>
              <button class="btn btn-success" id='viewTimeSheet' data-toggle='modal' data-target='#timesheetModal'>View Timesheet</button>
            </form>
            
            <div id="admin-container">
              
              <h2 class="alert alert-info">Time Entries</h2>
              <div class="timeEntryTable mainTables"> <!-- Time Entries--></div>

              <h2 class="alert alert-info">Employees</h2>
              <div class="employeeTable mainTables">  <!-- Employees --></div>
              
              <h2 class="alert alert-info">Job Codes</h2>
              <div class="jobCodeTable mainTables">  <!-- Job Codes --></div>

              <h2 class="clients alert alert-info">Clients</h2>
              <div class="clientTable mainTables">  <!-- Clients --></div>
            </div>
          <?php }

        }

      date_default_timezone_set("America/New_York");
      $dayofweek = date('w', strtotime(date('Y-m-d')));
      echo $dayofweek;
      require( 'footer.php' ); ?>
     
      