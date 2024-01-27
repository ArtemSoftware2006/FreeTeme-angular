import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAfterApprovedPageComponent } from './contact-after-approved-page.component';

describe('ContactAfterApprovedPageComponent', () => {
  let component: ContactAfterApprovedPageComponent;
  let fixture: ComponentFixture<ContactAfterApprovedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAfterApprovedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAfterApprovedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
