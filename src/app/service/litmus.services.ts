import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class LitmusService {

    private apiurl: string;
    private host: string;
    constructor(private http: HttpClient) {
        this.host = window.location.host;
        if ((this.host.toString().indexOf("localhost")+1) && this.host.toString().indexOf(":")) {
          this.apiurl = "http://localhost:3000/";
        } else {
          this.apiurl = "https://" + window.location.host + "/api/";
        }
      }

      runChaosTestService(type: string, app: string) {
        this.http
            .get(
                this.apiurl + "litmus?app=" +
                app +
                "&type=" +
                type
            )
            .subscribe();
    }
}
