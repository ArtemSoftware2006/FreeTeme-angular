import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDetailsPageComponent } from './deal-details-page.component';

describe('DealDetailsPageComponent', () => {
  let component: DealDetailsPageComponent;
  let fixture: ComponentFixture<DealDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
