
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienGridComponent } from './grid.component';

describe('AlienGridComponent', () => {
  let component: AlienGridComponent;
  let fixture: ComponentFixture<AlienGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlienGridComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
