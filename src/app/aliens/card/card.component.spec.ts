
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: AlienCardComponent;
  let fixture: ComponentFixture<AlienCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlienCardComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
