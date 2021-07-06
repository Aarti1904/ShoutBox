<?php

namespace App\Http\Controllers;

use App\Models\Comments as ModelsComments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class commentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = DB::table('comments')
            ->join('shouts', 'comments.ShoutId', '=', 'shouts.id')
            ->join('users', 'comments.userId', '=', 'users.id')
            ->select('comments.id', 'comments.comment', 
            'comments.likes as likes','comments.shoutId',
            'comments.userId','users.userProfile','users.userName')
            ->get();
            return response()->json($comments,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $newComment = new ModelsComments;

        $newComment->comment=$request['comment'];
        $newComment->likes=0;
        $newComment->shoutId=$request['shoutId'];
        $newComment->userId=$id;

        $newComment->save();
        return response()->json("comment successfully added",200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $newComment = ModelsComments::find($id);

        $newComment->comment=$request['comment'];
        $newComment->likes=$request['likes'];
        $newComment->shoutId=$request['shoutId'];
        $newComment->created_at=$request['created_at'];

        $newComment->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = ModelsComments::find($id);
        $comment->delete() ;
        
        return redirect('/') ;
    }

    public function getAllComments()
    {
        $comments = DB::table('comments')
            ->get();
        return response()->json($comments);
    }

    public function likes(Request $request)
    {
        $likes = DB::table('comments')->where('id','=',$request->input('id'))->update(['likes' => $request->input('likes')]);
      
        return response()->json("like added", 200);
    }
}
