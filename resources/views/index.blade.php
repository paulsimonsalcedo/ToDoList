<x-layout>
    <div class="container-fluid">
        <div class="row main">
            <div class="col-md-3 col-lg-3">
                <div class="menu">
                    <div class="header">
                        <h4>Menu</h4>
                    </div>
                    <div class="tasks">
                        <h5>All Todos</h5>
                        <div class="tasks-items">
                            <i class="fas fa-th-list"></i>
                            <p class="toggle all-tasks active"> All </p>
                        </div>
         
                    </div>
                    <!-- DYNAMIC CATEGORIES -->
                    <div class="categories">
                        <h5>Category List</h5>
                        <div class="category-list">

                        </div>
                        <!-- <div class="category-items">
                            <div class="box"></div>
                            <p> Food </p>
                        </div> -->
                    </div>
                </div>
            </div>

            <!--TODOS-->
            <div class="col-md-5 col-lg-5">
                <div class="todos">
                    <div class="title-header">
                        <i class="fas fa-clipboard-list"></i>
                        <p> Todo-List </p>
                    </div>
                    <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Todos</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#completed-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Completed Todos</button>
                        </li>

                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <!-- STICKY WALL -->
                        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                            <div class="row mt-4 stickycards">
                                <!-- Dynamic cards -->


                            </div>
                        </div>

                        <!-- COMPLETED -->
                        <div class="tab-pane fade" id="completed-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                <div class="showCompletedItems">
                                    
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--CREATION-->
            <div class="col-md-4 col-lg-4">
                <div class="addTodos">
                    <h5> Add Tasks </h5>
                    <div class="content">
                        <div class="form-floating mb-3">
                            <input style="font-size: 25px;" type="text" class="form-control" id="taskName" placeholder="">
                            <label for="taskName">Enter Task Name</label>
                        </div>
                        <p style="position: relative; top: 10px; font-family: 'poppins', sans-serif; font-size: 15px">(optional)</p>
                        <div class="form-floating">
                            <textarea style="height: 100px;" class="form-control" placeholder="" id="description"></textarea>
                            <label for="description">Description</label>
                        </div>
                          <label for="daterange" style="font-size: 15px; font-family: 'poppins', sans-serif">Due Date: </label>
                          <input class="mb-3" style="width: 200px; height: 30px; display:block" type="text" id="daterange" name="daterange" />
                          <br>
                          <p style="font-size: 15px; font-family: 'poppins', sans-serif"> Select Categories: </p>
                          <div role="group" aria-label="Basic checkbox toggle button group" class="btn-group addtask_category_container">
                                
                          </div>
                          <br>  
                          <br>  
                          
                          <button type="button" class="btn btn-outline-success save-task">Save Task</button>
                    </div>
                    <br>
                    <div class="line"></div>
                    <br>
                    <h5> Add Category </h5>
                    <div class="addCategories">
                        <div class="form-floating mb-3">
                            <input style="font-size: 25px;" type="text" class="form-control" id="categoryName" placeholder="">
                            <label for="categoryName">Enter Category Name</label>
                        </div>
                        <button type="button" class="btn btn-outline-success addCategory">Save Category</button>
                    </div>
                </div>

                <!--ADD CATEGORIES -->

            </div>
        </div>
     
    </div>
    <x-EditTask />
</x-layout>