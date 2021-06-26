<?php

namespace App\Http\Controllers;

use App\Models\approvals as Modelsapprovals;
use Illuminate\Http\Request;
use App\Models\User as ModelsUser;

//use Illuminate\Support\Facades\DB;

class approvalsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $newapproval=Modelsapprovals::all();
        return view('approval', ['approval'=>$newapproval, 'layout'=>'index']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return redirect('http://localhost:4200/') ;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
       
        $userDetails= new Modelsapprovals();
    
        $userDetails->id=strtok($request->userEmail, "@");
        $userDetails->userName=$request->userName;
        $userDetails->dob=$request->dob;
        $userDetails->mobileNo=$request->mobileNo;
        $userDetails->userEmail=$request->userEmail;
        
        $userDetails->save();

        return response()->json($userDetails,200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $approvals = Modelsapprovals::all();
        return view('approval', ['approvals'=>$approvals, 'layout'=>'show']);
        //return response()->json($approvals);
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
        $approval = Modelsapprovals::find($id);
        $approval->delete() ;
        
        return response()->json(["message"=>"Approval rejected!"]);
    }

    public function approveUser($id)
    {
        $data = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
        $user = Modelsapprovals::find($id);
        
        $userDetails= new ModelsUser();

        $userDetails->id=$user->id;
        $userDetails->userName=$user->userName;
        $userDetails->dob=$user->dob;
        $userDetails->userEmail=$user->userEmail;
        $userDetails->userPass=substr(str_shuffle($data), 0, 8);
        $userDetails->mobileNo = $user->mobileNo;
        $userDetails->workingAt = "";
        $userDetails->address ="";
        $userDetails->friends="";
        $userDetails->role="";

        usersController::store($userDetails);
        $to = $user->userEmail;
        $subject = "Mail through PHP";
        $email_body = "Mail access successfull using PHP!!!!!";

        $headers = "From: shoutbox.com" . "\r\n" ;
        if (mail($to, $subject, $email_body, $headers)) {
            echo "Success!";
        } else {
            echo "Some err!!!!!";
        }


        $user->destroy($id);
       
        return redirect('/approvals');
    }
}
