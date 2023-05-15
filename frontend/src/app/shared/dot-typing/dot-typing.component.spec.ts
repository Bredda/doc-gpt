import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotTypingComponent } from './dot-typing.component';

describe('DotTypingComponent', () => {
  let component: DotTypingComponent;
  let fixture: ComponentFixture<DotTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotTypingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
