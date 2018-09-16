import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloddetailsComponent } from './workloddetails.component';

describe('WorkloddetailsComponent', () => {
  let component: WorkloddetailsComponent;
  let fixture: ComponentFixture<WorkloddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
