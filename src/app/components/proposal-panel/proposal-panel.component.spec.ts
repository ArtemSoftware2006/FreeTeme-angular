import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPanelComponent } from './proposal-panel.component';

describe('ProposalPanelComponent', () => {
  let component: ProposalPanelComponent;
  let fixture: ComponentFixture<ProposalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
