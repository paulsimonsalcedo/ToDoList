

$(document).ready(function (){

    $(function() {
      // current date
      var currentDate = moment(); 

      $('input[name="daterange"]').val(currentDate.format('YYYY-MM-DD'));

      $('input[name="daterange"]').daterangepicker({
        opens: 'left'
      }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      });
    });


    function showTaskOnActiveCategory()
    {

      let checkActiveCategory = $('.category-list .toggle.active');
      if(checkActiveCategory.length === 0)
      { 
          $('.all-tasks').addClass('active');
          getTasks();
      }
      else
      {
          let activeID = checkActiveCategory.data("id");
          displayCategoryTasks(activeID);
      }
    }
  //*************DISPLAY TASKS *************//
    
    function getTasks()
    {
        
      $.get('/getTasks',function(response){
        $('.stickycards').empty();
        $.each(response, function(index,data){
            displayTask(data);
          })
        });

    }
    function displayTask(data){
        let html = '';
        html+= '<div class="col-md-6">';
        html+= '<div class="card p-3 mb-3" id="'+data.id+'">';
        html+= '<div class="title">';
        html+= '<h3>' + data.title + '</h3>';
        html+= '</div>';
        html+= '<div class="add-items">';
        html+= '<i class="fas fa-plus add-item-icon" data-id="'+data.id+'"></i>';
        html+= '<input type="text" style="padding-left: 10px;border-radius:5px" class="txtitem" placeholder="Add Items">';
        html+= '</div>';
        html+= '<p style=" font-family: poppins, sans-serif;margin-top: 20px">TodoItems: </p>'
        html+= '<div class="item-container">';
        html+= '</div>';
        html+= '<div class="description">';
        html+= '<p class="desc">'+ data.description +'</p>';
        html+= '<p> Due: '+ data.due +'</p>';
        html+= '</div>';
        html+= '<div class="icons">';
        html+= '<i data-bs-toggle="modal" data-bs-target="#edit_task" class="fas fa-edit edit-con" data-id="'+data.id+'"></i>';
        html+= '<i class="fas fa-trash-alt trash-con" data-id="'+ data.id +'"></i>';
        html+= '<i class="fas fa-check check-con" data-id="'+data.id+'"></i>';
        html+= '</div>';
        html+= '</div>';
        html+= '</div>';

 
     $('.stickycards').append(html);
     let taskCard = $('#' + data.id);
     $.each(data.items, (item, list) => {
         taskCard.find('.item-container').append('<ul><li>' + list.item_name + '</li></il>');
     });

    }

    getTasks();

  //*************DISPLAY CATEGORIES *************//
  function loadCategories()
  {
      $.get('/get-categories', function(response){
        let category_container = $('.category-list');
        let addtaskCategory = $('.addtask_category_container');
        let editTaskCategory = $('.edit_category_container');

        category_container.empty();
        addtaskCategory.empty();
        editTaskCategory.empty();
        //check response if has value
        if(response.categories.length > 0)
        {
            $.each(response.categories, function(index, categories){
                //category list
                category_container.append('<div class="category-items"><i class="fas fa-trash-alt delete-category-icon" data-id="'+categories.id+'"></i><i class="fas fa-edit edit-category-icon" data-id="'+categories.id+'"></i><p data-id="'+categories.id+'" class="toggle">' + categories.category_name + '</p></div>');
                addtaskCategory.append('<input type="checkbox" class="btn-check" id="addTaskCheckbox_' + categories.id + '" autocomplete="off"> <label class="btn btn-outline-primary" for="addTaskCheckbox_' + categories.id + '">' + categories.category_name + '</label>');
                editTaskCategory.append('<input type="checkbox" class="btn-check" id="editTaskCheckbox_' + categories.id + '" autocomplete="off"> <label class="btn btn-outline-primary" for="editTaskCheckbox_' + categories.id + '">' + categories.category_name + '</label>');
                
          });
        }
    });
  }

  loadCategories();

  //************* ADD CATEGORY LIST *************//
  $('.addCategory').on('click', function(){
    let CategoryName = $('#categoryName').val();
    $.ajax({
        url: '/saveCategoryName',
        type: 'POST',
        data: {CategoryName:CategoryName},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(val){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: val.message,
                timer: 1000,
                showConfirmButton: false
            });
            $('#categoryName').val('');
            loadCategories();
        },
        error: function (val){
            if (val.status === 422) {
              var response = JSON.parse(val.responseText);
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.message,
              });
           } 
        }
     })
  });

  //************* EDIT CATEGORY LIST *************//
  $(document).on('click', '.edit-category-icon', function () {
    let id = $(this).data('id');
    var $pTag = $(this).next('p.toggle');
    var $input = $('<input type="text" class="editable-input" value="' + $pTag.text() + '">');
    var $saveButton = $('<button class="save-button">Save</button>');

    $pTag.replaceWith($input);
    $input.after($saveButton);

    $input.focus();

    $saveButton.click(function () {
        let edit_category = $input.val();
        $.ajax({
            url: '/updateCategory/' + id,
            type: 'PUT',
            data: { newName: edit_category },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                var editedValue = $input.val();
                $pTag.text(editedValue);
                $input.replaceWith($pTag);
                $saveButton.remove();
                loadCategories();
            }
        });
    });
});


  //************* EDIT CATEGORY LIST *************//
  $(document).on('click', '.delete-category-icon',function(){
    let id = $(this).data('id');
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Category. Do you want to proceed?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
          if(result.isConfirmed)
          {
            $.ajax({
                url: '/delete-category/' + id ,
                type: 'DELETE',
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(res){
                    loadCategories();
                    showTaskOnActiveCategory();
                }
             });
          }
      });
  });

    //************* SAVE TASKS *************//

    $('.save-task').on('click', function(){

      let daterange = $('#daterange').val();
      let taskname = $('#taskName').val();
      let description = $('#description').val();
      var selectedIDs = [];

        // Iterate through all the checkboxes and check if they are checked
        $('[id^="addTaskCheckbox_"]').each(function () {
          if ($(this).is(':checked')) {
              // Extract the numeric part from the id
              var idParts = $(this).attr('id').split('_');
              if (idParts.length === 2) {
                  var categoryId = parseInt(idParts[1]);
                  if (!isNaN(categoryId)) {
                      selectedIDs.push(categoryId);
                  }
              }
          }
      });
        // Log the selected IDs to the console
        if (selectedIDs.length === 0) {
          Swal.fire({
            title: 'Information',
            text: 'Please Select Categories',
            icon: 'info',
            confirmButtonText: 'OK'
          });
        } 
        else {
          let data = {
            daterange:daterange,
            taskname:taskname,
            description:description,
            selectedIDs:selectedIDs,
           }
            $.ajax({
            url: '/save-task',
            type: 'POST',
            data: data,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (response)=>{
                if(response.status == 'success')
                {
                    Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.message,
                    timer: 1000,
                    showConfirmButton: false
                  });

                  $('#title').val('');
                  $('#description').val('');
                  showTaskOnActiveCategory();
                }
                else if(response.status == 'fail')
                {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: response.message,
                    });
                }
            },
              error: function (val){
                if (val.status === 422) {
                  var response = JSON.parse(val.responseText);
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: response.message,
                  });
                } 
              }
          });
        }
   });

      //************* DELETE TASKS *************//
      $('.stickycards').on('click', '.trash-con', function(){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this task. Do you want to proceed?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
              if(result.isConfirmed)
              {
                let id = $(this).data('id');
                $.ajax({
                    url: '/delete-task/' + id ,
                    type: 'DELETE',
                    headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(res){
                      showTaskOnActiveCategory();
                    }
                 });
              }
        });
    });
         
    //************* EDIT TASKS *************//
  
      $('.stickycards').on('click', '.edit-con', function(){
        $('.edittask-item-container').empty();
        let id = $(this).data('id');
          $.get('/edit-task/'+id, function(res){
            $.each(res.todoitem, function(idx,items){
              $('.edittask-item-container').append('<div class="col-md-6" style="display:flex;"><i style="color:red;" class="fas fa-trash-alt delete-item" data-id="'+items.id+'"></i><i style="color:blue;" class="fas fa-edit edit-item" data-id="'+items.id+'"></i><p class="toggles" style="font-size: 15px; font-family: poppins, san-serif;">'+items.item_name+'</p></div>');
            });
            $('.edit-daterange').val(res.due);
            $('.edit-taskname').val(res.title);
            $('#edit-description').val(res.description);
            $('.hidden').val(res.id);
          });
      });

     
     $('.update-task').on('click', function(){
      let selectedIDs = [];
      $('[id^="editTaskCheckbox_"]').each(function () {
        if ($(this).is(':checked')) {
            // Extract the numeric part from the id
            var idParts = $(this).attr('id').split('_');
            if (idParts.length === 2) {
                var categoryId = parseInt(idParts[1]);
                if (!isNaN(categoryId)) {
                    selectedIDs.push(categoryId);
                }
            }
          }
      }); 
      let data = {
        daterange: $('.edit-daterange').val(),
        title: $('.edit-taskname').val(),
        description: $('#edit-description').val(),
        selectedIDs:selectedIDs,
      }
      if (selectedIDs.length === 0) {
        Swal.fire({
          title: 'Information',
          text: 'Please Select Categories',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      } 
      else{
          $.ajax({
            url: '/update-task/' + $('.hidden').val(),
            type: 'PUT',
            data:data,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(res){
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
                timer: 1000,
                showConfirmButton: false
              });
              showTaskOnActiveCategory();
            },
            error: function (val){
              if (val.status === 422) {
                var response = JSON.parse(val.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message,
                });
            } 
          }
        });
      }
  });





    //************* ADD ITEM ON TASKS *************//

    $('.stickycards').on('click','.add-item-icon', function(){
        let txtadditem = $(this).closest('.card').find('.txtitem').val();
        let taskid = $(this).data("id");
        $.ajax({
            url: '/additems',
            type: 'POST',
            data: {txtadditem:txtadditem,taskid:taskid},
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (res)=>{
              if(res == "Empty")
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: "Empty Item Field",
                });
  
              }
              else
              {
                showTaskOnActiveCategory();
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: "Item Added",
                  timer: 1000,
                  showConfirmButton: false
                });
                 $(this).closest('.card').find('.txtitem').val('');
              }
           }
        })
    });
    
    //******************** DELETE ITEM *************//

    $('.edittask-item-container').on('click','.delete-item', function(){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to Delete this Item.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result)=>{
            if(result.isConfirmed)
            {
              let id = $(this).data('id');
              $.ajax({
                  url: '/delete-item/'+ id,
                  type: 'DELETE',
                  headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  success: function(response){
                     location.reload();
                  }
              })    
            } 
        })
    });

    //******************** EDIT ITEM *************//
    $('.edittask-item-container').on('click','.edit-item', function(){
        let id = $(this).data('id');
        var $pTag = $(this).next('p.toggles');
        var $input = $('<input type="text" class="editable-item" value="' + $pTag.text() + '">');
        var $saveButton = $('<button class="save-item-btn">Save</button>');
    
        $pTag.replaceWith($input);
        $input.after($saveButton);
    
        $input.focus();
    
        $saveButton.click(function () {
          Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to Change this Item Name.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result)=>{
              if(result.isConfirmed)
              {
                let edit_item = $input.val();
                $.ajax({
                    url: '/edit-item/' + id,
                    type: 'PUT',
                    data: { newName: edit_item },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                      location.reload();
                    }
                });
              }
          })
        });
    });


    //******************** MARK AS COMPLETED *************//
    $('.stickycards').on('click', '.check-con', function(){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to Mark this task As Completed.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
            if(result.isConfirmed)
            {
              let id = $(this).data('id');

              $.get('/completed/'+id, function(res){
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message,
                    timer: 1000,
                    showConfirmButton: false
                  });

                  showTaskOnActiveCategory();

              });
            }
        });
    });
    

  //******************** DISPLAY TASKS BY CATEGORIES *************//
    function displayCategoryTasks(categoryId) {
      $('.stickycards').empty();
      $.get('/dynamic-categories/' + categoryId, function(res) {
          if (res.status == "fail") {
              let sticky = $('.stickycards');
              sticky.empty();
              sticky.append('<p>' + res.message + '</p>');
          } else {
              $.each(res, function(idx, data) {
                  displayTask(data);
              });
          }
      });
   }

    $('.category-list').on('click','.toggle', function(){
        let id = $(this).data('id');
        $('.toggle').removeClass('active');
        $(this).addClass('active');

        displayCategoryTasks(id);
   });
  
   //*******************DISPLAY COMPLETED TASKS WITH ITEMS **************//
   $('#profile-tab').on('click', function () {
    $('.showCompletedItems').empty();
  
    $.get('/show-completed', function (data) {
      data.forEach(function (task) {
        var taskDetails = JSON.parse(task.task_details); // Parse the JSON string
        
        // Now you can access the properties in taskDetails
        var taskHTML = '';
        taskHTML += 'To Do: ' + taskDetails.title + '<br>';
        taskHTML += 'Description: ' + taskDetails.description + '<br>';
        
        if (Array.isArray(taskDetails.items)) {
          taskHTML += 'Items: <br>';
          taskDetails.items.forEach(function (item) {
            taskHTML += '- ' + item + '<br>';
          });
        } else {
          taskHTML += 'Items: ' + taskDetails.items + '<br>';
        }
        
        taskHTML += '<hr>';
        $('.showCompletedItems').append(taskHTML);
      });
    });
  });
  
  
      $('.toggle').click(function() {

         $('.toggle').removeClass('active');
         $(this).addClass('active');

        if($('.all-tasks').hasClass('active'))
          {
              getTasks();
          }

      });

});
