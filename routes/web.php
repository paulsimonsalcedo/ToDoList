<?php

use App\Http\Controllers\TodoListController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [TodoListController::class, 'index']);
Route::match(['get', 'post'],'/saveCategoryName', [TodoListController::class, 'saveCategory']);
Route::get('/get-categories', [TodoListController::class, 'getCategories']);
Route::post('/save-task', [TodoListController::class, 'saveTask']);
Route::get('/getTasks', [TodoListController::class, 'getTasks']);
Route::delete('/delete-task/{id}',[TodoListController::class, 'deleteTask']);
Route::get('/edit-task/{id}',[TodoListController::class, 'editTask']);
Route::match(['get','put'],'/update-task/{taskID}',[TodoListController::class, 'updateTask']);
Route::match(['get', 'post'],'/completed/{id}', [TodoListController::class, 'completed']);
Route::get('/show-completed',[TodoListController::class, 'showCompleted']);
Route::get('/dynamic-categories/{id}', [TodoListController::class, 'Categories']);
Route::put('/updateCategory/{id}',[TodoListController::class, 'updateCategories']);
Route::delete('/delete-category/{id}',[TodoListController::class, 'deleteCategory']);
Route::match(['get','post'],'/additems', [TodoListController::class, 'addTaskItems']);
Route::get('/getTodoItem', [TodoListController::class,'getTodoItems'])->name('todo.item');
Route::delete('/delete-item/{id}',[TodoListController::class, 'deleteItem']);
Route::put('/edit-item/{id}',[TodoListController::class, 'editItem']);
