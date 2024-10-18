<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todoitem extends Model
{
    use HasFactory;

    protected $fillable = ['tasks_id', 'item_name'];

    public function tasks()
    {
        return $this->belongsTo(Tasks::class , 'tasks_id');
    }
}
