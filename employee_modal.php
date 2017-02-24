<div class="modal fade" id="employeeModal" tabindex="-1" role="dialog" aria-labelledby="employeeModalLabel">  
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="employeeModalLabel">Add Employee</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="employeeName">Name</label>
            <input class="form-control" id="employeeName">
          
            <label for="employeePhone">Phone Number</label>
            <input class="form-control" id="employeePhone">

            <label for="employeeEmail">Email Address</label>
            <input class="form-control" id="employeeEmail">

            <label for="employeeAccessCode">Access Code</label>
            <input class="form-control" id="employeeAccessCode">
          </div>
          <button type="button" id="employeeModalButton" class="add-employee btn btn-default">Submit</button>
          <button type="button" class="removeEmployeeButton remove-employee btn btn-danger">Delete</button>
        </form>
      </div>

    </div>
  </div>
</div>