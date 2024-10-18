 <div class="modal fade" id="edit_task" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task Here!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
            <p style="font-size: 15px; font-family: 'poppins', sans-serif"> Choose New Category: </p>
                <div role="group" aria-label="Basic checkbox toggle button group" class="btn-group edit_category_container">
                      <!--Dynamic Categories-->
                </div>
                <br>  
                <br>  
                <div class="row">
                  <div class="card p-4">
                      <label for="daterange" style="font-size: 15px; font-family: 'poppins', sans-serif">Due Date: </label>
                      <input class="mb-3 edit-daterange" style="width: 200px; height: 40px" type="text" id="daterange" name="daterange"/>
                      <p style="font-size: 15px; font-family: 'poppins', sans-serif"> New Task Name: </p>
                            <input style="font-size: 20px;" type="text" class="form-control edit-taskname" id="edittaskname" placeholder="Enter New Task Name">                      
                      <p style="position: relative; top: 10px; font-family: 'poppins', sans-serif; font-size: 15px">(optional)</p>
                            <textarea style="height: 100px;" class="form-control" placeholder="Description" id="edit-description"></textarea>
                  </div>
                  <div class="card p-4 mt-4">
                    <p style="font-size: 15px; font-family: 'poppins', sans-serif">Edit Items:</p>
                    <div class="container-fluid">
                      <div class="row edittask-item-container">
                        <!--Dynamic items-->
                      </div>
                    </div>
                  </div>
                  <input type="hidden" class="hidden">
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary update-task">Update Task</button>
        </div>
      </div>
    </div>
  </div>