<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/upload', "usersController@fileUpload");
Route::post('/approvals/store', "approvalsController@store") ;
Route::get('/users/{id}', "usersController@getById") ;
Route::get('/allusers', "usersController@getAllUsers") ;
Route::put('/users/update/{id}', "usersController@update");
Route::put('/users/addFriend/{id}', "usersController@addFriend");
Route::delete('/friendDelete/{sender}/{receiver}', "friendRequestController@destroy") ;
Route::post('/addFriend', "friendRequestController@store") ;
Route::get('/getFrdRequests/{receiver}', "friendRequestController@show") ;
Route::post('/saveImage/{id}', "usersController@uploadimage") ;
Route::post('/newpost/{id}', "shoutsController@store") ;
Route::get('/allshouts', "shoutsController@getAllShouts") ;
Route::get('/userShouts/{id}',"shoutsController@userAllShouts");
Route::post('/likeShout',"shoutsController@likes");
Route::post('/dislikeShout',"shoutsController@dislikes");
Route::get('/forgetPass/{id}',"usersController@forgetPassword");
Route::post('/addComment/{id}',"commentsController@store");
//Route::get('/allcomments', "commentsController@getAllComments") ;
Route::post('/likeComment',"commentsController@likes");
Route::get('/friendsshouts/{id}', "shoutsController@getshouts") ;
Route::get('/deleteShout/{id}', "shoutsController@destroy") ;
Route::post('/addreport',"reportsController@store");
Route::get('/allcomments', "commentsController@index") ;
Route::get('/adminDetails', "usersController@getAdmin") ;
Route::post('/updateAdmin/{confirmPass}', "usersController@updateAdmin") ;
Route::get('/Reportdetails/{id}',"reportsController@getReportDetails");
Route::get('/ignoreShout/{id}',"reportsController@deleteByShoutId");

