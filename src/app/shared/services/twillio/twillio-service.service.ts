import { Injectable, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
//import * as Twilio from 'twilio-chat';
//import { AuthService } from '../auth.service';
//import { debug } from 'console';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TwillioService{
  serviceId:string=environment.Twillio._Service_Id;
  shallLoadChatBox;
  channelList:any=[];
  apiUrl=`https://chat.twilio.com/v2/Services/`;
  user=JSON.parse(localStorage.getItem('user'));
  uidVal;
  //username: string=localStorage.getItem('email');
  friendlyName: string;
  //channel: Channel;
  //chatClient: Client;
  //chatConnectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  //chatDisconnectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  HttpOptions={
  headers:new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
  //  'Username': 'ACf5843d432a9ca0501d69dd68b2d29dd0',
  //  'Password': 'dbdac22b88647b2ae3df17e7283402b4',
  Authorization: 'Basic QUNmNTg0M2Q0MzJhOWNhMDUwMWQ2OWRkNjhiMmQyOWRkMDowNDgyM2ZjY2JiMGYyZTkyY2JhNzIzZTM0NTUzMTgzMg=='
  })
};
UserName=environment.Twillio.Auth_Token ;
//Password=environment.Twillio. ;
  //version: string;
  constructor(private router: Router, private httpClient: HttpClient)
  {
    //console.log(this.user);
    this.uidVal=this.user.uid;
    //console.log(this.uidVal);
    //console.log(this.username);
  }
  uniqueIdentity()
  {
    return this.uidVal;
  }

  hitApi(): Observable<any>
  {
    //console.log(this.HttpOptions.headers);
    return this.httpClient.get(this.apiUrl+this.serviceId , this.HttpOptions);
  }


  createChannel(unique_name, friendly_name='Group chat'): Observable<any>
  {
    // this.HttpOptions.headers[data]=
    // {

    // }
    const channelObj={
      FriendlyName:friendly_name,
      UniqueName:unique_name

    }
    let tempParams='FriendlyName='+friendly_name +'&UniqueName='+unique_name;
    console.log('Channel Created');
    return this.httpClient.post(this.apiUrl+this.serviceId+'/Channels',tempParams, this.HttpOptions);

  }
  return_sid(channel_name)
  {
    let channelList:any=[];
    channelList =this.getChannelList();
    console.log(channelList);
    for(const channel of channelList)
    {
      console.log(channel);
      //channel: any;
      if(channel['unique_name']===channel)
      {
        return channel['sid'];
      }
    }
    //return 1;
  }


  // getChannels(): Observable<any>
  // {
  //   return this.httpClient.get(this.apiUrl+this.serviceId+"/Channels", this.HttpOptions);
  // }

  deleteChannel(channelid): Observable<any>
  {

    return this.httpClient.delete(this.apiUrl+this.serviceId+"/Channels/"+channelid, this.HttpOptions);

  }


  // deleteAllChannels(): void
  // {
  //   let channelsList=this.getChannelList();
  //   console.log(this.channelList);
  //   //console.log('deleted');
  //   for(let channel of channelsList)
  //   {
  //     console.log('deleted');
  //     this.deleteChannel(channel['id']);
  //   }

  // }
  createRoom()
  {
    // console.log(this.uniqueIdentity());
    // let tempParams='Identity='+this.uidVal;
    // return this.httpClient.post(this.apiUrl+this.serviceId+"/Users/",tempParams, this.HttpOptions);
  }


  addMember(channel_name)
  {
    //console.log(channel_name);
    let sid=this.return_sid(channel_name);
    let param='Identity='+this.uniqueIdentity();
    console.log('member added');
    return this.httpClient.post(this.apiUrl+this.serviceId+"/Channels/"+''+sid+"/Members/",param,this.HttpOptions);
  }
  getChannelList()
  {
    let channelList=[];
    return this.httpClient.get(this.apiUrl+this.serviceId+"/Channels", this.HttpOptions).pipe(map(data=>data));
  }

  loadChatbox()
  {
    this.shallLoadChatBox=true;
    return this.shallLoadChatBox;
  }


}




//   conn(token)
//   {
//     //  .log(this.chatClient.version);
//     //{logLevel:'debug'}
//     Twilio.Client.create(token).then( (client: Client) => {
//       this.chatClient = client;
//       this.chatConnectedEmitter.emit(true);
//       console.log('connected');
//       //console.log(this.chatClient.version);
//     }).catch( (err: any) => {
//       this.chatDisconnectedEmitter.emit(true);
//       if( err.message.indexOf('token is expired') ) {
//         localStorage.removeItem('twackToken');
//         this.router.navigate(['/']);
//       }
//     });
//   }
//     get _version()
//   {
//     return 1;
//   }
//   get _connectionState()
//   {
//     return this.chatClient.connectionState;
//   }


// }
// // var a=new TwillioService();
// // a.hi();
