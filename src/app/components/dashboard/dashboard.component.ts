import { TwillioService } from './../../shared/services/twillio/twillio-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  channelName="";
  result: any;
  //createdChannels: any=[];

  constructor(public twillio: TwillioService)
  {
    this.result=twillio.hitApi().subscribe((data)=>
    {
      //console.log(data);
    });

    //this.createdChannels=twillio.getChannels().subscribe(data=>console.log(data));
    //this.result
  }

  ngOnInit(): void
  {
    //this.addChannel(name);
    this.test();
  }
  addChannel(name)
  {console.log('added', name);
    this.twillio.createChannel(name).subscribe(data=>console.log(data));
    //location.reload();

  }
  test()
  {
    this.twillio.return_sid('rai');
  }
  addMember(name)
  {
    this.twillio.addMember(name).subscribe(data=>console.log(data));
  }

}


