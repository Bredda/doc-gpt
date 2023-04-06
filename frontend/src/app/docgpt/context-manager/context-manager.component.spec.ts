import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextManagerComponent } from './context-manager.component';

describe('ContextManagerComponent', () => {
  let component: ContextManagerComponent;
  let fixture: ComponentFixture<ContextManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
