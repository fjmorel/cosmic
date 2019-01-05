
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmicHomePageComponent } from './page.component';

describe('CosmicHomePageComponent', () => {
  let component: CosmicHomePageComponent;
  let fixture: ComponentFixture<CosmicHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CosmicHomePageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmicHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
