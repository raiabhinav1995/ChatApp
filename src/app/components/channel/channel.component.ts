import { map } from 'rxjs/operators';
import { TwillioService } from './../../shared/services/twillio/twillio-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelList=[];
  constructor(private twilio: TwillioService)
  {this.getChannelList();
  }

  ngOnInit(): void {

  }

  async getChannelList()
  {
    this.twilio.getChannelList$().subscribe((res: any)=>
    {
      //console.log(res.channels);
      //this.channelList=res.channels ;
      for(let channel of res.channels)
    {
      console.log('test');
      console.log(channel, this.channelList);
      channel.members_count && this.channelList.push(channel);
      console.log(channel, this.channelList);
    }
    console.log(this.channelList);
    });

  }
  openChatRoom()
  {
    this.twilio.loadChatbox();
    // console.log('called open chat room');
    // this.twilio.createRoom().subscribe(data=>console.log(data));
  }
  deleteRoom(sid)
  {
    console.log('Deleted');
    this.twilio.deleteTwilioChannel$(sid).subscribe(data=>console.log(data));
    event.stopPropagation();
    location.reload();
  }

}
