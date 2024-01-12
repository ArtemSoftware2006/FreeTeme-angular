import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCreatePageComponent } from './deal-create-page.component';

describe('DealCreatePageComponent', () => {
  let component: DealCreatePageComponent;
  let fixture: ComponentFixture<DealCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
