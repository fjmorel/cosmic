
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AlienGeneratorPageComponent } from './page.component';

describe('AlienGeneratorPageComponent', () => {
  let component: AlienGeneratorPageComponent;
  let fixture: ComponentFixture<AlienGeneratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StorageServiceModule],
      declarations: [AlienGeneratorPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
