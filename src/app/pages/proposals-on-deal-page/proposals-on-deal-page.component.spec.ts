import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsOnDealPageComponent } from './proposals-on-deal-page.component';

describe('ProposalsOnDealPageComponent', () => {
  let component: ProposalsOnDealPageComponent;
  let fixture: ComponentFixture<ProposalsOnDealPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsOnDealPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalsOnDealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
