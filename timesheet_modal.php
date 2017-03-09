<div class="modal fade" id="timesheetModal" tabindex="-1" role="dialog" aria-labelledby="timesheetModalLabel">  
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="timesheetModalLabel"></h4>
      </div>
      <div class="modal-body">
        <div id="displayTimeSheet"></div>    

        <form>
          <input type="hidden" id="tsexport_client_id">
          <input type="hidden" id="tsexport_employee_id">
          <input type="hidden" id="tsexport_start_date">
          <input type="hidden" id="tsexport_finish_date">
          <input type="hidden" id="tsexport_employee_name">
          <input type="hidden" id="tsexport_client_site">
          <button type="button" id="timesheetModalButton" class="export-timesheet btn btn-default">Export Timesheet</button>
        </form>
       
      </div>

    </div>
  </div>
</div>