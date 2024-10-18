
<!-- The Modal -->
<div class="modal fade" id="addTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
              <p> Select Category Name </p>
              <select class="form-select mb-3" aria-label="Default select example">
                <option selected>Select Categories</option>
              </select>
                <div class="row">
                  <div class="card p-4">
                      <label for="daterange" style="font-size: 20px">Due Date: </label>
                      <input class="mb-3" style="width: 200px; height: 40px" type="text" id="daterange" name="daterange" value="01/01/2018 - 01/15/2018" />
                      
                      <label for="title" style="font-size: 20px">Title: </label>
                      <input style="width: 400px; height: 40px" type="text" id="title" name="title" class="form-control" placeholder="Enter Title" aria-label="Title" aria-describedby="basic-addon1">
                      
                      <div class="form-group mt-3">
                        <label style="font-size: 20px" for="description">Description: </label>
                        <textarea class="form-control" id="description" rows="4"></textarea>
                        <input type="hidden" class="hidden"> 
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary save-task">Save Task</button>
          <button type="button" style="display: none" class="btn btn-primary update-task">Update Task</button>
        </div>
      </div>
    </div>
  </div>