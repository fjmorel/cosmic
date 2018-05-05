
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienGeneratorPageComponent } from './page.component';

describe('AlienGeneratorPageComponent', () => {
  let component: AlienGeneratorPageComponent;
  let fixture: ComponentFixture<AlienGeneratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlienGeneratorPageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
