import { Component, OnInit } from '@angular/core';
import { personDetail } from '../../../model/data.model'
import { PersonService } from '../../../service/savereaddelete.service'

import { getResponse, postResponse } from '../../../model/data.model'

@Component({
  selector: 'app-databasequery',
  templateUrl: './databasequery.component.html',
  styleUrls: ['./databasequery.component.scss']
})
export class DatabasequeryComponent implements OnInit {
  public MAX: number = 26;
  public alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public personDetails: personDetail[] = [];
  public randomString1 = ' ';
  public randomString2 = ' ';
  public randomnumber: number;
  private rnumber = Math.floor(Math.random() * 10000000);
  public postResponses: postResponse;
  public getResponses: getResponse[] = [];
  public getstatus;
  public getmessage;
  public poststatus;
  public postmessage;

  constructor(private personService: PersonService) { }

  ngOnInit() {

    for (let j = 0; j < 100; j++) {
      for (let i = 0; i < 10; i++) {
        this.randomString1 = this.randomString1 + this.alphabet[Math.floor(Math.random() * 25)];
        this.randomString2 = this.randomString2 + this.alphabet[Math.floor(Math.random() * 25)];
      }
      this.randomnumber = Math.floor(Math.random() * 10000000)
      this.personDetails.push({
        rNumber: this.rnumber,
        name: this.randomString1,
        email: this.randomString2,
        age: this.randomnumber
      });
      this.randomString1 = ' ';
      this.randomString2 = ' ';
    }
  }



  public save() {
    this.personService.save100PersonDetails(this.personDetails).subscribe(res => {
      // console.log(res);
      // console.log(res);
      this.postResponses = res;
      // this.postResponses=res.;
      // console.log(this.postResponses);
      this.poststatus= this.postResponses.status;
      this.postmessage = this.postResponses.message;
    })
  }
  public read() {
    this.personService.get100personDetails(this.rnumber).subscribe(res => {
      console.log(JSON.stringify(res.status));
      // this.getResponses[0].status = res.status;
      this.getResponses[0] = res;
      // this.getResponses.message = res.message;
      this.getstatus = this.getResponses[0].status;
      this.getmessage = this.getResponses[0].message

      console.log(res.status);
    })
  }
}
