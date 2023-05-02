import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatDiagComponent } from './create-chat-diag.component';

describe('CreateChatDiagComponent', () => {
  let component: CreateChatDiagComponent;
  let fixture: ComponentFixture<CreateChatDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChatDiagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChatDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
