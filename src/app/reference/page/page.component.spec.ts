
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { LevelNamePipe } from '../../pipes/levelname.pipe';
import { LevelStarsPipe } from '../../pipes/levelstars.pipe';
import { AlienReferencePageComponent } from './page.component';

let levelStarsStub: Partial<LevelStarsPipe>;
levelStarsStub = { transform: (level: number) => ['★', '★★', '★★★'][level] };

let levelNamesStub: Partial<LevelNamePipe>;
levelNamesStub = { transform: (level: number) => ['Green', 'Yellow', 'Red'][level] };

describe('AlienReferencePageComponent', () => {
  let component: AlienReferencePageComponent;
  let fixture: ComponentFixture<AlienReferencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StorageServiceModule],
      declarations: [AlienReferencePageComponent, LevelStarsPipe, LevelNamePipe],
      providers: [
        { provide: LevelStarsPipe, useValue: levelStarsStub },
        { provide: LevelNamePipe, useValue: levelNamesStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
