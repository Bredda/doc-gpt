import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocgptComponent } from './docgpt.component';

describe('DocgptComponent', () => {
  let component: DocgptComponent;
  let fixture: ComponentFixture<DocgptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocgptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocgptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
