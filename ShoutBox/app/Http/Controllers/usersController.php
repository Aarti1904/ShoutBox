<?php

namespace App\Http\Controllers;

use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;

class usersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('login') ;
    }

    public function dashboard()
    {
        if(Session::get("userId")=="admin"){
        return view('dashboard') ;
        }
        else{
            return view('login') ;
        }
    }

    public function validateUser(Request $request)
    {
     
        $user=ModelsUser::find($request->input('userId'));
        echo($request->input('userId'));
        echo($request->input('password'));
        echo($user->userPass);
        if($request->input('password') == $user->userPass && $user->role == "admin"){
          
            Session::put("userId", $request->input('userId'));
            return redirect('dashboard') ;
        }
        else{
            echo("Login failed!");
            return redirect("/");
        }
        return view('dashboard') ;
        
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        if(Session::get("userId")=="admin"){
        Session::forget("userId");
        return view("login");
        }else{
            return view("login");
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store($request)
    {
       
        $newUser = new ModelsUser;
        $newUser->id = $request['id'];
        $newUser->userName = $request['userName'];
        $newUser->dob = $request['dob'];
        $newUser->userEmail = $request['userEmail'];
        $newUser->userPass = $request['userPass'];
        $newUser->userProfile = "";
        $newUser->mobileNo = $request['mobileNo'];
        $newUser->workingAt = "";
        $newUser->address = "";
        $newUser->friends = "";

        $newUser->save();
          
         
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        if(Session::get("userId")=="admin"){
        $users = ModelsUser::all();
        // $user = ModelsUser::find($id);

        return view('user', ['users' => $users, 'layout' => 'show']);
        }
        else{
            return view("login");
        }
        //return response()->json($users);
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
        $user = ModelsUser::find($id);

        $user->id = $user->id;
        $user->userName = $request->input('userName');
        $user->dob = $request->input('dob');
        $user->mobileNo = $request->input('mobileNo');
        $user->userPass = $request->input('userPass');
        $user->workingAt = $request->input('workingAt');
        $user->address =  $request->input('address');

        $user->save();
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       
        $user = ModelsUser::find($id);
        $user->delete();

        return response()->json(["message"=>"User deleted!"]);
       
    }

    public function getAllUsers()
    {
        $users = DB::table('users')
            ->get();
        return response()->json($users);
    }

    public function getById($id)
    {
        $users = ModelsUser::find($id);

        return response()->json($users, 200);
    }



    public function addFriend(Request $request, $id)
    {
        if( $request->input('friends')==null)
        {
            $user = ModelsUser::find($id);

            $user->id = $user->id;
            $user->userName = $request->input('userName');
            $user->dob = $request->input('dob');
            $user->mobileNo = $request->input('mobileNo');
            $user->userPass = $request->input('userPass');
          /*  $user->workingAt = $request->input('workingAt');
            $user->address =  $request->input('address');*/
            $user->friends="";
            $user->save();
        }
        else{
        
        $user = DB::table('users')
            ->where('id', '=', $id)
            ->update(['friends' => $request->input('friends')]);
        }

        return response()->json('ok', 200);
    }


    public function uploadimage(Request $request, $id)
    {
        $user = ModelsUser::find($id);
        //check file
        if ($request->hasFile('image')) {
            $file      = $request->file('image');
            $filename  = $user->userName; ;
            $extension = $file->getClientOriginalExtension();
            $picture   = $filename . "." . $extension;
            //move image to public/img folder
            $filePath = "http://127.0.0.1:8000/profileImages/" . $picture;

            DB::table('users')
                ->where('id', '=', $id)
                ->update(['userProfile' => $filePath]);

            $file->move(public_path('profileImages'), $picture);
            
            //return response()->json($filePath, 200);
            return response()->json(["message" => "Image Uploaded Succesfully"],200);
        } else {
            return response()->json(["message" => "Select image first."],400);
        }
    }

    public function  forgetPassword($id){
        $user = ModelsUser::find($id);
        $to = $user->userEmail;
        $subject = "ShoutBox Forget Password!";
        $email_body = "Following are the login details:: \n\n  User ID:: " . $user->userEmail ."\n Password:: " . $user->userPass;

        $headers = "From: shoutbox.com" . "\r\n" ;
        if (mail($to, $subject, $email_body, $headers)) {
            return response()->json("Mail sent.",200);
        } else {
            return response()->json("Mail sending failed!",400);
        }


    }
    
    public function getAdmin()
    {
      
        $admin=DB::table('users')
        ->where('role', '=', 'admin')
        ->get();

        return response()->json($admin,200);
    } 
    public function updateAdmin(Request $request)
    {
       $admin=DB::table('users')
        ->where('role', '=', 'admin')
        ->update(['userPass' => $request->confirmPass]);
       
            return response()->json("change successfully",200);
        
    

    }
}
