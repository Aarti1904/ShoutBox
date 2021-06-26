import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './users/header/header.component';
import { HomeComponent } from './users/home/home.component';
import { FooterComponent } from './users/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { ProfileComponent } from './users/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './users/timeline/timeline.component';
import { FriendsComponent } from './users/friends/friends.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { PostComponent } from './users/post/post.component';
import { NewpostComponent } from './users/newpost/newpost.component';
import { FriendsProfileComponent } from './users/friends-profile/friends-profile.component';

const routes:Routes=[
 
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'timeline',component:TimelineComponent},
  {path:'friend',component:FriendsComponent},
  {path:'shout',component:PostComponent},
  {path:'newpost',component:NewpostComponent},
  {path:'friendProfile/:id',component:FriendsProfileComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    TimelineComponent,
    FriendsComponent,
    FilterPipe,
    PostComponent,
    NewpostComponent,
    FriendsProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
