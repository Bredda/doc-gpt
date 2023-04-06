import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderInfoComponent } from './loader-info.component';

describe('LoaderInfoComponent', () => {
  let component: LoaderInfoComponent;
  let fixture: ComponentFixture<LoaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
