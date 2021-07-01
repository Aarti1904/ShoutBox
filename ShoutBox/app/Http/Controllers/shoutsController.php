<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\shouts as ModelsShouts;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        $newShout=new ModelsShouts;
        $type="";
        if ($request->hasFile('image')||$request->hasFile('video')||$request->hasFile('audio') || $request->hasFile('text')){
            $link="http://localhost:8000/userPosts/";
            $folders="userPosts/";
           
            $filename=$path=$extension=$file="";
            if ($request->hasFile('image')) {
                $file      = $request->file('image');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path=$link . "images/" ;
                $folder=$folders . "images/";
                $type='image';
            }
            if ($request->hasFile('video')) {
                $file      = $request->file('video');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path =$link .  "videos/" ;
                $folder=$folders . "videos/";
                $type='video';
            }

            if ($request->hasFile('audio')) {
                $file      = $request->file('audio');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path =$link .  "audio/" ;
                $folder=$folders . "audio/";
                $type='audio';
            }

            if ($request->hasFile('text')) {
                $file      = $request->file('text');
                $filename  = $id;
                $extension = $file->getClientOriginalExtension();
                $path =$link .  "text/" ;
                $folder=$folders . "text/";
                $type='text';
            }

            $newShout->file=$path;
            $newShout->userId=$id;
            $newShout->likes=0;
            $newShout->dislikes=0;
            $newShout->caption= $request['caption'];
            $newShout->type=$type;
            $newShout->save();

            $shoutId=$newShout->id;

        $filename=$filename . "_" . $shoutId .".";
        $picture=$filename . $extension;
        $path=$path . $picture;
        

        $file->move(public_path($folder), $picture);
    
        $shout = DB::table('shouts')
        ->where('id', '=', $shoutId)
        ->update(['file' => $path]);
        
        
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
        return response()->json("Shout deleted!",200);
    }

    public function getAllShouts()
    {
        $shouts = DB::table('shouts')
            ->get();
        return response()->json($shouts);
    }
    
    public function userAllShouts($id)
    {
        $shouts=DB::table('shouts')->
        where('userId','=',$id)->orderBy('created_at', 'desc')->get();
        return response()->json($shouts,200);
    }

    public function likes(Request $request)
    {
        $likes = DB::table('shouts')->where('id','=',$request->input('id'))->update(['likes' => $request->input('likes')]);
      
        return response()->json("like added", 200);
    }

    public function dislikes(Request $request)
    {
        $likes = DB::table('shouts')->where('id','=',$request->input('id'))->update(['dislikes' => $request->input('dislikes')]);
      
        return response()->json("dislike added", 200);
    }

    public function getshouts($id){        
        $shouts=DB::table('shouts')->where('userId','=',$id)->get();        
        return response()->json($shouts,200);    
    } 

}
