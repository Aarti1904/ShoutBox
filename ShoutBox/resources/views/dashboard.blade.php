<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin DashBoard</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
    </script>
</head>
<style>
    .img {
        width: 40px;
        height: 200px;
    }

    h5 {
        text-align: center;
    }

    button {
        align: center;
    }


</style>

<body>
    @include("header")
    <br><br>
    <div class="container" style="margin:left 50px">
        <div class="row">
            <div class="col-sm-3" style="">
                <a href="/approvals" style="text-decoration: none;">
                    <div class="card" style="width: 18rem">
                        <img class="card-img-top img" src="{{url('/images/approval.png')}}" alt="Card image cap"
                            *ngIf="music.flag" />
                        <div class="card-body">
                            <h5 class="card-title">Approvals</h5>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-sm-3">
                <a href="/shout" style="text-decoration: none;">
                    <div class="card" style="width: 18rem">
                        <img class="card-img-top img" src="{{url('/images/shout.jpeg')}}" alt=" Card image cap"
                            *ngIf="music.flag" />
                        <div class="card-body">
                            <h5 class="card-title">Shouts</h5>

                        </div>
                    </div>
                </a>
            </div>

            <div class="col-sm-3">
                <a href="/user" style="text-decoration: none;">
                    <div class="card" style="width: 18rem">
                        <img class="card-img-top img" src="{{url('/images/users.jpg')}}" alt="Card image cap"
                            *ngIf="music.flag" />
                        <div class="card-body">
                            <h5 class="card-title">Users</h5>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-sm-3">
                <a href="/report" style="text-decoration: none;">
                    <div class="card" style="width: 18rem">
                        <img class="card-img-top img" src="{{url('/images/reports.png')}}" alt="Card image cap"
                            *ngIf="music.flag" />
                        <div class="card-body">
                            <h5 class="card-title">Reports</h5>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    @include("footer")
</body>

</html>