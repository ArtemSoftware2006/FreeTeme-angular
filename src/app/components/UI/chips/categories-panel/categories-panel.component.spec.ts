import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPanelComponent } from './categories-panel.component';

describe('CategoriesPanelComponent', () => {
  let component: CategoriesPanelComponent;
  let fixture: ComponentFixture<CategoriesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
