
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { LevelNamePipe } from '../../pipes/levelname.pipe';
import { LevelStarsPipe } from '../../pipes/levelstars.pipe';
import { AlienReferencePageComponent } from './page.component';

const levelStarsStub: Partial<LevelStarsPipe> = { transform: (level: number) => ['★', '★★', '★★★'][level] };
const levelNamesStub: Partial<LevelNamePipe> = { transform: (level: number) => ['Green', 'Yellow', 'Red'][level] };

describe('AlienReferencePageComponent', () => {
  let component: AlienReferencePageComponent;
  let fixture: ComponentFixture<AlienReferencePageComponent>;

  beforeEach(waitForAsync(() => {
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
