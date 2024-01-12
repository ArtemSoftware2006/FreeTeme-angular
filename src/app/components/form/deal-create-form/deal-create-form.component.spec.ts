import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCreateFormComponent } from './deal-create-form.component';

describe('DealCreateFormComponent', () => {
  let component: DealCreateFormComponent;
  let fixture: ComponentFixture<DealCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
