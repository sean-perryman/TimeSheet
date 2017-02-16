<?php
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
    } elseif ($_POST['log_out'] === "true") {
      session_unset();
      header( "Location: /" );
    }
  }
?>

  
    <div class="container">
      <?php
        if ($_SESSION['user_id']) { // User is logged in
          //Non-Admin User - Displays all of their time entries
          if (!isset($_SESSION['admin'])) { 
            require('time_entry_modal.php');       
            ?><h2 class="alert alert-info">Time Entries</h2>
              <div class="timeEntryTable mainTables"> <!-- Time Entries--></div><?php
          } else {//End non-admin user ?>
            <?php require('new_client_modal.php'); ?>
            <?php require('new_job_code_modal.php'); ?>
            <?php require('new_employee_modal.php'); ?>
            <?php require('time_entry_modal.php'); ?>
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
      require( 'footer.php' ); ?>
     
      