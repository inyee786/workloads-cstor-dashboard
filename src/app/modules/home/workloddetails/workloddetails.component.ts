import { Component, OnInit } from "@angular/core";
import { PersonService } from "../../../service/savereaddelete.service";
import { KubernetsService } from "../../../service/kubernetes.service";
import { LitmusService } from "../../../service/litmus.services";
import {
  getResponse, postResponse,
  statefulSet,
  jivaReplica,
  jivaController,
  applicationPod,
  overAllStatus,
  pvc,
  personDetail,
  yaml
} from "../../../model/data.model";
import * as $ from "jquery";
import { Subscription, Observable, timer } from "rxjs";
import { error } from "protractor";

@Component({
  selector: "app-workloddetails",
  templateUrl: "./workloddetails.component.html",
  styleUrls: ["./workloddetails.component.scss"]
})
export class WorkloddetailsComponent implements OnInit {
  jivaDetail;
  jivas;
  private windowWidth;
  private rnumber = Math.floor(Math.random() * 10000000);
  public numberstatefullSets = 0;
  public statefullSets: statefulSet[] = [];
  public litmuspod: statefulSet[] = [];
  public jivaContrllers: jivaController[] = [];
  public jivaReplicas: jivaReplica[] = [];
  public applicationPods: applicationPod[] = [];
  public overAllStatus: overAllStatus[] = [];
  public postResponses: postResponse;
  public getResponses: getResponse[] = [];
  public personDetails: personDetail[] = [];
  public namespaceyaml = "";
  public workloadyaml = "";
  public workloadName = "";
  public pvc: pvc[] = [];
  public pvctemp;
  public pvcarray;
  public namespace = "";
  public dockerImage = "";
  public openebsversion = "";
  public workloadImage = "";
  public overallStatus = "";
  public runningStatus = false;
  public failledStatus = false;
  public unknownStatus = false;
  public chaosTests = [
    "Kill OpenEBS Target",
    "Increase Latency Between App and Replicas"
  ];
  public selectedChaos = "";
  public selectedApplication = "";
  public writeStatus = false;
  public readStatus = false;
  public alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  public randomString1 = " ";
  public randomString2 = " ";
  public randomnumber: number;
  public getstatus;
  public getmessage;
  public poststatus;
  public postmessage;
  public alertMessage = "";
  public isAlert: boolean;
  constructor(private personService: PersonService, private kubernetsServices: KubernetsService, private litmusServies: LitmusService) {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() {

    this.personService.getYamls().subscribe(res => {
      this.workloadName = res.workloadName;
      this.namespaceyaml = res.nameSpaceyaml;
      this.workloadyaml = res.workloadyaml;
    });

    for (let j = 0; j < 100; j++) {
      for (let i = 0; i < 10; i++) {
        this.randomString1 =
          this.randomString1 + this.alphabet[Math.floor(Math.random() * 25)];
        this.randomString2 =
          this.randomString2 + this.alphabet[Math.floor(Math.random() * 25)];
      }
      this.randomnumber = Math.floor(Math.random() * 10000000);
      this.personDetails.push({
        rNumber: this.rnumber,
        name: this.randomString1,
        email: this.randomString2,
        age: this.randomnumber
      });
      this.randomString1 = " ";
      this.randomString2 = " ";
    }

    if (this.selectedChaos == "") {
      $(".hide-custom").hide();
    }

    timer(0, 5000).subscribe(x => {
      this.kubernetsServices.getPodDetails().subscribe(res => {
        this.statefullSets = res.statefulSet;
        this.applicationPods = res.applicationPod;
        this.jivaContrllers = res.jivaController;
        this.jivaReplicas = res.jivaReplica;
        this.pvc = res.pvc;
        this.pvctemp = res.pvc;
        this.pvcarray = this.pvctemp.pvc;
        // console.log(this.pvcarray);

        // this.jivaReplicas.forEach(function(replica) {
        //   if (replica.status == "Terminating") {
        //     setTimeout(function() {}, 8000);
        //   }
        // });
        this.workloadImage = this.statefullSets[0].dockerImage;
        this.dockerImage = this.jivaContrllers[0].openebsjivaversion;
        this.openebsversion ="OpenEBS : " + this.jivaContrllers[0].openebsjivaversion.split(":")[1];
        this.namespace = this.statefullSets[0].namespace;
        this.overallStatus = res.status;
        this.numberstatefullSets = this.statefullSets.length;
        if (this.overallStatus == "Running") {
          this.runningStatus = true;
        } else if (
          this.overallStatus == "Pending" ||
          this.overallStatus == "Failed"
        ) {
          this.failledStatus = true;
        } else {
          this.unknownStatus = true;
        }

        error => {
          this.unknownStatus = true;
          // console.log(res);
        };
      });
    });
    this.kubernetsServices.getPodDetails().subscribe(res => {
      this.litmuspod = res.statefulSet;
    });
  }

  public listVolume() {
    this.kubernetsServices.getJivaVolumeDetails().subscribe(res => {
      this.jivaDetail = res;
      this.jivas = this.jivaDetail;
    });
  }

  public save() {
    this.personService
      .save100PersonDetails(this.personDetails)
      .subscribe(res => {
        this.postResponses = res;
        this.poststatus = this.postResponses.status;
        this.postmessage = this.postResponses.message;
        this.writeStatus = true;
      });

    setTimeout(
      function() {
        this.writeStatus = false;
      }.bind(this),
      5000
    );
  }
  public read() {
    this.personService.get100personDetails(this.rnumber).subscribe(res => {
      this.getResponses[0] = res;
      this.getstatus = this.getResponses[0].status;
      this.getmessage = this.getResponses[0].message;
      this.readStatus = true;
    });
    setTimeout(
      function () {
        this.readStatus = false;
      }.bind(this),
      5000
    );
  }

  public onChaosSelect(chaosValue) {
    // console.log(chaosValue);
    this.selectedChaos = chaosValue;
    if (this.selectedChaos != "") {
      $(".hide-custom").show();
    } else {
      $(".hide-custom").hide();
      this.selectedApplication = "";
    }
  }

  public onAppSelect(appValue) {
    this.selectedApplication = appValue;
  }

  public runChaosTest(type: string, app: string) {
    if (type != "" && app != "") {
      this.alertMessage = type + " Chaos on " + app + " started";
      for (let i = 0; i < this.chaosTests.length; i++) {
        if (type.trim() == this.chaosTests[i]) {
          type = i.toString();
          break;
        }
      }
      this.litmusServies.runChaosTestService(type, app.trim());
      this.runAlert();
      this.setSelectToDefault();
    }
  }
  public runAlert() {
    this.isAlert = true;
    setTimeout(
      function () {
        $(".alert")
          .animate({ opacity: 0, bottom: "40px" }, 500)
          .hide("slow");
        setTimeout(
          function () {
            this.isAlert = false;
          }.bind(this),
          600
        );
      }.bind(this),
      4000
    );
  }

  public setSelectToDefault() {
    this.selectedChaos = "";
    this.selectedApplication = "";
    $("#application").hide();
    $("#application")
      .val("")
      .change();
    $("#induceChaos")
      .val("")
      .change();
  }
  public titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
