
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStarsPipe } from '../../pipes/levelstars.pipe';
import { AlienGridComponent } from './grid.component';

let levelStarsStub: Partial<LevelStarsPipe>;
levelStarsStub = { transform: (level: number) => ['★', '★★', '★★★'][level] };

describe('AlienGridComponent', () => {
  let component: AlienGridComponent;
  let fixture: ComponentFixture<AlienGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlienGridComponent, LevelStarsPipe],
      providers: [{ provide: LevelStarsPipe, useValue: levelStarsStub }],
      schemas: [NO_ERRORS_SCHEMA],
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
