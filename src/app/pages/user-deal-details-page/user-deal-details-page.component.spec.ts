import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealDetailsPageComponent } from './user-deal-details-page.component';

describe('UserDealDetailsPageComponent', () => {
  let component: UserDealDetailsPageComponent;
  let fixture: ComponentFixture<UserDealDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDealDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDealDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
