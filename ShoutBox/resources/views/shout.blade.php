<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shouts</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
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
        <a style="margin-left:83%" href="/dashboard"><button class="btn btn-info">Dashboard</button></a>
            <div class="panel-heading" id="component2">
                <h2 style="text-align:center">Shouts</h2>
            </div>

            <div class="panel-body">
           
            <div class="row">
                        @foreach($shouts as $shout)
                        <div class="col-md-4" style="margin-top: 20px;">
                           <div class="card" style="width: 19rem;">
                        
                             @if ($shout['type'] == 'image')
                        
                               <img class="card-img-top" style=" width: 100%; height: 15vw; object-fit: cover; " src= "{{ $shout['file']}}">
                             @elseif ($shout['type'] == 'video')
                                <video id="myVideo" class="card-img-top" style=" width: 100%; height: 15vw; object-fit: cover; "
            
                                   autoplay
                                   loop
                                   controls
                                   muted
                                >
                              <source src="{{ $shout['file'] }}" type="video/mp4" />
                              </video>
                              @elseif ($shout['type'] == 'audio')
                             <div style=" width: 100%; height: 15vw; padding-top:80px;background-color:black"> <audio id="myAudio" controls>
                               <source  src="{{ $shout['file'] }}" type="audio/ogg">
                               <source  src="{{ $shout['file'] }}" type="audio/mpeg">
                              </audio>
                              </div>
                              @elseif ($shout['type'] =='text')
                              <div style=" width: 100%; height: 15vw; padding-top:20px;background-color:black"> 
                              <?php
                              $destinationPath = substr($shout->file,21);
                                 
                             $content = fopen(public_path($destinationPath),'r');

                            while(!feof($content)){

                                 $line = fgets($content);
                               echo "<h5 style='color:white'> {$line} <br></h5>";
                                     
        
                            }
                                    fclose($content);
                                
                             ?>
                              </div>
                             @endif 
  
                              <div class="card-body">
                               
                                <p class="card-text">{{ $shout['caption'] }}</p>
                                <h4 class="card-title">Posted By</h4>
                                <p class="card-text">{{ $shout['userId'] }}</p>
                                <p class="card-text">Likes : {{$shout['likes']}} Dislikes : {{$shout['dislikes']}}</h1>
                                <button class="btn btn-danger" onclick="deleteConfirmation(`{{$shout['id']}}`)">Delete</button>
    
                              </div>
  
                            </div>
                        </div>
                    @endforeach
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
     text: results.message,
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
</script>

        @endif

        @include("footer")