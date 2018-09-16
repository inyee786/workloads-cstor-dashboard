import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasequeryComponent } from './databasequery.component';

describe('DatabasequeryComponent', () => {
  let component: DatabasequeryComponent;
  let fixture: ComponentFixture<DatabasequeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabasequeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasequeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
