import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { UserContactCardComponent } from '../../components/cards/user-contact-card/user-contact-card.component';

@Component({
  selector: 'app-contact-after-approved-page',
  standalone: true,
  imports: [UserContactCardComponent],
  templateUrl: './contact-after-approved-page.component.html',
  styleUrl: './contact-after-approved-page.component.scss'
})
export class ContactAfterApprovedPageComponent {

  employeeId? : number;
  executorId? : number;
  employee : Subject<UserProfile> = new Subject<UserProfile>();
  executor : Subject<UserProfile> = new Subject<UserProfile>();

  constructor(public activatedRoute : ActivatedRoute,
    public userService : UserService) { }

  ngOnInit(): void {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('employeeId'));
    this.executorId = Number(this.activatedRoute.snapshot.paramMap.get('executorId'));

    this.userService.getUser(this.employeeId)
    .subscribe((employee) => {
      this.employee?.next(employee);
    });

    this.userService.getUser(this.executorId)
    .subscribe((executor) => {
      this.executor?.next(executor);
    });

  }
}
