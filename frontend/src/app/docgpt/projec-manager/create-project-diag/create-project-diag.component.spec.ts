import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectDiagComponent } from './create-project-diag.component';

describe('CreateProjectDiagComponent', () => {
  let component: CreateProjectDiagComponent;
  let fixture: ComponentFixture<CreateProjectDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectDiagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
