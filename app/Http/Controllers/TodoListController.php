<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CompletedTasks;
use App\Models\Tasks;
use App\Services\TodolistServices;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class TodoListController extends Controller
{
    
    public $collection;
    protected $services;

    public function __construct(TodolistServices $services)
    {
        $this->services = $services;
    }

    public function index()
    {
        return view('index');
    }
    
    public function saveCategory(Request $request)
    {
       $validate =  $request->validate([
            'CategoryName' => 'required',
       ]);
       
       if($validate)
       {
            Categories::create([
                'category_name' => $validate['CategoryName']
            ]);
            return response()->json(['message' => 'Category Saved']);
       }
       
    }

    public function getCategories()
    {
        $categories = Categories::all();

        return response()->json(['categories' => $categories]);

    }

    public function saveTask(Request $request)
    {
    
        $validate =  $request->validate([
            'taskname' => 'required',
        ]);

        $description = empty($request->description) ? '' : $request->description;

            $tasks = new Tasks;
            $tasks->title = $request->taskname;
            $tasks->description = $description;
            $tasks->due = $request->daterange;
            $tasks->save();

            $categoryIds = $request->selectedIDs;
            $tasks->categories()->attach($categoryIds);

            return response()->json(["status" => "success", "message"=> "Task Saved Successfully"]);
    }

    public function getTasks()
    {
        $collection = collect();
        $tasks = Tasks::with('categories')->get();
        foreach($tasks as $task)
        {
            $collection->push((object)[
                "title"=>$task->title,
                "description"=>$task->description,
                "due"=>$task->due,
                "id"=>$task->id,
                "items"=>$task->todoitem
            ]);
        }
        return $collection;
    }

    public function deleteTask($id)
    {
        $taskID = Tasks::find($id);

        foreach($taskID->todoitem as $task)
        {
            $task->delete();
        }

        $taskID->categories()->detach();
        $taskID->delete();
    }

    public function editTask($id)
    {
        $taskID = Tasks::with(['categories','todoitem'])->where('id', $id)->first();
        return $taskID;
    }

    public function updateTask(Request $request, $taskID)
    {
        $validate =  $request->validate([
            'title' => 'required',
        ]);
        if($validate)
        {
           return $this->services->updatingTask($request->all(),$taskID);
        }
     
    }

    public function completed($id)
    {
      
        $tasks = Tasks::find($id);

        if ($tasks) {
            $taskDetails = [
                'title' => $tasks->title,
                'description' => $tasks->description,
                'items' => $tasks->todoitem->pluck('item_name')->toArray(),
            ];
    
            CompletedTasks::create([
                'task_details' => json_encode($taskDetails),
            ]);
    
            // Detach the categories from the task
            $tasks->categories()->detach();
    
            // Delete the task and its associated items
            $tasks->todoitem()->delete();
            $tasks->delete();
            
            return response()->json(["message" => "Marked as Completed"]);
        }
  
    }

    public function showCompleted()
    {
         return $this->services->showCompletedTasks();
    }

    public function Categories($id)
    {
        $tasks = Tasks::whereHas('categories', function ($q) use ($id) {
            $q->where('id', $id);
        })->get();
    
        // $cats = Tasks::where('category_id',$id)->get();
        $collection = collect();

        if($tasks->isEmpty())
        {
            return response()->json(["status" => "fail", "message" => "No Data found!"]);
        }
        else
        {
            foreach($tasks as $task)
            {
                $collection->push((object)[
                    "title"=>$task->title,
                    "description"=>$task->description,
                    "due"=>$task->due,
                    "id"=>$task->id,
                    "items"=>$task->todoitem
                ]);
            }
            return $collection;
        }
        
    }

    public function updateCategories(Request $request, $id)
    {  
        $category = Categories::where('id',$id)->first();
        if(!empty($category))
        {
            $category->update([
                'category_name' => $request->newName,
            ]);
        }
        return response()->json(["success", "success"]);
    }

    public function deleteCategory($id)
    {
        $category = Categories::find($id);

        $category->tasks()->detach();

        $tasksToDelete = Tasks::whereDoesntHave('categories')->get();

        foreach ($tasksToDelete as $task) {
            $task->todoitem()->delete();
            $task->delete();
        }

        $category->delete();
    }

    public function addTaskItems(Request $request)
    {
    
        $data = (object)[
            "itemname"=>$request->txtadditem,
            "taskid"=>$request->taskid,
        ];

        return $this->services->additems($data);
    }
    
    public function getTodoItems()
    {
        return $this->services->allitem();
    }

    public function deleteItem($id)
    {
        return $this->services->deleteItems($id);
    }

    public function editItem(Request $request, $id)
    {
        return $this->services->editItems($request->newName, $id);
    }
}
