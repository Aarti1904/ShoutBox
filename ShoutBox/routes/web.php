<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::view('/login','login');
Route::get("/", "usersController@index");
Route::post('/adminvalidate', "usersController@validateUser") ;  
Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/approvals', "approvalsController@show") ;
Route::get('/approvals/destroy/{id}', "approvalsController@destroy") ;
Route::get('/approvals/approve/{id}', "approvalsController@approveUser") ;
Route::get('/shout', "shoutsController@show") ;
Route::get('/shout/destroy/{id}', "shoutsController@destroy") ;
Route::get('/report', "reportsController@show") ;
Route::get('/report/destroy/{id}', "reportsController@destroy") ;
Route::get('/user', "usersController@show") ;
Route::get('/user/destroy/{id}', "usersController@destroy") ;

Route::get('/logout', "usersController@logout");

