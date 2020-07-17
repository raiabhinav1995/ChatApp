import { TwillioService } from './../../shared/services/twillio/twillio-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  channelName="hello";
  constructor(public twillio: TwillioService)
  {

  }

  ngOnInit(): void {
  }

}
