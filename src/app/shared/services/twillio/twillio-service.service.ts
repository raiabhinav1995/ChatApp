import { environment } from './../../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import {Client} from 'twilio-chat';
import {Channel} from 'twilio-chat/lib/channel';
import { Router, RouterModule } from '@angular/router';
import * as Twilio from 'twilio-chat';
import { AuthService } from '../auth.service';
import { debug } from 'console';
@Injectable({
  providedIn: 'root'
})
export class TwillioService{
  channel: Channel;
  chatClient: Client;
  chatConnectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  chatDisconnectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  token="Basic QUNmNTg0M2Q0MzJhOWNhMDUwMWQ2OWRkNjhiMmQyOWRkMDpkYmRhYzIyYjg4NjQ3YjJhZTNkZjE3ZTcyODM0MDJiNA==";
  //version: string;
  constructor(private router: Router)
  {

  }
  conn(token)
  {
    //  .log(this.chatClient.version);
    //{logLevel:'debug'}
    Twilio.Client.create(token).then( (client: Client) => {
      this.chatClient = client;
      this.chatConnectedEmitter.emit(true);
      console.log('connected');
      //console.log(this.chatClient.version);
    }).catch( (err: any) => {
      this.chatDisconnectedEmitter.emit(true);
      if( err.message.indexOf('token is expired') ) {
        localStorage.removeItem('twackToken');
        this.router.navigate(['/']);
      }
    });
  }
    get _version()
  {
    return 1;
  }
  get _connectionState()
  {
    return this.chatClient.connectionState;
  }


}
// var a=new TwillioService();
// a.hi();
