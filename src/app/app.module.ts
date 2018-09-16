import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Response,RequestOptions,Headers,Http } from '@angular/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgwWowModule } from 'ngx-wow';
import { RouterModule, RouterLinkActive } from '@angular/router';


import { PersonService } from './service/savereaddelete.service';
import { KubernetsService } from './service/kubernetes.service';
import { LitmusService } from './service/litmus.services';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { HomeComponent } from './modules/home/home.component';
import { HeroComponent } from './modules/home/hero/hero.component';
import { WorkloddetailsComponent } from './modules/home/workloddetails/workloddetails.component';
import { DatabasequeryComponent } from './modules/home/databasequery/databasequery.component';
import { IframemodalComponent } from './shared/components/iframemodal/iframemodal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    HomeComponent,
    HeroComponent,
    WorkloddetailsComponent,
    DatabasequeryComponent,
    IframemodalComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgwWowModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:HeroComponent}
    ])
  ],
  providers: [PersonService,KubernetsService, LitmusService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
