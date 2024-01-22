import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { ProfileEditFormComponent } from '../../components/form/profile-edit-form/profile-edit-form.component';
import { ProposalCreaeteFormComponent } from '../../components/form/proposal-creaete-form/proposal-creaete-form.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UserCardComponent, ProfileEditFormComponent, ProposalCreaeteFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  value = "Test"
}
