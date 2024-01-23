import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCardComponent } from './proposal-card.component';

describe('ProposalCardComponent', () => {
  let component: ProposalCardComponent;
  let fixture: ComponentFixture<ProposalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
