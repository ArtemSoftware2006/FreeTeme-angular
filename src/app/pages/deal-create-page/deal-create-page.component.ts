import { Component, EventEmitter } from '@angular/core';
import { DealCreateFormComponent } from '../../components/form/deal-create-form/deal-create-form.component';
import { IUser } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-deal-create-page',
  standalone: true,
  imports: [DealCreateFormComponent, NgIf],
  templateUrl: './deal-create-page.component.html',
  styleUrl: './deal-create-page.component.scss'
})
export class DealCreatePageComponent {
    
  user? : IUser | null

  constructor(public authService : AuthorizationService) 
  {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      console.log(user);
      this.user = user
    });
  }

  handleSubmit($event: boolean) {
    if ($event) {
      console.log('submitted');
    }
    else {
      console.log('not submitted');
    }
  }
  
}
