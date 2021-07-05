 <!-- ======= Header ======= -->
 <head>
 <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Users</title>
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



 <style>
 
 .dropbtn {
    
    color: black;
    padding: 16px;
    font-size: 16px;
    border: none;
  }
  
  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 20px rgba(0,0,0,0.2);
 z-index: 1;
  }
  
  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  /* Change color of dropdown links on hover */
  /*.dropdown-content a:hover {background-color: #ddd;}*/
  
  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {display: block;}
  
  .sticky-top {
    z-index:0!important;
}






.modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto
}

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    outline: 0
}

.fade {
    transition: opacity 0.15s linear
}

.modal-dialog {
    position: relative;
    width: auto;
    pointer-events: none
}

.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #f3f3f3;
    border-radius: 0.3rem;
    outline: 0
}

.modal .modal-dialog .modal-content .modal-header {
    padding: 25px 26px
}

.modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #f3f3f3;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem
}

.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 15px
}

.form-group {
    margin-bottom: 1.5rem
}

.form-group label {
    font-size: 0.875rem;
    line-height: 1.4rem;
    vertical-align: top;
    margin-bottom: .5rem
}

.col-form-label {
    padding-top: calc(0.875rem + 1px);
    padding-bottom: calc(0.875rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1
}

.form-control {
    border: 1px solid #f3f3f3;
    font-weight: 400;
    font-size: 0.875rem;
    box-shadow: none;
    outline: 0
}

.modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px;
    border-top: 1px solid #f3f3f3
}

.modal .modal-dialog .modal-content .modal-footer {
    padding: 15px 31px
}

.btn {
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 400;
    padding: .7rem 1.5rem;
    border-radius: 0.1275rem
}

 </style>
 </head>
 <body>
 
 @include("index")
 <!-- ======= Header ======= -->
 <header id="header" class="fixed-top">
     <div class="container d-flex align-items-center">

         <h1 class="logo mr-auto"><a href="/"><img src="../../../assets/images/download.png" style="width:150px; height:40px"></a></h1>
         <!-- <a href="index.html" class="logo mr-auto"><img src="../../../assets/img/logo.png" alt="" class="img-fluid"></a>
       -->

         <nav class="nav-menu d-none d-lg-block">
             <ul>
                 <li><a href='http://localhost:4200/' style="text-decoration: none;">Home</a></li>
                 <li  class="dropdown dropbtn" style="margine-bottom:"><a>Profile Settings</a>
                    <div class="dropdown-content" >
                      <div class="card">
                        <div class="card-body">
                          <a href="" data-toggle="modal" data-target="#exampleModal-4" data-whatever="@fat" >
                             Change Passowrd
                            </a>
                        </div>
                      </div>
                    </div>
              


                 </li>
                 <div class="yourCssClass" *ngIf="this.isButton">
                   <a href="" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#darkModalForm"
                         class="get-started-btn">Logout</a>
                 </div>
             </ul>
         </nav><!-- .nav-menu -->


     </div>

 </header><!-- End Header -->
 <br><br> <br><br>
            <div class="modal fade" id="exampleModal-4" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">Change Password</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                        </div>
                        <div class="modal-body">
                        <form>
                          <div class="form-group">
                             <label for="recipient-name" class="col-form-label">Old Password</label>
                          <input type="password" class="form-control" id="oldPass" required>
                          <div id="p1" style="color:red"></div>
                          </div>
                             <div class="form-group">
                               <label for="message-text" class="col-form-label">New Password</label>
                             <input type="password" class="form-control"  id="newPass" required></input>
                             <div id="p2" style="color:red"></div>
                            </div>
                            <div class="form-group">
                               <label for="message-text" class="col-form-label">Confirm Password</label>
                             <input type="password" class="form-control"  id="confirmPass" required></input>
                             <div id="p3" style="color:red"></div>
                            </div>
                         </form>
                        </div>
                        <div class="modal-footer"> <button type="button" onclick="checkFormData()" class="btn btn-success" id="changePass">Save</button> <button type="button" class="btn btn-light" data-dismiss="modal">Close</button> </div>
                    </div>
                </div>
            </div>



            <script type="text/javascript">
               function checkFormData()
               {

            
                            var oldPass=document.getElementById('oldPass').value;
                            var newPass=document.getElementById('newPass').value;
                            var confirmPass=document.getElementById('confirmPass').value;
                  if(!oldPass)
                   {
                     document.getElementById('p1').innerHTML='Please Enter Old Password'; 
                     return false;
                    }
                    else{
                        document.getElementById('p1').innerHTML='';
                      
                    }
                    if(!newPass)
                    {
                     document.getElementById('p2').innerHTML='Please Enter New Password' 
                     return false;
                    }
                    else{
                        document.getElementById('p2').innerHTML='' 
                    }
                    if(!confirmPass)
                    {
                     document.getElementById('p3').innerHTML='Please Enter New Password' 
                     return false;
                    }
                    else{
                        document.getElementById('p3').innerHTML=''   
                    }
                    if(newPass!=confirmPass)
                    {
                        document.getElementById('p3').innerHTML='Please Match Passwords'
                        return false;
                    }
                    else{
                        document.getElementById('p3').innerHTML='';

                       }
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                    $.ajax({
                          type: 'GET',
                          url: "http://127.0.0.1:8000/adminDetails",
                          data: {_token: CSRF_TOKEN},
                          dataType: 'JSON',
                         success: function (results) {
                            if (results) {
                                console.log(results);
                               // var oldPass=document.getElementById('oldPass').value;
                                //console.log(oldPass);
                              console.log(results[0].userPass);
                                if(oldPass!=results[0].userPass)
                                {
                                    document.getElementById('p1').innerHTML='old passWord is not matching'; 
                                }
                                else{
                                    console.log(confirmPass);
                                    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                                       $.ajax({
                                       type: 'POST',
                                       url: "http://127.0.0.1:8000/updateAdmin/"+confirmPass,
                                       data: {_token: CSRF_TOKEN},
                                       dataType: 'JSON',
                                       success: function (results) {
                          
                                          swal({
                                                 title: "Done!",
                                                 text: results.message,
                                                 type: "success",
                                                 timer: 1500
                                                 }) 

                                                 document.getElementById('oldPass').value=''
                                                document.getElementById('newPass').value=''
                                                   document.getElementById('confirmPass').value=''
                                                   document.getElementById('exampleModal-4').hide();   
                                               } 
                            
                                            });
                            

                                  }
                           }
            
                         }
                             });

                           
               }
               
                   

            
            
            </script>


</body>