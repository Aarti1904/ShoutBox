<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</head>

<body>
    @include("header")
    <!-- Main Body -->
    <div class="container">

        @if($layout == 'index')
        <h1>In index layout</h1>


        @elseif($layout == 'show')
        <div class="panel panel-primary">
        <a style="margin-left:83%" href="/"><button class="btn btn-info">Dashboard</button></a>
            <div class="panel-heading" id="component2">
                <h2 style="text-align:center">Reports</h2>
            </div>

            <div class="panel-body">

            <div class="row">
                 @foreach($reports as $report)
                
                    <div class="col-md-4" style="margin-top:20px">
                       <div class="card" style="width: 18rem;">
                          @if($report->type == 'image')
                          <img class="card-img-top" class="card-img-top" style=" width: 100%; height: 15vw; object-fit: cover; " src="{{ $report->file}}">
                          @elseif($report->type == 'video')
                          <video class="card-img-top" style=" width: 100%; height: 15vw; object-fit: cover; "
                           id="myVideo"
                           
                           loop
                           controls
                           muted
                          >
                          <source src="{{$report->file}}" type="video/mp4" />
                          </video>
                          @endif
                           <div class="card-body">
                            
                               <p class="card-text">Caption : {{ $report->caption }}</p>
                               <button class="btn btn-danger" onclick="deleteConfirmation(`{{$report->shoutId}}`)">Delete</button>
                                <button class="btn btn-danger" onclick="getDetails((`{{$report->shoutId}}`))">Reports</button>
                               <!--<input type="submit"  class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" />-->
                               <button class="btn btn" style="width:90px; background-color:#5FCF80" onclick="getDetails((`{{$report->shoutId}}`)">Ignore</button>
                            </div>
                        </div>
                    </div>          
            
                @endforeach
            </div>
         <!---------------------------------------------------------------->
         @elseif($layout == 'modal')
         
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                             <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Report Reasons</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     
      <div class="modal-body">
      @foreach($repo as $re)  
         
       
     <p>Report Reason :{{$re->reportDescription}}</p>
      @endforeach
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
         
        </div>
      

    </div>
  </div>
</div>




          <!---------------------------------------------------------------->

          @endif

            
        </div>
    </div>
 </div>
        <script type="text/javascript">
function deleteConfirmation(id) {
swal({
title: "Delete?",
text: "Please ensure and then confirm!",
type: "warning",
showCancelButton: !0,
confirmButtonText: "Yes, delete it!",
cancelButtonText: "No, cancel!",
reverseButtons: !0
}).then(function (e) {
if (e.value === true) {
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
$.ajax({
type: 'GET',
url: "http://127.0.0.1:8000/shout/destroy/" + id,
data: {_token: CSRF_TOKEN},
dataType: 'JSON',
success: function (results) {
if (results) {
    swal({
     title: "Done!",
     text: 'ok',
     type: "success",
     timer: 1500
     }).then(function() {
        window.location.reload();
    });

} else {
swal("Error!", results.message, "error");
}
}
});
} else {
e.dismiss;
}
}, function (dismiss) {
return false;
})
}



function getDetails(id)
{
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
$.ajax({
type: 'GET',
url: "http://127.0.0.1:8000/Reportdetails/" + id,
data: {_token: CSRF_TOKEN},
dataType: 'JSON',
success: function (results) {
    console.log(results);
    var reason="<ul>";
    for(var i=0;i<results.length;i++)
    {
        reason+="<li>";
       reason+=(results[i].reportDescription);
       reason+="&nbsp; <a href='' style='color:red'>Delete</a><br>";
       reason+="</li>";
     }
     reason+="</ul>"
    if (reason) {
        swal({
     title: "Reasons",
     html: reason ,
     type: "",
   
     }).then(function() {
       // window.location.reload();
    });  

}  
}
})    
}

</script>


   
@include("footer")