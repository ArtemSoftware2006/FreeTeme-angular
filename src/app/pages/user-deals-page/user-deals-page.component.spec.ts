import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealsPageComponent } from './user-deals-page.component';

describe('UserDealsPageComponent', () => {
  let component: UserDealsPageComponent;
  let fixture: ComponentFixture<UserDealsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDealsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDealsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
