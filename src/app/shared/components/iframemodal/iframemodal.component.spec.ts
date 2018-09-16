import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframemodalComponent } from './iframemodal.component';

describe('IframemodalComponent', () => {
  let component: IframemodalComponent;
  let fixture: ComponentFixture<IframemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
