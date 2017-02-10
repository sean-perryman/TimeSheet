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
    }
  }
?>

  
    <div class="container">
      <?php
        if ($_SESSION['user_id']) { // User is logged in

          //Non-Admin User - Displays all of their time entries
          if (!$_SESSION['admin']) {        
            $user_id = $_SESSION['user_id'];
            $result = mysqli_query( $link, "SELECT * FROM timeentry WHERE employee_id = $user_id" );
            if (mysqli_num_rows( $result ) == 0) echo "<p>No time entries found.</p>";
            else {
              $total_hours = 0; ?>
              <table class='table well'>
                <tr>
                  <th>Date</th>
                  <th>Site Name</th>
                  <th>Hours</th>
                </tr>
              <?php while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr><td>";
                echo $row['date'];
                echo "</td><td>";
                echo get_client($row['client_id']);
                echo "</td><td>";
                echo $row['hours'];
                echo "</td>";
                echo '<td><button id="' . $row['id'] . '" class="time-entry-detail btn btn-sm btn-info">Detail</button>'; //need to verify auth
                echo "</td></tr>";
                $total_hours += $row['hours'];
              }
              echo "</table>";
              echo "Total Hours: " . $total_hours;
            }
            echo '<td><button id="new-time-entry" class="btn btn-sm btn-success">New Time Entry</button>';
          } else {//End non-admin user ?>
            <?php require('new_client_modal.php'); ?>
            <?php require('new_job_code_modal.php'); ?>
            <div id="accordion">  
              <h2 class="alert alert-info">Time Entries</h2>
              <div class="timeEntryTable"> <!-- Time Entries-->
                <?php $timeentries = get_time_entry(""); ?>
                <table class='table'>
                  <tr>
                    <th>Date</th>
                    <th>Employee</th>
                    <th>Site Name</th>
                    <th>Hours</th>
                    <th></th>
                  </tr>
                  <?php for ($i = 0; $i < count($timeentries); $i++) {
                    echo "<tr><td>";
                    echo $timeentries[$i]['date'];
                    echo "</td><td>";
                    echo get_employee($timeentries[$i]['employee_id'])['name'];
                    echo "</td><td>";
                    echo get_client( $timeentries[$i]['client_id'] );
                    echo "</td><td>";
                    echo $timeentries[$i]['hours'];
                    echo "</td>";
                    echo '<td><button id="te-detail-' . $timeentries[$i]['id'] . '" class="btn btn-sm btn-info">Detail</button></td>';
                    echo "</tr>";             
                  } ?>
                </table>
              </div>

              <h2 class="alert alert-info">Employees</h2>
              <div class="employeeTable">  <!-- Employees -->
                <?php $employees = get_employee(""); ?> 
                <table class='table'>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th></th>
                  </tr>
                  <?php for ($i = 0; $i < count($employees); $i++) {
                    echo "<tr><td>";
                    echo $employees[$i]['name'];
                    echo "</td><td>";
                    echo $employees[$i]['phone'];
                    echo "</td><td>";
                    echo $employees[$i]['email'];
                    echo "</td>";
                    echo '<td><button id="' . $employees[$i]['id'] . '" class="col-md-3 btn btn-sm btn-danger remove-employee">Delete</button>';
                    echo '<button id="' . $employees[$i]['id'] . '" class="col-md-3 col-md-offset-2 btn btn-sm btn-info detail-employee">Detail</button></td>';
                    echo "</tr>";             
                  } ?>
                </table>
                <button class="btn btn-sm btn-success add-employee">New Employee</button>
              </div>
              
              <h2 class="alert alert-info">Job Codes</h2>
              <div class="jobCodeTable">  <!-- Job Codes -->
              </div>

              <h2 class="clients alert alert-info">Clients</h2>
              <div class="clientTable">  <!-- Clients -->
              </div>
            
            </div>
          <?php }

        }
      require( 'footer.php' ); 
     ?>