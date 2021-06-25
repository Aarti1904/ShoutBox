<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\shouts as ModelsShouts;
use Illuminate\Support\Facades\DB;

class shoutsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* $shouts = ModelsShouts::all();
         return view('shouts', ['shouts'=>$shouts, 'layout'=>'showAllshouts']);*/
    }
 
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('shouts', ['layout'=>'post']);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        if ($request->hasFile()){
            $link="http://localhost:8000/userPosts/";
            $folders="userPosts/";
            $filename=$path=$extension=$file="";
            if ($request->hasFile('image')) {
                $file      = $request->file('image');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path=$link . "images/" ;
                $folder=$folders . "images/";
            
            }
            if ($request->hasFile('video')) {
                $file      = $request->file('video');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path =$link .  "videos/" ;
                $folder=$folders . "videos/";
            }

            if ($request->hasFile('audio')) {
                $file      = $request->file('audio');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path =$link .  "audio/" ;
                $folder=$folders . "audio/";
            }

            $shoutId = DB::table('shouts')-> insertGetId(array(
                'file' => $path,
                'userId' => $id,
                'likes' => 0,
                'dislikes' => 0,
        ));
        $filename=$filename . "_" . $shoutId .".";
        $picture=$filename . $extension;
        $path=$path . $picture;
        

        $file->move(public_path($folder), $picture);
    
        $shout = DB::table('shouts')
        ->where('id', '=', $shoutId)
        ->update(['file' => $path]);
        Storage::put('attempt1.txt', "hello");
        return response()->json(["message" => "File Uploaded Succesfully"],200);

    }
    else{
        return response()->json(["message" => "Please select a file!"],400);
    }
    }

    public static function updateShout($path, $id){
        if( $shout = DB::table('shouts')
        ->where('id', '=', $id)
        ->update(['file' => $path]) ){
            return true;
        }
        return false;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $shouts = ModelsShouts::all();
       
        return view('shout', ['shouts'=>$shouts, 'layout'=>'show']);
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
    public function destroy($id)
    {
        $shout = ModelsShouts::find($id);
        $shout->delete() ;
        return response()->json(["message"=>"Shout deleted!"]);
    }
}