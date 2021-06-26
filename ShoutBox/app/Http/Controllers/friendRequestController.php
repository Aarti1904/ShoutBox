<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\friendRequest as ModelsFriend;
use Illuminate\Support\Facades\DB;

class friendRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $newReq=new ModelsFriend;
        $newReq->sender=$request['sender'];
        $newReq->receiver=$request['receiver'];
        $newReq->save();
        return response()->json($newReq);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($receiver)
    {
        $frds = DB::table('friend_requests')
        ->where('receiver', '=', $receiver)
        ->get(['sender']);
        return response()->json($frds, 200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($sender, $receiver)
    {
        $frd = DB::table('friend_requests')
        ->where('sender', '=', $sender)
        ->where('receiver', '=', $receiver)
        ->delete();
        return response()->json('ok', 200);
    }
}
