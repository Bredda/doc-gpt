import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecManagerComponent } from './projec-manager.component';

describe('ProjecManagerComponent', () => {
  let component: ProjecManagerComponent;
  let fixture: ComponentFixture<ProjecManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjecManagerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjecManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
