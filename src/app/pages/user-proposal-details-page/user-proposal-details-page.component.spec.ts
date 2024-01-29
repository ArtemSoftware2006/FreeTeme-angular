import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProposalDetailsPageComponent } from './user-proposal-details-page.component';

describe('UserProposalDetailsPageComponent', () => {
  let component: UserProposalDetailsPageComponent;
  let fixture: ComponentFixture<UserProposalDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProposalDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProposalDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
