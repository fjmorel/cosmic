
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelNamePipe } from '../../pipes/levelname.pipe';
import { LevelStarsPipe } from '../../pipes/levelstars.pipe';
import { LevelOptionsComponent } from './levels.component';

let levelStarsStub: Partial<LevelStarsPipe>;
levelStarsStub = { transform: (level) => ['★', '★★', '★★★'][level] };

let levelNamesStub: Partial<LevelNamePipe>;
levelNamesStub = { transform: (level) => ['Green', 'Yellow', 'Red'][level] };

describe('LevelOptionsComponent', () => {
  let component: LevelOptionsComponent;
  let fixture: ComponentFixture<LevelOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelOptionsComponent, LevelStarsPipe, LevelNamePipe],
      providers: [
        { provide: LevelStarsPipe, useValue: levelStarsStub },
        { provide: LevelNamePipe, useValue: levelNamesStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
