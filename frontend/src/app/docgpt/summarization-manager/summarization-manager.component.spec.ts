import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizationManagerComponent } from './summarization-manager.component';

describe('SummarizationManagerComponent', () => {
  let component: SummarizationManagerComponent;
  let fixture: ComponentFixture<SummarizationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarizationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarizationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
