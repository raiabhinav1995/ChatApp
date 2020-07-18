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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatboxComponent } from './components/chat-box/chatbox.component';
import { HttpClientModule } from '@angular/common/http';
import { ChannelComponent } from './components/channel/channel.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    ChatboxComponent,
    ChannelComponent,
    ChatHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase1),
    AngularFireAuthModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, TwillioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
