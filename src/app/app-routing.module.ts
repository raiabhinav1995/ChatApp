import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatboxComponent } from './components/chat-box/chatbox.component';


const routes: Routes = [{ path: '', redirectTo: '/sign-in', pathMatch: 'full'},
{ path: 'sign-in', component: SignInComponent},
{ path: 'dashboard', component: DashboardComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
