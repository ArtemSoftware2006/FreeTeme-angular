import { Component } from '@angular/core';
import { DealCreateFormComponent } from '../../components/form/deal-create-form/deal-create-form.component';
import { User } from '../../models/user';
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
    
  user? : User | null

  constructor(public authService : AuthorizationService) 
  {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
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
