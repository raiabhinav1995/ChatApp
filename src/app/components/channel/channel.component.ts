import { map } from 'rxjs/operators';
import { TwillioService } from './../../shared/services/twillio/twillio-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelList;
  constructor(private twilio: TwillioService)
  {this.getChannelList();
  }

  ngOnInit(): void {

  }

  async getChannelList()
  {
    // this.twilio.getChannels().subscribe(res=>{
    //   //console.log(res.channels);
    //   for(let items of res.channels)
    //   {
    //     //if(>0)
    //     {//console.log(items);
    //       //console.log(''+items.unique_name);
    //       //console.log(''+items['sid']);
    //       //this.twilio.deleteChannel(items['sid']).subscribe(res=>console.log(res));
    //       items['members_count'] || this.channelList.push(items);}
    //   }
    // });
    // console.log('channels list', this.channelList);
    this.twilio.getChannelList().subscribe((res)=>
    {
      this.channelList=res;
    });
    console.log(this.channelList);
    // this.channelList.forEach(function print(entry) {
    //   console.log(entry);

    // });
    for(let channel of this.channelList)
    {
      console.log('test');
      console.log(channel);
    }
    for(let i=0;i<this.channelList.length;i++)
    {
      console.log('test');
      console.log(this.channelList[i]);
    }


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
    this.twilio.deleteChannel(sid).subscribe(data=>console.log(data));
    event.stopPropagation();
    location.reload();
  }

}
