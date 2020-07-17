import { TwillioService } from './shared/services/twillio/twillio-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from './shared/services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/add-channel/dashboard.component';
import { ChatboxComponent } from './components/chat-header/chatbox.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase1),
    AngularFireAuthModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, TwillioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
