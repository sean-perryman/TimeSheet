<div class="modal fade" id="timeEntryModal" tabindex="-1" role="dialog" aria-labelledby="timeEntryModalLabel">  
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="timeEntryModalLabel">Time Entry</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="timeEntryDate">Date</label>
            <input class="form-control" id="timeEntryDate" value="<?php echo date('Y-m-d H:i:s'); ?>">
            <input type='hidden' class="form-control" id="timeEntryEmployeeID" value="<?php echo $_SESSION['user_id']; ?>">
          
            <label for="timeEntrySiteName">Site Name</label>
            <div id="timeEntrySiteNameSelect"></div>
            
            <label for="timeEntryJobCode">Job Code</label>
            <div id="timeEntryJobCodeSelect"></div>

            <label for="timeEntryHours">Hours</label>
            <select class='form-control' id='timeEntryHours'>
              <option>0.5</option>
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
              <option>5.5</option>
              <option>6</option>
              <option>6.5</option>
              <option>7</option>
              <option>7.5</option>
              <option>8</option>
            </select>

            <label for="timeEntryDescription">Description</label>
            <input class="form-control" id="timeEntryDescription">
          </div>
          <button type="button" class="time-entry-submit btn btn-default">Submit</button>
        </form>
      </div>

    </div>
  </div>
</div>