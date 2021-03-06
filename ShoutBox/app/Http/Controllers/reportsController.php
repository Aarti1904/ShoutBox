<?php
 
namespace App\Http\Controllers;

use App\Models\reports as ModelsReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
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
        
        $newReport->userId = $request->userId;
        $newReport->reportDescription = $request->reportDescription;
        $newReport->shoutId = $request->shoutId;
        
        $newReport->save();
        return response()->json("ok",200);
    }
 
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        
             $reports=new ModelsReport;
           
            
            $reports = DB::table('reports')
            ->join('shouts', 'shouts.id', '=', 'reports.shoutId')
            ->selectRaw('reports.shoutId, shouts.caption, shouts.type, shouts.file,GROUP_CONCAT(DISTINCT reports.reportDescription)')
            //->select('reports.shoutId','shouts.caption','shouts.type','shouts.file','reports.reportDescription')
            ->groupBy('reports.shoutId','shouts.caption','shouts.type','shouts.file')
            ->get();
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
        $rep = new ModelsReport;
        $rep = DB::table('reports')
     ->select('reports.reportDescription')
        ->where('shoutId','=',$id)
        ->get();
        return response()->json($rep,200);
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
    public function getReportDetails($id)
    {
         $reports = new ModelsReport;
         $result[]=new ModelsReport;
         $reports = DB::table('reports')
        ->select('id','shoutId','reportDescription')
        ->where('shoutId','=',$id)
        ->get();
        
                return response()->json($reports);
       //return response()->json(["results"=>(string)$result]);
        
    }

    public function deleteByShoutId($id){

        DB::table('reports')->where('shoutId', $id)->delete();

        return response()->json(["message"=>"Reports deleted!"],200);

    }

}
