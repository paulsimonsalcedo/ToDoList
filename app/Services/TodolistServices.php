<?php

namespace App\Services;

use App\Models\CompletedTasks;
use App\Models\Tasks;
use App\Models\todoitem;

class TodolistServices
{
    public function additems($data)
    {
        if(empty($data->itemname))
        {
            return "Empty";
        }
        todoitem::create([
            "tasks_id" => $data->taskid,
            "item_name" => $data->itemname
        ]);
    }

    public function allitem()
    {
        return todoitem::all();
    }

    public function updatingTask($data,$id)
    {   
        $tasks = Tasks::find($id);

        $tasks->categories()->detach();
        $tasks->title = $data['title'];
        $tasks->description = $data['description'];
        $tasks->due = $data['daterange'];
        
        $tasks->categories()->attach($data['selectedIDs']);
        $tasks->update();

        return response()->json(["message" => "Successfully Updated"], 200);
    }

    public function deleteItems($id)
    {
        todoitem::find($id)->delete();
    }

    public function editItems($data, $id)
    {
        $todo = todoitem::find($id);
        if($todo)
        {
            $todo->item_name = $data;
            $todo->update();
        }
    }

    public function showCompletedTasks()
    {
        $collection = collect();

        $tasks = CompletedTasks::all();
        return $tasks;
        // foreach ($tasks as $task) {
        //     $collection->push((object)[
        //         "title"=>$task->title,
        //         "description"=>$task->description,
        //         "items"=>$task->items,
        //     ]);
        // }


        // return $tasks;

        
        // $completed = CompletedTasks::all();
        // $all = [];
        // foreach($completed as $complete)
        // {
        //    $decoded = json_decode($complete->task_details, true);
        //    $all [] = $decoded;
        // }
 
        // return $all;
    }
}