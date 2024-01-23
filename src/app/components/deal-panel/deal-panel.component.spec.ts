import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealPanelComponent } from './deal-panel.component';

describe('DealPanelComponent', () => {
  let component: DealPanelComponent;
  let fixture: ComponentFixture<DealPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
