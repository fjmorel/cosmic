
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LevelStarsPipe } from '../../pipes/levelstars.pipe';
import { AlienGridComponent } from './grid.component';

const levelStarsStub: Partial<LevelStarsPipe> = { transform: (level: number) => ['★', '★★', '★★★'][level] };

describe('AlienGridComponent', () => {
  let component: AlienGridComponent;
  let fixture: ComponentFixture<AlienGridComponent>;

  beforeEach(waitForAsync(() => {
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
