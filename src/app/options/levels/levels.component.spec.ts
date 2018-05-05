
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOptionsComponent } from './levels.component';

describe('LevelOptionsComponent', () => {
  let component: LevelOptionsComponent;
  let fixture: ComponentFixture<LevelOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelOptionsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
