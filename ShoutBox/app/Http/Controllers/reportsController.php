<?php
 
namespace App\Http\Controllers;

use App\Models\reports as ModelsReport;
use Illuminate\Http\Request;
 
class reportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports=ModelsReport::all();
        return view('report', ['report'=>$reports, 'layout'=>'index']);
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
        $newReport = new ModelsReport;
        
        $newReport->id = $request->id;
        $newReport->reportDescription = $request->reportDescription;
        $newReport->shoutId = $request->shoutId;
        
        $newReport->save();
    }
 
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $reports = ModelsReport::all() ;
        return view('report', ['reports'=>$reports,'layout'=>'show']);
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
        $newReport=ModelsReport::find($id);
 
        $newReport->reportDescription = $request['reportDescription'];
        $newReport->shoutId = $request['shoutId'];
        
        $newReport->save();
    }
 
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $report = ModelsReport::find($id);
        $report->delete() ;
        return response()->json(["message"=>"Report deleted!"]);
    }
}
