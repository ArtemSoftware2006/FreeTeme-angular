import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProposalsPageComponent } from './user-proposals-page.component';

describe('UserProposalsPageComponent', () => {
  let component: UserProposalsPageComponent;
  let fixture: ComponentFixture<UserProposalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProposalsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProposalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
