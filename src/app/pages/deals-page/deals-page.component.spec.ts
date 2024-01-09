import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsPageComponent } from './deals-page.component';

describe('DealsPageComponent', () => {
  let component: DealsPageComponent;
  let fixture: ComponentFixture<DealsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
