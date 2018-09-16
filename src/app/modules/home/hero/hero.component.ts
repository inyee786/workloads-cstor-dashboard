import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Subscription }   from 'rxjs/Subscription';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private wowSubscription: Subscription;

  @Input('heroText') heroContent: any;
  constructor(private router: Router, private wowService: NgwWowService) { 
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // Reload WoW animations when done navigating to page,
      // but you are free to call it whenever/wherever you like
      this.wowService.init(); 
    });
  }

  ngOnInit() {
    console.log(this.heroContent);
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
      });
    }
    ngOnDestroy() {
      // unsubscribe (if necessary) to WOW observable to prevent memory leaks
      this.wowSubscription.unsubscribe();
    }
  
}
