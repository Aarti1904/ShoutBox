<?php

namespace App\Http\Controllers;

use App\Models\Comments as ModelsComments;
use Illuminate\Http\Request;

class commentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $newComment=ModelsComments::all();
        return view('approval', ['approval'=>$newapproval, 'layout'=>'index']);
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
    public function store(Request $request)
    {
        $newComment = new ModelsComments;

        $newComment->id=$request['id'];
        $newComment->comment=$request['comment'];
        $newComment->likes=$request['likes'];
        $newComment->shoutId=$request['shoutId'];
        $newComment->created_at=$request['created_at'];

        $newComment->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comments = ModelsComments::all();
        $user = ModelsComments::find($id);

        return view('booklist', ['booklists'=>$booklists,'booklist'=>$booklist,'layout'=>'show']);
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
}
