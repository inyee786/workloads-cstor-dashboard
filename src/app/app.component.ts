import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private http: HttpClient) { }
  public bannerPassMessage = "MayaData announces commercial availability and launches MDAP.";
  public bannerHyperLink = "https://mayadata.io";
  public bannerAnchorText = "Read More"
  ngOnInit() {
  }
}
