import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public heroTexts = {
    heroText: "Workload Dashboard",
    subText: [
       "Status of stateful workload running on OpenEBS Volumes"
    ]
  };
  constructor() { }

  ngOnInit() {

  }

}
