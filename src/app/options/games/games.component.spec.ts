
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOptionsComponent } from './games.component';

describe('GameOptionsComponent', () => {
  let component: GameOptionsComponent;
  let fixture: ComponentFixture<GameOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOptionsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
