<?php 
  require('dblink.php');
  require('utility.php');
  if ( is_session_started() === FALSE ) session_start();

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
        if ($row['admin']) $_SESSION['admin'] = true;
      }
    } elseif ($_POST['log_out'] === "true") {
      session_unset();
    }
  }
?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Time Sheet</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">

          <!-- Login form -->
          <form class="navbar-form navbar-right" role="form" method="post">
            <?php if (!$_SESSION['user_id']) { ?>
            <div class="form-group">
              <input type="password" name="accesscode" placeholder="Access Code" class="form-control">
            </div>
            <button type="submit" class="btn btn-sm btn-success">Sign in</button>
            <?php } else { ?>
              <div class="form-group">
                <label class="text-primary">Signed in as <?php echo $_SESSION['name']; ?></label>
                <input type="hidden" name="log_out" value="true">
              </div>
              <button type="submit" class="btn btn-sm btn-success">Sign Out</button>
            <?php } ?>
          </form>
          
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

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
                  <th>Job Code</th>
                  <th>Description</th>
                  <th>Hours</th>
                </tr>
              <?php while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr><td>";
                echo $row['date'];
                echo "</td><td>";
                echo get_client( $row['client_id'] );
                echo "</td><td>";
                echo get_job_code($row['job_code']);
                echo "</td><td>";
                echo substr($row['description'], 0, 32);
                echo "</td><td>";
                echo $row['hours'];
                echo "</td>";
                echo '<td><button id="te-detail-' . $row['id'] . '" class="btn btn-sm btn-info">Detail</button>';
                echo "</td></tr>";
                $total_hours += $row['hours'];
              }
              echo "</table>";
              echo "Total Hours: " . $total_hours;
            }
          
          //} else {//End non-admin user ?>
              <div class="well"> <!-- Time Entries-->
                <?php $timeentries = get_time_entry(""); ?>
                <h2>Time Entries</h2>
                <table class='table'>

                  <tr>
                    <th>Date</th>
                    <th>Site Name</th>
                    <th>Job Code</th>
                    <th>Description</th>
                    <th>Hours</th>
                    <th></th>
                  </tr>
                  <?php for ($i = 0; $i < count($timeentries); $i++) {
                    echo "<tr><td>";
                    echo $timeentries[$i]['date'];
                    echo "</td><td>";
                    echo get_client( $timeentries[$i]['client_id'] );
                    echo "</td><td>";
                    echo get_job_code($timeentries[$i]['job_code']);
                    echo "</td><td>";
                    echo substr($timeentries[$i]['description'], 0, 32);
                    echo "</td><td>";
                    echo $timeentries[$i]['hours'];
                    echo "</td>";
                    echo '<td><button id="te-detail-' . $timeentries[$i]['id'] . '" class="btn btn-sm btn-info">Detail</button></td>';
                    echo "</tr>";             
                  } ?>
                </table>
              </div>

              <div class="well">  <!-- Employees -->
                <h2>Employees</h2>
                <div class="well"> <!-- Time Entries-->
                <?php $employees = get_employee(""); ?>
                <table class='table'>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Access Code</th>
                    <th></th>
                  </tr>
                  <?php for ($j = 0; $j < count($employees); $j++) {
                    echo "<tr><td>";
                    echo $employees[$j]['name'];
                    echo "</td><td>";
                    echo $employees[$j]['phone'];
                    echo "</td><td>";
                    echo $employees[$j]['email'];
                    echo "</td><td>";
                    echo $employees[$j]['access_code'];
                    echo "</td>";
                    echo '<td><button id="emp-detail-' . $employees[$j]['id'] . '" class="btn btn-sm btn-info">Detail</button></td>';
                    echo "</tr>";             
                  } ?>
                </table>
              </div>
              </div>
              <div class="well">  <!-- Job Codes -->
                <h2>Job Codes</h2>
                <?php echo get_job_code(""); ?>
              </div>
              <div class="well">  <!-- Clients -->
                <h2>Clients</h2>
                <?php echo get_client(""); ?>
              </div>
          <?php }

        }
      ?>
    </div> <!-- /container -->        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>

        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
