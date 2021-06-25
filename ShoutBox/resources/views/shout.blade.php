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
            <div class="panel-heading" id="component2">
                <h2 style="text-align:center">Shouts</h2>
            </div>

            <div class="panel-body">

                <table class="table table-striped" id="table-excel">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Shout Details</th>
                            <th>Likes</th>
                            <th>Dislikes</th>
                            <th>Permissions</th>
                            <th><a href="/"><button class="btn btn-info">Dashboard</button></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($shouts as $shout)
                        <tr>
                            <td>{{ $shout['userId'] }}</td>
                            <td>{{ $shout['file'] }}</td>
                            <td>{{ $shout['likes'] }}</td>
                            <td>{{ $shout['dislikes'] }}</td>
                            <td>
                            <button class="btn btn-danger" onclick="deleteConfirmation(`{{$shout['id']}}`)">Delete</button>

                            </td>
                            <td></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
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