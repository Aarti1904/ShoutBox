 <!-- ======= Header ======= -->
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
                 <li>
                     <a href="" style="text-decoration: none;">Profile Settings</a>

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
</body>