import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorsPageComponent } from './executors-page.component';

describe('ExecutorsPageComponent', () => {
  let component: ExecutorsPageComponent;
  let fixture: ComponentFixture<ExecutorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
