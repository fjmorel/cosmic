
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienReferencePageComponent } from './page.component';

describe('AlienReferencePageComponent', () => {
  let component: AlienReferencePageComponent;
  let fixture: ComponentFixture<AlienReferencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlienReferencePageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienReferencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
