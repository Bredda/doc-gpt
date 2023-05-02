import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProjectComponent } from './no-project.component';

describe('NoProjectComponent', () => {
  let component: NoProjectComponent;
  let fixture: ComponentFixture<NoProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
